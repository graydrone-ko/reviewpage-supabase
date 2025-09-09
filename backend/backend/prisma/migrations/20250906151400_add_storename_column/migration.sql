-- Add storeName column to surveys table
ALTER TABLE "public"."surveys" ADD COLUMN "storeName" TEXT NOT NULL DEFAULT '';

-- Update existing enums
ALTER TYPE "public"."Gender" DROP VALUE IF EXISTS 'OTHER';

-- Add new enum values
ALTER TYPE "public"."SurveyStatus" ADD VALUE IF NOT EXISTS 'SUSPENDED';
ALTER TYPE "public"."RewardType" ADD VALUE IF NOT EXISTS 'REFUND';

-- Create new enums
DO $$ BEGIN
  CREATE TYPE "public"."CancellationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."WithdrawalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add missing columns to surveys table
ALTER TABLE "public"."surveys" ADD COLUMN IF NOT EXISTS "approvedAt" TIMESTAMP(3);
ALTER TABLE "public"."surveys" ADD COLUMN IF NOT EXISTS "completedAt" TIMESTAMP(3);
ALTER TABLE "public"."surveys" ADD COLUMN IF NOT EXISTS "suspendedAt" TIMESTAMP(3);
ALTER TABLE "public"."surveys" ADD COLUMN IF NOT EXISTS "rejectionReason" TEXT;
ALTER TABLE "public"."surveys" ADD COLUMN IF NOT EXISTS "extensionCount" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "public"."surveys" ADD COLUMN IF NOT EXISTS "extensionHistory" JSONB;
ALTER TABLE "public"."surveys" ADD COLUMN IF NOT EXISTS "cancellationStatus" "public"."CancellationStatus";
ALTER TABLE "public"."surveys" ADD COLUMN IF NOT EXISTS "cancellationRequestedAt" TIMESTAMP(3);

-- Add missing columns to users table
ALTER TABLE "public"."users" DROP COLUMN IF EXISTS "age";
ALTER TABLE "public"."users" ADD COLUMN IF NOT EXISTS "accountNumber" TEXT NOT NULL DEFAULT '';
ALTER TABLE "public"."users" ADD COLUMN IF NOT EXISTS "bankCode" TEXT NOT NULL DEFAULT '';
ALTER TABLE "public"."users" ADD COLUMN IF NOT EXISTS "birthDate" TEXT NOT NULL DEFAULT '';
ALTER TABLE "public"."users" ADD COLUMN IF NOT EXISTS "phoneNumber" TEXT NOT NULL DEFAULT '';

-- Update gender column to be required
ALTER TABLE "public"."users" ALTER COLUMN "gender" SET NOT NULL;
ALTER TABLE "public"."users" ALTER COLUMN "gender" SET DEFAULT 'MALE';

-- Add unique constraint for phone numbers if it doesn't exist
DO $$ BEGIN
  ALTER TABLE "public"."users" ADD CONSTRAINT "users_phoneNumber_key" UNIQUE ("phoneNumber");
EXCEPTION
  WHEN duplicate_table THEN null;
END $$;

-- Add missing columns to survey_questions table
ALTER TABLE "public"."survey_questions" ADD COLUMN IF NOT EXISTS "maxLength" INTEGER;
ALTER TABLE "public"."survey_questions" ADD COLUMN IF NOT EXISTS "minLength" INTEGER;
ALTER TABLE "public"."survey_questions" ADD COLUMN IF NOT EXISTS "placeholder" TEXT;

-- Add missing columns to survey_responses table
ALTER TABLE "public"."survey_responses" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Create withdrawal_requests table if it doesn't exist
CREATE TABLE IF NOT EXISTS "public"."withdrawal_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "public"."WithdrawalStatus" NOT NULL DEFAULT 'PENDING',
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "processedBy" TEXT,
    "note" TEXT,

    CONSTRAINT "withdrawal_requests_pkey" PRIMARY KEY ("id")
);

-- Create survey_cancellation_requests table if it doesn't exist
CREATE TABLE IF NOT EXISTS "public"."survey_cancellation_requests" (
    "id" TEXT NOT NULL,
    "surveyId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "refundAmount" DOUBLE PRECISION NOT NULL,
    "status" "public"."CancellationStatus" NOT NULL DEFAULT 'PENDING',
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "processedBy" TEXT,

    CONSTRAINT "survey_cancellation_requests_pkey" PRIMARY KEY ("id")
);

-- Add foreign key constraints if they don't exist
DO $$ BEGIN
  ALTER TABLE "public"."withdrawal_requests" ADD CONSTRAINT "withdrawal_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "public"."survey_cancellation_requests" ADD CONSTRAINT "survey_cancellation_requests_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "public"."surveys"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add unique constraint for survey cancellation requests if it doesn't exist
DO $$ BEGIN
  ALTER TABLE "public"."survey_cancellation_requests" ADD CONSTRAINT "survey_cancellation_requests_surveyId_key" UNIQUE ("surveyId");
EXCEPTION
  WHEN duplicate_table THEN null;
END $$;