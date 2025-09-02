-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('SELLER', 'CONSUMER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'ALL');

-- CreateEnum
CREATE TYPE "public"."SurveyStatus" AS ENUM ('PENDING', 'APPROVED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."RewardType" AS ENUM ('SURVEY_COMPLETION', 'BONUS');

-- CreateEnum
CREATE TYPE "public"."RewardStatus" AS ENUM ('PENDING', 'PAID');

-- CreateEnum
CREATE TYPE "public"."QuestionType" AS ENUM ('MULTIPLE_CHOICE', 'TEXT', 'SCORE', 'YES_NO');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'CONSUMER',
    "age" INTEGER,
    "gender" "public"."Gender",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."survey_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "survey_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."survey_steps" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "survey_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."survey_questions" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "questionNumber" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "type" "public"."QuestionType" NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "survey_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."question_options" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "optionNumber" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "question_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."surveys" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "targetAgeMin" INTEGER NOT NULL,
    "targetAgeMax" INTEGER NOT NULL,
    "targetGender" "public"."Gender" NOT NULL,
    "reward" DOUBLE PRECISION NOT NULL,
    "maxParticipants" INTEGER NOT NULL DEFAULT 50,
    "totalBudget" DOUBLE PRECISION,
    "status" "public"."SurveyStatus" NOT NULL DEFAULT 'PENDING',
    "customSteps" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."survey_responses" (
    "id" TEXT NOT NULL,
    "surveyId" TEXT NOT NULL,
    "consumerId" TEXT NOT NULL,
    "responses" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "survey_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."rewards" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "public"."RewardType" NOT NULL,
    "status" "public"."RewardStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rewards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "survey_steps_templateId_stepNumber_key" ON "public"."survey_steps"("templateId", "stepNumber");

-- CreateIndex
CREATE UNIQUE INDEX "survey_questions_stepId_questionNumber_key" ON "public"."survey_questions"("stepId", "questionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "question_options_questionId_optionNumber_key" ON "public"."question_options"("questionId", "optionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "survey_responses_surveyId_consumerId_key" ON "public"."survey_responses"("surveyId", "consumerId");

-- AddForeignKey
ALTER TABLE "public"."survey_steps" ADD CONSTRAINT "survey_steps_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."survey_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."survey_questions" ADD CONSTRAINT "survey_questions_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "public"."survey_steps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."question_options" ADD CONSTRAINT "question_options_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."survey_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."surveys" ADD CONSTRAINT "surveys_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."surveys" ADD CONSTRAINT "surveys_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."survey_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."survey_responses" ADD CONSTRAINT "survey_responses_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "public"."surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."survey_responses" ADD CONSTRAINT "survey_responses_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rewards" ADD CONSTRAINT "rewards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
