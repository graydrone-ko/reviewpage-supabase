
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model SurveyTemplate
 * 
 */
export type SurveyTemplate = $Result.DefaultSelection<Prisma.$SurveyTemplatePayload>
/**
 * Model SurveyStep
 * 
 */
export type SurveyStep = $Result.DefaultSelection<Prisma.$SurveyStepPayload>
/**
 * Model SurveyQuestion
 * 
 */
export type SurveyQuestion = $Result.DefaultSelection<Prisma.$SurveyQuestionPayload>
/**
 * Model QuestionOption
 * 
 */
export type QuestionOption = $Result.DefaultSelection<Prisma.$QuestionOptionPayload>
/**
 * Model Survey
 * 
 */
export type Survey = $Result.DefaultSelection<Prisma.$SurveyPayload>
/**
 * Model SurveyResponse
 * 
 */
export type SurveyResponse = $Result.DefaultSelection<Prisma.$SurveyResponsePayload>
/**
 * Model Reward
 * 
 */
export type Reward = $Result.DefaultSelection<Prisma.$RewardPayload>
/**
 * Model SurveyCancellationRequest
 * 
 */
export type SurveyCancellationRequest = $Result.DefaultSelection<Prisma.$SurveyCancellationRequestPayload>
/**
 * Model WithdrawalRequest
 * 
 */
export type WithdrawalRequest = $Result.DefaultSelection<Prisma.$WithdrawalRequestPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  SELLER: 'SELLER',
  CONSUMER: 'CONSUMER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  ALL: 'ALL'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const SurveyStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  SUSPENDED: 'SUSPENDED'
};

export type SurveyStatus = (typeof SurveyStatus)[keyof typeof SurveyStatus]


export const CancellationStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type CancellationStatus = (typeof CancellationStatus)[keyof typeof CancellationStatus]


export const RewardType: {
  SURVEY_COMPLETION: 'SURVEY_COMPLETION',
  BONUS: 'BONUS',
  REFUND: 'REFUND'
};

export type RewardType = (typeof RewardType)[keyof typeof RewardType]


export const RewardStatus: {
  PENDING: 'PENDING',
  PAID: 'PAID'
};

export type RewardStatus = (typeof RewardStatus)[keyof typeof RewardStatus]


export const QuestionType: {
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TEXT: 'TEXT',
  SCORE: 'SCORE',
  YES_NO: 'YES_NO'
};

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType]


export const WithdrawalStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type WithdrawalStatus = (typeof WithdrawalStatus)[keyof typeof WithdrawalStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type SurveyStatus = $Enums.SurveyStatus

export const SurveyStatus: typeof $Enums.SurveyStatus

export type CancellationStatus = $Enums.CancellationStatus

export const CancellationStatus: typeof $Enums.CancellationStatus

export type RewardType = $Enums.RewardType

export const RewardType: typeof $Enums.RewardType

export type RewardStatus = $Enums.RewardStatus

export const RewardStatus: typeof $Enums.RewardStatus

export type QuestionType = $Enums.QuestionType

export const QuestionType: typeof $Enums.QuestionType

export type WithdrawalStatus = $Enums.WithdrawalStatus

export const WithdrawalStatus: typeof $Enums.WithdrawalStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.surveyTemplate`: Exposes CRUD operations for the **SurveyTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SurveyTemplates
    * const surveyTemplates = await prisma.surveyTemplate.findMany()
    * ```
    */
  get surveyTemplate(): Prisma.SurveyTemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.surveyStep`: Exposes CRUD operations for the **SurveyStep** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SurveySteps
    * const surveySteps = await prisma.surveyStep.findMany()
    * ```
    */
  get surveyStep(): Prisma.SurveyStepDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.surveyQuestion`: Exposes CRUD operations for the **SurveyQuestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SurveyQuestions
    * const surveyQuestions = await prisma.surveyQuestion.findMany()
    * ```
    */
  get surveyQuestion(): Prisma.SurveyQuestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.questionOption`: Exposes CRUD operations for the **QuestionOption** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuestionOptions
    * const questionOptions = await prisma.questionOption.findMany()
    * ```
    */
  get questionOption(): Prisma.QuestionOptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.survey`: Exposes CRUD operations for the **Survey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Surveys
    * const surveys = await prisma.survey.findMany()
    * ```
    */
  get survey(): Prisma.SurveyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.surveyResponse`: Exposes CRUD operations for the **SurveyResponse** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SurveyResponses
    * const surveyResponses = await prisma.surveyResponse.findMany()
    * ```
    */
  get surveyResponse(): Prisma.SurveyResponseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reward`: Exposes CRUD operations for the **Reward** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rewards
    * const rewards = await prisma.reward.findMany()
    * ```
    */
  get reward(): Prisma.RewardDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.surveyCancellationRequest`: Exposes CRUD operations for the **SurveyCancellationRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SurveyCancellationRequests
    * const surveyCancellationRequests = await prisma.surveyCancellationRequest.findMany()
    * ```
    */
  get surveyCancellationRequest(): Prisma.SurveyCancellationRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.withdrawalRequest`: Exposes CRUD operations for the **WithdrawalRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WithdrawalRequests
    * const withdrawalRequests = await prisma.withdrawalRequest.findMany()
    * ```
    */
  get withdrawalRequest(): Prisma.WithdrawalRequestDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    SurveyTemplate: 'SurveyTemplate',
    SurveyStep: 'SurveyStep',
    SurveyQuestion: 'SurveyQuestion',
    QuestionOption: 'QuestionOption',
    Survey: 'Survey',
    SurveyResponse: 'SurveyResponse',
    Reward: 'Reward',
    SurveyCancellationRequest: 'SurveyCancellationRequest',
    WithdrawalRequest: 'WithdrawalRequest'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "surveyTemplate" | "surveyStep" | "surveyQuestion" | "questionOption" | "survey" | "surveyResponse" | "reward" | "surveyCancellationRequest" | "withdrawalRequest"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      SurveyTemplate: {
        payload: Prisma.$SurveyTemplatePayload<ExtArgs>
        fields: Prisma.SurveyTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SurveyTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SurveyTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyTemplatePayload>
          }
          findFirst: {
            args: Prisma.SurveyTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SurveyTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyTemplatePayload>
          }
          findMany: {
            args: Prisma.SurveyTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyTemplatePayload>[]
          }
          create: {
            args: Prisma.SurveyTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyTemplatePayload>
          }
          createMany: {
            args: Prisma.SurveyTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SurveyTemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyTemplatePayload>[]
          }
          delete: {
            args: Prisma.SurveyTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyTemplatePayload>
          }
          update: {
            args: Prisma.SurveyTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyTemplatePayload>
          }
          deleteMany: {
            args: Prisma.SurveyTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SurveyTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SurveyTemplateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyTemplatePayload>[]
          }
          upsert: {
            args: Prisma.SurveyTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyTemplatePayload>
          }
          aggregate: {
            args: Prisma.SurveyTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSurveyTemplate>
          }
          groupBy: {
            args: Prisma.SurveyTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<SurveyTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.SurveyTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<SurveyTemplateCountAggregateOutputType> | number
          }
        }
      }
      SurveyStep: {
        payload: Prisma.$SurveyStepPayload<ExtArgs>
        fields: Prisma.SurveyStepFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SurveyStepFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyStepPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SurveyStepFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyStepPayload>
          }
          findFirst: {
            args: Prisma.SurveyStepFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyStepPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SurveyStepFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyStepPayload>
          }
          findMany: {
            args: Prisma.SurveyStepFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyStepPayload>[]
          }
          create: {
            args: Prisma.SurveyStepCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyStepPayload>
          }
          createMany: {
            args: Prisma.SurveyStepCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SurveyStepCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyStepPayload>[]
          }
          delete: {
            args: Prisma.SurveyStepDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyStepPayload>
          }
          update: {
            args: Prisma.SurveyStepUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyStepPayload>
          }
          deleteMany: {
            args: Prisma.SurveyStepDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SurveyStepUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SurveyStepUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyStepPayload>[]
          }
          upsert: {
            args: Prisma.SurveyStepUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyStepPayload>
          }
          aggregate: {
            args: Prisma.SurveyStepAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSurveyStep>
          }
          groupBy: {
            args: Prisma.SurveyStepGroupByArgs<ExtArgs>
            result: $Utils.Optional<SurveyStepGroupByOutputType>[]
          }
          count: {
            args: Prisma.SurveyStepCountArgs<ExtArgs>
            result: $Utils.Optional<SurveyStepCountAggregateOutputType> | number
          }
        }
      }
      SurveyQuestion: {
        payload: Prisma.$SurveyQuestionPayload<ExtArgs>
        fields: Prisma.SurveyQuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SurveyQuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyQuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SurveyQuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyQuestionPayload>
          }
          findFirst: {
            args: Prisma.SurveyQuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyQuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SurveyQuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyQuestionPayload>
          }
          findMany: {
            args: Prisma.SurveyQuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyQuestionPayload>[]
          }
          create: {
            args: Prisma.SurveyQuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyQuestionPayload>
          }
          createMany: {
            args: Prisma.SurveyQuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SurveyQuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyQuestionPayload>[]
          }
          delete: {
            args: Prisma.SurveyQuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyQuestionPayload>
          }
          update: {
            args: Prisma.SurveyQuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyQuestionPayload>
          }
          deleteMany: {
            args: Prisma.SurveyQuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SurveyQuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SurveyQuestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyQuestionPayload>[]
          }
          upsert: {
            args: Prisma.SurveyQuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyQuestionPayload>
          }
          aggregate: {
            args: Prisma.SurveyQuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSurveyQuestion>
          }
          groupBy: {
            args: Prisma.SurveyQuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SurveyQuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SurveyQuestionCountArgs<ExtArgs>
            result: $Utils.Optional<SurveyQuestionCountAggregateOutputType> | number
          }
        }
      }
      QuestionOption: {
        payload: Prisma.$QuestionOptionPayload<ExtArgs>
        fields: Prisma.QuestionOptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionOptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionOptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>
          }
          findFirst: {
            args: Prisma.QuestionOptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionOptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>
          }
          findMany: {
            args: Prisma.QuestionOptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>[]
          }
          create: {
            args: Prisma.QuestionOptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>
          }
          createMany: {
            args: Prisma.QuestionOptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionOptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>[]
          }
          delete: {
            args: Prisma.QuestionOptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>
          }
          update: {
            args: Prisma.QuestionOptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>
          }
          deleteMany: {
            args: Prisma.QuestionOptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionOptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuestionOptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>[]
          }
          upsert: {
            args: Prisma.QuestionOptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionOptionPayload>
          }
          aggregate: {
            args: Prisma.QuestionOptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestionOption>
          }
          groupBy: {
            args: Prisma.QuestionOptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionOptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionOptionCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionOptionCountAggregateOutputType> | number
          }
        }
      }
      Survey: {
        payload: Prisma.$SurveyPayload<ExtArgs>
        fields: Prisma.SurveyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SurveyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SurveyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload>
          }
          findFirst: {
            args: Prisma.SurveyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SurveyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload>
          }
          findMany: {
            args: Prisma.SurveyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload>[]
          }
          create: {
            args: Prisma.SurveyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload>
          }
          createMany: {
            args: Prisma.SurveyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SurveyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload>[]
          }
          delete: {
            args: Prisma.SurveyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload>
          }
          update: {
            args: Prisma.SurveyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload>
          }
          deleteMany: {
            args: Prisma.SurveyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SurveyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SurveyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload>[]
          }
          upsert: {
            args: Prisma.SurveyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload>
          }
          aggregate: {
            args: Prisma.SurveyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSurvey>
          }
          groupBy: {
            args: Prisma.SurveyGroupByArgs<ExtArgs>
            result: $Utils.Optional<SurveyGroupByOutputType>[]
          }
          count: {
            args: Prisma.SurveyCountArgs<ExtArgs>
            result: $Utils.Optional<SurveyCountAggregateOutputType> | number
          }
        }
      }
      SurveyResponse: {
        payload: Prisma.$SurveyResponsePayload<ExtArgs>
        fields: Prisma.SurveyResponseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SurveyResponseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SurveyResponseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload>
          }
          findFirst: {
            args: Prisma.SurveyResponseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SurveyResponseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload>
          }
          findMany: {
            args: Prisma.SurveyResponseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload>[]
          }
          create: {
            args: Prisma.SurveyResponseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload>
          }
          createMany: {
            args: Prisma.SurveyResponseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SurveyResponseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload>[]
          }
          delete: {
            args: Prisma.SurveyResponseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload>
          }
          update: {
            args: Prisma.SurveyResponseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload>
          }
          deleteMany: {
            args: Prisma.SurveyResponseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SurveyResponseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SurveyResponseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload>[]
          }
          upsert: {
            args: Prisma.SurveyResponseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyResponsePayload>
          }
          aggregate: {
            args: Prisma.SurveyResponseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSurveyResponse>
          }
          groupBy: {
            args: Prisma.SurveyResponseGroupByArgs<ExtArgs>
            result: $Utils.Optional<SurveyResponseGroupByOutputType>[]
          }
          count: {
            args: Prisma.SurveyResponseCountArgs<ExtArgs>
            result: $Utils.Optional<SurveyResponseCountAggregateOutputType> | number
          }
        }
      }
      Reward: {
        payload: Prisma.$RewardPayload<ExtArgs>
        fields: Prisma.RewardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RewardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RewardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload>
          }
          findFirst: {
            args: Prisma.RewardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RewardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload>
          }
          findMany: {
            args: Prisma.RewardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload>[]
          }
          create: {
            args: Prisma.RewardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload>
          }
          createMany: {
            args: Prisma.RewardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RewardCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload>[]
          }
          delete: {
            args: Prisma.RewardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload>
          }
          update: {
            args: Prisma.RewardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload>
          }
          deleteMany: {
            args: Prisma.RewardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RewardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RewardUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload>[]
          }
          upsert: {
            args: Prisma.RewardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload>
          }
          aggregate: {
            args: Prisma.RewardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReward>
          }
          groupBy: {
            args: Prisma.RewardGroupByArgs<ExtArgs>
            result: $Utils.Optional<RewardGroupByOutputType>[]
          }
          count: {
            args: Prisma.RewardCountArgs<ExtArgs>
            result: $Utils.Optional<RewardCountAggregateOutputType> | number
          }
        }
      }
      SurveyCancellationRequest: {
        payload: Prisma.$SurveyCancellationRequestPayload<ExtArgs>
        fields: Prisma.SurveyCancellationRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SurveyCancellationRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyCancellationRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SurveyCancellationRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyCancellationRequestPayload>
          }
          findFirst: {
            args: Prisma.SurveyCancellationRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyCancellationRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SurveyCancellationRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyCancellationRequestPayload>
          }
          findMany: {
            args: Prisma.SurveyCancellationRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyCancellationRequestPayload>[]
          }
          create: {
            args: Prisma.SurveyCancellationRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyCancellationRequestPayload>
          }
          createMany: {
            args: Prisma.SurveyCancellationRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SurveyCancellationRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyCancellationRequestPayload>[]
          }
          delete: {
            args: Prisma.SurveyCancellationRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyCancellationRequestPayload>
          }
          update: {
            args: Prisma.SurveyCancellationRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyCancellationRequestPayload>
          }
          deleteMany: {
            args: Prisma.SurveyCancellationRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SurveyCancellationRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SurveyCancellationRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyCancellationRequestPayload>[]
          }
          upsert: {
            args: Prisma.SurveyCancellationRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyCancellationRequestPayload>
          }
          aggregate: {
            args: Prisma.SurveyCancellationRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSurveyCancellationRequest>
          }
          groupBy: {
            args: Prisma.SurveyCancellationRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<SurveyCancellationRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.SurveyCancellationRequestCountArgs<ExtArgs>
            result: $Utils.Optional<SurveyCancellationRequestCountAggregateOutputType> | number
          }
        }
      }
      WithdrawalRequest: {
        payload: Prisma.$WithdrawalRequestPayload<ExtArgs>
        fields: Prisma.WithdrawalRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WithdrawalRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WithdrawalRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>
          }
          findFirst: {
            args: Prisma.WithdrawalRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WithdrawalRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>
          }
          findMany: {
            args: Prisma.WithdrawalRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>[]
          }
          create: {
            args: Prisma.WithdrawalRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>
          }
          createMany: {
            args: Prisma.WithdrawalRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WithdrawalRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>[]
          }
          delete: {
            args: Prisma.WithdrawalRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>
          }
          update: {
            args: Prisma.WithdrawalRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>
          }
          deleteMany: {
            args: Prisma.WithdrawalRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WithdrawalRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WithdrawalRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>[]
          }
          upsert: {
            args: Prisma.WithdrawalRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>
          }
          aggregate: {
            args: Prisma.WithdrawalRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWithdrawalRequest>
          }
          groupBy: {
            args: Prisma.WithdrawalRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<WithdrawalRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.WithdrawalRequestCountArgs<ExtArgs>
            result: $Utils.Optional<WithdrawalRequestCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    surveyTemplate?: SurveyTemplateOmit
    surveyStep?: SurveyStepOmit
    surveyQuestion?: SurveyQuestionOmit
    questionOption?: QuestionOptionOmit
    survey?: SurveyOmit
    surveyResponse?: SurveyResponseOmit
    reward?: RewardOmit
    surveyCancellationRequest?: SurveyCancellationRequestOmit
    withdrawalRequest?: WithdrawalRequestOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    rewards: number
    responses: number
    surveys: number
    withdrawalRequests: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rewards?: boolean | UserCountOutputTypeCountRewardsArgs
    responses?: boolean | UserCountOutputTypeCountResponsesArgs
    surveys?: boolean | UserCountOutputTypeCountSurveysArgs
    withdrawalRequests?: boolean | UserCountOutputTypeCountWithdrawalRequestsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRewardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RewardWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SurveyResponseWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSurveysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SurveyWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWithdrawalRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WithdrawalRequestWhereInput
  }


  /**
   * Count Type SurveyTemplateCountOutputType
   */

  export type SurveyTemplateCountOutputType = {
    steps: number
    surveys: number
  }

  export type SurveyTemplateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    steps?: boolean | SurveyTemplateCountOutputTypeCountStepsArgs
    surveys?: boolean | SurveyTemplateCountOutputTypeCountSurveysArgs
  }

  // Custom InputTypes
  /**
   * SurveyTemplateCountOutputType without action
   */
  export type SurveyTemplateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyTemplateCountOutputType
     */
    select?: SurveyTemplateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SurveyTemplateCountOutputType without action
   */
  export type SurveyTemplateCountOutputTypeCountStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SurveyStepWhereInput
  }

  /**
   * SurveyTemplateCountOutputType without action
   */
  export type SurveyTemplateCountOutputTypeCountSurveysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SurveyWhereInput
  }


  /**
   * Count Type SurveyStepCountOutputType
   */

  export type SurveyStepCountOutputType = {
    questions: number
  }

  export type SurveyStepCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | SurveyStepCountOutputTypeCountQuestionsArgs
  }

  // Custom InputTypes
  /**
   * SurveyStepCountOutputType without action
   */
  export type SurveyStepCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyStepCountOutputType
     */
    select?: SurveyStepCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SurveyStepCountOutputType without action
   */
  export type SurveyStepCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SurveyQuestionWhereInput
  }


  /**
   * Count Type SurveyQuestionCountOutputType
   */

  export type SurveyQuestionCountOutputType = {
    options: number
  }

  export type SurveyQuestionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    options?: boolean | SurveyQuestionCountOutputTypeCountOptionsArgs
  }

  // Custom InputTypes
  /**
   * SurveyQuestionCountOutputType without action
   */
  export type SurveyQuestionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyQuestionCountOutputType
     */
    select?: SurveyQuestionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SurveyQuestionCountOutputType without action
   */
  export type SurveyQuestionCountOutputTypeCountOptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionOptionWhereInput
  }


  /**
   * Count Type SurveyCountOutputType
   */

  export type SurveyCountOutputType = {
    responses: number
  }

  export type SurveyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    responses?: boolean | SurveyCountOutputTypeCountResponsesArgs
  }

  // Custom InputTypes
  /**
   * SurveyCountOutputType without action
   */
  export type SurveyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyCountOutputType
     */
    select?: SurveyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SurveyCountOutputType without action
   */
  export type SurveyCountOutputTypeCountResponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SurveyResponseWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: $Enums.Role | null
    gender: $Enums.Gender | null
    createdAt: Date | null
    updatedAt: Date | null
    accountNumber: string | null
    bankCode: string | null
    birthDate: string | null
    phoneNumber: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: $Enums.Role | null
    gender: $Enums.Gender | null
    createdAt: Date | null
    updatedAt: Date | null
    accountNumber: string | null
    bankCode: string | null
    birthDate: string | null
    phoneNumber: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    role: number
    gender: number
    createdAt: number
    updatedAt: number
    accountNumber: number
    bankCode: number
    birthDate: number
    phoneNumber: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    gender?: true
    createdAt?: true
    updatedAt?: true
    accountNumber?: true
    bankCode?: true
    birthDate?: true
    phoneNumber?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    gender?: true
    createdAt?: true
    updatedAt?: true
    accountNumber?: true
    bankCode?: true
    birthDate?: true
    phoneNumber?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    gender?: true
    createdAt?: true
    updatedAt?: true
    accountNumber?: true
    bankCode?: true
    birthDate?: true
    phoneNumber?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string
    role: $Enums.Role
    gender: $Enums.Gender
    createdAt: Date
    updatedAt: Date
    accountNumber: string
    bankCode: string
    birthDate: string
    phoneNumber: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    gender?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accountNumber?: boolean
    bankCode?: boolean
    birthDate?: boolean
    phoneNumber?: boolean
    rewards?: boolean | User$rewardsArgs<ExtArgs>
    responses?: boolean | User$responsesArgs<ExtArgs>
    surveys?: boolean | User$surveysArgs<ExtArgs>
    withdrawalRequests?: boolean | User$withdrawalRequestsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    gender?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accountNumber?: boolean
    bankCode?: boolean
    birthDate?: boolean
    phoneNumber?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    gender?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accountNumber?: boolean
    bankCode?: boolean
    birthDate?: boolean
    phoneNumber?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    gender?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accountNumber?: boolean
    bankCode?: boolean
    birthDate?: boolean
    phoneNumber?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "role" | "gender" | "createdAt" | "updatedAt" | "accountNumber" | "bankCode" | "birthDate" | "phoneNumber", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rewards?: boolean | User$rewardsArgs<ExtArgs>
    responses?: boolean | User$responsesArgs<ExtArgs>
    surveys?: boolean | User$surveysArgs<ExtArgs>
    withdrawalRequests?: boolean | User$withdrawalRequestsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      rewards: Prisma.$RewardPayload<ExtArgs>[]
      responses: Prisma.$SurveyResponsePayload<ExtArgs>[]
      surveys: Prisma.$SurveyPayload<ExtArgs>[]
      withdrawalRequests: Prisma.$WithdrawalRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string
      role: $Enums.Role
      gender: $Enums.Gender
      createdAt: Date
      updatedAt: Date
      accountNumber: string
      bankCode: string
      birthDate: string
      phoneNumber: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rewards<T extends User$rewardsArgs<ExtArgs> = {}>(args?: Subset<T, User$rewardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    responses<T extends User$responsesArgs<ExtArgs> = {}>(args?: Subset<T, User$responsesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    surveys<T extends User$surveysArgs<ExtArgs> = {}>(args?: Subset<T, User$surveysArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    withdrawalRequests<T extends User$withdrawalRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$withdrawalRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly gender: FieldRef<"User", 'Gender'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly accountNumber: FieldRef<"User", 'String'>
    readonly bankCode: FieldRef<"User", 'String'>
    readonly birthDate: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.rewards
   */
  export type User$rewardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    where?: RewardWhereInput
    orderBy?: RewardOrderByWithRelationInput | RewardOrderByWithRelationInput[]
    cursor?: RewardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RewardScalarFieldEnum | RewardScalarFieldEnum[]
  }

  /**
   * User.responses
   */
  export type User$responsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    where?: SurveyResponseWhereInput
    orderBy?: SurveyResponseOrderByWithRelationInput | SurveyResponseOrderByWithRelationInput[]
    cursor?: SurveyResponseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SurveyResponseScalarFieldEnum | SurveyResponseScalarFieldEnum[]
  }

  /**
   * User.surveys
   */
  export type User$surveysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Survey
     */
    omit?: SurveyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    where?: SurveyWhereInput
    orderBy?: SurveyOrderByWithRelationInput | SurveyOrderByWithRelationInput[]
    cursor?: SurveyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SurveyScalarFieldEnum | SurveyScalarFieldEnum[]
  }

  /**
   * User.withdrawalRequests
   */
  export type User$withdrawalRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WithdrawalRequest
     */
    select?: WithdrawalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WithdrawalRequest
     */
    omit?: WithdrawalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WithdrawalRequestInclude<ExtArgs> | null
    where?: WithdrawalRequestWhereInput
    orderBy?: WithdrawalRequestOrderByWithRelationInput | WithdrawalRequestOrderByWithRelationInput[]
    cursor?: WithdrawalRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WithdrawalRequestScalarFieldEnum | WithdrawalRequestScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model SurveyTemplate
   */

  export type AggregateSurveyTemplate = {
    _count: SurveyTemplateCountAggregateOutputType | null
    _min: SurveyTemplateMinAggregateOutputType | null
    _max: SurveyTemplateMaxAggregateOutputType | null
  }

  export type SurveyTemplateMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SurveyTemplateMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SurveyTemplateCountAggregateOutputType = {
    id: number
    name: number
    description: number
    isDefault: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SurveyTemplateMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SurveyTemplateMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SurveyTemplateCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SurveyTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SurveyTemplate to aggregate.
     */
    where?: SurveyTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyTemplates to fetch.
     */
    orderBy?: SurveyTemplateOrderByWithRelationInput | SurveyTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SurveyTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SurveyTemplates
    **/
    _count?: true | SurveyTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SurveyTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SurveyTemplateMaxAggregateInputType
  }

  export type GetSurveyTemplateAggregateType<T extends SurveyTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateSurveyTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSurveyTemplate[P]>
      : GetScalarType<T[P], AggregateSurveyTemplate[P]>
  }




  export type SurveyTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SurveyTemplateWhereInput
    orderBy?: SurveyTemplateOrderByWithAggregationInput | SurveyTemplateOrderByWithAggregationInput[]
    by: SurveyTemplateScalarFieldEnum[] | SurveyTemplateScalarFieldEnum
    having?: SurveyTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SurveyTemplateCountAggregateInputType | true
    _min?: SurveyTemplateMinAggregateInputType
    _max?: SurveyTemplateMaxAggregateInputType
  }

  export type SurveyTemplateGroupByOutputType = {
    id: string
    name: string
    description: string | null
    isDefault: boolean
    createdAt: Date
    updatedAt: Date
    _count: SurveyTemplateCountAggregateOutputType | null
    _min: SurveyTemplateMinAggregateOutputType | null
    _max: SurveyTemplateMaxAggregateOutputType | null
  }

  type GetSurveyTemplateGroupByPayload<T extends SurveyTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SurveyTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SurveyTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SurveyTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], SurveyTemplateGroupByOutputType[P]>
        }
      >
    >


  export type SurveyTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    steps?: boolean | SurveyTemplate$stepsArgs<ExtArgs>
    surveys?: boolean | SurveyTemplate$surveysArgs<ExtArgs>
    _count?: boolean | SurveyTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["surveyTemplate"]>

  export type SurveyTemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["surveyTemplate"]>

  export type SurveyTemplateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["surveyTemplate"]>

  export type SurveyTemplateSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SurveyTemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "isDefault" | "createdAt" | "updatedAt", ExtArgs["result"]["surveyTemplate"]>
  export type SurveyTemplateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    steps?: boolean | SurveyTemplate$stepsArgs<ExtArgs>
    surveys?: boolean | SurveyTemplate$surveysArgs<ExtArgs>
    _count?: boolean | SurveyTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SurveyTemplateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SurveyTemplateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SurveyTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SurveyTemplate"
    objects: {
      steps: Prisma.$SurveyStepPayload<ExtArgs>[]
      surveys: Prisma.$SurveyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      isDefault: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["surveyTemplate"]>
    composites: {}
  }

  type SurveyTemplateGetPayload<S extends boolean | null | undefined | SurveyTemplateDefaultArgs> = $Result.GetResult<Prisma.$SurveyTemplatePayload, S>

  type SurveyTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SurveyTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SurveyTemplateCountAggregateInputType | true
    }

  export interface SurveyTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SurveyTemplate'], meta: { name: 'SurveyTemplate' } }
    /**
     * Find zero or one SurveyTemplate that matches the filter.
     * @param {SurveyTemplateFindUniqueArgs} args - Arguments to find a SurveyTemplate
     * @example
     * // Get one SurveyTemplate
     * const surveyTemplate = await prisma.surveyTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SurveyTemplateFindUniqueArgs>(args: SelectSubset<T, SurveyTemplateFindUniqueArgs<ExtArgs>>): Prisma__SurveyTemplateClient<$Result.GetResult<Prisma.$SurveyTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SurveyTemplate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SurveyTemplateFindUniqueOrThrowArgs} args - Arguments to find a SurveyTemplate
     * @example
     * // Get one SurveyTemplate
     * const surveyTemplate = await prisma.surveyTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SurveyTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, SurveyTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SurveyTemplateClient<$Result.GetResult<Prisma.$SurveyTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SurveyTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyTemplateFindFirstArgs} args - Arguments to find a SurveyTemplate
     * @example
     * // Get one SurveyTemplate
     * const surveyTemplate = await prisma.surveyTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SurveyTemplateFindFirstArgs>(args?: SelectSubset<T, SurveyTemplateFindFirstArgs<ExtArgs>>): Prisma__SurveyTemplateClient<$Result.GetResult<Prisma.$SurveyTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SurveyTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyTemplateFindFirstOrThrowArgs} args - Arguments to find a SurveyTemplate
     * @example
     * // Get one SurveyTemplate
     * const surveyTemplate = await prisma.surveyTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SurveyTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, SurveyTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__SurveyTemplateClient<$Result.GetResult<Prisma.$SurveyTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SurveyTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SurveyTemplates
     * const surveyTemplates = await prisma.surveyTemplate.findMany()
     * 
     * // Get first 10 SurveyTemplates
     * const surveyTemplates = await prisma.surveyTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const surveyTemplateWithIdOnly = await prisma.surveyTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SurveyTemplateFindManyArgs>(args?: SelectSubset<T, SurveyTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SurveyTemplate.
     * @param {SurveyTemplateCreateArgs} args - Arguments to create a SurveyTemplate.
     * @example
     * // Create one SurveyTemplate
     * const SurveyTemplate = await prisma.surveyTemplate.create({
     *   data: {
     *     // ... data to create a SurveyTemplate
     *   }
     * })
     * 
     */
    create<T extends SurveyTemplateCreateArgs>(args: SelectSubset<T, SurveyTemplateCreateArgs<ExtArgs>>): Prisma__SurveyTemplateClient<$Result.GetResult<Prisma.$SurveyTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SurveyTemplates.
     * @param {SurveyTemplateCreateManyArgs} args - Arguments to create many SurveyTemplates.
     * @example
     * // Create many SurveyTemplates
     * const surveyTemplate = await prisma.surveyTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SurveyTemplateCreateManyArgs>(args?: SelectSubset<T, SurveyTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SurveyTemplates and returns the data saved in the database.
     * @param {SurveyTemplateCreateManyAndReturnArgs} args - Arguments to create many SurveyTemplates.
     * @example
     * // Create many SurveyTemplates
     * const surveyTemplate = await prisma.surveyTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SurveyTemplates and only return the `id`
     * const surveyTemplateWithIdOnly = await prisma.surveyTemplate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SurveyTemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, SurveyTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyTemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SurveyTemplate.
     * @param {SurveyTemplateDeleteArgs} args - Arguments to delete one SurveyTemplate.
     * @example
     * // Delete one SurveyTemplate
     * const SurveyTemplate = await prisma.surveyTemplate.delete({
     *   where: {
     *     // ... filter to delete one SurveyTemplate
     *   }
     * })
     * 
     */
    delete<T extends SurveyTemplateDeleteArgs>(args: SelectSubset<T, SurveyTemplateDeleteArgs<ExtArgs>>): Prisma__SurveyTemplateClient<$Result.GetResult<Prisma.$SurveyTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SurveyTemplate.
     * @param {SurveyTemplateUpdateArgs} args - Arguments to update one SurveyTemplate.
     * @example
     * // Update one SurveyTemplate
     * const surveyTemplate = await prisma.surveyTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SurveyTemplateUpdateArgs>(args: SelectSubset<T, SurveyTemplateUpdateArgs<ExtArgs>>): Prisma__SurveyTemplateClient<$Result.GetResult<Prisma.$SurveyTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SurveyTemplates.
     * @param {SurveyTemplateDeleteManyArgs} args - Arguments to filter SurveyTemplates to delete.
     * @example
     * // Delete a few SurveyTemplates
     * const { count } = await prisma.surveyTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SurveyTemplateDeleteManyArgs>(args?: SelectSubset<T, SurveyTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SurveyTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SurveyTemplates
     * const surveyTemplate = await prisma.surveyTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SurveyTemplateUpdateManyArgs>(args: SelectSubset<T, SurveyTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SurveyTemplates and returns the data updated in the database.
     * @param {SurveyTemplateUpdateManyAndReturnArgs} args - Arguments to update many SurveyTemplates.
     * @example
     * // Update many SurveyTemplates
     * const surveyTemplate = await prisma.surveyTemplate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SurveyTemplates and only return the `id`
     * const surveyTemplateWithIdOnly = await prisma.surveyTemplate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SurveyTemplateUpdateManyAndReturnArgs>(args: SelectSubset<T, SurveyTemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyTemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SurveyTemplate.
     * @param {SurveyTemplateUpsertArgs} args - Arguments to update or create a SurveyTemplate.
     * @example
     * // Update or create a SurveyTemplate
     * const surveyTemplate = await prisma.surveyTemplate.upsert({
     *   create: {
     *     // ... data to create a SurveyTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SurveyTemplate we want to update
     *   }
     * })
     */
    upsert<T extends SurveyTemplateUpsertArgs>(args: SelectSubset<T, SurveyTemplateUpsertArgs<ExtArgs>>): Prisma__SurveyTemplateClient<$Result.GetResult<Prisma.$SurveyTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SurveyTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyTemplateCountArgs} args - Arguments to filter SurveyTemplates to count.
     * @example
     * // Count the number of SurveyTemplates
     * const count = await prisma.surveyTemplate.count({
     *   where: {
     *     // ... the filter for the SurveyTemplates we want to count
     *   }
     * })
    **/
    count<T extends SurveyTemplateCountArgs>(
      args?: Subset<T, SurveyTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SurveyTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SurveyTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SurveyTemplateAggregateArgs>(args: Subset<T, SurveyTemplateAggregateArgs>): Prisma.PrismaPromise<GetSurveyTemplateAggregateType<T>>

    /**
     * Group by SurveyTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SurveyTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SurveyTemplateGroupByArgs['orderBy'] }
        : { orderBy?: SurveyTemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SurveyTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSurveyTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SurveyTemplate model
   */
  readonly fields: SurveyTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SurveyTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SurveyTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    steps<T extends SurveyTemplate$stepsArgs<ExtArgs> = {}>(args?: Subset<T, SurveyTemplate$stepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    surveys<T extends SurveyTemplate$surveysArgs<ExtArgs> = {}>(args?: Subset<T, SurveyTemplate$surveysArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SurveyTemplate model
   */
  interface SurveyTemplateFieldRefs {
    readonly id: FieldRef<"SurveyTemplate", 'String'>
    readonly name: FieldRef<"SurveyTemplate", 'String'>
    readonly description: FieldRef<"SurveyTemplate", 'String'>
    readonly isDefault: FieldRef<"SurveyTemplate", 'Boolean'>
    readonly createdAt: FieldRef<"SurveyTemplate", 'DateTime'>
    readonly updatedAt: FieldRef<"SurveyTemplate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SurveyTemplate findUnique
   */
  export type SurveyTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyTemplate
     */
    select?: SurveyTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyTemplate
     */
    omit?: SurveyTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyTemplateInclude<ExtArgs> | null
    /**
     * Filter, which SurveyTemplate to fetch.
     */
    where: SurveyTemplateWhereUniqueInput
  }

  /**
   * SurveyTemplate findUniqueOrThrow
   */
  export type SurveyTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyTemplate
     */
    select?: SurveyTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyTemplate
     */
    omit?: SurveyTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyTemplateInclude<ExtArgs> | null
    /**
     * Filter, which SurveyTemplate to fetch.
     */
    where: SurveyTemplateWhereUniqueInput
  }

  /**
   * SurveyTemplate findFirst
   */
  export type SurveyTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyTemplate
     */
    select?: SurveyTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyTemplate
     */
    omit?: SurveyTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyTemplateInclude<ExtArgs> | null
    /**
     * Filter, which SurveyTemplate to fetch.
     */
    where?: SurveyTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyTemplates to fetch.
     */
    orderBy?: SurveyTemplateOrderByWithRelationInput | SurveyTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SurveyTemplates.
     */
    cursor?: SurveyTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SurveyTemplates.
     */
    distinct?: SurveyTemplateScalarFieldEnum | SurveyTemplateScalarFieldEnum[]
  }

  /**
   * SurveyTemplate findFirstOrThrow
   */
  export type SurveyTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyTemplate
     */
    select?: SurveyTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyTemplate
     */
    omit?: SurveyTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyTemplateInclude<ExtArgs> | null
    /**
     * Filter, which SurveyTemplate to fetch.
     */
    where?: SurveyTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyTemplates to fetch.
     */
    orderBy?: SurveyTemplateOrderByWithRelationInput | SurveyTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SurveyTemplates.
     */
    cursor?: SurveyTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SurveyTemplates.
     */
    distinct?: SurveyTemplateScalarFieldEnum | SurveyTemplateScalarFieldEnum[]
  }

  /**
   * SurveyTemplate findMany
   */
  export type SurveyTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyTemplate
     */
    select?: SurveyTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyTemplate
     */
    omit?: SurveyTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyTemplateInclude<ExtArgs> | null
    /**
     * Filter, which SurveyTemplates to fetch.
     */
    where?: SurveyTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyTemplates to fetch.
     */
    orderBy?: SurveyTemplateOrderByWithRelationInput | SurveyTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SurveyTemplates.
     */
    cursor?: SurveyTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyTemplates.
     */
    skip?: number
    distinct?: SurveyTemplateScalarFieldEnum | SurveyTemplateScalarFieldEnum[]
  }

  /**
   * SurveyTemplate create
   */
  export type SurveyTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyTemplate
     */
    select?: SurveyTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyTemplate
     */
    omit?: SurveyTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyTemplateInclude<ExtArgs> | null
    /**
     * The data needed to create a SurveyTemplate.
     */
    data: XOR<SurveyTemplateCreateInput, SurveyTemplateUncheckedCreateInput>
  }

  /**
   * SurveyTemplate createMany
   */
  export type SurveyTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SurveyTemplates.
     */
    data: SurveyTemplateCreateManyInput | SurveyTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SurveyTemplate createManyAndReturn
   */
  export type SurveyTemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyTemplate
     */
    select?: SurveyTemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyTemplate
     */
    omit?: SurveyTemplateOmit<ExtArgs> | null
    /**
     * The data used to create many SurveyTemplates.
     */
    data: SurveyTemplateCreateManyInput | SurveyTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SurveyTemplate update
   */
  export type SurveyTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyTemplate
     */
    select?: SurveyTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyTemplate
     */
    omit?: SurveyTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyTemplateInclude<ExtArgs> | null
    /**
     * The data needed to update a SurveyTemplate.
     */
    data: XOR<SurveyTemplateUpdateInput, SurveyTemplateUncheckedUpdateInput>
    /**
     * Choose, which SurveyTemplate to update.
     */
    where: SurveyTemplateWhereUniqueInput
  }

  /**
   * SurveyTemplate updateMany
   */
  export type SurveyTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SurveyTemplates.
     */
    data: XOR<SurveyTemplateUpdateManyMutationInput, SurveyTemplateUncheckedUpdateManyInput>
    /**
     * Filter which SurveyTemplates to update
     */
    where?: SurveyTemplateWhereInput
    /**
     * Limit how many SurveyTemplates to update.
     */
    limit?: number
  }

  /**
   * SurveyTemplate updateManyAndReturn
   */
  export type SurveyTemplateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyTemplate
     */
    select?: SurveyTemplateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyTemplate
     */
    omit?: SurveyTemplateOmit<ExtArgs> | null
    /**
     * The data used to update SurveyTemplates.
     */
    data: XOR<SurveyTemplateUpdateManyMutationInput, SurveyTemplateUncheckedUpdateManyInput>
    /**
     * Filter which SurveyTemplates to update
     */
    where?: SurveyTemplateWhereInput
    /**
     * Limit how many SurveyTemplates to update.
     */
    limit?: number
  }

  /**
   * SurveyTemplate upsert
   */
  export type SurveyTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyTemplate
     */
    select?: SurveyTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyTemplate
     */
    omit?: SurveyTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyTemplateInclude<ExtArgs> | null
    /**
     * The filter to search for the SurveyTemplate to update in case it exists.
     */
    where: SurveyTemplateWhereUniqueInput
    /**
     * In case the SurveyTemplate found by the `where` argument doesn't exist, create a new SurveyTemplate with this data.
     */
    create: XOR<SurveyTemplateCreateInput, SurveyTemplateUncheckedCreateInput>
    /**
     * In case the SurveyTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SurveyTemplateUpdateInput, SurveyTemplateUncheckedUpdateInput>
  }

  /**
   * SurveyTemplate delete
   */
  export type SurveyTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyTemplate
     */
    select?: SurveyTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyTemplate
     */
    omit?: SurveyTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyTemplateInclude<ExtArgs> | null
    /**
     * Filter which SurveyTemplate to delete.
     */
    where: SurveyTemplateWhereUniqueInput
  }

  /**
   * SurveyTemplate deleteMany
   */
  export type SurveyTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SurveyTemplates to delete
     */
    where?: SurveyTemplateWhereInput
    /**
     * Limit how many SurveyTemplates to delete.
     */
    limit?: number
  }

  /**
   * SurveyTemplate.steps
   */
  export type SurveyTemplate$stepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyStep
     */
    select?: SurveyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyStep
     */
    omit?: SurveyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyStepInclude<ExtArgs> | null
    where?: SurveyStepWhereInput
    orderBy?: SurveyStepOrderByWithRelationInput | SurveyStepOrderByWithRelationInput[]
    cursor?: SurveyStepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SurveyStepScalarFieldEnum | SurveyStepScalarFieldEnum[]
  }

  /**
   * SurveyTemplate.surveys
   */
  export type SurveyTemplate$surveysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Survey
     */
    omit?: SurveyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    where?: SurveyWhereInput
    orderBy?: SurveyOrderByWithRelationInput | SurveyOrderByWithRelationInput[]
    cursor?: SurveyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SurveyScalarFieldEnum | SurveyScalarFieldEnum[]
  }

  /**
   * SurveyTemplate without action
   */
  export type SurveyTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyTemplate
     */
    select?: SurveyTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyTemplate
     */
    omit?: SurveyTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyTemplateInclude<ExtArgs> | null
  }


  /**
   * Model SurveyStep
   */

  export type AggregateSurveyStep = {
    _count: SurveyStepCountAggregateOutputType | null
    _avg: SurveyStepAvgAggregateOutputType | null
    _sum: SurveyStepSumAggregateOutputType | null
    _min: SurveyStepMinAggregateOutputType | null
    _max: SurveyStepMaxAggregateOutputType | null
  }

  export type SurveyStepAvgAggregateOutputType = {
    stepNumber: number | null
  }

  export type SurveyStepSumAggregateOutputType = {
    stepNumber: number | null
  }

  export type SurveyStepMinAggregateOutputType = {
    id: string | null
    templateId: string | null
    stepNumber: number | null
    title: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SurveyStepMaxAggregateOutputType = {
    id: string | null
    templateId: string | null
    stepNumber: number | null
    title: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SurveyStepCountAggregateOutputType = {
    id: number
    templateId: number
    stepNumber: number
    title: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SurveyStepAvgAggregateInputType = {
    stepNumber?: true
  }

  export type SurveyStepSumAggregateInputType = {
    stepNumber?: true
  }

  export type SurveyStepMinAggregateInputType = {
    id?: true
    templateId?: true
    stepNumber?: true
    title?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SurveyStepMaxAggregateInputType = {
    id?: true
    templateId?: true
    stepNumber?: true
    title?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SurveyStepCountAggregateInputType = {
    id?: true
    templateId?: true
    stepNumber?: true
    title?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SurveyStepAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SurveyStep to aggregate.
     */
    where?: SurveyStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveySteps to fetch.
     */
    orderBy?: SurveyStepOrderByWithRelationInput | SurveyStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SurveyStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveySteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveySteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SurveySteps
    **/
    _count?: true | SurveyStepCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SurveyStepAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SurveyStepSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SurveyStepMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SurveyStepMaxAggregateInputType
  }

  export type GetSurveyStepAggregateType<T extends SurveyStepAggregateArgs> = {
        [P in keyof T & keyof AggregateSurveyStep]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSurveyStep[P]>
      : GetScalarType<T[P], AggregateSurveyStep[P]>
  }




  export type SurveyStepGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SurveyStepWhereInput
    orderBy?: SurveyStepOrderByWithAggregationInput | SurveyStepOrderByWithAggregationInput[]
    by: SurveyStepScalarFieldEnum[] | SurveyStepScalarFieldEnum
    having?: SurveyStepScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SurveyStepCountAggregateInputType | true
    _avg?: SurveyStepAvgAggregateInputType
    _sum?: SurveyStepSumAggregateInputType
    _min?: SurveyStepMinAggregateInputType
    _max?: SurveyStepMaxAggregateInputType
  }

  export type SurveyStepGroupByOutputType = {
    id: string
    templateId: string
    stepNumber: number
    title: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: SurveyStepCountAggregateOutputType | null
    _avg: SurveyStepAvgAggregateOutputType | null
    _sum: SurveyStepSumAggregateOutputType | null
    _min: SurveyStepMinAggregateOutputType | null
    _max: SurveyStepMaxAggregateOutputType | null
  }

  type GetSurveyStepGroupByPayload<T extends SurveyStepGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SurveyStepGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SurveyStepGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SurveyStepGroupByOutputType[P]>
            : GetScalarType<T[P], SurveyStepGroupByOutputType[P]>
        }
      >
    >


  export type SurveyStepSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    templateId?: boolean
    stepNumber?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    questions?: boolean | SurveyStep$questionsArgs<ExtArgs>
    template?: boolean | SurveyTemplateDefaultArgs<ExtArgs>
    _count?: boolean | SurveyStepCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["surveyStep"]>

  export type SurveyStepSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    templateId?: boolean
    stepNumber?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    template?: boolean | SurveyTemplateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["surveyStep"]>

  export type SurveyStepSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    templateId?: boolean
    stepNumber?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    template?: boolean | SurveyTemplateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["surveyStep"]>

  export type SurveyStepSelectScalar = {
    id?: boolean
    templateId?: boolean
    stepNumber?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SurveyStepOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "templateId" | "stepNumber" | "title" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["surveyStep"]>
  export type SurveyStepInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | SurveyStep$questionsArgs<ExtArgs>
    template?: boolean | SurveyTemplateDefaultArgs<ExtArgs>
    _count?: boolean | SurveyStepCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SurveyStepIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | SurveyTemplateDefaultArgs<ExtArgs>
  }
  export type SurveyStepIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | SurveyTemplateDefaultArgs<ExtArgs>
  }

  export type $SurveyStepPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SurveyStep"
    objects: {
      questions: Prisma.$SurveyQuestionPayload<ExtArgs>[]
      template: Prisma.$SurveyTemplatePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      templateId: string
      stepNumber: number
      title: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["surveyStep"]>
    composites: {}
  }

  type SurveyStepGetPayload<S extends boolean | null | undefined | SurveyStepDefaultArgs> = $Result.GetResult<Prisma.$SurveyStepPayload, S>

  type SurveyStepCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SurveyStepFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SurveyStepCountAggregateInputType | true
    }

  export interface SurveyStepDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SurveyStep'], meta: { name: 'SurveyStep' } }
    /**
     * Find zero or one SurveyStep that matches the filter.
     * @param {SurveyStepFindUniqueArgs} args - Arguments to find a SurveyStep
     * @example
     * // Get one SurveyStep
     * const surveyStep = await prisma.surveyStep.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SurveyStepFindUniqueArgs>(args: SelectSubset<T, SurveyStepFindUniqueArgs<ExtArgs>>): Prisma__SurveyStepClient<$Result.GetResult<Prisma.$SurveyStepPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SurveyStep that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SurveyStepFindUniqueOrThrowArgs} args - Arguments to find a SurveyStep
     * @example
     * // Get one SurveyStep
     * const surveyStep = await prisma.surveyStep.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SurveyStepFindUniqueOrThrowArgs>(args: SelectSubset<T, SurveyStepFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SurveyStepClient<$Result.GetResult<Prisma.$SurveyStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SurveyStep that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyStepFindFirstArgs} args - Arguments to find a SurveyStep
     * @example
     * // Get one SurveyStep
     * const surveyStep = await prisma.surveyStep.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SurveyStepFindFirstArgs>(args?: SelectSubset<T, SurveyStepFindFirstArgs<ExtArgs>>): Prisma__SurveyStepClient<$Result.GetResult<Prisma.$SurveyStepPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SurveyStep that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyStepFindFirstOrThrowArgs} args - Arguments to find a SurveyStep
     * @example
     * // Get one SurveyStep
     * const surveyStep = await prisma.surveyStep.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SurveyStepFindFirstOrThrowArgs>(args?: SelectSubset<T, SurveyStepFindFirstOrThrowArgs<ExtArgs>>): Prisma__SurveyStepClient<$Result.GetResult<Prisma.$SurveyStepPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SurveySteps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyStepFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SurveySteps
     * const surveySteps = await prisma.surveyStep.findMany()
     * 
     * // Get first 10 SurveySteps
     * const surveySteps = await prisma.surveyStep.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const surveyStepWithIdOnly = await prisma.surveyStep.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SurveyStepFindManyArgs>(args?: SelectSubset<T, SurveyStepFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SurveyStep.
     * @param {SurveyStepCreateArgs} args - Arguments to create a SurveyStep.
     * @example
     * // Create one SurveyStep
     * const SurveyStep = await prisma.surveyStep.create({
     *   data: {
     *     // ... data to create a SurveyStep
     *   }
     * })
     * 
     */
    create<T extends SurveyStepCreateArgs>(args: SelectSubset<T, SurveyStepCreateArgs<ExtArgs>>): Prisma__SurveyStepClient<$Result.GetResult<Prisma.$SurveyStepPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SurveySteps.
     * @param {SurveyStepCreateManyArgs} args - Arguments to create many SurveySteps.
     * @example
     * // Create many SurveySteps
     * const surveyStep = await prisma.surveyStep.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SurveyStepCreateManyArgs>(args?: SelectSubset<T, SurveyStepCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SurveySteps and returns the data saved in the database.
     * @param {SurveyStepCreateManyAndReturnArgs} args - Arguments to create many SurveySteps.
     * @example
     * // Create many SurveySteps
     * const surveyStep = await prisma.surveyStep.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SurveySteps and only return the `id`
     * const surveyStepWithIdOnly = await prisma.surveyStep.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SurveyStepCreateManyAndReturnArgs>(args?: SelectSubset<T, SurveyStepCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyStepPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SurveyStep.
     * @param {SurveyStepDeleteArgs} args - Arguments to delete one SurveyStep.
     * @example
     * // Delete one SurveyStep
     * const SurveyStep = await prisma.surveyStep.delete({
     *   where: {
     *     // ... filter to delete one SurveyStep
     *   }
     * })
     * 
     */
    delete<T extends SurveyStepDeleteArgs>(args: SelectSubset<T, SurveyStepDeleteArgs<ExtArgs>>): Prisma__SurveyStepClient<$Result.GetResult<Prisma.$SurveyStepPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SurveyStep.
     * @param {SurveyStepUpdateArgs} args - Arguments to update one SurveyStep.
     * @example
     * // Update one SurveyStep
     * const surveyStep = await prisma.surveyStep.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SurveyStepUpdateArgs>(args: SelectSubset<T, SurveyStepUpdateArgs<ExtArgs>>): Prisma__SurveyStepClient<$Result.GetResult<Prisma.$SurveyStepPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SurveySteps.
     * @param {SurveyStepDeleteManyArgs} args - Arguments to filter SurveySteps to delete.
     * @example
     * // Delete a few SurveySteps
     * const { count } = await prisma.surveyStep.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SurveyStepDeleteManyArgs>(args?: SelectSubset<T, SurveyStepDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SurveySteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyStepUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SurveySteps
     * const surveyStep = await prisma.surveyStep.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SurveyStepUpdateManyArgs>(args: SelectSubset<T, SurveyStepUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SurveySteps and returns the data updated in the database.
     * @param {SurveyStepUpdateManyAndReturnArgs} args - Arguments to update many SurveySteps.
     * @example
     * // Update many SurveySteps
     * const surveyStep = await prisma.surveyStep.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SurveySteps and only return the `id`
     * const surveyStepWithIdOnly = await prisma.surveyStep.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SurveyStepUpdateManyAndReturnArgs>(args: SelectSubset<T, SurveyStepUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyStepPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SurveyStep.
     * @param {SurveyStepUpsertArgs} args - Arguments to update or create a SurveyStep.
     * @example
     * // Update or create a SurveyStep
     * const surveyStep = await prisma.surveyStep.upsert({
     *   create: {
     *     // ... data to create a SurveyStep
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SurveyStep we want to update
     *   }
     * })
     */
    upsert<T extends SurveyStepUpsertArgs>(args: SelectSubset<T, SurveyStepUpsertArgs<ExtArgs>>): Prisma__SurveyStepClient<$Result.GetResult<Prisma.$SurveyStepPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SurveySteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyStepCountArgs} args - Arguments to filter SurveySteps to count.
     * @example
     * // Count the number of SurveySteps
     * const count = await prisma.surveyStep.count({
     *   where: {
     *     // ... the filter for the SurveySteps we want to count
     *   }
     * })
    **/
    count<T extends SurveyStepCountArgs>(
      args?: Subset<T, SurveyStepCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SurveyStepCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SurveyStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyStepAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SurveyStepAggregateArgs>(args: Subset<T, SurveyStepAggregateArgs>): Prisma.PrismaPromise<GetSurveyStepAggregateType<T>>

    /**
     * Group by SurveyStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyStepGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SurveyStepGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SurveyStepGroupByArgs['orderBy'] }
        : { orderBy?: SurveyStepGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SurveyStepGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSurveyStepGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SurveyStep model
   */
  readonly fields: SurveyStepFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SurveyStep.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SurveyStepClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    questions<T extends SurveyStep$questionsArgs<ExtArgs> = {}>(args?: Subset<T, SurveyStep$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    template<T extends SurveyTemplateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SurveyTemplateDefaultArgs<ExtArgs>>): Prisma__SurveyTemplateClient<$Result.GetResult<Prisma.$SurveyTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SurveyStep model
   */
  interface SurveyStepFieldRefs {
    readonly id: FieldRef<"SurveyStep", 'String'>
    readonly templateId: FieldRef<"SurveyStep", 'String'>
    readonly stepNumber: FieldRef<"SurveyStep", 'Int'>
    readonly title: FieldRef<"SurveyStep", 'String'>
    readonly description: FieldRef<"SurveyStep", 'String'>
    readonly createdAt: FieldRef<"SurveyStep", 'DateTime'>
    readonly updatedAt: FieldRef<"SurveyStep", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SurveyStep findUnique
   */
  export type SurveyStepFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyStep
     */
    select?: SurveyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyStep
     */
    omit?: SurveyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyStepInclude<ExtArgs> | null
    /**
     * Filter, which SurveyStep to fetch.
     */
    where: SurveyStepWhereUniqueInput
  }

  /**
   * SurveyStep findUniqueOrThrow
   */
  export type SurveyStepFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyStep
     */
    select?: SurveyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyStep
     */
    omit?: SurveyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyStepInclude<ExtArgs> | null
    /**
     * Filter, which SurveyStep to fetch.
     */
    where: SurveyStepWhereUniqueInput
  }

  /**
   * SurveyStep findFirst
   */
  export type SurveyStepFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyStep
     */
    select?: SurveyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyStep
     */
    omit?: SurveyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyStepInclude<ExtArgs> | null
    /**
     * Filter, which SurveyStep to fetch.
     */
    where?: SurveyStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveySteps to fetch.
     */
    orderBy?: SurveyStepOrderByWithRelationInput | SurveyStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SurveySteps.
     */
    cursor?: SurveyStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveySteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveySteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SurveySteps.
     */
    distinct?: SurveyStepScalarFieldEnum | SurveyStepScalarFieldEnum[]
  }

  /**
   * SurveyStep findFirstOrThrow
   */
  export type SurveyStepFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyStep
     */
    select?: SurveyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyStep
     */
    omit?: SurveyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyStepInclude<ExtArgs> | null
    /**
     * Filter, which SurveyStep to fetch.
     */
    where?: SurveyStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveySteps to fetch.
     */
    orderBy?: SurveyStepOrderByWithRelationInput | SurveyStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SurveySteps.
     */
    cursor?: SurveyStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveySteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveySteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SurveySteps.
     */
    distinct?: SurveyStepScalarFieldEnum | SurveyStepScalarFieldEnum[]
  }

  /**
   * SurveyStep findMany
   */
  export type SurveyStepFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyStep
     */
    select?: SurveyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyStep
     */
    omit?: SurveyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyStepInclude<ExtArgs> | null
    /**
     * Filter, which SurveySteps to fetch.
     */
    where?: SurveyStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveySteps to fetch.
     */
    orderBy?: SurveyStepOrderByWithRelationInput | SurveyStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SurveySteps.
     */
    cursor?: SurveyStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveySteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveySteps.
     */
    skip?: number
    distinct?: SurveyStepScalarFieldEnum | SurveyStepScalarFieldEnum[]
  }

  /**
   * SurveyStep create
   */
  export type SurveyStepCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyStep
     */
    select?: SurveyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyStep
     */
    omit?: SurveyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyStepInclude<ExtArgs> | null
    /**
     * The data needed to create a SurveyStep.
     */
    data: XOR<SurveyStepCreateInput, SurveyStepUncheckedCreateInput>
  }

  /**
   * SurveyStep createMany
   */
  export type SurveyStepCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SurveySteps.
     */
    data: SurveyStepCreateManyInput | SurveyStepCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SurveyStep createManyAndReturn
   */
  export type SurveyStepCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyStep
     */
    select?: SurveyStepSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyStep
     */
    omit?: SurveyStepOmit<ExtArgs> | null
    /**
     * The data used to create many SurveySteps.
     */
    data: SurveyStepCreateManyInput | SurveyStepCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyStepIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SurveyStep update
   */
  export type SurveyStepUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyStep
     */
    select?: SurveyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyStep
     */
    omit?: SurveyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyStepInclude<ExtArgs> | null
    /**
     * The data needed to update a SurveyStep.
     */
    data: XOR<SurveyStepUpdateInput, SurveyStepUncheckedUpdateInput>
    /**
     * Choose, which SurveyStep to update.
     */
    where: SurveyStepWhereUniqueInput
  }

  /**
   * SurveyStep updateMany
   */
  export type SurveyStepUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SurveySteps.
     */
    data: XOR<SurveyStepUpdateManyMutationInput, SurveyStepUncheckedUpdateManyInput>
    /**
     * Filter which SurveySteps to update
     */
    where?: SurveyStepWhereInput
    /**
     * Limit how many SurveySteps to update.
     */
    limit?: number
  }

  /**
   * SurveyStep updateManyAndReturn
   */
  export type SurveyStepUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyStep
     */
    select?: SurveyStepSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyStep
     */
    omit?: SurveyStepOmit<ExtArgs> | null
    /**
     * The data used to update SurveySteps.
     */
    data: XOR<SurveyStepUpdateManyMutationInput, SurveyStepUncheckedUpdateManyInput>
    /**
     * Filter which SurveySteps to update
     */
    where?: SurveyStepWhereInput
    /**
     * Limit how many SurveySteps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyStepIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SurveyStep upsert
   */
  export type SurveyStepUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyStep
     */
    select?: SurveyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyStep
     */
    omit?: SurveyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyStepInclude<ExtArgs> | null
    /**
     * The filter to search for the SurveyStep to update in case it exists.
     */
    where: SurveyStepWhereUniqueInput
    /**
     * In case the SurveyStep found by the `where` argument doesn't exist, create a new SurveyStep with this data.
     */
    create: XOR<SurveyStepCreateInput, SurveyStepUncheckedCreateInput>
    /**
     * In case the SurveyStep was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SurveyStepUpdateInput, SurveyStepUncheckedUpdateInput>
  }

  /**
   * SurveyStep delete
   */
  export type SurveyStepDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyStep
     */
    select?: SurveyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyStep
     */
    omit?: SurveyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyStepInclude<ExtArgs> | null
    /**
     * Filter which SurveyStep to delete.
     */
    where: SurveyStepWhereUniqueInput
  }

  /**
   * SurveyStep deleteMany
   */
  export type SurveyStepDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SurveySteps to delete
     */
    where?: SurveyStepWhereInput
    /**
     * Limit how many SurveySteps to delete.
     */
    limit?: number
  }

  /**
   * SurveyStep.questions
   */
  export type SurveyStep$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyQuestion
     */
    select?: SurveyQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyQuestion
     */
    omit?: SurveyQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyQuestionInclude<ExtArgs> | null
    where?: SurveyQuestionWhereInput
    orderBy?: SurveyQuestionOrderByWithRelationInput | SurveyQuestionOrderByWithRelationInput[]
    cursor?: SurveyQuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SurveyQuestionScalarFieldEnum | SurveyQuestionScalarFieldEnum[]
  }

  /**
   * SurveyStep without action
   */
  export type SurveyStepDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyStep
     */
    select?: SurveyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyStep
     */
    omit?: SurveyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyStepInclude<ExtArgs> | null
  }


  /**
   * Model SurveyQuestion
   */

  export type AggregateSurveyQuestion = {
    _count: SurveyQuestionCountAggregateOutputType | null
    _avg: SurveyQuestionAvgAggregateOutputType | null
    _sum: SurveyQuestionSumAggregateOutputType | null
    _min: SurveyQuestionMinAggregateOutputType | null
    _max: SurveyQuestionMaxAggregateOutputType | null
  }

  export type SurveyQuestionAvgAggregateOutputType = {
    questionNumber: number | null
    minLength: number | null
    maxLength: number | null
  }

  export type SurveyQuestionSumAggregateOutputType = {
    questionNumber: number | null
    minLength: number | null
    maxLength: number | null
  }

  export type SurveyQuestionMinAggregateOutputType = {
    id: string | null
    stepId: string | null
    questionNumber: number | null
    text: string | null
    type: $Enums.QuestionType | null
    required: boolean | null
    minLength: number | null
    maxLength: number | null
    placeholder: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SurveyQuestionMaxAggregateOutputType = {
    id: string | null
    stepId: string | null
    questionNumber: number | null
    text: string | null
    type: $Enums.QuestionType | null
    required: boolean | null
    minLength: number | null
    maxLength: number | null
    placeholder: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SurveyQuestionCountAggregateOutputType = {
    id: number
    stepId: number
    questionNumber: number
    text: number
    type: number
    required: number
    minLength: number
    maxLength: number
    placeholder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SurveyQuestionAvgAggregateInputType = {
    questionNumber?: true
    minLength?: true
    maxLength?: true
  }

  export type SurveyQuestionSumAggregateInputType = {
    questionNumber?: true
    minLength?: true
    maxLength?: true
  }

  export type SurveyQuestionMinAggregateInputType = {
    id?: true
    stepId?: true
    questionNumber?: true
    text?: true
    type?: true
    required?: true
    minLength?: true
    maxLength?: true
    placeholder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SurveyQuestionMaxAggregateInputType = {
    id?: true
    stepId?: true
    questionNumber?: true
    text?: true
    type?: true
    required?: true
    minLength?: true
    maxLength?: true
    placeholder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SurveyQuestionCountAggregateInputType = {
    id?: true
    stepId?: true
    questionNumber?: true
    text?: true
    type?: true
    required?: true
    minLength?: true
    maxLength?: true
    placeholder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SurveyQuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SurveyQuestion to aggregate.
     */
    where?: SurveyQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyQuestions to fetch.
     */
    orderBy?: SurveyQuestionOrderByWithRelationInput | SurveyQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SurveyQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SurveyQuestions
    **/
    _count?: true | SurveyQuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SurveyQuestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SurveyQuestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SurveyQuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SurveyQuestionMaxAggregateInputType
  }

  export type GetSurveyQuestionAggregateType<T extends SurveyQuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateSurveyQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSurveyQuestion[P]>
      : GetScalarType<T[P], AggregateSurveyQuestion[P]>
  }




  export type SurveyQuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SurveyQuestionWhereInput
    orderBy?: SurveyQuestionOrderByWithAggregationInput | SurveyQuestionOrderByWithAggregationInput[]
    by: SurveyQuestionScalarFieldEnum[] | SurveyQuestionScalarFieldEnum
    having?: SurveyQuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SurveyQuestionCountAggregateInputType | true
    _avg?: SurveyQuestionAvgAggregateInputType
    _sum?: SurveyQuestionSumAggregateInputType
    _min?: SurveyQuestionMinAggregateInputType
    _max?: SurveyQuestionMaxAggregateInputType
  }

  export type SurveyQuestionGroupByOutputType = {
    id: string
    stepId: string
    questionNumber: number
    text: string
    type: $Enums.QuestionType
    required: boolean
    minLength: number | null
    maxLength: number | null
    placeholder: string | null
    createdAt: Date
    updatedAt: Date
    _count: SurveyQuestionCountAggregateOutputType | null
    _avg: SurveyQuestionAvgAggregateOutputType | null
    _sum: SurveyQuestionSumAggregateOutputType | null
    _min: SurveyQuestionMinAggregateOutputType | null
    _max: SurveyQuestionMaxAggregateOutputType | null
  }

  type GetSurveyQuestionGroupByPayload<T extends SurveyQuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SurveyQuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SurveyQuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SurveyQuestionGroupByOutputType[P]>
            : GetScalarType<T[P], SurveyQuestionGroupByOutputType[P]>
        }
      >
    >


  export type SurveyQuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stepId?: boolean
    questionNumber?: boolean
    text?: boolean
    type?: boolean
    required?: boolean
    minLength?: boolean
    maxLength?: boolean
    placeholder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    options?: boolean | SurveyQuestion$optionsArgs<ExtArgs>
    step?: boolean | SurveyStepDefaultArgs<ExtArgs>
    _count?: boolean | SurveyQuestionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["surveyQuestion"]>

  export type SurveyQuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stepId?: boolean
    questionNumber?: boolean
    text?: boolean
    type?: boolean
    required?: boolean
    minLength?: boolean
    maxLength?: boolean
    placeholder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    step?: boolean | SurveyStepDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["surveyQuestion"]>

  export type SurveyQuestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stepId?: boolean
    questionNumber?: boolean
    text?: boolean
    type?: boolean
    required?: boolean
    minLength?: boolean
    maxLength?: boolean
    placeholder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    step?: boolean | SurveyStepDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["surveyQuestion"]>

  export type SurveyQuestionSelectScalar = {
    id?: boolean
    stepId?: boolean
    questionNumber?: boolean
    text?: boolean
    type?: boolean
    required?: boolean
    minLength?: boolean
    maxLength?: boolean
    placeholder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SurveyQuestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "stepId" | "questionNumber" | "text" | "type" | "required" | "minLength" | "maxLength" | "placeholder" | "createdAt" | "updatedAt", ExtArgs["result"]["surveyQuestion"]>
  export type SurveyQuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    options?: boolean | SurveyQuestion$optionsArgs<ExtArgs>
    step?: boolean | SurveyStepDefaultArgs<ExtArgs>
    _count?: boolean | SurveyQuestionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SurveyQuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    step?: boolean | SurveyStepDefaultArgs<ExtArgs>
  }
  export type SurveyQuestionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    step?: boolean | SurveyStepDefaultArgs<ExtArgs>
  }

  export type $SurveyQuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SurveyQuestion"
    objects: {
      options: Prisma.$QuestionOptionPayload<ExtArgs>[]
      step: Prisma.$SurveyStepPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      stepId: string
      questionNumber: number
      text: string
      type: $Enums.QuestionType
      required: boolean
      minLength: number | null
      maxLength: number | null
      placeholder: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["surveyQuestion"]>
    composites: {}
  }

  type SurveyQuestionGetPayload<S extends boolean | null | undefined | SurveyQuestionDefaultArgs> = $Result.GetResult<Prisma.$SurveyQuestionPayload, S>

  type SurveyQuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SurveyQuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SurveyQuestionCountAggregateInputType | true
    }

  export interface SurveyQuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SurveyQuestion'], meta: { name: 'SurveyQuestion' } }
    /**
     * Find zero or one SurveyQuestion that matches the filter.
     * @param {SurveyQuestionFindUniqueArgs} args - Arguments to find a SurveyQuestion
     * @example
     * // Get one SurveyQuestion
     * const surveyQuestion = await prisma.surveyQuestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SurveyQuestionFindUniqueArgs>(args: SelectSubset<T, SurveyQuestionFindUniqueArgs<ExtArgs>>): Prisma__SurveyQuestionClient<$Result.GetResult<Prisma.$SurveyQuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SurveyQuestion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SurveyQuestionFindUniqueOrThrowArgs} args - Arguments to find a SurveyQuestion
     * @example
     * // Get one SurveyQuestion
     * const surveyQuestion = await prisma.surveyQuestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SurveyQuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, SurveyQuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SurveyQuestionClient<$Result.GetResult<Prisma.$SurveyQuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SurveyQuestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyQuestionFindFirstArgs} args - Arguments to find a SurveyQuestion
     * @example
     * // Get one SurveyQuestion
     * const surveyQuestion = await prisma.surveyQuestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SurveyQuestionFindFirstArgs>(args?: SelectSubset<T, SurveyQuestionFindFirstArgs<ExtArgs>>): Prisma__SurveyQuestionClient<$Result.GetResult<Prisma.$SurveyQuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SurveyQuestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyQuestionFindFirstOrThrowArgs} args - Arguments to find a SurveyQuestion
     * @example
     * // Get one SurveyQuestion
     * const surveyQuestion = await prisma.surveyQuestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SurveyQuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, SurveyQuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SurveyQuestionClient<$Result.GetResult<Prisma.$SurveyQuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SurveyQuestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyQuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SurveyQuestions
     * const surveyQuestions = await prisma.surveyQuestion.findMany()
     * 
     * // Get first 10 SurveyQuestions
     * const surveyQuestions = await prisma.surveyQuestion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const surveyQuestionWithIdOnly = await prisma.surveyQuestion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SurveyQuestionFindManyArgs>(args?: SelectSubset<T, SurveyQuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SurveyQuestion.
     * @param {SurveyQuestionCreateArgs} args - Arguments to create a SurveyQuestion.
     * @example
     * // Create one SurveyQuestion
     * const SurveyQuestion = await prisma.surveyQuestion.create({
     *   data: {
     *     // ... data to create a SurveyQuestion
     *   }
     * })
     * 
     */
    create<T extends SurveyQuestionCreateArgs>(args: SelectSubset<T, SurveyQuestionCreateArgs<ExtArgs>>): Prisma__SurveyQuestionClient<$Result.GetResult<Prisma.$SurveyQuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SurveyQuestions.
     * @param {SurveyQuestionCreateManyArgs} args - Arguments to create many SurveyQuestions.
     * @example
     * // Create many SurveyQuestions
     * const surveyQuestion = await prisma.surveyQuestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SurveyQuestionCreateManyArgs>(args?: SelectSubset<T, SurveyQuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SurveyQuestions and returns the data saved in the database.
     * @param {SurveyQuestionCreateManyAndReturnArgs} args - Arguments to create many SurveyQuestions.
     * @example
     * // Create many SurveyQuestions
     * const surveyQuestion = await prisma.surveyQuestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SurveyQuestions and only return the `id`
     * const surveyQuestionWithIdOnly = await prisma.surveyQuestion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SurveyQuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, SurveyQuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyQuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SurveyQuestion.
     * @param {SurveyQuestionDeleteArgs} args - Arguments to delete one SurveyQuestion.
     * @example
     * // Delete one SurveyQuestion
     * const SurveyQuestion = await prisma.surveyQuestion.delete({
     *   where: {
     *     // ... filter to delete one SurveyQuestion
     *   }
     * })
     * 
     */
    delete<T extends SurveyQuestionDeleteArgs>(args: SelectSubset<T, SurveyQuestionDeleteArgs<ExtArgs>>): Prisma__SurveyQuestionClient<$Result.GetResult<Prisma.$SurveyQuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SurveyQuestion.
     * @param {SurveyQuestionUpdateArgs} args - Arguments to update one SurveyQuestion.
     * @example
     * // Update one SurveyQuestion
     * const surveyQuestion = await prisma.surveyQuestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SurveyQuestionUpdateArgs>(args: SelectSubset<T, SurveyQuestionUpdateArgs<ExtArgs>>): Prisma__SurveyQuestionClient<$Result.GetResult<Prisma.$SurveyQuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SurveyQuestions.
     * @param {SurveyQuestionDeleteManyArgs} args - Arguments to filter SurveyQuestions to delete.
     * @example
     * // Delete a few SurveyQuestions
     * const { count } = await prisma.surveyQuestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SurveyQuestionDeleteManyArgs>(args?: SelectSubset<T, SurveyQuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SurveyQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyQuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SurveyQuestions
     * const surveyQuestion = await prisma.surveyQuestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SurveyQuestionUpdateManyArgs>(args: SelectSubset<T, SurveyQuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SurveyQuestions and returns the data updated in the database.
     * @param {SurveyQuestionUpdateManyAndReturnArgs} args - Arguments to update many SurveyQuestions.
     * @example
     * // Update many SurveyQuestions
     * const surveyQuestion = await prisma.surveyQuestion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SurveyQuestions and only return the `id`
     * const surveyQuestionWithIdOnly = await prisma.surveyQuestion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SurveyQuestionUpdateManyAndReturnArgs>(args: SelectSubset<T, SurveyQuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyQuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SurveyQuestion.
     * @param {SurveyQuestionUpsertArgs} args - Arguments to update or create a SurveyQuestion.
     * @example
     * // Update or create a SurveyQuestion
     * const surveyQuestion = await prisma.surveyQuestion.upsert({
     *   create: {
     *     // ... data to create a SurveyQuestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SurveyQuestion we want to update
     *   }
     * })
     */
    upsert<T extends SurveyQuestionUpsertArgs>(args: SelectSubset<T, SurveyQuestionUpsertArgs<ExtArgs>>): Prisma__SurveyQuestionClient<$Result.GetResult<Prisma.$SurveyQuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SurveyQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyQuestionCountArgs} args - Arguments to filter SurveyQuestions to count.
     * @example
     * // Count the number of SurveyQuestions
     * const count = await prisma.surveyQuestion.count({
     *   where: {
     *     // ... the filter for the SurveyQuestions we want to count
     *   }
     * })
    **/
    count<T extends SurveyQuestionCountArgs>(
      args?: Subset<T, SurveyQuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SurveyQuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SurveyQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyQuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SurveyQuestionAggregateArgs>(args: Subset<T, SurveyQuestionAggregateArgs>): Prisma.PrismaPromise<GetSurveyQuestionAggregateType<T>>

    /**
     * Group by SurveyQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyQuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SurveyQuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SurveyQuestionGroupByArgs['orderBy'] }
        : { orderBy?: SurveyQuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SurveyQuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSurveyQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SurveyQuestion model
   */
  readonly fields: SurveyQuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SurveyQuestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SurveyQuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    options<T extends SurveyQuestion$optionsArgs<ExtArgs> = {}>(args?: Subset<T, SurveyQuestion$optionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    step<T extends SurveyStepDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SurveyStepDefaultArgs<ExtArgs>>): Prisma__SurveyStepClient<$Result.GetResult<Prisma.$SurveyStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SurveyQuestion model
   */
  interface SurveyQuestionFieldRefs {
    readonly id: FieldRef<"SurveyQuestion", 'String'>
    readonly stepId: FieldRef<"SurveyQuestion", 'String'>
    readonly questionNumber: FieldRef<"SurveyQuestion", 'Int'>
    readonly text: FieldRef<"SurveyQuestion", 'String'>
    readonly type: FieldRef<"SurveyQuestion", 'QuestionType'>
    readonly required: FieldRef<"SurveyQuestion", 'Boolean'>
    readonly minLength: FieldRef<"SurveyQuestion", 'Int'>
    readonly maxLength: FieldRef<"SurveyQuestion", 'Int'>
    readonly placeholder: FieldRef<"SurveyQuestion", 'String'>
    readonly createdAt: FieldRef<"SurveyQuestion", 'DateTime'>
    readonly updatedAt: FieldRef<"SurveyQuestion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SurveyQuestion findUnique
   */
  export type SurveyQuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyQuestion
     */
    select?: SurveyQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyQuestion
     */
    omit?: SurveyQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyQuestionInclude<ExtArgs> | null
    /**
     * Filter, which SurveyQuestion to fetch.
     */
    where: SurveyQuestionWhereUniqueInput
  }

  /**
   * SurveyQuestion findUniqueOrThrow
   */
  export type SurveyQuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyQuestion
     */
    select?: SurveyQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyQuestion
     */
    omit?: SurveyQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyQuestionInclude<ExtArgs> | null
    /**
     * Filter, which SurveyQuestion to fetch.
     */
    where: SurveyQuestionWhereUniqueInput
  }

  /**
   * SurveyQuestion findFirst
   */
  export type SurveyQuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyQuestion
     */
    select?: SurveyQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyQuestion
     */
    omit?: SurveyQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyQuestionInclude<ExtArgs> | null
    /**
     * Filter, which SurveyQuestion to fetch.
     */
    where?: SurveyQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyQuestions to fetch.
     */
    orderBy?: SurveyQuestionOrderByWithRelationInput | SurveyQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SurveyQuestions.
     */
    cursor?: SurveyQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SurveyQuestions.
     */
    distinct?: SurveyQuestionScalarFieldEnum | SurveyQuestionScalarFieldEnum[]
  }

  /**
   * SurveyQuestion findFirstOrThrow
   */
  export type SurveyQuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyQuestion
     */
    select?: SurveyQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyQuestion
     */
    omit?: SurveyQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyQuestionInclude<ExtArgs> | null
    /**
     * Filter, which SurveyQuestion to fetch.
     */
    where?: SurveyQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyQuestions to fetch.
     */
    orderBy?: SurveyQuestionOrderByWithRelationInput | SurveyQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SurveyQuestions.
     */
    cursor?: SurveyQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SurveyQuestions.
     */
    distinct?: SurveyQuestionScalarFieldEnum | SurveyQuestionScalarFieldEnum[]
  }

  /**
   * SurveyQuestion findMany
   */
  export type SurveyQuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyQuestion
     */
    select?: SurveyQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyQuestion
     */
    omit?: SurveyQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyQuestionInclude<ExtArgs> | null
    /**
     * Filter, which SurveyQuestions to fetch.
     */
    where?: SurveyQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyQuestions to fetch.
     */
    orderBy?: SurveyQuestionOrderByWithRelationInput | SurveyQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SurveyQuestions.
     */
    cursor?: SurveyQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyQuestions.
     */
    skip?: number
    distinct?: SurveyQuestionScalarFieldEnum | SurveyQuestionScalarFieldEnum[]
  }

  /**
   * SurveyQuestion create
   */
  export type SurveyQuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyQuestion
     */
    select?: SurveyQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyQuestion
     */
    omit?: SurveyQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyQuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a SurveyQuestion.
     */
    data: XOR<SurveyQuestionCreateInput, SurveyQuestionUncheckedCreateInput>
  }

  /**
   * SurveyQuestion createMany
   */
  export type SurveyQuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SurveyQuestions.
     */
    data: SurveyQuestionCreateManyInput | SurveyQuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SurveyQuestion createManyAndReturn
   */
  export type SurveyQuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyQuestion
     */
    select?: SurveyQuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyQuestion
     */
    omit?: SurveyQuestionOmit<ExtArgs> | null
    /**
     * The data used to create many SurveyQuestions.
     */
    data: SurveyQuestionCreateManyInput | SurveyQuestionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyQuestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SurveyQuestion update
   */
  export type SurveyQuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyQuestion
     */
    select?: SurveyQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyQuestion
     */
    omit?: SurveyQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyQuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a SurveyQuestion.
     */
    data: XOR<SurveyQuestionUpdateInput, SurveyQuestionUncheckedUpdateInput>
    /**
     * Choose, which SurveyQuestion to update.
     */
    where: SurveyQuestionWhereUniqueInput
  }

  /**
   * SurveyQuestion updateMany
   */
  export type SurveyQuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SurveyQuestions.
     */
    data: XOR<SurveyQuestionUpdateManyMutationInput, SurveyQuestionUncheckedUpdateManyInput>
    /**
     * Filter which SurveyQuestions to update
     */
    where?: SurveyQuestionWhereInput
    /**
     * Limit how many SurveyQuestions to update.
     */
    limit?: number
  }

  /**
   * SurveyQuestion updateManyAndReturn
   */
  export type SurveyQuestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyQuestion
     */
    select?: SurveyQuestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyQuestion
     */
    omit?: SurveyQuestionOmit<ExtArgs> | null
    /**
     * The data used to update SurveyQuestions.
     */
    data: XOR<SurveyQuestionUpdateManyMutationInput, SurveyQuestionUncheckedUpdateManyInput>
    /**
     * Filter which SurveyQuestions to update
     */
    where?: SurveyQuestionWhereInput
    /**
     * Limit how many SurveyQuestions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyQuestionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SurveyQuestion upsert
   */
  export type SurveyQuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyQuestion
     */
    select?: SurveyQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyQuestion
     */
    omit?: SurveyQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyQuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the SurveyQuestion to update in case it exists.
     */
    where: SurveyQuestionWhereUniqueInput
    /**
     * In case the SurveyQuestion found by the `where` argument doesn't exist, create a new SurveyQuestion with this data.
     */
    create: XOR<SurveyQuestionCreateInput, SurveyQuestionUncheckedCreateInput>
    /**
     * In case the SurveyQuestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SurveyQuestionUpdateInput, SurveyQuestionUncheckedUpdateInput>
  }

  /**
   * SurveyQuestion delete
   */
  export type SurveyQuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyQuestion
     */
    select?: SurveyQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyQuestion
     */
    omit?: SurveyQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyQuestionInclude<ExtArgs> | null
    /**
     * Filter which SurveyQuestion to delete.
     */
    where: SurveyQuestionWhereUniqueInput
  }

  /**
   * SurveyQuestion deleteMany
   */
  export type SurveyQuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SurveyQuestions to delete
     */
    where?: SurveyQuestionWhereInput
    /**
     * Limit how many SurveyQuestions to delete.
     */
    limit?: number
  }

  /**
   * SurveyQuestion.options
   */
  export type SurveyQuestion$optionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    where?: QuestionOptionWhereInput
    orderBy?: QuestionOptionOrderByWithRelationInput | QuestionOptionOrderByWithRelationInput[]
    cursor?: QuestionOptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionOptionScalarFieldEnum | QuestionOptionScalarFieldEnum[]
  }

  /**
   * SurveyQuestion without action
   */
  export type SurveyQuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyQuestion
     */
    select?: SurveyQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyQuestion
     */
    omit?: SurveyQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyQuestionInclude<ExtArgs> | null
  }


  /**
   * Model QuestionOption
   */

  export type AggregateQuestionOption = {
    _count: QuestionOptionCountAggregateOutputType | null
    _avg: QuestionOptionAvgAggregateOutputType | null
    _sum: QuestionOptionSumAggregateOutputType | null
    _min: QuestionOptionMinAggregateOutputType | null
    _max: QuestionOptionMaxAggregateOutputType | null
  }

  export type QuestionOptionAvgAggregateOutputType = {
    optionNumber: number | null
  }

  export type QuestionOptionSumAggregateOutputType = {
    optionNumber: number | null
  }

  export type QuestionOptionMinAggregateOutputType = {
    id: string | null
    questionId: string | null
    optionNumber: number | null
    text: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuestionOptionMaxAggregateOutputType = {
    id: string | null
    questionId: string | null
    optionNumber: number | null
    text: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuestionOptionCountAggregateOutputType = {
    id: number
    questionId: number
    optionNumber: number
    text: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type QuestionOptionAvgAggregateInputType = {
    optionNumber?: true
  }

  export type QuestionOptionSumAggregateInputType = {
    optionNumber?: true
  }

  export type QuestionOptionMinAggregateInputType = {
    id?: true
    questionId?: true
    optionNumber?: true
    text?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuestionOptionMaxAggregateInputType = {
    id?: true
    questionId?: true
    optionNumber?: true
    text?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuestionOptionCountAggregateInputType = {
    id?: true
    questionId?: true
    optionNumber?: true
    text?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type QuestionOptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionOption to aggregate.
     */
    where?: QuestionOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionOptions to fetch.
     */
    orderBy?: QuestionOptionOrderByWithRelationInput | QuestionOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuestionOptions
    **/
    _count?: true | QuestionOptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuestionOptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuestionOptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionOptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionOptionMaxAggregateInputType
  }

  export type GetQuestionOptionAggregateType<T extends QuestionOptionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestionOption]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestionOption[P]>
      : GetScalarType<T[P], AggregateQuestionOption[P]>
  }




  export type QuestionOptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionOptionWhereInput
    orderBy?: QuestionOptionOrderByWithAggregationInput | QuestionOptionOrderByWithAggregationInput[]
    by: QuestionOptionScalarFieldEnum[] | QuestionOptionScalarFieldEnum
    having?: QuestionOptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionOptionCountAggregateInputType | true
    _avg?: QuestionOptionAvgAggregateInputType
    _sum?: QuestionOptionSumAggregateInputType
    _min?: QuestionOptionMinAggregateInputType
    _max?: QuestionOptionMaxAggregateInputType
  }

  export type QuestionOptionGroupByOutputType = {
    id: string
    questionId: string
    optionNumber: number
    text: string
    createdAt: Date
    updatedAt: Date
    _count: QuestionOptionCountAggregateOutputType | null
    _avg: QuestionOptionAvgAggregateOutputType | null
    _sum: QuestionOptionSumAggregateOutputType | null
    _min: QuestionOptionMinAggregateOutputType | null
    _max: QuestionOptionMaxAggregateOutputType | null
  }

  type GetQuestionOptionGroupByPayload<T extends QuestionOptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionOptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionOptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionOptionGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionOptionGroupByOutputType[P]>
        }
      >
    >


  export type QuestionOptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    questionId?: boolean
    optionNumber?: boolean
    text?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    question?: boolean | SurveyQuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questionOption"]>

  export type QuestionOptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    questionId?: boolean
    optionNumber?: boolean
    text?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    question?: boolean | SurveyQuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questionOption"]>

  export type QuestionOptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    questionId?: boolean
    optionNumber?: boolean
    text?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    question?: boolean | SurveyQuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questionOption"]>

  export type QuestionOptionSelectScalar = {
    id?: boolean
    questionId?: boolean
    optionNumber?: boolean
    text?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type QuestionOptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "questionId" | "optionNumber" | "text" | "createdAt" | "updatedAt", ExtArgs["result"]["questionOption"]>
  export type QuestionOptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | SurveyQuestionDefaultArgs<ExtArgs>
  }
  export type QuestionOptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | SurveyQuestionDefaultArgs<ExtArgs>
  }
  export type QuestionOptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | SurveyQuestionDefaultArgs<ExtArgs>
  }

  export type $QuestionOptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuestionOption"
    objects: {
      question: Prisma.$SurveyQuestionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      questionId: string
      optionNumber: number
      text: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["questionOption"]>
    composites: {}
  }

  type QuestionOptionGetPayload<S extends boolean | null | undefined | QuestionOptionDefaultArgs> = $Result.GetResult<Prisma.$QuestionOptionPayload, S>

  type QuestionOptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuestionOptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuestionOptionCountAggregateInputType | true
    }

  export interface QuestionOptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuestionOption'], meta: { name: 'QuestionOption' } }
    /**
     * Find zero or one QuestionOption that matches the filter.
     * @param {QuestionOptionFindUniqueArgs} args - Arguments to find a QuestionOption
     * @example
     * // Get one QuestionOption
     * const questionOption = await prisma.questionOption.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionOptionFindUniqueArgs>(args: SelectSubset<T, QuestionOptionFindUniqueArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuestionOption that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuestionOptionFindUniqueOrThrowArgs} args - Arguments to find a QuestionOption
     * @example
     * // Get one QuestionOption
     * const questionOption = await prisma.questionOption.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionOptionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionOptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuestionOption that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionFindFirstArgs} args - Arguments to find a QuestionOption
     * @example
     * // Get one QuestionOption
     * const questionOption = await prisma.questionOption.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionOptionFindFirstArgs>(args?: SelectSubset<T, QuestionOptionFindFirstArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuestionOption that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionFindFirstOrThrowArgs} args - Arguments to find a QuestionOption
     * @example
     * // Get one QuestionOption
     * const questionOption = await prisma.questionOption.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionOptionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionOptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuestionOptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuestionOptions
     * const questionOptions = await prisma.questionOption.findMany()
     * 
     * // Get first 10 QuestionOptions
     * const questionOptions = await prisma.questionOption.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionOptionWithIdOnly = await prisma.questionOption.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionOptionFindManyArgs>(args?: SelectSubset<T, QuestionOptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuestionOption.
     * @param {QuestionOptionCreateArgs} args - Arguments to create a QuestionOption.
     * @example
     * // Create one QuestionOption
     * const QuestionOption = await prisma.questionOption.create({
     *   data: {
     *     // ... data to create a QuestionOption
     *   }
     * })
     * 
     */
    create<T extends QuestionOptionCreateArgs>(args: SelectSubset<T, QuestionOptionCreateArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuestionOptions.
     * @param {QuestionOptionCreateManyArgs} args - Arguments to create many QuestionOptions.
     * @example
     * // Create many QuestionOptions
     * const questionOption = await prisma.questionOption.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionOptionCreateManyArgs>(args?: SelectSubset<T, QuestionOptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuestionOptions and returns the data saved in the database.
     * @param {QuestionOptionCreateManyAndReturnArgs} args - Arguments to create many QuestionOptions.
     * @example
     * // Create many QuestionOptions
     * const questionOption = await prisma.questionOption.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuestionOptions and only return the `id`
     * const questionOptionWithIdOnly = await prisma.questionOption.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionOptionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionOptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QuestionOption.
     * @param {QuestionOptionDeleteArgs} args - Arguments to delete one QuestionOption.
     * @example
     * // Delete one QuestionOption
     * const QuestionOption = await prisma.questionOption.delete({
     *   where: {
     *     // ... filter to delete one QuestionOption
     *   }
     * })
     * 
     */
    delete<T extends QuestionOptionDeleteArgs>(args: SelectSubset<T, QuestionOptionDeleteArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuestionOption.
     * @param {QuestionOptionUpdateArgs} args - Arguments to update one QuestionOption.
     * @example
     * // Update one QuestionOption
     * const questionOption = await prisma.questionOption.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionOptionUpdateArgs>(args: SelectSubset<T, QuestionOptionUpdateArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuestionOptions.
     * @param {QuestionOptionDeleteManyArgs} args - Arguments to filter QuestionOptions to delete.
     * @example
     * // Delete a few QuestionOptions
     * const { count } = await prisma.questionOption.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionOptionDeleteManyArgs>(args?: SelectSubset<T, QuestionOptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuestionOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuestionOptions
     * const questionOption = await prisma.questionOption.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionOptionUpdateManyArgs>(args: SelectSubset<T, QuestionOptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuestionOptions and returns the data updated in the database.
     * @param {QuestionOptionUpdateManyAndReturnArgs} args - Arguments to update many QuestionOptions.
     * @example
     * // Update many QuestionOptions
     * const questionOption = await prisma.questionOption.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QuestionOptions and only return the `id`
     * const questionOptionWithIdOnly = await prisma.questionOption.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuestionOptionUpdateManyAndReturnArgs>(args: SelectSubset<T, QuestionOptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QuestionOption.
     * @param {QuestionOptionUpsertArgs} args - Arguments to update or create a QuestionOption.
     * @example
     * // Update or create a QuestionOption
     * const questionOption = await prisma.questionOption.upsert({
     *   create: {
     *     // ... data to create a QuestionOption
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuestionOption we want to update
     *   }
     * })
     */
    upsert<T extends QuestionOptionUpsertArgs>(args: SelectSubset<T, QuestionOptionUpsertArgs<ExtArgs>>): Prisma__QuestionOptionClient<$Result.GetResult<Prisma.$QuestionOptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuestionOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionCountArgs} args - Arguments to filter QuestionOptions to count.
     * @example
     * // Count the number of QuestionOptions
     * const count = await prisma.questionOption.count({
     *   where: {
     *     // ... the filter for the QuestionOptions we want to count
     *   }
     * })
    **/
    count<T extends QuestionOptionCountArgs>(
      args?: Subset<T, QuestionOptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionOptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuestionOption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestionOptionAggregateArgs>(args: Subset<T, QuestionOptionAggregateArgs>): Prisma.PrismaPromise<GetQuestionOptionAggregateType<T>>

    /**
     * Group by QuestionOption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionOptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuestionOptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionOptionGroupByArgs['orderBy'] }
        : { orderBy?: QuestionOptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuestionOptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionOptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuestionOption model
   */
  readonly fields: QuestionOptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuestionOption.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionOptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    question<T extends SurveyQuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SurveyQuestionDefaultArgs<ExtArgs>>): Prisma__SurveyQuestionClient<$Result.GetResult<Prisma.$SurveyQuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QuestionOption model
   */
  interface QuestionOptionFieldRefs {
    readonly id: FieldRef<"QuestionOption", 'String'>
    readonly questionId: FieldRef<"QuestionOption", 'String'>
    readonly optionNumber: FieldRef<"QuestionOption", 'Int'>
    readonly text: FieldRef<"QuestionOption", 'String'>
    readonly createdAt: FieldRef<"QuestionOption", 'DateTime'>
    readonly updatedAt: FieldRef<"QuestionOption", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QuestionOption findUnique
   */
  export type QuestionOptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuestionOption to fetch.
     */
    where: QuestionOptionWhereUniqueInput
  }

  /**
   * QuestionOption findUniqueOrThrow
   */
  export type QuestionOptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuestionOption to fetch.
     */
    where: QuestionOptionWhereUniqueInput
  }

  /**
   * QuestionOption findFirst
   */
  export type QuestionOptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuestionOption to fetch.
     */
    where?: QuestionOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionOptions to fetch.
     */
    orderBy?: QuestionOptionOrderByWithRelationInput | QuestionOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionOptions.
     */
    cursor?: QuestionOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionOptions.
     */
    distinct?: QuestionOptionScalarFieldEnum | QuestionOptionScalarFieldEnum[]
  }

  /**
   * QuestionOption findFirstOrThrow
   */
  export type QuestionOptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuestionOption to fetch.
     */
    where?: QuestionOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionOptions to fetch.
     */
    orderBy?: QuestionOptionOrderByWithRelationInput | QuestionOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionOptions.
     */
    cursor?: QuestionOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionOptions.
     */
    distinct?: QuestionOptionScalarFieldEnum | QuestionOptionScalarFieldEnum[]
  }

  /**
   * QuestionOption findMany
   */
  export type QuestionOptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * Filter, which QuestionOptions to fetch.
     */
    where?: QuestionOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionOptions to fetch.
     */
    orderBy?: QuestionOptionOrderByWithRelationInput | QuestionOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuestionOptions.
     */
    cursor?: QuestionOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionOptions.
     */
    skip?: number
    distinct?: QuestionOptionScalarFieldEnum | QuestionOptionScalarFieldEnum[]
  }

  /**
   * QuestionOption create
   */
  export type QuestionOptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * The data needed to create a QuestionOption.
     */
    data: XOR<QuestionOptionCreateInput, QuestionOptionUncheckedCreateInput>
  }

  /**
   * QuestionOption createMany
   */
  export type QuestionOptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuestionOptions.
     */
    data: QuestionOptionCreateManyInput | QuestionOptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuestionOption createManyAndReturn
   */
  export type QuestionOptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * The data used to create many QuestionOptions.
     */
    data: QuestionOptionCreateManyInput | QuestionOptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuestionOption update
   */
  export type QuestionOptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * The data needed to update a QuestionOption.
     */
    data: XOR<QuestionOptionUpdateInput, QuestionOptionUncheckedUpdateInput>
    /**
     * Choose, which QuestionOption to update.
     */
    where: QuestionOptionWhereUniqueInput
  }

  /**
   * QuestionOption updateMany
   */
  export type QuestionOptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuestionOptions.
     */
    data: XOR<QuestionOptionUpdateManyMutationInput, QuestionOptionUncheckedUpdateManyInput>
    /**
     * Filter which QuestionOptions to update
     */
    where?: QuestionOptionWhereInput
    /**
     * Limit how many QuestionOptions to update.
     */
    limit?: number
  }

  /**
   * QuestionOption updateManyAndReturn
   */
  export type QuestionOptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * The data used to update QuestionOptions.
     */
    data: XOR<QuestionOptionUpdateManyMutationInput, QuestionOptionUncheckedUpdateManyInput>
    /**
     * Filter which QuestionOptions to update
     */
    where?: QuestionOptionWhereInput
    /**
     * Limit how many QuestionOptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuestionOption upsert
   */
  export type QuestionOptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * The filter to search for the QuestionOption to update in case it exists.
     */
    where: QuestionOptionWhereUniqueInput
    /**
     * In case the QuestionOption found by the `where` argument doesn't exist, create a new QuestionOption with this data.
     */
    create: XOR<QuestionOptionCreateInput, QuestionOptionUncheckedCreateInput>
    /**
     * In case the QuestionOption was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionOptionUpdateInput, QuestionOptionUncheckedUpdateInput>
  }

  /**
   * QuestionOption delete
   */
  export type QuestionOptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
    /**
     * Filter which QuestionOption to delete.
     */
    where: QuestionOptionWhereUniqueInput
  }

  /**
   * QuestionOption deleteMany
   */
  export type QuestionOptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionOptions to delete
     */
    where?: QuestionOptionWhereInput
    /**
     * Limit how many QuestionOptions to delete.
     */
    limit?: number
  }

  /**
   * QuestionOption without action
   */
  export type QuestionOptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionOption
     */
    select?: QuestionOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionOption
     */
    omit?: QuestionOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionOptionInclude<ExtArgs> | null
  }


  /**
   * Model Survey
   */

  export type AggregateSurvey = {
    _count: SurveyCountAggregateOutputType | null
    _avg: SurveyAvgAggregateOutputType | null
    _sum: SurveySumAggregateOutputType | null
    _min: SurveyMinAggregateOutputType | null
    _max: SurveyMaxAggregateOutputType | null
  }

  export type SurveyAvgAggregateOutputType = {
    targetAgeMin: number | null
    targetAgeMax: number | null
    reward: number | null
    maxParticipants: number | null
    totalBudget: number | null
    extensionCount: number | null
  }

  export type SurveySumAggregateOutputType = {
    targetAgeMin: number | null
    targetAgeMax: number | null
    reward: number | null
    maxParticipants: number | null
    totalBudget: number | null
    extensionCount: number | null
  }

  export type SurveyMinAggregateOutputType = {
    id: string | null
    title: string | null
    storeName: string | null
    description: string | null
    url: string | null
    sellerId: string | null
    templateId: string | null
    targetAgeMin: number | null
    targetAgeMax: number | null
    targetGender: $Enums.Gender | null
    reward: number | null
    maxParticipants: number | null
    totalBudget: number | null
    status: $Enums.SurveyStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    endDate: Date | null
    approvedAt: Date | null
    completedAt: Date | null
    suspendedAt: Date | null
    rejectionReason: string | null
    extensionCount: number | null
    cancellationStatus: $Enums.CancellationStatus | null
    cancellationRequestedAt: Date | null
  }

  export type SurveyMaxAggregateOutputType = {
    id: string | null
    title: string | null
    storeName: string | null
    description: string | null
    url: string | null
    sellerId: string | null
    templateId: string | null
    targetAgeMin: number | null
    targetAgeMax: number | null
    targetGender: $Enums.Gender | null
    reward: number | null
    maxParticipants: number | null
    totalBudget: number | null
    status: $Enums.SurveyStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    endDate: Date | null
    approvedAt: Date | null
    completedAt: Date | null
    suspendedAt: Date | null
    rejectionReason: string | null
    extensionCount: number | null
    cancellationStatus: $Enums.CancellationStatus | null
    cancellationRequestedAt: Date | null
  }

  export type SurveyCountAggregateOutputType = {
    id: number
    title: number
    storeName: number
    description: number
    url: number
    sellerId: number
    templateId: number
    targetAgeMin: number
    targetAgeMax: number
    targetGender: number
    reward: number
    maxParticipants: number
    totalBudget: number
    status: number
    customSteps: number
    createdAt: number
    updatedAt: number
    endDate: number
    approvedAt: number
    completedAt: number
    suspendedAt: number
    rejectionReason: number
    extensionCount: number
    extensionHistory: number
    cancellationStatus: number
    cancellationRequestedAt: number
    _all: number
  }


  export type SurveyAvgAggregateInputType = {
    targetAgeMin?: true
    targetAgeMax?: true
    reward?: true
    maxParticipants?: true
    totalBudget?: true
    extensionCount?: true
  }

  export type SurveySumAggregateInputType = {
    targetAgeMin?: true
    targetAgeMax?: true
    reward?: true
    maxParticipants?: true
    totalBudget?: true
    extensionCount?: true
  }

  export type SurveyMinAggregateInputType = {
    id?: true
    title?: true
    storeName?: true
    description?: true
    url?: true
    sellerId?: true
    templateId?: true
    targetAgeMin?: true
    targetAgeMax?: true
    targetGender?: true
    reward?: true
    maxParticipants?: true
    totalBudget?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    endDate?: true
    approvedAt?: true
    completedAt?: true
    suspendedAt?: true
    rejectionReason?: true
    extensionCount?: true
    cancellationStatus?: true
    cancellationRequestedAt?: true
  }

  export type SurveyMaxAggregateInputType = {
    id?: true
    title?: true
    storeName?: true
    description?: true
    url?: true
    sellerId?: true
    templateId?: true
    targetAgeMin?: true
    targetAgeMax?: true
    targetGender?: true
    reward?: true
    maxParticipants?: true
    totalBudget?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    endDate?: true
    approvedAt?: true
    completedAt?: true
    suspendedAt?: true
    rejectionReason?: true
    extensionCount?: true
    cancellationStatus?: true
    cancellationRequestedAt?: true
  }

  export type SurveyCountAggregateInputType = {
    id?: true
    title?: true
    storeName?: true
    description?: true
    url?: true
    sellerId?: true
    templateId?: true
    targetAgeMin?: true
    targetAgeMax?: true
    targetGender?: true
    reward?: true
    maxParticipants?: true
    totalBudget?: true
    status?: true
    customSteps?: true
    createdAt?: true
    updatedAt?: true
    endDate?: true
    approvedAt?: true
    completedAt?: true
    suspendedAt?: true
    rejectionReason?: true
    extensionCount?: true
    extensionHistory?: true
    cancellationStatus?: true
    cancellationRequestedAt?: true
    _all?: true
  }

  export type SurveyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Survey to aggregate.
     */
    where?: SurveyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Surveys to fetch.
     */
    orderBy?: SurveyOrderByWithRelationInput | SurveyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SurveyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Surveys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Surveys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Surveys
    **/
    _count?: true | SurveyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SurveyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SurveySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SurveyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SurveyMaxAggregateInputType
  }

  export type GetSurveyAggregateType<T extends SurveyAggregateArgs> = {
        [P in keyof T & keyof AggregateSurvey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSurvey[P]>
      : GetScalarType<T[P], AggregateSurvey[P]>
  }




  export type SurveyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SurveyWhereInput
    orderBy?: SurveyOrderByWithAggregationInput | SurveyOrderByWithAggregationInput[]
    by: SurveyScalarFieldEnum[] | SurveyScalarFieldEnum
    having?: SurveyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SurveyCountAggregateInputType | true
    _avg?: SurveyAvgAggregateInputType
    _sum?: SurveySumAggregateInputType
    _min?: SurveyMinAggregateInputType
    _max?: SurveyMaxAggregateInputType
  }

  export type SurveyGroupByOutputType = {
    id: string
    title: string
    storeName: string
    description: string | null
    url: string
    sellerId: string
    templateId: string
    targetAgeMin: number
    targetAgeMax: number
    targetGender: $Enums.Gender
    reward: number
    maxParticipants: number
    totalBudget: number | null
    status: $Enums.SurveyStatus
    customSteps: JsonValue | null
    createdAt: Date
    updatedAt: Date
    endDate: Date
    approvedAt: Date | null
    completedAt: Date | null
    suspendedAt: Date | null
    rejectionReason: string | null
    extensionCount: number
    extensionHistory: JsonValue | null
    cancellationStatus: $Enums.CancellationStatus | null
    cancellationRequestedAt: Date | null
    _count: SurveyCountAggregateOutputType | null
    _avg: SurveyAvgAggregateOutputType | null
    _sum: SurveySumAggregateOutputType | null
    _min: SurveyMinAggregateOutputType | null
    _max: SurveyMaxAggregateOutputType | null
  }

  type GetSurveyGroupByPayload<T extends SurveyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SurveyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SurveyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SurveyGroupByOutputType[P]>
            : GetScalarType<T[P], SurveyGroupByOutputType[P]>
        }
      >
    >


  export type SurveySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    storeName?: boolean
    description?: boolean
    url?: boolean
    sellerId?: boolean
    templateId?: boolean
    targetAgeMin?: boolean
    targetAgeMax?: boolean
    targetGender?: boolean
    reward?: boolean
    maxParticipants?: boolean
    totalBudget?: boolean
    status?: boolean
    customSteps?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    endDate?: boolean
    approvedAt?: boolean
    completedAt?: boolean
    suspendedAt?: boolean
    rejectionReason?: boolean
    extensionCount?: boolean
    extensionHistory?: boolean
    cancellationStatus?: boolean
    cancellationRequestedAt?: boolean
    responses?: boolean | Survey$responsesArgs<ExtArgs>
    seller?: boolean | UserDefaultArgs<ExtArgs>
    template?: boolean | SurveyTemplateDefaultArgs<ExtArgs>
    cancellationRequest?: boolean | Survey$cancellationRequestArgs<ExtArgs>
    _count?: boolean | SurveyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["survey"]>

  export type SurveySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    storeName?: boolean
    description?: boolean
    url?: boolean
    sellerId?: boolean
    templateId?: boolean
    targetAgeMin?: boolean
    targetAgeMax?: boolean
    targetGender?: boolean
    reward?: boolean
    maxParticipants?: boolean
    totalBudget?: boolean
    status?: boolean
    customSteps?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    endDate?: boolean
    approvedAt?: boolean
    completedAt?: boolean
    suspendedAt?: boolean
    rejectionReason?: boolean
    extensionCount?: boolean
    extensionHistory?: boolean
    cancellationStatus?: boolean
    cancellationRequestedAt?: boolean
    seller?: boolean | UserDefaultArgs<ExtArgs>
    template?: boolean | SurveyTemplateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["survey"]>

  export type SurveySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    storeName?: boolean
    description?: boolean
    url?: boolean
    sellerId?: boolean
    templateId?: boolean
    targetAgeMin?: boolean
    targetAgeMax?: boolean
    targetGender?: boolean
    reward?: boolean
    maxParticipants?: boolean
    totalBudget?: boolean
    status?: boolean
    customSteps?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    endDate?: boolean
    approvedAt?: boolean
    completedAt?: boolean
    suspendedAt?: boolean
    rejectionReason?: boolean
    extensionCount?: boolean
    extensionHistory?: boolean
    cancellationStatus?: boolean
    cancellationRequestedAt?: boolean
    seller?: boolean | UserDefaultArgs<ExtArgs>
    template?: boolean | SurveyTemplateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["survey"]>

  export type SurveySelectScalar = {
    id?: boolean
    title?: boolean
    storeName?: boolean
    description?: boolean
    url?: boolean
    sellerId?: boolean
    templateId?: boolean
    targetAgeMin?: boolean
    targetAgeMax?: boolean
    targetGender?: boolean
    reward?: boolean
    maxParticipants?: boolean
    totalBudget?: boolean
    status?: boolean
    customSteps?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    endDate?: boolean
    approvedAt?: boolean
    completedAt?: boolean
    suspendedAt?: boolean
    rejectionReason?: boolean
    extensionCount?: boolean
    extensionHistory?: boolean
    cancellationStatus?: boolean
    cancellationRequestedAt?: boolean
  }

  export type SurveyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "storeName" | "description" | "url" | "sellerId" | "templateId" | "targetAgeMin" | "targetAgeMax" | "targetGender" | "reward" | "maxParticipants" | "totalBudget" | "status" | "customSteps" | "createdAt" | "updatedAt" | "endDate" | "approvedAt" | "completedAt" | "suspendedAt" | "rejectionReason" | "extensionCount" | "extensionHistory" | "cancellationStatus" | "cancellationRequestedAt", ExtArgs["result"]["survey"]>
  export type SurveyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    responses?: boolean | Survey$responsesArgs<ExtArgs>
    seller?: boolean | UserDefaultArgs<ExtArgs>
    template?: boolean | SurveyTemplateDefaultArgs<ExtArgs>
    cancellationRequest?: boolean | Survey$cancellationRequestArgs<ExtArgs>
    _count?: boolean | SurveyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SurveyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seller?: boolean | UserDefaultArgs<ExtArgs>
    template?: boolean | SurveyTemplateDefaultArgs<ExtArgs>
  }
  export type SurveyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seller?: boolean | UserDefaultArgs<ExtArgs>
    template?: boolean | SurveyTemplateDefaultArgs<ExtArgs>
  }

  export type $SurveyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Survey"
    objects: {
      responses: Prisma.$SurveyResponsePayload<ExtArgs>[]
      seller: Prisma.$UserPayload<ExtArgs>
      template: Prisma.$SurveyTemplatePayload<ExtArgs>
      cancellationRequest: Prisma.$SurveyCancellationRequestPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      storeName: string
      description: string | null
      url: string
      sellerId: string
      templateId: string
      targetAgeMin: number
      targetAgeMax: number
      targetGender: $Enums.Gender
      reward: number
      maxParticipants: number
      totalBudget: number | null
      status: $Enums.SurveyStatus
      customSteps: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
      endDate: Date
      approvedAt: Date | null
      completedAt: Date | null
      suspendedAt: Date | null
      rejectionReason: string | null
      extensionCount: number
      extensionHistory: Prisma.JsonValue | null
      cancellationStatus: $Enums.CancellationStatus | null
      cancellationRequestedAt: Date | null
    }, ExtArgs["result"]["survey"]>
    composites: {}
  }

  type SurveyGetPayload<S extends boolean | null | undefined | SurveyDefaultArgs> = $Result.GetResult<Prisma.$SurveyPayload, S>

  type SurveyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SurveyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SurveyCountAggregateInputType | true
    }

  export interface SurveyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Survey'], meta: { name: 'Survey' } }
    /**
     * Find zero or one Survey that matches the filter.
     * @param {SurveyFindUniqueArgs} args - Arguments to find a Survey
     * @example
     * // Get one Survey
     * const survey = await prisma.survey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SurveyFindUniqueArgs>(args: SelectSubset<T, SurveyFindUniqueArgs<ExtArgs>>): Prisma__SurveyClient<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Survey that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SurveyFindUniqueOrThrowArgs} args - Arguments to find a Survey
     * @example
     * // Get one Survey
     * const survey = await prisma.survey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SurveyFindUniqueOrThrowArgs>(args: SelectSubset<T, SurveyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SurveyClient<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Survey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyFindFirstArgs} args - Arguments to find a Survey
     * @example
     * // Get one Survey
     * const survey = await prisma.survey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SurveyFindFirstArgs>(args?: SelectSubset<T, SurveyFindFirstArgs<ExtArgs>>): Prisma__SurveyClient<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Survey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyFindFirstOrThrowArgs} args - Arguments to find a Survey
     * @example
     * // Get one Survey
     * const survey = await prisma.survey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SurveyFindFirstOrThrowArgs>(args?: SelectSubset<T, SurveyFindFirstOrThrowArgs<ExtArgs>>): Prisma__SurveyClient<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Surveys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Surveys
     * const surveys = await prisma.survey.findMany()
     * 
     * // Get first 10 Surveys
     * const surveys = await prisma.survey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const surveyWithIdOnly = await prisma.survey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SurveyFindManyArgs>(args?: SelectSubset<T, SurveyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Survey.
     * @param {SurveyCreateArgs} args - Arguments to create a Survey.
     * @example
     * // Create one Survey
     * const Survey = await prisma.survey.create({
     *   data: {
     *     // ... data to create a Survey
     *   }
     * })
     * 
     */
    create<T extends SurveyCreateArgs>(args: SelectSubset<T, SurveyCreateArgs<ExtArgs>>): Prisma__SurveyClient<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Surveys.
     * @param {SurveyCreateManyArgs} args - Arguments to create many Surveys.
     * @example
     * // Create many Surveys
     * const survey = await prisma.survey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SurveyCreateManyArgs>(args?: SelectSubset<T, SurveyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Surveys and returns the data saved in the database.
     * @param {SurveyCreateManyAndReturnArgs} args - Arguments to create many Surveys.
     * @example
     * // Create many Surveys
     * const survey = await prisma.survey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Surveys and only return the `id`
     * const surveyWithIdOnly = await prisma.survey.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SurveyCreateManyAndReturnArgs>(args?: SelectSubset<T, SurveyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Survey.
     * @param {SurveyDeleteArgs} args - Arguments to delete one Survey.
     * @example
     * // Delete one Survey
     * const Survey = await prisma.survey.delete({
     *   where: {
     *     // ... filter to delete one Survey
     *   }
     * })
     * 
     */
    delete<T extends SurveyDeleteArgs>(args: SelectSubset<T, SurveyDeleteArgs<ExtArgs>>): Prisma__SurveyClient<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Survey.
     * @param {SurveyUpdateArgs} args - Arguments to update one Survey.
     * @example
     * // Update one Survey
     * const survey = await prisma.survey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SurveyUpdateArgs>(args: SelectSubset<T, SurveyUpdateArgs<ExtArgs>>): Prisma__SurveyClient<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Surveys.
     * @param {SurveyDeleteManyArgs} args - Arguments to filter Surveys to delete.
     * @example
     * // Delete a few Surveys
     * const { count } = await prisma.survey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SurveyDeleteManyArgs>(args?: SelectSubset<T, SurveyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Surveys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Surveys
     * const survey = await prisma.survey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SurveyUpdateManyArgs>(args: SelectSubset<T, SurveyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Surveys and returns the data updated in the database.
     * @param {SurveyUpdateManyAndReturnArgs} args - Arguments to update many Surveys.
     * @example
     * // Update many Surveys
     * const survey = await prisma.survey.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Surveys and only return the `id`
     * const surveyWithIdOnly = await prisma.survey.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SurveyUpdateManyAndReturnArgs>(args: SelectSubset<T, SurveyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Survey.
     * @param {SurveyUpsertArgs} args - Arguments to update or create a Survey.
     * @example
     * // Update or create a Survey
     * const survey = await prisma.survey.upsert({
     *   create: {
     *     // ... data to create a Survey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Survey we want to update
     *   }
     * })
     */
    upsert<T extends SurveyUpsertArgs>(args: SelectSubset<T, SurveyUpsertArgs<ExtArgs>>): Prisma__SurveyClient<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Surveys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyCountArgs} args - Arguments to filter Surveys to count.
     * @example
     * // Count the number of Surveys
     * const count = await prisma.survey.count({
     *   where: {
     *     // ... the filter for the Surveys we want to count
     *   }
     * })
    **/
    count<T extends SurveyCountArgs>(
      args?: Subset<T, SurveyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SurveyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Survey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SurveyAggregateArgs>(args: Subset<T, SurveyAggregateArgs>): Prisma.PrismaPromise<GetSurveyAggregateType<T>>

    /**
     * Group by Survey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SurveyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SurveyGroupByArgs['orderBy'] }
        : { orderBy?: SurveyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SurveyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSurveyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Survey model
   */
  readonly fields: SurveyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Survey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SurveyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    responses<T extends Survey$responsesArgs<ExtArgs> = {}>(args?: Subset<T, Survey$responsesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    seller<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    template<T extends SurveyTemplateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SurveyTemplateDefaultArgs<ExtArgs>>): Prisma__SurveyTemplateClient<$Result.GetResult<Prisma.$SurveyTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cancellationRequest<T extends Survey$cancellationRequestArgs<ExtArgs> = {}>(args?: Subset<T, Survey$cancellationRequestArgs<ExtArgs>>): Prisma__SurveyCancellationRequestClient<$Result.GetResult<Prisma.$SurveyCancellationRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Survey model
   */
  interface SurveyFieldRefs {
    readonly id: FieldRef<"Survey", 'String'>
    readonly title: FieldRef<"Survey", 'String'>
    readonly storeName: FieldRef<"Survey", 'String'>
    readonly description: FieldRef<"Survey", 'String'>
    readonly url: FieldRef<"Survey", 'String'>
    readonly sellerId: FieldRef<"Survey", 'String'>
    readonly templateId: FieldRef<"Survey", 'String'>
    readonly targetAgeMin: FieldRef<"Survey", 'Int'>
    readonly targetAgeMax: FieldRef<"Survey", 'Int'>
    readonly targetGender: FieldRef<"Survey", 'Gender'>
    readonly reward: FieldRef<"Survey", 'Float'>
    readonly maxParticipants: FieldRef<"Survey", 'Int'>
    readonly totalBudget: FieldRef<"Survey", 'Float'>
    readonly status: FieldRef<"Survey", 'SurveyStatus'>
    readonly customSteps: FieldRef<"Survey", 'Json'>
    readonly createdAt: FieldRef<"Survey", 'DateTime'>
    readonly updatedAt: FieldRef<"Survey", 'DateTime'>
    readonly endDate: FieldRef<"Survey", 'DateTime'>
    readonly approvedAt: FieldRef<"Survey", 'DateTime'>
    readonly completedAt: FieldRef<"Survey", 'DateTime'>
    readonly suspendedAt: FieldRef<"Survey", 'DateTime'>
    readonly rejectionReason: FieldRef<"Survey", 'String'>
    readonly extensionCount: FieldRef<"Survey", 'Int'>
    readonly extensionHistory: FieldRef<"Survey", 'Json'>
    readonly cancellationStatus: FieldRef<"Survey", 'CancellationStatus'>
    readonly cancellationRequestedAt: FieldRef<"Survey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Survey findUnique
   */
  export type SurveyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Survey
     */
    omit?: SurveyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    /**
     * Filter, which Survey to fetch.
     */
    where: SurveyWhereUniqueInput
  }

  /**
   * Survey findUniqueOrThrow
   */
  export type SurveyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Survey
     */
    omit?: SurveyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    /**
     * Filter, which Survey to fetch.
     */
    where: SurveyWhereUniqueInput
  }

  /**
   * Survey findFirst
   */
  export type SurveyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Survey
     */
    omit?: SurveyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    /**
     * Filter, which Survey to fetch.
     */
    where?: SurveyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Surveys to fetch.
     */
    orderBy?: SurveyOrderByWithRelationInput | SurveyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Surveys.
     */
    cursor?: SurveyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Surveys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Surveys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Surveys.
     */
    distinct?: SurveyScalarFieldEnum | SurveyScalarFieldEnum[]
  }

  /**
   * Survey findFirstOrThrow
   */
  export type SurveyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Survey
     */
    omit?: SurveyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    /**
     * Filter, which Survey to fetch.
     */
    where?: SurveyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Surveys to fetch.
     */
    orderBy?: SurveyOrderByWithRelationInput | SurveyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Surveys.
     */
    cursor?: SurveyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Surveys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Surveys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Surveys.
     */
    distinct?: SurveyScalarFieldEnum | SurveyScalarFieldEnum[]
  }

  /**
   * Survey findMany
   */
  export type SurveyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Survey
     */
    omit?: SurveyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    /**
     * Filter, which Surveys to fetch.
     */
    where?: SurveyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Surveys to fetch.
     */
    orderBy?: SurveyOrderByWithRelationInput | SurveyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Surveys.
     */
    cursor?: SurveyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Surveys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Surveys.
     */
    skip?: number
    distinct?: SurveyScalarFieldEnum | SurveyScalarFieldEnum[]
  }

  /**
   * Survey create
   */
  export type SurveyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Survey
     */
    omit?: SurveyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    /**
     * The data needed to create a Survey.
     */
    data: XOR<SurveyCreateInput, SurveyUncheckedCreateInput>
  }

  /**
   * Survey createMany
   */
  export type SurveyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Surveys.
     */
    data: SurveyCreateManyInput | SurveyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Survey createManyAndReturn
   */
  export type SurveyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Survey
     */
    omit?: SurveyOmit<ExtArgs> | null
    /**
     * The data used to create many Surveys.
     */
    data: SurveyCreateManyInput | SurveyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Survey update
   */
  export type SurveyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Survey
     */
    omit?: SurveyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    /**
     * The data needed to update a Survey.
     */
    data: XOR<SurveyUpdateInput, SurveyUncheckedUpdateInput>
    /**
     * Choose, which Survey to update.
     */
    where: SurveyWhereUniqueInput
  }

  /**
   * Survey updateMany
   */
  export type SurveyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Surveys.
     */
    data: XOR<SurveyUpdateManyMutationInput, SurveyUncheckedUpdateManyInput>
    /**
     * Filter which Surveys to update
     */
    where?: SurveyWhereInput
    /**
     * Limit how many Surveys to update.
     */
    limit?: number
  }

  /**
   * Survey updateManyAndReturn
   */
  export type SurveyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Survey
     */
    omit?: SurveyOmit<ExtArgs> | null
    /**
     * The data used to update Surveys.
     */
    data: XOR<SurveyUpdateManyMutationInput, SurveyUncheckedUpdateManyInput>
    /**
     * Filter which Surveys to update
     */
    where?: SurveyWhereInput
    /**
     * Limit how many Surveys to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Survey upsert
   */
  export type SurveyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Survey
     */
    omit?: SurveyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    /**
     * The filter to search for the Survey to update in case it exists.
     */
    where: SurveyWhereUniqueInput
    /**
     * In case the Survey found by the `where` argument doesn't exist, create a new Survey with this data.
     */
    create: XOR<SurveyCreateInput, SurveyUncheckedCreateInput>
    /**
     * In case the Survey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SurveyUpdateInput, SurveyUncheckedUpdateInput>
  }

  /**
   * Survey delete
   */
  export type SurveyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Survey
     */
    omit?: SurveyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    /**
     * Filter which Survey to delete.
     */
    where: SurveyWhereUniqueInput
  }

  /**
   * Survey deleteMany
   */
  export type SurveyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Surveys to delete
     */
    where?: SurveyWhereInput
    /**
     * Limit how many Surveys to delete.
     */
    limit?: number
  }

  /**
   * Survey.responses
   */
  export type Survey$responsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    where?: SurveyResponseWhereInput
    orderBy?: SurveyResponseOrderByWithRelationInput | SurveyResponseOrderByWithRelationInput[]
    cursor?: SurveyResponseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SurveyResponseScalarFieldEnum | SurveyResponseScalarFieldEnum[]
  }

  /**
   * Survey.cancellationRequest
   */
  export type Survey$cancellationRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyCancellationRequest
     */
    select?: SurveyCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyCancellationRequest
     */
    omit?: SurveyCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyCancellationRequestInclude<ExtArgs> | null
    where?: SurveyCancellationRequestWhereInput
  }

  /**
   * Survey without action
   */
  export type SurveyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Survey
     */
    omit?: SurveyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
  }


  /**
   * Model SurveyResponse
   */

  export type AggregateSurveyResponse = {
    _count: SurveyResponseCountAggregateOutputType | null
    _min: SurveyResponseMinAggregateOutputType | null
    _max: SurveyResponseMaxAggregateOutputType | null
  }

  export type SurveyResponseMinAggregateOutputType = {
    id: string | null
    surveyId: string | null
    consumerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SurveyResponseMaxAggregateOutputType = {
    id: string | null
    surveyId: string | null
    consumerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SurveyResponseCountAggregateOutputType = {
    id: number
    surveyId: number
    consumerId: number
    responses: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SurveyResponseMinAggregateInputType = {
    id?: true
    surveyId?: true
    consumerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SurveyResponseMaxAggregateInputType = {
    id?: true
    surveyId?: true
    consumerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SurveyResponseCountAggregateInputType = {
    id?: true
    surveyId?: true
    consumerId?: true
    responses?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SurveyResponseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SurveyResponse to aggregate.
     */
    where?: SurveyResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyResponses to fetch.
     */
    orderBy?: SurveyResponseOrderByWithRelationInput | SurveyResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SurveyResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SurveyResponses
    **/
    _count?: true | SurveyResponseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SurveyResponseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SurveyResponseMaxAggregateInputType
  }

  export type GetSurveyResponseAggregateType<T extends SurveyResponseAggregateArgs> = {
        [P in keyof T & keyof AggregateSurveyResponse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSurveyResponse[P]>
      : GetScalarType<T[P], AggregateSurveyResponse[P]>
  }




  export type SurveyResponseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SurveyResponseWhereInput
    orderBy?: SurveyResponseOrderByWithAggregationInput | SurveyResponseOrderByWithAggregationInput[]
    by: SurveyResponseScalarFieldEnum[] | SurveyResponseScalarFieldEnum
    having?: SurveyResponseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SurveyResponseCountAggregateInputType | true
    _min?: SurveyResponseMinAggregateInputType
    _max?: SurveyResponseMaxAggregateInputType
  }

  export type SurveyResponseGroupByOutputType = {
    id: string
    surveyId: string
    consumerId: string
    responses: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: SurveyResponseCountAggregateOutputType | null
    _min: SurveyResponseMinAggregateOutputType | null
    _max: SurveyResponseMaxAggregateOutputType | null
  }

  type GetSurveyResponseGroupByPayload<T extends SurveyResponseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SurveyResponseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SurveyResponseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SurveyResponseGroupByOutputType[P]>
            : GetScalarType<T[P], SurveyResponseGroupByOutputType[P]>
        }
      >
    >


  export type SurveyResponseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    surveyId?: boolean
    consumerId?: boolean
    responses?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consumer?: boolean | UserDefaultArgs<ExtArgs>
    survey?: boolean | SurveyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["surveyResponse"]>

  export type SurveyResponseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    surveyId?: boolean
    consumerId?: boolean
    responses?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consumer?: boolean | UserDefaultArgs<ExtArgs>
    survey?: boolean | SurveyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["surveyResponse"]>

  export type SurveyResponseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    surveyId?: boolean
    consumerId?: boolean
    responses?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consumer?: boolean | UserDefaultArgs<ExtArgs>
    survey?: boolean | SurveyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["surveyResponse"]>

  export type SurveyResponseSelectScalar = {
    id?: boolean
    surveyId?: boolean
    consumerId?: boolean
    responses?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SurveyResponseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "surveyId" | "consumerId" | "responses" | "createdAt" | "updatedAt", ExtArgs["result"]["surveyResponse"]>
  export type SurveyResponseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consumer?: boolean | UserDefaultArgs<ExtArgs>
    survey?: boolean | SurveyDefaultArgs<ExtArgs>
  }
  export type SurveyResponseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consumer?: boolean | UserDefaultArgs<ExtArgs>
    survey?: boolean | SurveyDefaultArgs<ExtArgs>
  }
  export type SurveyResponseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consumer?: boolean | UserDefaultArgs<ExtArgs>
    survey?: boolean | SurveyDefaultArgs<ExtArgs>
  }

  export type $SurveyResponsePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SurveyResponse"
    objects: {
      consumer: Prisma.$UserPayload<ExtArgs>
      survey: Prisma.$SurveyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      surveyId: string
      consumerId: string
      responses: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["surveyResponse"]>
    composites: {}
  }

  type SurveyResponseGetPayload<S extends boolean | null | undefined | SurveyResponseDefaultArgs> = $Result.GetResult<Prisma.$SurveyResponsePayload, S>

  type SurveyResponseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SurveyResponseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SurveyResponseCountAggregateInputType | true
    }

  export interface SurveyResponseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SurveyResponse'], meta: { name: 'SurveyResponse' } }
    /**
     * Find zero or one SurveyResponse that matches the filter.
     * @param {SurveyResponseFindUniqueArgs} args - Arguments to find a SurveyResponse
     * @example
     * // Get one SurveyResponse
     * const surveyResponse = await prisma.surveyResponse.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SurveyResponseFindUniqueArgs>(args: SelectSubset<T, SurveyResponseFindUniqueArgs<ExtArgs>>): Prisma__SurveyResponseClient<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SurveyResponse that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SurveyResponseFindUniqueOrThrowArgs} args - Arguments to find a SurveyResponse
     * @example
     * // Get one SurveyResponse
     * const surveyResponse = await prisma.surveyResponse.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SurveyResponseFindUniqueOrThrowArgs>(args: SelectSubset<T, SurveyResponseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SurveyResponseClient<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SurveyResponse that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyResponseFindFirstArgs} args - Arguments to find a SurveyResponse
     * @example
     * // Get one SurveyResponse
     * const surveyResponse = await prisma.surveyResponse.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SurveyResponseFindFirstArgs>(args?: SelectSubset<T, SurveyResponseFindFirstArgs<ExtArgs>>): Prisma__SurveyResponseClient<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SurveyResponse that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyResponseFindFirstOrThrowArgs} args - Arguments to find a SurveyResponse
     * @example
     * // Get one SurveyResponse
     * const surveyResponse = await prisma.surveyResponse.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SurveyResponseFindFirstOrThrowArgs>(args?: SelectSubset<T, SurveyResponseFindFirstOrThrowArgs<ExtArgs>>): Prisma__SurveyResponseClient<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SurveyResponses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyResponseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SurveyResponses
     * const surveyResponses = await prisma.surveyResponse.findMany()
     * 
     * // Get first 10 SurveyResponses
     * const surveyResponses = await prisma.surveyResponse.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const surveyResponseWithIdOnly = await prisma.surveyResponse.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SurveyResponseFindManyArgs>(args?: SelectSubset<T, SurveyResponseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SurveyResponse.
     * @param {SurveyResponseCreateArgs} args - Arguments to create a SurveyResponse.
     * @example
     * // Create one SurveyResponse
     * const SurveyResponse = await prisma.surveyResponse.create({
     *   data: {
     *     // ... data to create a SurveyResponse
     *   }
     * })
     * 
     */
    create<T extends SurveyResponseCreateArgs>(args: SelectSubset<T, SurveyResponseCreateArgs<ExtArgs>>): Prisma__SurveyResponseClient<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SurveyResponses.
     * @param {SurveyResponseCreateManyArgs} args - Arguments to create many SurveyResponses.
     * @example
     * // Create many SurveyResponses
     * const surveyResponse = await prisma.surveyResponse.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SurveyResponseCreateManyArgs>(args?: SelectSubset<T, SurveyResponseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SurveyResponses and returns the data saved in the database.
     * @param {SurveyResponseCreateManyAndReturnArgs} args - Arguments to create many SurveyResponses.
     * @example
     * // Create many SurveyResponses
     * const surveyResponse = await prisma.surveyResponse.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SurveyResponses and only return the `id`
     * const surveyResponseWithIdOnly = await prisma.surveyResponse.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SurveyResponseCreateManyAndReturnArgs>(args?: SelectSubset<T, SurveyResponseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SurveyResponse.
     * @param {SurveyResponseDeleteArgs} args - Arguments to delete one SurveyResponse.
     * @example
     * // Delete one SurveyResponse
     * const SurveyResponse = await prisma.surveyResponse.delete({
     *   where: {
     *     // ... filter to delete one SurveyResponse
     *   }
     * })
     * 
     */
    delete<T extends SurveyResponseDeleteArgs>(args: SelectSubset<T, SurveyResponseDeleteArgs<ExtArgs>>): Prisma__SurveyResponseClient<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SurveyResponse.
     * @param {SurveyResponseUpdateArgs} args - Arguments to update one SurveyResponse.
     * @example
     * // Update one SurveyResponse
     * const surveyResponse = await prisma.surveyResponse.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SurveyResponseUpdateArgs>(args: SelectSubset<T, SurveyResponseUpdateArgs<ExtArgs>>): Prisma__SurveyResponseClient<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SurveyResponses.
     * @param {SurveyResponseDeleteManyArgs} args - Arguments to filter SurveyResponses to delete.
     * @example
     * // Delete a few SurveyResponses
     * const { count } = await prisma.surveyResponse.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SurveyResponseDeleteManyArgs>(args?: SelectSubset<T, SurveyResponseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SurveyResponses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyResponseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SurveyResponses
     * const surveyResponse = await prisma.surveyResponse.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SurveyResponseUpdateManyArgs>(args: SelectSubset<T, SurveyResponseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SurveyResponses and returns the data updated in the database.
     * @param {SurveyResponseUpdateManyAndReturnArgs} args - Arguments to update many SurveyResponses.
     * @example
     * // Update many SurveyResponses
     * const surveyResponse = await prisma.surveyResponse.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SurveyResponses and only return the `id`
     * const surveyResponseWithIdOnly = await prisma.surveyResponse.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SurveyResponseUpdateManyAndReturnArgs>(args: SelectSubset<T, SurveyResponseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SurveyResponse.
     * @param {SurveyResponseUpsertArgs} args - Arguments to update or create a SurveyResponse.
     * @example
     * // Update or create a SurveyResponse
     * const surveyResponse = await prisma.surveyResponse.upsert({
     *   create: {
     *     // ... data to create a SurveyResponse
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SurveyResponse we want to update
     *   }
     * })
     */
    upsert<T extends SurveyResponseUpsertArgs>(args: SelectSubset<T, SurveyResponseUpsertArgs<ExtArgs>>): Prisma__SurveyResponseClient<$Result.GetResult<Prisma.$SurveyResponsePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SurveyResponses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyResponseCountArgs} args - Arguments to filter SurveyResponses to count.
     * @example
     * // Count the number of SurveyResponses
     * const count = await prisma.surveyResponse.count({
     *   where: {
     *     // ... the filter for the SurveyResponses we want to count
     *   }
     * })
    **/
    count<T extends SurveyResponseCountArgs>(
      args?: Subset<T, SurveyResponseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SurveyResponseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SurveyResponse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyResponseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SurveyResponseAggregateArgs>(args: Subset<T, SurveyResponseAggregateArgs>): Prisma.PrismaPromise<GetSurveyResponseAggregateType<T>>

    /**
     * Group by SurveyResponse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyResponseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SurveyResponseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SurveyResponseGroupByArgs['orderBy'] }
        : { orderBy?: SurveyResponseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SurveyResponseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSurveyResponseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SurveyResponse model
   */
  readonly fields: SurveyResponseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SurveyResponse.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SurveyResponseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consumer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    survey<T extends SurveyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SurveyDefaultArgs<ExtArgs>>): Prisma__SurveyClient<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SurveyResponse model
   */
  interface SurveyResponseFieldRefs {
    readonly id: FieldRef<"SurveyResponse", 'String'>
    readonly surveyId: FieldRef<"SurveyResponse", 'String'>
    readonly consumerId: FieldRef<"SurveyResponse", 'String'>
    readonly responses: FieldRef<"SurveyResponse", 'Json'>
    readonly createdAt: FieldRef<"SurveyResponse", 'DateTime'>
    readonly updatedAt: FieldRef<"SurveyResponse", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SurveyResponse findUnique
   */
  export type SurveyResponseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    /**
     * Filter, which SurveyResponse to fetch.
     */
    where: SurveyResponseWhereUniqueInput
  }

  /**
   * SurveyResponse findUniqueOrThrow
   */
  export type SurveyResponseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    /**
     * Filter, which SurveyResponse to fetch.
     */
    where: SurveyResponseWhereUniqueInput
  }

  /**
   * SurveyResponse findFirst
   */
  export type SurveyResponseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    /**
     * Filter, which SurveyResponse to fetch.
     */
    where?: SurveyResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyResponses to fetch.
     */
    orderBy?: SurveyResponseOrderByWithRelationInput | SurveyResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SurveyResponses.
     */
    cursor?: SurveyResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SurveyResponses.
     */
    distinct?: SurveyResponseScalarFieldEnum | SurveyResponseScalarFieldEnum[]
  }

  /**
   * SurveyResponse findFirstOrThrow
   */
  export type SurveyResponseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    /**
     * Filter, which SurveyResponse to fetch.
     */
    where?: SurveyResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyResponses to fetch.
     */
    orderBy?: SurveyResponseOrderByWithRelationInput | SurveyResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SurveyResponses.
     */
    cursor?: SurveyResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SurveyResponses.
     */
    distinct?: SurveyResponseScalarFieldEnum | SurveyResponseScalarFieldEnum[]
  }

  /**
   * SurveyResponse findMany
   */
  export type SurveyResponseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    /**
     * Filter, which SurveyResponses to fetch.
     */
    where?: SurveyResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyResponses to fetch.
     */
    orderBy?: SurveyResponseOrderByWithRelationInput | SurveyResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SurveyResponses.
     */
    cursor?: SurveyResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyResponses.
     */
    skip?: number
    distinct?: SurveyResponseScalarFieldEnum | SurveyResponseScalarFieldEnum[]
  }

  /**
   * SurveyResponse create
   */
  export type SurveyResponseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    /**
     * The data needed to create a SurveyResponse.
     */
    data: XOR<SurveyResponseCreateInput, SurveyResponseUncheckedCreateInput>
  }

  /**
   * SurveyResponse createMany
   */
  export type SurveyResponseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SurveyResponses.
     */
    data: SurveyResponseCreateManyInput | SurveyResponseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SurveyResponse createManyAndReturn
   */
  export type SurveyResponseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * The data used to create many SurveyResponses.
     */
    data: SurveyResponseCreateManyInput | SurveyResponseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SurveyResponse update
   */
  export type SurveyResponseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    /**
     * The data needed to update a SurveyResponse.
     */
    data: XOR<SurveyResponseUpdateInput, SurveyResponseUncheckedUpdateInput>
    /**
     * Choose, which SurveyResponse to update.
     */
    where: SurveyResponseWhereUniqueInput
  }

  /**
   * SurveyResponse updateMany
   */
  export type SurveyResponseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SurveyResponses.
     */
    data: XOR<SurveyResponseUpdateManyMutationInput, SurveyResponseUncheckedUpdateManyInput>
    /**
     * Filter which SurveyResponses to update
     */
    where?: SurveyResponseWhereInput
    /**
     * Limit how many SurveyResponses to update.
     */
    limit?: number
  }

  /**
   * SurveyResponse updateManyAndReturn
   */
  export type SurveyResponseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * The data used to update SurveyResponses.
     */
    data: XOR<SurveyResponseUpdateManyMutationInput, SurveyResponseUncheckedUpdateManyInput>
    /**
     * Filter which SurveyResponses to update
     */
    where?: SurveyResponseWhereInput
    /**
     * Limit how many SurveyResponses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SurveyResponse upsert
   */
  export type SurveyResponseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    /**
     * The filter to search for the SurveyResponse to update in case it exists.
     */
    where: SurveyResponseWhereUniqueInput
    /**
     * In case the SurveyResponse found by the `where` argument doesn't exist, create a new SurveyResponse with this data.
     */
    create: XOR<SurveyResponseCreateInput, SurveyResponseUncheckedCreateInput>
    /**
     * In case the SurveyResponse was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SurveyResponseUpdateInput, SurveyResponseUncheckedUpdateInput>
  }

  /**
   * SurveyResponse delete
   */
  export type SurveyResponseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
    /**
     * Filter which SurveyResponse to delete.
     */
    where: SurveyResponseWhereUniqueInput
  }

  /**
   * SurveyResponse deleteMany
   */
  export type SurveyResponseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SurveyResponses to delete
     */
    where?: SurveyResponseWhereInput
    /**
     * Limit how many SurveyResponses to delete.
     */
    limit?: number
  }

  /**
   * SurveyResponse without action
   */
  export type SurveyResponseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyResponse
     */
    select?: SurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyResponse
     */
    omit?: SurveyResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyResponseInclude<ExtArgs> | null
  }


  /**
   * Model Reward
   */

  export type AggregateReward = {
    _count: RewardCountAggregateOutputType | null
    _avg: RewardAvgAggregateOutputType | null
    _sum: RewardSumAggregateOutputType | null
    _min: RewardMinAggregateOutputType | null
    _max: RewardMaxAggregateOutputType | null
  }

  export type RewardAvgAggregateOutputType = {
    amount: number | null
  }

  export type RewardSumAggregateOutputType = {
    amount: number | null
  }

  export type RewardMinAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    type: $Enums.RewardType | null
    status: $Enums.RewardStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RewardMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    type: $Enums.RewardType | null
    status: $Enums.RewardStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RewardCountAggregateOutputType = {
    id: number
    userId: number
    amount: number
    type: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RewardAvgAggregateInputType = {
    amount?: true
  }

  export type RewardSumAggregateInputType = {
    amount?: true
  }

  export type RewardMinAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    type?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RewardMaxAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    type?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RewardCountAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    type?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RewardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reward to aggregate.
     */
    where?: RewardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rewards to fetch.
     */
    orderBy?: RewardOrderByWithRelationInput | RewardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RewardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rewards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rewards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rewards
    **/
    _count?: true | RewardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RewardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RewardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RewardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RewardMaxAggregateInputType
  }

  export type GetRewardAggregateType<T extends RewardAggregateArgs> = {
        [P in keyof T & keyof AggregateReward]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReward[P]>
      : GetScalarType<T[P], AggregateReward[P]>
  }




  export type RewardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RewardWhereInput
    orderBy?: RewardOrderByWithAggregationInput | RewardOrderByWithAggregationInput[]
    by: RewardScalarFieldEnum[] | RewardScalarFieldEnum
    having?: RewardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RewardCountAggregateInputType | true
    _avg?: RewardAvgAggregateInputType
    _sum?: RewardSumAggregateInputType
    _min?: RewardMinAggregateInputType
    _max?: RewardMaxAggregateInputType
  }

  export type RewardGroupByOutputType = {
    id: string
    userId: string
    amount: number
    type: $Enums.RewardType
    status: $Enums.RewardStatus
    createdAt: Date
    updatedAt: Date
    _count: RewardCountAggregateOutputType | null
    _avg: RewardAvgAggregateOutputType | null
    _sum: RewardSumAggregateOutputType | null
    _min: RewardMinAggregateOutputType | null
    _max: RewardMaxAggregateOutputType | null
  }

  type GetRewardGroupByPayload<T extends RewardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RewardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RewardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RewardGroupByOutputType[P]>
            : GetScalarType<T[P], RewardGroupByOutputType[P]>
        }
      >
    >


  export type RewardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reward"]>

  export type RewardSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reward"]>

  export type RewardSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reward"]>

  export type RewardSelectScalar = {
    id?: boolean
    userId?: boolean
    amount?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RewardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "amount" | "type" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["reward"]>
  export type RewardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RewardIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RewardIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RewardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Reward"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      amount: number
      type: $Enums.RewardType
      status: $Enums.RewardStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["reward"]>
    composites: {}
  }

  type RewardGetPayload<S extends boolean | null | undefined | RewardDefaultArgs> = $Result.GetResult<Prisma.$RewardPayload, S>

  type RewardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RewardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RewardCountAggregateInputType | true
    }

  export interface RewardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Reward'], meta: { name: 'Reward' } }
    /**
     * Find zero or one Reward that matches the filter.
     * @param {RewardFindUniqueArgs} args - Arguments to find a Reward
     * @example
     * // Get one Reward
     * const reward = await prisma.reward.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RewardFindUniqueArgs>(args: SelectSubset<T, RewardFindUniqueArgs<ExtArgs>>): Prisma__RewardClient<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reward that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RewardFindUniqueOrThrowArgs} args - Arguments to find a Reward
     * @example
     * // Get one Reward
     * const reward = await prisma.reward.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RewardFindUniqueOrThrowArgs>(args: SelectSubset<T, RewardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RewardClient<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reward that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardFindFirstArgs} args - Arguments to find a Reward
     * @example
     * // Get one Reward
     * const reward = await prisma.reward.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RewardFindFirstArgs>(args?: SelectSubset<T, RewardFindFirstArgs<ExtArgs>>): Prisma__RewardClient<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reward that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardFindFirstOrThrowArgs} args - Arguments to find a Reward
     * @example
     * // Get one Reward
     * const reward = await prisma.reward.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RewardFindFirstOrThrowArgs>(args?: SelectSubset<T, RewardFindFirstOrThrowArgs<ExtArgs>>): Prisma__RewardClient<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rewards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rewards
     * const rewards = await prisma.reward.findMany()
     * 
     * // Get first 10 Rewards
     * const rewards = await prisma.reward.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rewardWithIdOnly = await prisma.reward.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RewardFindManyArgs>(args?: SelectSubset<T, RewardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reward.
     * @param {RewardCreateArgs} args - Arguments to create a Reward.
     * @example
     * // Create one Reward
     * const Reward = await prisma.reward.create({
     *   data: {
     *     // ... data to create a Reward
     *   }
     * })
     * 
     */
    create<T extends RewardCreateArgs>(args: SelectSubset<T, RewardCreateArgs<ExtArgs>>): Prisma__RewardClient<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rewards.
     * @param {RewardCreateManyArgs} args - Arguments to create many Rewards.
     * @example
     * // Create many Rewards
     * const reward = await prisma.reward.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RewardCreateManyArgs>(args?: SelectSubset<T, RewardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rewards and returns the data saved in the database.
     * @param {RewardCreateManyAndReturnArgs} args - Arguments to create many Rewards.
     * @example
     * // Create many Rewards
     * const reward = await prisma.reward.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rewards and only return the `id`
     * const rewardWithIdOnly = await prisma.reward.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RewardCreateManyAndReturnArgs>(args?: SelectSubset<T, RewardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Reward.
     * @param {RewardDeleteArgs} args - Arguments to delete one Reward.
     * @example
     * // Delete one Reward
     * const Reward = await prisma.reward.delete({
     *   where: {
     *     // ... filter to delete one Reward
     *   }
     * })
     * 
     */
    delete<T extends RewardDeleteArgs>(args: SelectSubset<T, RewardDeleteArgs<ExtArgs>>): Prisma__RewardClient<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reward.
     * @param {RewardUpdateArgs} args - Arguments to update one Reward.
     * @example
     * // Update one Reward
     * const reward = await prisma.reward.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RewardUpdateArgs>(args: SelectSubset<T, RewardUpdateArgs<ExtArgs>>): Prisma__RewardClient<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rewards.
     * @param {RewardDeleteManyArgs} args - Arguments to filter Rewards to delete.
     * @example
     * // Delete a few Rewards
     * const { count } = await prisma.reward.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RewardDeleteManyArgs>(args?: SelectSubset<T, RewardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rewards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rewards
     * const reward = await prisma.reward.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RewardUpdateManyArgs>(args: SelectSubset<T, RewardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rewards and returns the data updated in the database.
     * @param {RewardUpdateManyAndReturnArgs} args - Arguments to update many Rewards.
     * @example
     * // Update many Rewards
     * const reward = await prisma.reward.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rewards and only return the `id`
     * const rewardWithIdOnly = await prisma.reward.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RewardUpdateManyAndReturnArgs>(args: SelectSubset<T, RewardUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Reward.
     * @param {RewardUpsertArgs} args - Arguments to update or create a Reward.
     * @example
     * // Update or create a Reward
     * const reward = await prisma.reward.upsert({
     *   create: {
     *     // ... data to create a Reward
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reward we want to update
     *   }
     * })
     */
    upsert<T extends RewardUpsertArgs>(args: SelectSubset<T, RewardUpsertArgs<ExtArgs>>): Prisma__RewardClient<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rewards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardCountArgs} args - Arguments to filter Rewards to count.
     * @example
     * // Count the number of Rewards
     * const count = await prisma.reward.count({
     *   where: {
     *     // ... the filter for the Rewards we want to count
     *   }
     * })
    **/
    count<T extends RewardCountArgs>(
      args?: Subset<T, RewardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RewardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reward.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RewardAggregateArgs>(args: Subset<T, RewardAggregateArgs>): Prisma.PrismaPromise<GetRewardAggregateType<T>>

    /**
     * Group by Reward.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RewardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RewardGroupByArgs['orderBy'] }
        : { orderBy?: RewardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RewardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRewardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Reward model
   */
  readonly fields: RewardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Reward.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RewardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Reward model
   */
  interface RewardFieldRefs {
    readonly id: FieldRef<"Reward", 'String'>
    readonly userId: FieldRef<"Reward", 'String'>
    readonly amount: FieldRef<"Reward", 'Float'>
    readonly type: FieldRef<"Reward", 'RewardType'>
    readonly status: FieldRef<"Reward", 'RewardStatus'>
    readonly createdAt: FieldRef<"Reward", 'DateTime'>
    readonly updatedAt: FieldRef<"Reward", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Reward findUnique
   */
  export type RewardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    /**
     * Filter, which Reward to fetch.
     */
    where: RewardWhereUniqueInput
  }

  /**
   * Reward findUniqueOrThrow
   */
  export type RewardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    /**
     * Filter, which Reward to fetch.
     */
    where: RewardWhereUniqueInput
  }

  /**
   * Reward findFirst
   */
  export type RewardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    /**
     * Filter, which Reward to fetch.
     */
    where?: RewardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rewards to fetch.
     */
    orderBy?: RewardOrderByWithRelationInput | RewardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rewards.
     */
    cursor?: RewardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rewards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rewards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rewards.
     */
    distinct?: RewardScalarFieldEnum | RewardScalarFieldEnum[]
  }

  /**
   * Reward findFirstOrThrow
   */
  export type RewardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    /**
     * Filter, which Reward to fetch.
     */
    where?: RewardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rewards to fetch.
     */
    orderBy?: RewardOrderByWithRelationInput | RewardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rewards.
     */
    cursor?: RewardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rewards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rewards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rewards.
     */
    distinct?: RewardScalarFieldEnum | RewardScalarFieldEnum[]
  }

  /**
   * Reward findMany
   */
  export type RewardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    /**
     * Filter, which Rewards to fetch.
     */
    where?: RewardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rewards to fetch.
     */
    orderBy?: RewardOrderByWithRelationInput | RewardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rewards.
     */
    cursor?: RewardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rewards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rewards.
     */
    skip?: number
    distinct?: RewardScalarFieldEnum | RewardScalarFieldEnum[]
  }

  /**
   * Reward create
   */
  export type RewardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    /**
     * The data needed to create a Reward.
     */
    data: XOR<RewardCreateInput, RewardUncheckedCreateInput>
  }

  /**
   * Reward createMany
   */
  export type RewardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rewards.
     */
    data: RewardCreateManyInput | RewardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Reward createManyAndReturn
   */
  export type RewardCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * The data used to create many Rewards.
     */
    data: RewardCreateManyInput | RewardCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reward update
   */
  export type RewardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    /**
     * The data needed to update a Reward.
     */
    data: XOR<RewardUpdateInput, RewardUncheckedUpdateInput>
    /**
     * Choose, which Reward to update.
     */
    where: RewardWhereUniqueInput
  }

  /**
   * Reward updateMany
   */
  export type RewardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rewards.
     */
    data: XOR<RewardUpdateManyMutationInput, RewardUncheckedUpdateManyInput>
    /**
     * Filter which Rewards to update
     */
    where?: RewardWhereInput
    /**
     * Limit how many Rewards to update.
     */
    limit?: number
  }

  /**
   * Reward updateManyAndReturn
   */
  export type RewardUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * The data used to update Rewards.
     */
    data: XOR<RewardUpdateManyMutationInput, RewardUncheckedUpdateManyInput>
    /**
     * Filter which Rewards to update
     */
    where?: RewardWhereInput
    /**
     * Limit how many Rewards to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reward upsert
   */
  export type RewardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    /**
     * The filter to search for the Reward to update in case it exists.
     */
    where: RewardWhereUniqueInput
    /**
     * In case the Reward found by the `where` argument doesn't exist, create a new Reward with this data.
     */
    create: XOR<RewardCreateInput, RewardUncheckedCreateInput>
    /**
     * In case the Reward was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RewardUpdateInput, RewardUncheckedUpdateInput>
  }

  /**
   * Reward delete
   */
  export type RewardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    /**
     * Filter which Reward to delete.
     */
    where: RewardWhereUniqueInput
  }

  /**
   * Reward deleteMany
   */
  export type RewardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rewards to delete
     */
    where?: RewardWhereInput
    /**
     * Limit how many Rewards to delete.
     */
    limit?: number
  }

  /**
   * Reward without action
   */
  export type RewardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
  }


  /**
   * Model SurveyCancellationRequest
   */

  export type AggregateSurveyCancellationRequest = {
    _count: SurveyCancellationRequestCountAggregateOutputType | null
    _avg: SurveyCancellationRequestAvgAggregateOutputType | null
    _sum: SurveyCancellationRequestSumAggregateOutputType | null
    _min: SurveyCancellationRequestMinAggregateOutputType | null
    _max: SurveyCancellationRequestMaxAggregateOutputType | null
  }

  export type SurveyCancellationRequestAvgAggregateOutputType = {
    refundAmount: number | null
  }

  export type SurveyCancellationRequestSumAggregateOutputType = {
    refundAmount: number | null
  }

  export type SurveyCancellationRequestMinAggregateOutputType = {
    id: string | null
    surveyId: string | null
    reason: string | null
    refundAmount: number | null
    status: $Enums.CancellationStatus | null
    requestedAt: Date | null
    processedAt: Date | null
    processedBy: string | null
  }

  export type SurveyCancellationRequestMaxAggregateOutputType = {
    id: string | null
    surveyId: string | null
    reason: string | null
    refundAmount: number | null
    status: $Enums.CancellationStatus | null
    requestedAt: Date | null
    processedAt: Date | null
    processedBy: string | null
  }

  export type SurveyCancellationRequestCountAggregateOutputType = {
    id: number
    surveyId: number
    reason: number
    refundAmount: number
    status: number
    requestedAt: number
    processedAt: number
    processedBy: number
    _all: number
  }


  export type SurveyCancellationRequestAvgAggregateInputType = {
    refundAmount?: true
  }

  export type SurveyCancellationRequestSumAggregateInputType = {
    refundAmount?: true
  }

  export type SurveyCancellationRequestMinAggregateInputType = {
    id?: true
    surveyId?: true
    reason?: true
    refundAmount?: true
    status?: true
    requestedAt?: true
    processedAt?: true
    processedBy?: true
  }

  export type SurveyCancellationRequestMaxAggregateInputType = {
    id?: true
    surveyId?: true
    reason?: true
    refundAmount?: true
    status?: true
    requestedAt?: true
    processedAt?: true
    processedBy?: true
  }

  export type SurveyCancellationRequestCountAggregateInputType = {
    id?: true
    surveyId?: true
    reason?: true
    refundAmount?: true
    status?: true
    requestedAt?: true
    processedAt?: true
    processedBy?: true
    _all?: true
  }

  export type SurveyCancellationRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SurveyCancellationRequest to aggregate.
     */
    where?: SurveyCancellationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyCancellationRequests to fetch.
     */
    orderBy?: SurveyCancellationRequestOrderByWithRelationInput | SurveyCancellationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SurveyCancellationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyCancellationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyCancellationRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SurveyCancellationRequests
    **/
    _count?: true | SurveyCancellationRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SurveyCancellationRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SurveyCancellationRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SurveyCancellationRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SurveyCancellationRequestMaxAggregateInputType
  }

  export type GetSurveyCancellationRequestAggregateType<T extends SurveyCancellationRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateSurveyCancellationRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSurveyCancellationRequest[P]>
      : GetScalarType<T[P], AggregateSurveyCancellationRequest[P]>
  }




  export type SurveyCancellationRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SurveyCancellationRequestWhereInput
    orderBy?: SurveyCancellationRequestOrderByWithAggregationInput | SurveyCancellationRequestOrderByWithAggregationInput[]
    by: SurveyCancellationRequestScalarFieldEnum[] | SurveyCancellationRequestScalarFieldEnum
    having?: SurveyCancellationRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SurveyCancellationRequestCountAggregateInputType | true
    _avg?: SurveyCancellationRequestAvgAggregateInputType
    _sum?: SurveyCancellationRequestSumAggregateInputType
    _min?: SurveyCancellationRequestMinAggregateInputType
    _max?: SurveyCancellationRequestMaxAggregateInputType
  }

  export type SurveyCancellationRequestGroupByOutputType = {
    id: string
    surveyId: string
    reason: string
    refundAmount: number
    status: $Enums.CancellationStatus
    requestedAt: Date
    processedAt: Date | null
    processedBy: string | null
    _count: SurveyCancellationRequestCountAggregateOutputType | null
    _avg: SurveyCancellationRequestAvgAggregateOutputType | null
    _sum: SurveyCancellationRequestSumAggregateOutputType | null
    _min: SurveyCancellationRequestMinAggregateOutputType | null
    _max: SurveyCancellationRequestMaxAggregateOutputType | null
  }

  type GetSurveyCancellationRequestGroupByPayload<T extends SurveyCancellationRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SurveyCancellationRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SurveyCancellationRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SurveyCancellationRequestGroupByOutputType[P]>
            : GetScalarType<T[P], SurveyCancellationRequestGroupByOutputType[P]>
        }
      >
    >


  export type SurveyCancellationRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    surveyId?: boolean
    reason?: boolean
    refundAmount?: boolean
    status?: boolean
    requestedAt?: boolean
    processedAt?: boolean
    processedBy?: boolean
    survey?: boolean | SurveyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["surveyCancellationRequest"]>

  export type SurveyCancellationRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    surveyId?: boolean
    reason?: boolean
    refundAmount?: boolean
    status?: boolean
    requestedAt?: boolean
    processedAt?: boolean
    processedBy?: boolean
    survey?: boolean | SurveyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["surveyCancellationRequest"]>

  export type SurveyCancellationRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    surveyId?: boolean
    reason?: boolean
    refundAmount?: boolean
    status?: boolean
    requestedAt?: boolean
    processedAt?: boolean
    processedBy?: boolean
    survey?: boolean | SurveyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["surveyCancellationRequest"]>

  export type SurveyCancellationRequestSelectScalar = {
    id?: boolean
    surveyId?: boolean
    reason?: boolean
    refundAmount?: boolean
    status?: boolean
    requestedAt?: boolean
    processedAt?: boolean
    processedBy?: boolean
  }

  export type SurveyCancellationRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "surveyId" | "reason" | "refundAmount" | "status" | "requestedAt" | "processedAt" | "processedBy", ExtArgs["result"]["surveyCancellationRequest"]>
  export type SurveyCancellationRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    survey?: boolean | SurveyDefaultArgs<ExtArgs>
  }
  export type SurveyCancellationRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    survey?: boolean | SurveyDefaultArgs<ExtArgs>
  }
  export type SurveyCancellationRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    survey?: boolean | SurveyDefaultArgs<ExtArgs>
  }

  export type $SurveyCancellationRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SurveyCancellationRequest"
    objects: {
      survey: Prisma.$SurveyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      surveyId: string
      reason: string
      refundAmount: number
      status: $Enums.CancellationStatus
      requestedAt: Date
      processedAt: Date | null
      processedBy: string | null
    }, ExtArgs["result"]["surveyCancellationRequest"]>
    composites: {}
  }

  type SurveyCancellationRequestGetPayload<S extends boolean | null | undefined | SurveyCancellationRequestDefaultArgs> = $Result.GetResult<Prisma.$SurveyCancellationRequestPayload, S>

  type SurveyCancellationRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SurveyCancellationRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SurveyCancellationRequestCountAggregateInputType | true
    }

  export interface SurveyCancellationRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SurveyCancellationRequest'], meta: { name: 'SurveyCancellationRequest' } }
    /**
     * Find zero or one SurveyCancellationRequest that matches the filter.
     * @param {SurveyCancellationRequestFindUniqueArgs} args - Arguments to find a SurveyCancellationRequest
     * @example
     * // Get one SurveyCancellationRequest
     * const surveyCancellationRequest = await prisma.surveyCancellationRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SurveyCancellationRequestFindUniqueArgs>(args: SelectSubset<T, SurveyCancellationRequestFindUniqueArgs<ExtArgs>>): Prisma__SurveyCancellationRequestClient<$Result.GetResult<Prisma.$SurveyCancellationRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SurveyCancellationRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SurveyCancellationRequestFindUniqueOrThrowArgs} args - Arguments to find a SurveyCancellationRequest
     * @example
     * // Get one SurveyCancellationRequest
     * const surveyCancellationRequest = await prisma.surveyCancellationRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SurveyCancellationRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, SurveyCancellationRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SurveyCancellationRequestClient<$Result.GetResult<Prisma.$SurveyCancellationRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SurveyCancellationRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyCancellationRequestFindFirstArgs} args - Arguments to find a SurveyCancellationRequest
     * @example
     * // Get one SurveyCancellationRequest
     * const surveyCancellationRequest = await prisma.surveyCancellationRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SurveyCancellationRequestFindFirstArgs>(args?: SelectSubset<T, SurveyCancellationRequestFindFirstArgs<ExtArgs>>): Prisma__SurveyCancellationRequestClient<$Result.GetResult<Prisma.$SurveyCancellationRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SurveyCancellationRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyCancellationRequestFindFirstOrThrowArgs} args - Arguments to find a SurveyCancellationRequest
     * @example
     * // Get one SurveyCancellationRequest
     * const surveyCancellationRequest = await prisma.surveyCancellationRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SurveyCancellationRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, SurveyCancellationRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__SurveyCancellationRequestClient<$Result.GetResult<Prisma.$SurveyCancellationRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SurveyCancellationRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyCancellationRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SurveyCancellationRequests
     * const surveyCancellationRequests = await prisma.surveyCancellationRequest.findMany()
     * 
     * // Get first 10 SurveyCancellationRequests
     * const surveyCancellationRequests = await prisma.surveyCancellationRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const surveyCancellationRequestWithIdOnly = await prisma.surveyCancellationRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SurveyCancellationRequestFindManyArgs>(args?: SelectSubset<T, SurveyCancellationRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyCancellationRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SurveyCancellationRequest.
     * @param {SurveyCancellationRequestCreateArgs} args - Arguments to create a SurveyCancellationRequest.
     * @example
     * // Create one SurveyCancellationRequest
     * const SurveyCancellationRequest = await prisma.surveyCancellationRequest.create({
     *   data: {
     *     // ... data to create a SurveyCancellationRequest
     *   }
     * })
     * 
     */
    create<T extends SurveyCancellationRequestCreateArgs>(args: SelectSubset<T, SurveyCancellationRequestCreateArgs<ExtArgs>>): Prisma__SurveyCancellationRequestClient<$Result.GetResult<Prisma.$SurveyCancellationRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SurveyCancellationRequests.
     * @param {SurveyCancellationRequestCreateManyArgs} args - Arguments to create many SurveyCancellationRequests.
     * @example
     * // Create many SurveyCancellationRequests
     * const surveyCancellationRequest = await prisma.surveyCancellationRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SurveyCancellationRequestCreateManyArgs>(args?: SelectSubset<T, SurveyCancellationRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SurveyCancellationRequests and returns the data saved in the database.
     * @param {SurveyCancellationRequestCreateManyAndReturnArgs} args - Arguments to create many SurveyCancellationRequests.
     * @example
     * // Create many SurveyCancellationRequests
     * const surveyCancellationRequest = await prisma.surveyCancellationRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SurveyCancellationRequests and only return the `id`
     * const surveyCancellationRequestWithIdOnly = await prisma.surveyCancellationRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SurveyCancellationRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, SurveyCancellationRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyCancellationRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SurveyCancellationRequest.
     * @param {SurveyCancellationRequestDeleteArgs} args - Arguments to delete one SurveyCancellationRequest.
     * @example
     * // Delete one SurveyCancellationRequest
     * const SurveyCancellationRequest = await prisma.surveyCancellationRequest.delete({
     *   where: {
     *     // ... filter to delete one SurveyCancellationRequest
     *   }
     * })
     * 
     */
    delete<T extends SurveyCancellationRequestDeleteArgs>(args: SelectSubset<T, SurveyCancellationRequestDeleteArgs<ExtArgs>>): Prisma__SurveyCancellationRequestClient<$Result.GetResult<Prisma.$SurveyCancellationRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SurveyCancellationRequest.
     * @param {SurveyCancellationRequestUpdateArgs} args - Arguments to update one SurveyCancellationRequest.
     * @example
     * // Update one SurveyCancellationRequest
     * const surveyCancellationRequest = await prisma.surveyCancellationRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SurveyCancellationRequestUpdateArgs>(args: SelectSubset<T, SurveyCancellationRequestUpdateArgs<ExtArgs>>): Prisma__SurveyCancellationRequestClient<$Result.GetResult<Prisma.$SurveyCancellationRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SurveyCancellationRequests.
     * @param {SurveyCancellationRequestDeleteManyArgs} args - Arguments to filter SurveyCancellationRequests to delete.
     * @example
     * // Delete a few SurveyCancellationRequests
     * const { count } = await prisma.surveyCancellationRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SurveyCancellationRequestDeleteManyArgs>(args?: SelectSubset<T, SurveyCancellationRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SurveyCancellationRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyCancellationRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SurveyCancellationRequests
     * const surveyCancellationRequest = await prisma.surveyCancellationRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SurveyCancellationRequestUpdateManyArgs>(args: SelectSubset<T, SurveyCancellationRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SurveyCancellationRequests and returns the data updated in the database.
     * @param {SurveyCancellationRequestUpdateManyAndReturnArgs} args - Arguments to update many SurveyCancellationRequests.
     * @example
     * // Update many SurveyCancellationRequests
     * const surveyCancellationRequest = await prisma.surveyCancellationRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SurveyCancellationRequests and only return the `id`
     * const surveyCancellationRequestWithIdOnly = await prisma.surveyCancellationRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SurveyCancellationRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, SurveyCancellationRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyCancellationRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SurveyCancellationRequest.
     * @param {SurveyCancellationRequestUpsertArgs} args - Arguments to update or create a SurveyCancellationRequest.
     * @example
     * // Update or create a SurveyCancellationRequest
     * const surveyCancellationRequest = await prisma.surveyCancellationRequest.upsert({
     *   create: {
     *     // ... data to create a SurveyCancellationRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SurveyCancellationRequest we want to update
     *   }
     * })
     */
    upsert<T extends SurveyCancellationRequestUpsertArgs>(args: SelectSubset<T, SurveyCancellationRequestUpsertArgs<ExtArgs>>): Prisma__SurveyCancellationRequestClient<$Result.GetResult<Prisma.$SurveyCancellationRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SurveyCancellationRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyCancellationRequestCountArgs} args - Arguments to filter SurveyCancellationRequests to count.
     * @example
     * // Count the number of SurveyCancellationRequests
     * const count = await prisma.surveyCancellationRequest.count({
     *   where: {
     *     // ... the filter for the SurveyCancellationRequests we want to count
     *   }
     * })
    **/
    count<T extends SurveyCancellationRequestCountArgs>(
      args?: Subset<T, SurveyCancellationRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SurveyCancellationRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SurveyCancellationRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyCancellationRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SurveyCancellationRequestAggregateArgs>(args: Subset<T, SurveyCancellationRequestAggregateArgs>): Prisma.PrismaPromise<GetSurveyCancellationRequestAggregateType<T>>

    /**
     * Group by SurveyCancellationRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyCancellationRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SurveyCancellationRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SurveyCancellationRequestGroupByArgs['orderBy'] }
        : { orderBy?: SurveyCancellationRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SurveyCancellationRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSurveyCancellationRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SurveyCancellationRequest model
   */
  readonly fields: SurveyCancellationRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SurveyCancellationRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SurveyCancellationRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    survey<T extends SurveyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SurveyDefaultArgs<ExtArgs>>): Prisma__SurveyClient<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SurveyCancellationRequest model
   */
  interface SurveyCancellationRequestFieldRefs {
    readonly id: FieldRef<"SurveyCancellationRequest", 'String'>
    readonly surveyId: FieldRef<"SurveyCancellationRequest", 'String'>
    readonly reason: FieldRef<"SurveyCancellationRequest", 'String'>
    readonly refundAmount: FieldRef<"SurveyCancellationRequest", 'Float'>
    readonly status: FieldRef<"SurveyCancellationRequest", 'CancellationStatus'>
    readonly requestedAt: FieldRef<"SurveyCancellationRequest", 'DateTime'>
    readonly processedAt: FieldRef<"SurveyCancellationRequest", 'DateTime'>
    readonly processedBy: FieldRef<"SurveyCancellationRequest", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SurveyCancellationRequest findUnique
   */
  export type SurveyCancellationRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyCancellationRequest
     */
    select?: SurveyCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyCancellationRequest
     */
    omit?: SurveyCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyCancellationRequestInclude<ExtArgs> | null
    /**
     * Filter, which SurveyCancellationRequest to fetch.
     */
    where: SurveyCancellationRequestWhereUniqueInput
  }

  /**
   * SurveyCancellationRequest findUniqueOrThrow
   */
  export type SurveyCancellationRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyCancellationRequest
     */
    select?: SurveyCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyCancellationRequest
     */
    omit?: SurveyCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyCancellationRequestInclude<ExtArgs> | null
    /**
     * Filter, which SurveyCancellationRequest to fetch.
     */
    where: SurveyCancellationRequestWhereUniqueInput
  }

  /**
   * SurveyCancellationRequest findFirst
   */
  export type SurveyCancellationRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyCancellationRequest
     */
    select?: SurveyCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyCancellationRequest
     */
    omit?: SurveyCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyCancellationRequestInclude<ExtArgs> | null
    /**
     * Filter, which SurveyCancellationRequest to fetch.
     */
    where?: SurveyCancellationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyCancellationRequests to fetch.
     */
    orderBy?: SurveyCancellationRequestOrderByWithRelationInput | SurveyCancellationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SurveyCancellationRequests.
     */
    cursor?: SurveyCancellationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyCancellationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyCancellationRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SurveyCancellationRequests.
     */
    distinct?: SurveyCancellationRequestScalarFieldEnum | SurveyCancellationRequestScalarFieldEnum[]
  }

  /**
   * SurveyCancellationRequest findFirstOrThrow
   */
  export type SurveyCancellationRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyCancellationRequest
     */
    select?: SurveyCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyCancellationRequest
     */
    omit?: SurveyCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyCancellationRequestInclude<ExtArgs> | null
    /**
     * Filter, which SurveyCancellationRequest to fetch.
     */
    where?: SurveyCancellationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyCancellationRequests to fetch.
     */
    orderBy?: SurveyCancellationRequestOrderByWithRelationInput | SurveyCancellationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SurveyCancellationRequests.
     */
    cursor?: SurveyCancellationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyCancellationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyCancellationRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SurveyCancellationRequests.
     */
    distinct?: SurveyCancellationRequestScalarFieldEnum | SurveyCancellationRequestScalarFieldEnum[]
  }

  /**
   * SurveyCancellationRequest findMany
   */
  export type SurveyCancellationRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyCancellationRequest
     */
    select?: SurveyCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyCancellationRequest
     */
    omit?: SurveyCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyCancellationRequestInclude<ExtArgs> | null
    /**
     * Filter, which SurveyCancellationRequests to fetch.
     */
    where?: SurveyCancellationRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyCancellationRequests to fetch.
     */
    orderBy?: SurveyCancellationRequestOrderByWithRelationInput | SurveyCancellationRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SurveyCancellationRequests.
     */
    cursor?: SurveyCancellationRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyCancellationRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyCancellationRequests.
     */
    skip?: number
    distinct?: SurveyCancellationRequestScalarFieldEnum | SurveyCancellationRequestScalarFieldEnum[]
  }

  /**
   * SurveyCancellationRequest create
   */
  export type SurveyCancellationRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyCancellationRequest
     */
    select?: SurveyCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyCancellationRequest
     */
    omit?: SurveyCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyCancellationRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a SurveyCancellationRequest.
     */
    data: XOR<SurveyCancellationRequestCreateInput, SurveyCancellationRequestUncheckedCreateInput>
  }

  /**
   * SurveyCancellationRequest createMany
   */
  export type SurveyCancellationRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SurveyCancellationRequests.
     */
    data: SurveyCancellationRequestCreateManyInput | SurveyCancellationRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SurveyCancellationRequest createManyAndReturn
   */
  export type SurveyCancellationRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyCancellationRequest
     */
    select?: SurveyCancellationRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyCancellationRequest
     */
    omit?: SurveyCancellationRequestOmit<ExtArgs> | null
    /**
     * The data used to create many SurveyCancellationRequests.
     */
    data: SurveyCancellationRequestCreateManyInput | SurveyCancellationRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyCancellationRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SurveyCancellationRequest update
   */
  export type SurveyCancellationRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyCancellationRequest
     */
    select?: SurveyCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyCancellationRequest
     */
    omit?: SurveyCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyCancellationRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a SurveyCancellationRequest.
     */
    data: XOR<SurveyCancellationRequestUpdateInput, SurveyCancellationRequestUncheckedUpdateInput>
    /**
     * Choose, which SurveyCancellationRequest to update.
     */
    where: SurveyCancellationRequestWhereUniqueInput
  }

  /**
   * SurveyCancellationRequest updateMany
   */
  export type SurveyCancellationRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SurveyCancellationRequests.
     */
    data: XOR<SurveyCancellationRequestUpdateManyMutationInput, SurveyCancellationRequestUncheckedUpdateManyInput>
    /**
     * Filter which SurveyCancellationRequests to update
     */
    where?: SurveyCancellationRequestWhereInput
    /**
     * Limit how many SurveyCancellationRequests to update.
     */
    limit?: number
  }

  /**
   * SurveyCancellationRequest updateManyAndReturn
   */
  export type SurveyCancellationRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyCancellationRequest
     */
    select?: SurveyCancellationRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyCancellationRequest
     */
    omit?: SurveyCancellationRequestOmit<ExtArgs> | null
    /**
     * The data used to update SurveyCancellationRequests.
     */
    data: XOR<SurveyCancellationRequestUpdateManyMutationInput, SurveyCancellationRequestUncheckedUpdateManyInput>
    /**
     * Filter which SurveyCancellationRequests to update
     */
    where?: SurveyCancellationRequestWhereInput
    /**
     * Limit how many SurveyCancellationRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyCancellationRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SurveyCancellationRequest upsert
   */
  export type SurveyCancellationRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyCancellationRequest
     */
    select?: SurveyCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyCancellationRequest
     */
    omit?: SurveyCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyCancellationRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the SurveyCancellationRequest to update in case it exists.
     */
    where: SurveyCancellationRequestWhereUniqueInput
    /**
     * In case the SurveyCancellationRequest found by the `where` argument doesn't exist, create a new SurveyCancellationRequest with this data.
     */
    create: XOR<SurveyCancellationRequestCreateInput, SurveyCancellationRequestUncheckedCreateInput>
    /**
     * In case the SurveyCancellationRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SurveyCancellationRequestUpdateInput, SurveyCancellationRequestUncheckedUpdateInput>
  }

  /**
   * SurveyCancellationRequest delete
   */
  export type SurveyCancellationRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyCancellationRequest
     */
    select?: SurveyCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyCancellationRequest
     */
    omit?: SurveyCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyCancellationRequestInclude<ExtArgs> | null
    /**
     * Filter which SurveyCancellationRequest to delete.
     */
    where: SurveyCancellationRequestWhereUniqueInput
  }

  /**
   * SurveyCancellationRequest deleteMany
   */
  export type SurveyCancellationRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SurveyCancellationRequests to delete
     */
    where?: SurveyCancellationRequestWhereInput
    /**
     * Limit how many SurveyCancellationRequests to delete.
     */
    limit?: number
  }

  /**
   * SurveyCancellationRequest without action
   */
  export type SurveyCancellationRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyCancellationRequest
     */
    select?: SurveyCancellationRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyCancellationRequest
     */
    omit?: SurveyCancellationRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyCancellationRequestInclude<ExtArgs> | null
  }


  /**
   * Model WithdrawalRequest
   */

  export type AggregateWithdrawalRequest = {
    _count: WithdrawalRequestCountAggregateOutputType | null
    _avg: WithdrawalRequestAvgAggregateOutputType | null
    _sum: WithdrawalRequestSumAggregateOutputType | null
    _min: WithdrawalRequestMinAggregateOutputType | null
    _max: WithdrawalRequestMaxAggregateOutputType | null
  }

  export type WithdrawalRequestAvgAggregateOutputType = {
    amount: number | null
  }

  export type WithdrawalRequestSumAggregateOutputType = {
    amount: number | null
  }

  export type WithdrawalRequestMinAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    status: $Enums.WithdrawalStatus | null
    requestedAt: Date | null
    processedAt: Date | null
    processedBy: string | null
    note: string | null
  }

  export type WithdrawalRequestMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    status: $Enums.WithdrawalStatus | null
    requestedAt: Date | null
    processedAt: Date | null
    processedBy: string | null
    note: string | null
  }

  export type WithdrawalRequestCountAggregateOutputType = {
    id: number
    userId: number
    amount: number
    status: number
    requestedAt: number
    processedAt: number
    processedBy: number
    note: number
    _all: number
  }


  export type WithdrawalRequestAvgAggregateInputType = {
    amount?: true
  }

  export type WithdrawalRequestSumAggregateInputType = {
    amount?: true
  }

  export type WithdrawalRequestMinAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    status?: true
    requestedAt?: true
    processedAt?: true
    processedBy?: true
    note?: true
  }

  export type WithdrawalRequestMaxAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    status?: true
    requestedAt?: true
    processedAt?: true
    processedBy?: true
    note?: true
  }

  export type WithdrawalRequestCountAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    status?: true
    requestedAt?: true
    processedAt?: true
    processedBy?: true
    note?: true
    _all?: true
  }

  export type WithdrawalRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WithdrawalRequest to aggregate.
     */
    where?: WithdrawalRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WithdrawalRequests to fetch.
     */
    orderBy?: WithdrawalRequestOrderByWithRelationInput | WithdrawalRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WithdrawalRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WithdrawalRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WithdrawalRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WithdrawalRequests
    **/
    _count?: true | WithdrawalRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WithdrawalRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WithdrawalRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WithdrawalRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WithdrawalRequestMaxAggregateInputType
  }

  export type GetWithdrawalRequestAggregateType<T extends WithdrawalRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateWithdrawalRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWithdrawalRequest[P]>
      : GetScalarType<T[P], AggregateWithdrawalRequest[P]>
  }




  export type WithdrawalRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WithdrawalRequestWhereInput
    orderBy?: WithdrawalRequestOrderByWithAggregationInput | WithdrawalRequestOrderByWithAggregationInput[]
    by: WithdrawalRequestScalarFieldEnum[] | WithdrawalRequestScalarFieldEnum
    having?: WithdrawalRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WithdrawalRequestCountAggregateInputType | true
    _avg?: WithdrawalRequestAvgAggregateInputType
    _sum?: WithdrawalRequestSumAggregateInputType
    _min?: WithdrawalRequestMinAggregateInputType
    _max?: WithdrawalRequestMaxAggregateInputType
  }

  export type WithdrawalRequestGroupByOutputType = {
    id: string
    userId: string
    amount: number
    status: $Enums.WithdrawalStatus
    requestedAt: Date
    processedAt: Date | null
    processedBy: string | null
    note: string | null
    _count: WithdrawalRequestCountAggregateOutputType | null
    _avg: WithdrawalRequestAvgAggregateOutputType | null
    _sum: WithdrawalRequestSumAggregateOutputType | null
    _min: WithdrawalRequestMinAggregateOutputType | null
    _max: WithdrawalRequestMaxAggregateOutputType | null
  }

  type GetWithdrawalRequestGroupByPayload<T extends WithdrawalRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WithdrawalRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WithdrawalRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WithdrawalRequestGroupByOutputType[P]>
            : GetScalarType<T[P], WithdrawalRequestGroupByOutputType[P]>
        }
      >
    >


  export type WithdrawalRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    status?: boolean
    requestedAt?: boolean
    processedAt?: boolean
    processedBy?: boolean
    note?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["withdrawalRequest"]>

  export type WithdrawalRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    status?: boolean
    requestedAt?: boolean
    processedAt?: boolean
    processedBy?: boolean
    note?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["withdrawalRequest"]>

  export type WithdrawalRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    status?: boolean
    requestedAt?: boolean
    processedAt?: boolean
    processedBy?: boolean
    note?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["withdrawalRequest"]>

  export type WithdrawalRequestSelectScalar = {
    id?: boolean
    userId?: boolean
    amount?: boolean
    status?: boolean
    requestedAt?: boolean
    processedAt?: boolean
    processedBy?: boolean
    note?: boolean
  }

  export type WithdrawalRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "amount" | "status" | "requestedAt" | "processedAt" | "processedBy" | "note", ExtArgs["result"]["withdrawalRequest"]>
  export type WithdrawalRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WithdrawalRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WithdrawalRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WithdrawalRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WithdrawalRequest"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      amount: number
      status: $Enums.WithdrawalStatus
      requestedAt: Date
      processedAt: Date | null
      processedBy: string | null
      note: string | null
    }, ExtArgs["result"]["withdrawalRequest"]>
    composites: {}
  }

  type WithdrawalRequestGetPayload<S extends boolean | null | undefined | WithdrawalRequestDefaultArgs> = $Result.GetResult<Prisma.$WithdrawalRequestPayload, S>

  type WithdrawalRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WithdrawalRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WithdrawalRequestCountAggregateInputType | true
    }

  export interface WithdrawalRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WithdrawalRequest'], meta: { name: 'WithdrawalRequest' } }
    /**
     * Find zero or one WithdrawalRequest that matches the filter.
     * @param {WithdrawalRequestFindUniqueArgs} args - Arguments to find a WithdrawalRequest
     * @example
     * // Get one WithdrawalRequest
     * const withdrawalRequest = await prisma.withdrawalRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WithdrawalRequestFindUniqueArgs>(args: SelectSubset<T, WithdrawalRequestFindUniqueArgs<ExtArgs>>): Prisma__WithdrawalRequestClient<$Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WithdrawalRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WithdrawalRequestFindUniqueOrThrowArgs} args - Arguments to find a WithdrawalRequest
     * @example
     * // Get one WithdrawalRequest
     * const withdrawalRequest = await prisma.withdrawalRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WithdrawalRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, WithdrawalRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WithdrawalRequestClient<$Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WithdrawalRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawalRequestFindFirstArgs} args - Arguments to find a WithdrawalRequest
     * @example
     * // Get one WithdrawalRequest
     * const withdrawalRequest = await prisma.withdrawalRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WithdrawalRequestFindFirstArgs>(args?: SelectSubset<T, WithdrawalRequestFindFirstArgs<ExtArgs>>): Prisma__WithdrawalRequestClient<$Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WithdrawalRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawalRequestFindFirstOrThrowArgs} args - Arguments to find a WithdrawalRequest
     * @example
     * // Get one WithdrawalRequest
     * const withdrawalRequest = await prisma.withdrawalRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WithdrawalRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, WithdrawalRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__WithdrawalRequestClient<$Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WithdrawalRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawalRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WithdrawalRequests
     * const withdrawalRequests = await prisma.withdrawalRequest.findMany()
     * 
     * // Get first 10 WithdrawalRequests
     * const withdrawalRequests = await prisma.withdrawalRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const withdrawalRequestWithIdOnly = await prisma.withdrawalRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WithdrawalRequestFindManyArgs>(args?: SelectSubset<T, WithdrawalRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WithdrawalRequest.
     * @param {WithdrawalRequestCreateArgs} args - Arguments to create a WithdrawalRequest.
     * @example
     * // Create one WithdrawalRequest
     * const WithdrawalRequest = await prisma.withdrawalRequest.create({
     *   data: {
     *     // ... data to create a WithdrawalRequest
     *   }
     * })
     * 
     */
    create<T extends WithdrawalRequestCreateArgs>(args: SelectSubset<T, WithdrawalRequestCreateArgs<ExtArgs>>): Prisma__WithdrawalRequestClient<$Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WithdrawalRequests.
     * @param {WithdrawalRequestCreateManyArgs} args - Arguments to create many WithdrawalRequests.
     * @example
     * // Create many WithdrawalRequests
     * const withdrawalRequest = await prisma.withdrawalRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WithdrawalRequestCreateManyArgs>(args?: SelectSubset<T, WithdrawalRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WithdrawalRequests and returns the data saved in the database.
     * @param {WithdrawalRequestCreateManyAndReturnArgs} args - Arguments to create many WithdrawalRequests.
     * @example
     * // Create many WithdrawalRequests
     * const withdrawalRequest = await prisma.withdrawalRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WithdrawalRequests and only return the `id`
     * const withdrawalRequestWithIdOnly = await prisma.withdrawalRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WithdrawalRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, WithdrawalRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WithdrawalRequest.
     * @param {WithdrawalRequestDeleteArgs} args - Arguments to delete one WithdrawalRequest.
     * @example
     * // Delete one WithdrawalRequest
     * const WithdrawalRequest = await prisma.withdrawalRequest.delete({
     *   where: {
     *     // ... filter to delete one WithdrawalRequest
     *   }
     * })
     * 
     */
    delete<T extends WithdrawalRequestDeleteArgs>(args: SelectSubset<T, WithdrawalRequestDeleteArgs<ExtArgs>>): Prisma__WithdrawalRequestClient<$Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WithdrawalRequest.
     * @param {WithdrawalRequestUpdateArgs} args - Arguments to update one WithdrawalRequest.
     * @example
     * // Update one WithdrawalRequest
     * const withdrawalRequest = await prisma.withdrawalRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WithdrawalRequestUpdateArgs>(args: SelectSubset<T, WithdrawalRequestUpdateArgs<ExtArgs>>): Prisma__WithdrawalRequestClient<$Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WithdrawalRequests.
     * @param {WithdrawalRequestDeleteManyArgs} args - Arguments to filter WithdrawalRequests to delete.
     * @example
     * // Delete a few WithdrawalRequests
     * const { count } = await prisma.withdrawalRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WithdrawalRequestDeleteManyArgs>(args?: SelectSubset<T, WithdrawalRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WithdrawalRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawalRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WithdrawalRequests
     * const withdrawalRequest = await prisma.withdrawalRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WithdrawalRequestUpdateManyArgs>(args: SelectSubset<T, WithdrawalRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WithdrawalRequests and returns the data updated in the database.
     * @param {WithdrawalRequestUpdateManyAndReturnArgs} args - Arguments to update many WithdrawalRequests.
     * @example
     * // Update many WithdrawalRequests
     * const withdrawalRequest = await prisma.withdrawalRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WithdrawalRequests and only return the `id`
     * const withdrawalRequestWithIdOnly = await prisma.withdrawalRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WithdrawalRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, WithdrawalRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WithdrawalRequest.
     * @param {WithdrawalRequestUpsertArgs} args - Arguments to update or create a WithdrawalRequest.
     * @example
     * // Update or create a WithdrawalRequest
     * const withdrawalRequest = await prisma.withdrawalRequest.upsert({
     *   create: {
     *     // ... data to create a WithdrawalRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WithdrawalRequest we want to update
     *   }
     * })
     */
    upsert<T extends WithdrawalRequestUpsertArgs>(args: SelectSubset<T, WithdrawalRequestUpsertArgs<ExtArgs>>): Prisma__WithdrawalRequestClient<$Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WithdrawalRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawalRequestCountArgs} args - Arguments to filter WithdrawalRequests to count.
     * @example
     * // Count the number of WithdrawalRequests
     * const count = await prisma.withdrawalRequest.count({
     *   where: {
     *     // ... the filter for the WithdrawalRequests we want to count
     *   }
     * })
    **/
    count<T extends WithdrawalRequestCountArgs>(
      args?: Subset<T, WithdrawalRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WithdrawalRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WithdrawalRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawalRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WithdrawalRequestAggregateArgs>(args: Subset<T, WithdrawalRequestAggregateArgs>): Prisma.PrismaPromise<GetWithdrawalRequestAggregateType<T>>

    /**
     * Group by WithdrawalRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawalRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WithdrawalRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WithdrawalRequestGroupByArgs['orderBy'] }
        : { orderBy?: WithdrawalRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WithdrawalRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWithdrawalRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WithdrawalRequest model
   */
  readonly fields: WithdrawalRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WithdrawalRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WithdrawalRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WithdrawalRequest model
   */
  interface WithdrawalRequestFieldRefs {
    readonly id: FieldRef<"WithdrawalRequest", 'String'>
    readonly userId: FieldRef<"WithdrawalRequest", 'String'>
    readonly amount: FieldRef<"WithdrawalRequest", 'Float'>
    readonly status: FieldRef<"WithdrawalRequest", 'WithdrawalStatus'>
    readonly requestedAt: FieldRef<"WithdrawalRequest", 'DateTime'>
    readonly processedAt: FieldRef<"WithdrawalRequest", 'DateTime'>
    readonly processedBy: FieldRef<"WithdrawalRequest", 'String'>
    readonly note: FieldRef<"WithdrawalRequest", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WithdrawalRequest findUnique
   */
  export type WithdrawalRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WithdrawalRequest
     */
    select?: WithdrawalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WithdrawalRequest
     */
    omit?: WithdrawalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WithdrawalRequestInclude<ExtArgs> | null
    /**
     * Filter, which WithdrawalRequest to fetch.
     */
    where: WithdrawalRequestWhereUniqueInput
  }

  /**
   * WithdrawalRequest findUniqueOrThrow
   */
  export type WithdrawalRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WithdrawalRequest
     */
    select?: WithdrawalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WithdrawalRequest
     */
    omit?: WithdrawalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WithdrawalRequestInclude<ExtArgs> | null
    /**
     * Filter, which WithdrawalRequest to fetch.
     */
    where: WithdrawalRequestWhereUniqueInput
  }

  /**
   * WithdrawalRequest findFirst
   */
  export type WithdrawalRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WithdrawalRequest
     */
    select?: WithdrawalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WithdrawalRequest
     */
    omit?: WithdrawalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WithdrawalRequestInclude<ExtArgs> | null
    /**
     * Filter, which WithdrawalRequest to fetch.
     */
    where?: WithdrawalRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WithdrawalRequests to fetch.
     */
    orderBy?: WithdrawalRequestOrderByWithRelationInput | WithdrawalRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WithdrawalRequests.
     */
    cursor?: WithdrawalRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WithdrawalRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WithdrawalRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WithdrawalRequests.
     */
    distinct?: WithdrawalRequestScalarFieldEnum | WithdrawalRequestScalarFieldEnum[]
  }

  /**
   * WithdrawalRequest findFirstOrThrow
   */
  export type WithdrawalRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WithdrawalRequest
     */
    select?: WithdrawalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WithdrawalRequest
     */
    omit?: WithdrawalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WithdrawalRequestInclude<ExtArgs> | null
    /**
     * Filter, which WithdrawalRequest to fetch.
     */
    where?: WithdrawalRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WithdrawalRequests to fetch.
     */
    orderBy?: WithdrawalRequestOrderByWithRelationInput | WithdrawalRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WithdrawalRequests.
     */
    cursor?: WithdrawalRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WithdrawalRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WithdrawalRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WithdrawalRequests.
     */
    distinct?: WithdrawalRequestScalarFieldEnum | WithdrawalRequestScalarFieldEnum[]
  }

  /**
   * WithdrawalRequest findMany
   */
  export type WithdrawalRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WithdrawalRequest
     */
    select?: WithdrawalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WithdrawalRequest
     */
    omit?: WithdrawalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WithdrawalRequestInclude<ExtArgs> | null
    /**
     * Filter, which WithdrawalRequests to fetch.
     */
    where?: WithdrawalRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WithdrawalRequests to fetch.
     */
    orderBy?: WithdrawalRequestOrderByWithRelationInput | WithdrawalRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WithdrawalRequests.
     */
    cursor?: WithdrawalRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WithdrawalRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WithdrawalRequests.
     */
    skip?: number
    distinct?: WithdrawalRequestScalarFieldEnum | WithdrawalRequestScalarFieldEnum[]
  }

  /**
   * WithdrawalRequest create
   */
  export type WithdrawalRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WithdrawalRequest
     */
    select?: WithdrawalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WithdrawalRequest
     */
    omit?: WithdrawalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WithdrawalRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a WithdrawalRequest.
     */
    data: XOR<WithdrawalRequestCreateInput, WithdrawalRequestUncheckedCreateInput>
  }

  /**
   * WithdrawalRequest createMany
   */
  export type WithdrawalRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WithdrawalRequests.
     */
    data: WithdrawalRequestCreateManyInput | WithdrawalRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WithdrawalRequest createManyAndReturn
   */
  export type WithdrawalRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WithdrawalRequest
     */
    select?: WithdrawalRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WithdrawalRequest
     */
    omit?: WithdrawalRequestOmit<ExtArgs> | null
    /**
     * The data used to create many WithdrawalRequests.
     */
    data: WithdrawalRequestCreateManyInput | WithdrawalRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WithdrawalRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WithdrawalRequest update
   */
  export type WithdrawalRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WithdrawalRequest
     */
    select?: WithdrawalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WithdrawalRequest
     */
    omit?: WithdrawalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WithdrawalRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a WithdrawalRequest.
     */
    data: XOR<WithdrawalRequestUpdateInput, WithdrawalRequestUncheckedUpdateInput>
    /**
     * Choose, which WithdrawalRequest to update.
     */
    where: WithdrawalRequestWhereUniqueInput
  }

  /**
   * WithdrawalRequest updateMany
   */
  export type WithdrawalRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WithdrawalRequests.
     */
    data: XOR<WithdrawalRequestUpdateManyMutationInput, WithdrawalRequestUncheckedUpdateManyInput>
    /**
     * Filter which WithdrawalRequests to update
     */
    where?: WithdrawalRequestWhereInput
    /**
     * Limit how many WithdrawalRequests to update.
     */
    limit?: number
  }

  /**
   * WithdrawalRequest updateManyAndReturn
   */
  export type WithdrawalRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WithdrawalRequest
     */
    select?: WithdrawalRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WithdrawalRequest
     */
    omit?: WithdrawalRequestOmit<ExtArgs> | null
    /**
     * The data used to update WithdrawalRequests.
     */
    data: XOR<WithdrawalRequestUpdateManyMutationInput, WithdrawalRequestUncheckedUpdateManyInput>
    /**
     * Filter which WithdrawalRequests to update
     */
    where?: WithdrawalRequestWhereInput
    /**
     * Limit how many WithdrawalRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WithdrawalRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WithdrawalRequest upsert
   */
  export type WithdrawalRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WithdrawalRequest
     */
    select?: WithdrawalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WithdrawalRequest
     */
    omit?: WithdrawalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WithdrawalRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the WithdrawalRequest to update in case it exists.
     */
    where: WithdrawalRequestWhereUniqueInput
    /**
     * In case the WithdrawalRequest found by the `where` argument doesn't exist, create a new WithdrawalRequest with this data.
     */
    create: XOR<WithdrawalRequestCreateInput, WithdrawalRequestUncheckedCreateInput>
    /**
     * In case the WithdrawalRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WithdrawalRequestUpdateInput, WithdrawalRequestUncheckedUpdateInput>
  }

  /**
   * WithdrawalRequest delete
   */
  export type WithdrawalRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WithdrawalRequest
     */
    select?: WithdrawalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WithdrawalRequest
     */
    omit?: WithdrawalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WithdrawalRequestInclude<ExtArgs> | null
    /**
     * Filter which WithdrawalRequest to delete.
     */
    where: WithdrawalRequestWhereUniqueInput
  }

  /**
   * WithdrawalRequest deleteMany
   */
  export type WithdrawalRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WithdrawalRequests to delete
     */
    where?: WithdrawalRequestWhereInput
    /**
     * Limit how many WithdrawalRequests to delete.
     */
    limit?: number
  }

  /**
   * WithdrawalRequest without action
   */
  export type WithdrawalRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WithdrawalRequest
     */
    select?: WithdrawalRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WithdrawalRequest
     */
    omit?: WithdrawalRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WithdrawalRequestInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    gender: 'gender',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    accountNumber: 'accountNumber',
    bankCode: 'bankCode',
    birthDate: 'birthDate',
    phoneNumber: 'phoneNumber'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SurveyTemplateScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    isDefault: 'isDefault',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SurveyTemplateScalarFieldEnum = (typeof SurveyTemplateScalarFieldEnum)[keyof typeof SurveyTemplateScalarFieldEnum]


  export const SurveyStepScalarFieldEnum: {
    id: 'id',
    templateId: 'templateId',
    stepNumber: 'stepNumber',
    title: 'title',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SurveyStepScalarFieldEnum = (typeof SurveyStepScalarFieldEnum)[keyof typeof SurveyStepScalarFieldEnum]


  export const SurveyQuestionScalarFieldEnum: {
    id: 'id',
    stepId: 'stepId',
    questionNumber: 'questionNumber',
    text: 'text',
    type: 'type',
    required: 'required',
    minLength: 'minLength',
    maxLength: 'maxLength',
    placeholder: 'placeholder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SurveyQuestionScalarFieldEnum = (typeof SurveyQuestionScalarFieldEnum)[keyof typeof SurveyQuestionScalarFieldEnum]


  export const QuestionOptionScalarFieldEnum: {
    id: 'id',
    questionId: 'questionId',
    optionNumber: 'optionNumber',
    text: 'text',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type QuestionOptionScalarFieldEnum = (typeof QuestionOptionScalarFieldEnum)[keyof typeof QuestionOptionScalarFieldEnum]


  export const SurveyScalarFieldEnum: {
    id: 'id',
    title: 'title',
    storeName: 'storeName',
    description: 'description',
    url: 'url',
    sellerId: 'sellerId',
    templateId: 'templateId',
    targetAgeMin: 'targetAgeMin',
    targetAgeMax: 'targetAgeMax',
    targetGender: 'targetGender',
    reward: 'reward',
    maxParticipants: 'maxParticipants',
    totalBudget: 'totalBudget',
    status: 'status',
    customSteps: 'customSteps',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    endDate: 'endDate',
    approvedAt: 'approvedAt',
    completedAt: 'completedAt',
    suspendedAt: 'suspendedAt',
    rejectionReason: 'rejectionReason',
    extensionCount: 'extensionCount',
    extensionHistory: 'extensionHistory',
    cancellationStatus: 'cancellationStatus',
    cancellationRequestedAt: 'cancellationRequestedAt'
  };

  export type SurveyScalarFieldEnum = (typeof SurveyScalarFieldEnum)[keyof typeof SurveyScalarFieldEnum]


  export const SurveyResponseScalarFieldEnum: {
    id: 'id',
    surveyId: 'surveyId',
    consumerId: 'consumerId',
    responses: 'responses',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SurveyResponseScalarFieldEnum = (typeof SurveyResponseScalarFieldEnum)[keyof typeof SurveyResponseScalarFieldEnum]


  export const RewardScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    amount: 'amount',
    type: 'type',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RewardScalarFieldEnum = (typeof RewardScalarFieldEnum)[keyof typeof RewardScalarFieldEnum]


  export const SurveyCancellationRequestScalarFieldEnum: {
    id: 'id',
    surveyId: 'surveyId',
    reason: 'reason',
    refundAmount: 'refundAmount',
    status: 'status',
    requestedAt: 'requestedAt',
    processedAt: 'processedAt',
    processedBy: 'processedBy'
  };

  export type SurveyCancellationRequestScalarFieldEnum = (typeof SurveyCancellationRequestScalarFieldEnum)[keyof typeof SurveyCancellationRequestScalarFieldEnum]


  export const WithdrawalRequestScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    amount: 'amount',
    status: 'status',
    requestedAt: 'requestedAt',
    processedAt: 'processedAt',
    processedBy: 'processedBy',
    note: 'note'
  };

  export type WithdrawalRequestScalarFieldEnum = (typeof WithdrawalRequestScalarFieldEnum)[keyof typeof WithdrawalRequestScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'QuestionType'
   */
  export type EnumQuestionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionType'>
    


  /**
   * Reference to a field of type 'QuestionType[]'
   */
  export type ListEnumQuestionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'SurveyStatus'
   */
  export type EnumSurveyStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SurveyStatus'>
    


  /**
   * Reference to a field of type 'SurveyStatus[]'
   */
  export type ListEnumSurveyStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SurveyStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'CancellationStatus'
   */
  export type EnumCancellationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CancellationStatus'>
    


  /**
   * Reference to a field of type 'CancellationStatus[]'
   */
  export type ListEnumCancellationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CancellationStatus[]'>
    


  /**
   * Reference to a field of type 'RewardType'
   */
  export type EnumRewardTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RewardType'>
    


  /**
   * Reference to a field of type 'RewardType[]'
   */
  export type ListEnumRewardTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RewardType[]'>
    


  /**
   * Reference to a field of type 'RewardStatus'
   */
  export type EnumRewardStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RewardStatus'>
    


  /**
   * Reference to a field of type 'RewardStatus[]'
   */
  export type ListEnumRewardStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RewardStatus[]'>
    


  /**
   * Reference to a field of type 'WithdrawalStatus'
   */
  export type EnumWithdrawalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WithdrawalStatus'>
    


  /**
   * Reference to a field of type 'WithdrawalStatus[]'
   */
  export type ListEnumWithdrawalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WithdrawalStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    gender?: EnumGenderFilter<"User"> | $Enums.Gender
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accountNumber?: StringFilter<"User"> | string
    bankCode?: StringFilter<"User"> | string
    birthDate?: StringFilter<"User"> | string
    phoneNumber?: StringFilter<"User"> | string
    rewards?: RewardListRelationFilter
    responses?: SurveyResponseListRelationFilter
    surveys?: SurveyListRelationFilter
    withdrawalRequests?: WithdrawalRequestListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    gender?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountNumber?: SortOrder
    bankCode?: SortOrder
    birthDate?: SortOrder
    phoneNumber?: SortOrder
    rewards?: RewardOrderByRelationAggregateInput
    responses?: SurveyResponseOrderByRelationAggregateInput
    surveys?: SurveyOrderByRelationAggregateInput
    withdrawalRequests?: WithdrawalRequestOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    phoneNumber?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    gender?: EnumGenderFilter<"User"> | $Enums.Gender
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accountNumber?: StringFilter<"User"> | string
    bankCode?: StringFilter<"User"> | string
    birthDate?: StringFilter<"User"> | string
    rewards?: RewardListRelationFilter
    responses?: SurveyResponseListRelationFilter
    surveys?: SurveyListRelationFilter
    withdrawalRequests?: WithdrawalRequestListRelationFilter
  }, "id" | "email" | "phoneNumber">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    gender?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountNumber?: SortOrder
    bankCode?: SortOrder
    birthDate?: SortOrder
    phoneNumber?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    gender?: EnumGenderWithAggregatesFilter<"User"> | $Enums.Gender
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    accountNumber?: StringWithAggregatesFilter<"User"> | string
    bankCode?: StringWithAggregatesFilter<"User"> | string
    birthDate?: StringWithAggregatesFilter<"User"> | string
    phoneNumber?: StringWithAggregatesFilter<"User"> | string
  }

  export type SurveyTemplateWhereInput = {
    AND?: SurveyTemplateWhereInput | SurveyTemplateWhereInput[]
    OR?: SurveyTemplateWhereInput[]
    NOT?: SurveyTemplateWhereInput | SurveyTemplateWhereInput[]
    id?: StringFilter<"SurveyTemplate"> | string
    name?: StringFilter<"SurveyTemplate"> | string
    description?: StringNullableFilter<"SurveyTemplate"> | string | null
    isDefault?: BoolFilter<"SurveyTemplate"> | boolean
    createdAt?: DateTimeFilter<"SurveyTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"SurveyTemplate"> | Date | string
    steps?: SurveyStepListRelationFilter
    surveys?: SurveyListRelationFilter
  }

  export type SurveyTemplateOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    steps?: SurveyStepOrderByRelationAggregateInput
    surveys?: SurveyOrderByRelationAggregateInput
  }

  export type SurveyTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SurveyTemplateWhereInput | SurveyTemplateWhereInput[]
    OR?: SurveyTemplateWhereInput[]
    NOT?: SurveyTemplateWhereInput | SurveyTemplateWhereInput[]
    name?: StringFilter<"SurveyTemplate"> | string
    description?: StringNullableFilter<"SurveyTemplate"> | string | null
    isDefault?: BoolFilter<"SurveyTemplate"> | boolean
    createdAt?: DateTimeFilter<"SurveyTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"SurveyTemplate"> | Date | string
    steps?: SurveyStepListRelationFilter
    surveys?: SurveyListRelationFilter
  }, "id">

  export type SurveyTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SurveyTemplateCountOrderByAggregateInput
    _max?: SurveyTemplateMaxOrderByAggregateInput
    _min?: SurveyTemplateMinOrderByAggregateInput
  }

  export type SurveyTemplateScalarWhereWithAggregatesInput = {
    AND?: SurveyTemplateScalarWhereWithAggregatesInput | SurveyTemplateScalarWhereWithAggregatesInput[]
    OR?: SurveyTemplateScalarWhereWithAggregatesInput[]
    NOT?: SurveyTemplateScalarWhereWithAggregatesInput | SurveyTemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SurveyTemplate"> | string
    name?: StringWithAggregatesFilter<"SurveyTemplate"> | string
    description?: StringNullableWithAggregatesFilter<"SurveyTemplate"> | string | null
    isDefault?: BoolWithAggregatesFilter<"SurveyTemplate"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"SurveyTemplate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SurveyTemplate"> | Date | string
  }

  export type SurveyStepWhereInput = {
    AND?: SurveyStepWhereInput | SurveyStepWhereInput[]
    OR?: SurveyStepWhereInput[]
    NOT?: SurveyStepWhereInput | SurveyStepWhereInput[]
    id?: StringFilter<"SurveyStep"> | string
    templateId?: StringFilter<"SurveyStep"> | string
    stepNumber?: IntFilter<"SurveyStep"> | number
    title?: StringFilter<"SurveyStep"> | string
    description?: StringNullableFilter<"SurveyStep"> | string | null
    createdAt?: DateTimeFilter<"SurveyStep"> | Date | string
    updatedAt?: DateTimeFilter<"SurveyStep"> | Date | string
    questions?: SurveyQuestionListRelationFilter
    template?: XOR<SurveyTemplateScalarRelationFilter, SurveyTemplateWhereInput>
  }

  export type SurveyStepOrderByWithRelationInput = {
    id?: SortOrder
    templateId?: SortOrder
    stepNumber?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    questions?: SurveyQuestionOrderByRelationAggregateInput
    template?: SurveyTemplateOrderByWithRelationInput
  }

  export type SurveyStepWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    templateId_stepNumber?: SurveyStepTemplateIdStepNumberCompoundUniqueInput
    AND?: SurveyStepWhereInput | SurveyStepWhereInput[]
    OR?: SurveyStepWhereInput[]
    NOT?: SurveyStepWhereInput | SurveyStepWhereInput[]
    templateId?: StringFilter<"SurveyStep"> | string
    stepNumber?: IntFilter<"SurveyStep"> | number
    title?: StringFilter<"SurveyStep"> | string
    description?: StringNullableFilter<"SurveyStep"> | string | null
    createdAt?: DateTimeFilter<"SurveyStep"> | Date | string
    updatedAt?: DateTimeFilter<"SurveyStep"> | Date | string
    questions?: SurveyQuestionListRelationFilter
    template?: XOR<SurveyTemplateScalarRelationFilter, SurveyTemplateWhereInput>
  }, "id" | "templateId_stepNumber">

  export type SurveyStepOrderByWithAggregationInput = {
    id?: SortOrder
    templateId?: SortOrder
    stepNumber?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SurveyStepCountOrderByAggregateInput
    _avg?: SurveyStepAvgOrderByAggregateInput
    _max?: SurveyStepMaxOrderByAggregateInput
    _min?: SurveyStepMinOrderByAggregateInput
    _sum?: SurveyStepSumOrderByAggregateInput
  }

  export type SurveyStepScalarWhereWithAggregatesInput = {
    AND?: SurveyStepScalarWhereWithAggregatesInput | SurveyStepScalarWhereWithAggregatesInput[]
    OR?: SurveyStepScalarWhereWithAggregatesInput[]
    NOT?: SurveyStepScalarWhereWithAggregatesInput | SurveyStepScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SurveyStep"> | string
    templateId?: StringWithAggregatesFilter<"SurveyStep"> | string
    stepNumber?: IntWithAggregatesFilter<"SurveyStep"> | number
    title?: StringWithAggregatesFilter<"SurveyStep"> | string
    description?: StringNullableWithAggregatesFilter<"SurveyStep"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SurveyStep"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SurveyStep"> | Date | string
  }

  export type SurveyQuestionWhereInput = {
    AND?: SurveyQuestionWhereInput | SurveyQuestionWhereInput[]
    OR?: SurveyQuestionWhereInput[]
    NOT?: SurveyQuestionWhereInput | SurveyQuestionWhereInput[]
    id?: StringFilter<"SurveyQuestion"> | string
    stepId?: StringFilter<"SurveyQuestion"> | string
    questionNumber?: IntFilter<"SurveyQuestion"> | number
    text?: StringFilter<"SurveyQuestion"> | string
    type?: EnumQuestionTypeFilter<"SurveyQuestion"> | $Enums.QuestionType
    required?: BoolFilter<"SurveyQuestion"> | boolean
    minLength?: IntNullableFilter<"SurveyQuestion"> | number | null
    maxLength?: IntNullableFilter<"SurveyQuestion"> | number | null
    placeholder?: StringNullableFilter<"SurveyQuestion"> | string | null
    createdAt?: DateTimeFilter<"SurveyQuestion"> | Date | string
    updatedAt?: DateTimeFilter<"SurveyQuestion"> | Date | string
    options?: QuestionOptionListRelationFilter
    step?: XOR<SurveyStepScalarRelationFilter, SurveyStepWhereInput>
  }

  export type SurveyQuestionOrderByWithRelationInput = {
    id?: SortOrder
    stepId?: SortOrder
    questionNumber?: SortOrder
    text?: SortOrder
    type?: SortOrder
    required?: SortOrder
    minLength?: SortOrderInput | SortOrder
    maxLength?: SortOrderInput | SortOrder
    placeholder?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    options?: QuestionOptionOrderByRelationAggregateInput
    step?: SurveyStepOrderByWithRelationInput
  }

  export type SurveyQuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    stepId_questionNumber?: SurveyQuestionStepIdQuestionNumberCompoundUniqueInput
    AND?: SurveyQuestionWhereInput | SurveyQuestionWhereInput[]
    OR?: SurveyQuestionWhereInput[]
    NOT?: SurveyQuestionWhereInput | SurveyQuestionWhereInput[]
    stepId?: StringFilter<"SurveyQuestion"> | string
    questionNumber?: IntFilter<"SurveyQuestion"> | number
    text?: StringFilter<"SurveyQuestion"> | string
    type?: EnumQuestionTypeFilter<"SurveyQuestion"> | $Enums.QuestionType
    required?: BoolFilter<"SurveyQuestion"> | boolean
    minLength?: IntNullableFilter<"SurveyQuestion"> | number | null
    maxLength?: IntNullableFilter<"SurveyQuestion"> | number | null
    placeholder?: StringNullableFilter<"SurveyQuestion"> | string | null
    createdAt?: DateTimeFilter<"SurveyQuestion"> | Date | string
    updatedAt?: DateTimeFilter<"SurveyQuestion"> | Date | string
    options?: QuestionOptionListRelationFilter
    step?: XOR<SurveyStepScalarRelationFilter, SurveyStepWhereInput>
  }, "id" | "stepId_questionNumber">

  export type SurveyQuestionOrderByWithAggregationInput = {
    id?: SortOrder
    stepId?: SortOrder
    questionNumber?: SortOrder
    text?: SortOrder
    type?: SortOrder
    required?: SortOrder
    minLength?: SortOrderInput | SortOrder
    maxLength?: SortOrderInput | SortOrder
    placeholder?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SurveyQuestionCountOrderByAggregateInput
    _avg?: SurveyQuestionAvgOrderByAggregateInput
    _max?: SurveyQuestionMaxOrderByAggregateInput
    _min?: SurveyQuestionMinOrderByAggregateInput
    _sum?: SurveyQuestionSumOrderByAggregateInput
  }

  export type SurveyQuestionScalarWhereWithAggregatesInput = {
    AND?: SurveyQuestionScalarWhereWithAggregatesInput | SurveyQuestionScalarWhereWithAggregatesInput[]
    OR?: SurveyQuestionScalarWhereWithAggregatesInput[]
    NOT?: SurveyQuestionScalarWhereWithAggregatesInput | SurveyQuestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SurveyQuestion"> | string
    stepId?: StringWithAggregatesFilter<"SurveyQuestion"> | string
    questionNumber?: IntWithAggregatesFilter<"SurveyQuestion"> | number
    text?: StringWithAggregatesFilter<"SurveyQuestion"> | string
    type?: EnumQuestionTypeWithAggregatesFilter<"SurveyQuestion"> | $Enums.QuestionType
    required?: BoolWithAggregatesFilter<"SurveyQuestion"> | boolean
    minLength?: IntNullableWithAggregatesFilter<"SurveyQuestion"> | number | null
    maxLength?: IntNullableWithAggregatesFilter<"SurveyQuestion"> | number | null
    placeholder?: StringNullableWithAggregatesFilter<"SurveyQuestion"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SurveyQuestion"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SurveyQuestion"> | Date | string
  }

  export type QuestionOptionWhereInput = {
    AND?: QuestionOptionWhereInput | QuestionOptionWhereInput[]
    OR?: QuestionOptionWhereInput[]
    NOT?: QuestionOptionWhereInput | QuestionOptionWhereInput[]
    id?: StringFilter<"QuestionOption"> | string
    questionId?: StringFilter<"QuestionOption"> | string
    optionNumber?: IntFilter<"QuestionOption"> | number
    text?: StringFilter<"QuestionOption"> | string
    createdAt?: DateTimeFilter<"QuestionOption"> | Date | string
    updatedAt?: DateTimeFilter<"QuestionOption"> | Date | string
    question?: XOR<SurveyQuestionScalarRelationFilter, SurveyQuestionWhereInput>
  }

  export type QuestionOptionOrderByWithRelationInput = {
    id?: SortOrder
    questionId?: SortOrder
    optionNumber?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    question?: SurveyQuestionOrderByWithRelationInput
  }

  export type QuestionOptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    questionId_optionNumber?: QuestionOptionQuestionIdOptionNumberCompoundUniqueInput
    AND?: QuestionOptionWhereInput | QuestionOptionWhereInput[]
    OR?: QuestionOptionWhereInput[]
    NOT?: QuestionOptionWhereInput | QuestionOptionWhereInput[]
    questionId?: StringFilter<"QuestionOption"> | string
    optionNumber?: IntFilter<"QuestionOption"> | number
    text?: StringFilter<"QuestionOption"> | string
    createdAt?: DateTimeFilter<"QuestionOption"> | Date | string
    updatedAt?: DateTimeFilter<"QuestionOption"> | Date | string
    question?: XOR<SurveyQuestionScalarRelationFilter, SurveyQuestionWhereInput>
  }, "id" | "questionId_optionNumber">

  export type QuestionOptionOrderByWithAggregationInput = {
    id?: SortOrder
    questionId?: SortOrder
    optionNumber?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: QuestionOptionCountOrderByAggregateInput
    _avg?: QuestionOptionAvgOrderByAggregateInput
    _max?: QuestionOptionMaxOrderByAggregateInput
    _min?: QuestionOptionMinOrderByAggregateInput
    _sum?: QuestionOptionSumOrderByAggregateInput
  }

  export type QuestionOptionScalarWhereWithAggregatesInput = {
    AND?: QuestionOptionScalarWhereWithAggregatesInput | QuestionOptionScalarWhereWithAggregatesInput[]
    OR?: QuestionOptionScalarWhereWithAggregatesInput[]
    NOT?: QuestionOptionScalarWhereWithAggregatesInput | QuestionOptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuestionOption"> | string
    questionId?: StringWithAggregatesFilter<"QuestionOption"> | string
    optionNumber?: IntWithAggregatesFilter<"QuestionOption"> | number
    text?: StringWithAggregatesFilter<"QuestionOption"> | string
    createdAt?: DateTimeWithAggregatesFilter<"QuestionOption"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"QuestionOption"> | Date | string
  }

  export type SurveyWhereInput = {
    AND?: SurveyWhereInput | SurveyWhereInput[]
    OR?: SurveyWhereInput[]
    NOT?: SurveyWhereInput | SurveyWhereInput[]
    id?: StringFilter<"Survey"> | string
    title?: StringFilter<"Survey"> | string
    storeName?: StringFilter<"Survey"> | string
    description?: StringNullableFilter<"Survey"> | string | null
    url?: StringFilter<"Survey"> | string
    sellerId?: StringFilter<"Survey"> | string
    templateId?: StringFilter<"Survey"> | string
    targetAgeMin?: IntFilter<"Survey"> | number
    targetAgeMax?: IntFilter<"Survey"> | number
    targetGender?: EnumGenderFilter<"Survey"> | $Enums.Gender
    reward?: FloatFilter<"Survey"> | number
    maxParticipants?: IntFilter<"Survey"> | number
    totalBudget?: FloatNullableFilter<"Survey"> | number | null
    status?: EnumSurveyStatusFilter<"Survey"> | $Enums.SurveyStatus
    customSteps?: JsonNullableFilter<"Survey">
    createdAt?: DateTimeFilter<"Survey"> | Date | string
    updatedAt?: DateTimeFilter<"Survey"> | Date | string
    endDate?: DateTimeFilter<"Survey"> | Date | string
    approvedAt?: DateTimeNullableFilter<"Survey"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Survey"> | Date | string | null
    suspendedAt?: DateTimeNullableFilter<"Survey"> | Date | string | null
    rejectionReason?: StringNullableFilter<"Survey"> | string | null
    extensionCount?: IntFilter<"Survey"> | number
    extensionHistory?: JsonNullableFilter<"Survey">
    cancellationStatus?: EnumCancellationStatusNullableFilter<"Survey"> | $Enums.CancellationStatus | null
    cancellationRequestedAt?: DateTimeNullableFilter<"Survey"> | Date | string | null
    responses?: SurveyResponseListRelationFilter
    seller?: XOR<UserScalarRelationFilter, UserWhereInput>
    template?: XOR<SurveyTemplateScalarRelationFilter, SurveyTemplateWhereInput>
    cancellationRequest?: XOR<SurveyCancellationRequestNullableScalarRelationFilter, SurveyCancellationRequestWhereInput> | null
  }

  export type SurveyOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    storeName?: SortOrder
    description?: SortOrderInput | SortOrder
    url?: SortOrder
    sellerId?: SortOrder
    templateId?: SortOrder
    targetAgeMin?: SortOrder
    targetAgeMax?: SortOrder
    targetGender?: SortOrder
    reward?: SortOrder
    maxParticipants?: SortOrder
    totalBudget?: SortOrderInput | SortOrder
    status?: SortOrder
    customSteps?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    endDate?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    suspendedAt?: SortOrderInput | SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    extensionCount?: SortOrder
    extensionHistory?: SortOrderInput | SortOrder
    cancellationStatus?: SortOrderInput | SortOrder
    cancellationRequestedAt?: SortOrderInput | SortOrder
    responses?: SurveyResponseOrderByRelationAggregateInput
    seller?: UserOrderByWithRelationInput
    template?: SurveyTemplateOrderByWithRelationInput
    cancellationRequest?: SurveyCancellationRequestOrderByWithRelationInput
  }

  export type SurveyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SurveyWhereInput | SurveyWhereInput[]
    OR?: SurveyWhereInput[]
    NOT?: SurveyWhereInput | SurveyWhereInput[]
    title?: StringFilter<"Survey"> | string
    storeName?: StringFilter<"Survey"> | string
    description?: StringNullableFilter<"Survey"> | string | null
    url?: StringFilter<"Survey"> | string
    sellerId?: StringFilter<"Survey"> | string
    templateId?: StringFilter<"Survey"> | string
    targetAgeMin?: IntFilter<"Survey"> | number
    targetAgeMax?: IntFilter<"Survey"> | number
    targetGender?: EnumGenderFilter<"Survey"> | $Enums.Gender
    reward?: FloatFilter<"Survey"> | number
    maxParticipants?: IntFilter<"Survey"> | number
    totalBudget?: FloatNullableFilter<"Survey"> | number | null
    status?: EnumSurveyStatusFilter<"Survey"> | $Enums.SurveyStatus
    customSteps?: JsonNullableFilter<"Survey">
    createdAt?: DateTimeFilter<"Survey"> | Date | string
    updatedAt?: DateTimeFilter<"Survey"> | Date | string
    endDate?: DateTimeFilter<"Survey"> | Date | string
    approvedAt?: DateTimeNullableFilter<"Survey"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Survey"> | Date | string | null
    suspendedAt?: DateTimeNullableFilter<"Survey"> | Date | string | null
    rejectionReason?: StringNullableFilter<"Survey"> | string | null
    extensionCount?: IntFilter<"Survey"> | number
    extensionHistory?: JsonNullableFilter<"Survey">
    cancellationStatus?: EnumCancellationStatusNullableFilter<"Survey"> | $Enums.CancellationStatus | null
    cancellationRequestedAt?: DateTimeNullableFilter<"Survey"> | Date | string | null
    responses?: SurveyResponseListRelationFilter
    seller?: XOR<UserScalarRelationFilter, UserWhereInput>
    template?: XOR<SurveyTemplateScalarRelationFilter, SurveyTemplateWhereInput>
    cancellationRequest?: XOR<SurveyCancellationRequestNullableScalarRelationFilter, SurveyCancellationRequestWhereInput> | null
  }, "id">

  export type SurveyOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    storeName?: SortOrder
    description?: SortOrderInput | SortOrder
    url?: SortOrder
    sellerId?: SortOrder
    templateId?: SortOrder
    targetAgeMin?: SortOrder
    targetAgeMax?: SortOrder
    targetGender?: SortOrder
    reward?: SortOrder
    maxParticipants?: SortOrder
    totalBudget?: SortOrderInput | SortOrder
    status?: SortOrder
    customSteps?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    endDate?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    suspendedAt?: SortOrderInput | SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    extensionCount?: SortOrder
    extensionHistory?: SortOrderInput | SortOrder
    cancellationStatus?: SortOrderInput | SortOrder
    cancellationRequestedAt?: SortOrderInput | SortOrder
    _count?: SurveyCountOrderByAggregateInput
    _avg?: SurveyAvgOrderByAggregateInput
    _max?: SurveyMaxOrderByAggregateInput
    _min?: SurveyMinOrderByAggregateInput
    _sum?: SurveySumOrderByAggregateInput
  }

  export type SurveyScalarWhereWithAggregatesInput = {
    AND?: SurveyScalarWhereWithAggregatesInput | SurveyScalarWhereWithAggregatesInput[]
    OR?: SurveyScalarWhereWithAggregatesInput[]
    NOT?: SurveyScalarWhereWithAggregatesInput | SurveyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Survey"> | string
    title?: StringWithAggregatesFilter<"Survey"> | string
    storeName?: StringWithAggregatesFilter<"Survey"> | string
    description?: StringNullableWithAggregatesFilter<"Survey"> | string | null
    url?: StringWithAggregatesFilter<"Survey"> | string
    sellerId?: StringWithAggregatesFilter<"Survey"> | string
    templateId?: StringWithAggregatesFilter<"Survey"> | string
    targetAgeMin?: IntWithAggregatesFilter<"Survey"> | number
    targetAgeMax?: IntWithAggregatesFilter<"Survey"> | number
    targetGender?: EnumGenderWithAggregatesFilter<"Survey"> | $Enums.Gender
    reward?: FloatWithAggregatesFilter<"Survey"> | number
    maxParticipants?: IntWithAggregatesFilter<"Survey"> | number
    totalBudget?: FloatNullableWithAggregatesFilter<"Survey"> | number | null
    status?: EnumSurveyStatusWithAggregatesFilter<"Survey"> | $Enums.SurveyStatus
    customSteps?: JsonNullableWithAggregatesFilter<"Survey">
    createdAt?: DateTimeWithAggregatesFilter<"Survey"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Survey"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Survey"> | Date | string
    approvedAt?: DateTimeNullableWithAggregatesFilter<"Survey"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"Survey"> | Date | string | null
    suspendedAt?: DateTimeNullableWithAggregatesFilter<"Survey"> | Date | string | null
    rejectionReason?: StringNullableWithAggregatesFilter<"Survey"> | string | null
    extensionCount?: IntWithAggregatesFilter<"Survey"> | number
    extensionHistory?: JsonNullableWithAggregatesFilter<"Survey">
    cancellationStatus?: EnumCancellationStatusNullableWithAggregatesFilter<"Survey"> | $Enums.CancellationStatus | null
    cancellationRequestedAt?: DateTimeNullableWithAggregatesFilter<"Survey"> | Date | string | null
  }

  export type SurveyResponseWhereInput = {
    AND?: SurveyResponseWhereInput | SurveyResponseWhereInput[]
    OR?: SurveyResponseWhereInput[]
    NOT?: SurveyResponseWhereInput | SurveyResponseWhereInput[]
    id?: StringFilter<"SurveyResponse"> | string
    surveyId?: StringFilter<"SurveyResponse"> | string
    consumerId?: StringFilter<"SurveyResponse"> | string
    responses?: JsonFilter<"SurveyResponse">
    createdAt?: DateTimeFilter<"SurveyResponse"> | Date | string
    updatedAt?: DateTimeFilter<"SurveyResponse"> | Date | string
    consumer?: XOR<UserScalarRelationFilter, UserWhereInput>
    survey?: XOR<SurveyScalarRelationFilter, SurveyWhereInput>
  }

  export type SurveyResponseOrderByWithRelationInput = {
    id?: SortOrder
    surveyId?: SortOrder
    consumerId?: SortOrder
    responses?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    consumer?: UserOrderByWithRelationInput
    survey?: SurveyOrderByWithRelationInput
  }

  export type SurveyResponseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    surveyId_consumerId?: SurveyResponseSurveyIdConsumerIdCompoundUniqueInput
    AND?: SurveyResponseWhereInput | SurveyResponseWhereInput[]
    OR?: SurveyResponseWhereInput[]
    NOT?: SurveyResponseWhereInput | SurveyResponseWhereInput[]
    surveyId?: StringFilter<"SurveyResponse"> | string
    consumerId?: StringFilter<"SurveyResponse"> | string
    responses?: JsonFilter<"SurveyResponse">
    createdAt?: DateTimeFilter<"SurveyResponse"> | Date | string
    updatedAt?: DateTimeFilter<"SurveyResponse"> | Date | string
    consumer?: XOR<UserScalarRelationFilter, UserWhereInput>
    survey?: XOR<SurveyScalarRelationFilter, SurveyWhereInput>
  }, "id" | "surveyId_consumerId">

  export type SurveyResponseOrderByWithAggregationInput = {
    id?: SortOrder
    surveyId?: SortOrder
    consumerId?: SortOrder
    responses?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SurveyResponseCountOrderByAggregateInput
    _max?: SurveyResponseMaxOrderByAggregateInput
    _min?: SurveyResponseMinOrderByAggregateInput
  }

  export type SurveyResponseScalarWhereWithAggregatesInput = {
    AND?: SurveyResponseScalarWhereWithAggregatesInput | SurveyResponseScalarWhereWithAggregatesInput[]
    OR?: SurveyResponseScalarWhereWithAggregatesInput[]
    NOT?: SurveyResponseScalarWhereWithAggregatesInput | SurveyResponseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SurveyResponse"> | string
    surveyId?: StringWithAggregatesFilter<"SurveyResponse"> | string
    consumerId?: StringWithAggregatesFilter<"SurveyResponse"> | string
    responses?: JsonWithAggregatesFilter<"SurveyResponse">
    createdAt?: DateTimeWithAggregatesFilter<"SurveyResponse"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SurveyResponse"> | Date | string
  }

  export type RewardWhereInput = {
    AND?: RewardWhereInput | RewardWhereInput[]
    OR?: RewardWhereInput[]
    NOT?: RewardWhereInput | RewardWhereInput[]
    id?: StringFilter<"Reward"> | string
    userId?: StringFilter<"Reward"> | string
    amount?: FloatFilter<"Reward"> | number
    type?: EnumRewardTypeFilter<"Reward"> | $Enums.RewardType
    status?: EnumRewardStatusFilter<"Reward"> | $Enums.RewardStatus
    createdAt?: DateTimeFilter<"Reward"> | Date | string
    updatedAt?: DateTimeFilter<"Reward"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RewardOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RewardWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RewardWhereInput | RewardWhereInput[]
    OR?: RewardWhereInput[]
    NOT?: RewardWhereInput | RewardWhereInput[]
    userId?: StringFilter<"Reward"> | string
    amount?: FloatFilter<"Reward"> | number
    type?: EnumRewardTypeFilter<"Reward"> | $Enums.RewardType
    status?: EnumRewardStatusFilter<"Reward"> | $Enums.RewardStatus
    createdAt?: DateTimeFilter<"Reward"> | Date | string
    updatedAt?: DateTimeFilter<"Reward"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type RewardOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RewardCountOrderByAggregateInput
    _avg?: RewardAvgOrderByAggregateInput
    _max?: RewardMaxOrderByAggregateInput
    _min?: RewardMinOrderByAggregateInput
    _sum?: RewardSumOrderByAggregateInput
  }

  export type RewardScalarWhereWithAggregatesInput = {
    AND?: RewardScalarWhereWithAggregatesInput | RewardScalarWhereWithAggregatesInput[]
    OR?: RewardScalarWhereWithAggregatesInput[]
    NOT?: RewardScalarWhereWithAggregatesInput | RewardScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Reward"> | string
    userId?: StringWithAggregatesFilter<"Reward"> | string
    amount?: FloatWithAggregatesFilter<"Reward"> | number
    type?: EnumRewardTypeWithAggregatesFilter<"Reward"> | $Enums.RewardType
    status?: EnumRewardStatusWithAggregatesFilter<"Reward"> | $Enums.RewardStatus
    createdAt?: DateTimeWithAggregatesFilter<"Reward"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Reward"> | Date | string
  }

  export type SurveyCancellationRequestWhereInput = {
    AND?: SurveyCancellationRequestWhereInput | SurveyCancellationRequestWhereInput[]
    OR?: SurveyCancellationRequestWhereInput[]
    NOT?: SurveyCancellationRequestWhereInput | SurveyCancellationRequestWhereInput[]
    id?: StringFilter<"SurveyCancellationRequest"> | string
    surveyId?: StringFilter<"SurveyCancellationRequest"> | string
    reason?: StringFilter<"SurveyCancellationRequest"> | string
    refundAmount?: FloatFilter<"SurveyCancellationRequest"> | number
    status?: EnumCancellationStatusFilter<"SurveyCancellationRequest"> | $Enums.CancellationStatus
    requestedAt?: DateTimeFilter<"SurveyCancellationRequest"> | Date | string
    processedAt?: DateTimeNullableFilter<"SurveyCancellationRequest"> | Date | string | null
    processedBy?: StringNullableFilter<"SurveyCancellationRequest"> | string | null
    survey?: XOR<SurveyScalarRelationFilter, SurveyWhereInput>
  }

  export type SurveyCancellationRequestOrderByWithRelationInput = {
    id?: SortOrder
    surveyId?: SortOrder
    reason?: SortOrder
    refundAmount?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    processedBy?: SortOrderInput | SortOrder
    survey?: SurveyOrderByWithRelationInput
  }

  export type SurveyCancellationRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    surveyId?: string
    AND?: SurveyCancellationRequestWhereInput | SurveyCancellationRequestWhereInput[]
    OR?: SurveyCancellationRequestWhereInput[]
    NOT?: SurveyCancellationRequestWhereInput | SurveyCancellationRequestWhereInput[]
    reason?: StringFilter<"SurveyCancellationRequest"> | string
    refundAmount?: FloatFilter<"SurveyCancellationRequest"> | number
    status?: EnumCancellationStatusFilter<"SurveyCancellationRequest"> | $Enums.CancellationStatus
    requestedAt?: DateTimeFilter<"SurveyCancellationRequest"> | Date | string
    processedAt?: DateTimeNullableFilter<"SurveyCancellationRequest"> | Date | string | null
    processedBy?: StringNullableFilter<"SurveyCancellationRequest"> | string | null
    survey?: XOR<SurveyScalarRelationFilter, SurveyWhereInput>
  }, "id" | "surveyId">

  export type SurveyCancellationRequestOrderByWithAggregationInput = {
    id?: SortOrder
    surveyId?: SortOrder
    reason?: SortOrder
    refundAmount?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    processedBy?: SortOrderInput | SortOrder
    _count?: SurveyCancellationRequestCountOrderByAggregateInput
    _avg?: SurveyCancellationRequestAvgOrderByAggregateInput
    _max?: SurveyCancellationRequestMaxOrderByAggregateInput
    _min?: SurveyCancellationRequestMinOrderByAggregateInput
    _sum?: SurveyCancellationRequestSumOrderByAggregateInput
  }

  export type SurveyCancellationRequestScalarWhereWithAggregatesInput = {
    AND?: SurveyCancellationRequestScalarWhereWithAggregatesInput | SurveyCancellationRequestScalarWhereWithAggregatesInput[]
    OR?: SurveyCancellationRequestScalarWhereWithAggregatesInput[]
    NOT?: SurveyCancellationRequestScalarWhereWithAggregatesInput | SurveyCancellationRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SurveyCancellationRequest"> | string
    surveyId?: StringWithAggregatesFilter<"SurveyCancellationRequest"> | string
    reason?: StringWithAggregatesFilter<"SurveyCancellationRequest"> | string
    refundAmount?: FloatWithAggregatesFilter<"SurveyCancellationRequest"> | number
    status?: EnumCancellationStatusWithAggregatesFilter<"SurveyCancellationRequest"> | $Enums.CancellationStatus
    requestedAt?: DateTimeWithAggregatesFilter<"SurveyCancellationRequest"> | Date | string
    processedAt?: DateTimeNullableWithAggregatesFilter<"SurveyCancellationRequest"> | Date | string | null
    processedBy?: StringNullableWithAggregatesFilter<"SurveyCancellationRequest"> | string | null
  }

  export type WithdrawalRequestWhereInput = {
    AND?: WithdrawalRequestWhereInput | WithdrawalRequestWhereInput[]
    OR?: WithdrawalRequestWhereInput[]
    NOT?: WithdrawalRequestWhereInput | WithdrawalRequestWhereInput[]
    id?: StringFilter<"WithdrawalRequest"> | string
    userId?: StringFilter<"WithdrawalRequest"> | string
    amount?: FloatFilter<"WithdrawalRequest"> | number
    status?: EnumWithdrawalStatusFilter<"WithdrawalRequest"> | $Enums.WithdrawalStatus
    requestedAt?: DateTimeFilter<"WithdrawalRequest"> | Date | string
    processedAt?: DateTimeNullableFilter<"WithdrawalRequest"> | Date | string | null
    processedBy?: StringNullableFilter<"WithdrawalRequest"> | string | null
    note?: StringNullableFilter<"WithdrawalRequest"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WithdrawalRequestOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    processedBy?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type WithdrawalRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WithdrawalRequestWhereInput | WithdrawalRequestWhereInput[]
    OR?: WithdrawalRequestWhereInput[]
    NOT?: WithdrawalRequestWhereInput | WithdrawalRequestWhereInput[]
    userId?: StringFilter<"WithdrawalRequest"> | string
    amount?: FloatFilter<"WithdrawalRequest"> | number
    status?: EnumWithdrawalStatusFilter<"WithdrawalRequest"> | $Enums.WithdrawalStatus
    requestedAt?: DateTimeFilter<"WithdrawalRequest"> | Date | string
    processedAt?: DateTimeNullableFilter<"WithdrawalRequest"> | Date | string | null
    processedBy?: StringNullableFilter<"WithdrawalRequest"> | string | null
    note?: StringNullableFilter<"WithdrawalRequest"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type WithdrawalRequestOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    processedBy?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    _count?: WithdrawalRequestCountOrderByAggregateInput
    _avg?: WithdrawalRequestAvgOrderByAggregateInput
    _max?: WithdrawalRequestMaxOrderByAggregateInput
    _min?: WithdrawalRequestMinOrderByAggregateInput
    _sum?: WithdrawalRequestSumOrderByAggregateInput
  }

  export type WithdrawalRequestScalarWhereWithAggregatesInput = {
    AND?: WithdrawalRequestScalarWhereWithAggregatesInput | WithdrawalRequestScalarWhereWithAggregatesInput[]
    OR?: WithdrawalRequestScalarWhereWithAggregatesInput[]
    NOT?: WithdrawalRequestScalarWhereWithAggregatesInput | WithdrawalRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WithdrawalRequest"> | string
    userId?: StringWithAggregatesFilter<"WithdrawalRequest"> | string
    amount?: FloatWithAggregatesFilter<"WithdrawalRequest"> | number
    status?: EnumWithdrawalStatusWithAggregatesFilter<"WithdrawalRequest"> | $Enums.WithdrawalStatus
    requestedAt?: DateTimeWithAggregatesFilter<"WithdrawalRequest"> | Date | string
    processedAt?: DateTimeNullableWithAggregatesFilter<"WithdrawalRequest"> | Date | string | null
    processedBy?: StringNullableWithAggregatesFilter<"WithdrawalRequest"> | string | null
    note?: StringNullableWithAggregatesFilter<"WithdrawalRequest"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.Role
    gender: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
    accountNumber: string
    bankCode: string
    birthDate: string
    phoneNumber: string
    rewards?: RewardCreateNestedManyWithoutUserInput
    responses?: SurveyResponseCreateNestedManyWithoutConsumerInput
    surveys?: SurveyCreateNestedManyWithoutSellerInput
    withdrawalRequests?: WithdrawalRequestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.Role
    gender: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
    accountNumber: string
    bankCode: string
    birthDate: string
    phoneNumber: string
    rewards?: RewardUncheckedCreateNestedManyWithoutUserInput
    responses?: SurveyResponseUncheckedCreateNestedManyWithoutConsumerInput
    surveys?: SurveyUncheckedCreateNestedManyWithoutSellerInput
    withdrawalRequests?: WithdrawalRequestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bankCode?: StringFieldUpdateOperationsInput | string
    birthDate?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    rewards?: RewardUpdateManyWithoutUserNestedInput
    responses?: SurveyResponseUpdateManyWithoutConsumerNestedInput
    surveys?: SurveyUpdateManyWithoutSellerNestedInput
    withdrawalRequests?: WithdrawalRequestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bankCode?: StringFieldUpdateOperationsInput | string
    birthDate?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    rewards?: RewardUncheckedUpdateManyWithoutUserNestedInput
    responses?: SurveyResponseUncheckedUpdateManyWithoutConsumerNestedInput
    surveys?: SurveyUncheckedUpdateManyWithoutSellerNestedInput
    withdrawalRequests?: WithdrawalRequestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.Role
    gender: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
    accountNumber: string
    bankCode: string
    birthDate: string
    phoneNumber: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bankCode?: StringFieldUpdateOperationsInput | string
    birthDate?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bankCode?: StringFieldUpdateOperationsInput | string
    birthDate?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
  }

  export type SurveyTemplateCreateInput = {
    id?: string
    name: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: SurveyStepCreateNestedManyWithoutTemplateInput
    surveys?: SurveyCreateNestedManyWithoutTemplateInput
  }

  export type SurveyTemplateUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: SurveyStepUncheckedCreateNestedManyWithoutTemplateInput
    surveys?: SurveyUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type SurveyTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: SurveyStepUpdateManyWithoutTemplateNestedInput
    surveys?: SurveyUpdateManyWithoutTemplateNestedInput
  }

  export type SurveyTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: SurveyStepUncheckedUpdateManyWithoutTemplateNestedInput
    surveys?: SurveyUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type SurveyTemplateCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SurveyTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyStepCreateInput = {
    id?: string
    stepNumber: number
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: SurveyQuestionCreateNestedManyWithoutStepInput
    template: SurveyTemplateCreateNestedOneWithoutStepsInput
  }

  export type SurveyStepUncheckedCreateInput = {
    id?: string
    templateId: string
    stepNumber: number
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: SurveyQuestionUncheckedCreateNestedManyWithoutStepInput
  }

  export type SurveyStepUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: SurveyQuestionUpdateManyWithoutStepNestedInput
    template?: SurveyTemplateUpdateOneRequiredWithoutStepsNestedInput
  }

  export type SurveyStepUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: SurveyQuestionUncheckedUpdateManyWithoutStepNestedInput
  }

  export type SurveyStepCreateManyInput = {
    id?: string
    templateId: string
    stepNumber: number
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SurveyStepUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyStepUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyQuestionCreateInput = {
    id?: string
    questionNumber: number
    text: string
    type: $Enums.QuestionType
    required?: boolean
    minLength?: number | null
    maxLength?: number | null
    placeholder?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    options?: QuestionOptionCreateNestedManyWithoutQuestionInput
    step: SurveyStepCreateNestedOneWithoutQuestionsInput
  }

  export type SurveyQuestionUncheckedCreateInput = {
    id?: string
    stepId: string
    questionNumber: number
    text: string
    type: $Enums.QuestionType
    required?: boolean
    minLength?: number | null
    maxLength?: number | null
    placeholder?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    options?: QuestionOptionUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type SurveyQuestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    required?: BoolFieldUpdateOperationsInput | boolean
    minLength?: NullableIntFieldUpdateOperationsInput | number | null
    maxLength?: NullableIntFieldUpdateOperationsInput | number | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: QuestionOptionUpdateManyWithoutQuestionNestedInput
    step?: SurveyStepUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type SurveyQuestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    required?: BoolFieldUpdateOperationsInput | boolean
    minLength?: NullableIntFieldUpdateOperationsInput | number | null
    maxLength?: NullableIntFieldUpdateOperationsInput | number | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: QuestionOptionUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type SurveyQuestionCreateManyInput = {
    id?: string
    stepId: string
    questionNumber: number
    text: string
    type: $Enums.QuestionType
    required?: boolean
    minLength?: number | null
    maxLength?: number | null
    placeholder?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SurveyQuestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    required?: BoolFieldUpdateOperationsInput | boolean
    minLength?: NullableIntFieldUpdateOperationsInput | number | null
    maxLength?: NullableIntFieldUpdateOperationsInput | number | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyQuestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    required?: BoolFieldUpdateOperationsInput | boolean
    minLength?: NullableIntFieldUpdateOperationsInput | number | null
    maxLength?: NullableIntFieldUpdateOperationsInput | number | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionOptionCreateInput = {
    id?: string
    optionNumber: number
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
    question: SurveyQuestionCreateNestedOneWithoutOptionsInput
  }

  export type QuestionOptionUncheckedCreateInput = {
    id?: string
    questionId: string
    optionNumber: number
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuestionOptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    optionNumber?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    question?: SurveyQuestionUpdateOneRequiredWithoutOptionsNestedInput
  }

  export type QuestionOptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    optionNumber?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionOptionCreateManyInput = {
    id?: string
    questionId: string
    optionNumber: number
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuestionOptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    optionNumber?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionOptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    optionNumber?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyCreateInput = {
    id?: string
    title: string
    storeName?: string
    description?: string | null
    url: string
    targetAgeMin: number
    targetAgeMax: number
    targetGender: $Enums.Gender
    reward: number
    maxParticipants?: number
    totalBudget?: number | null
    status?: $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    endDate: Date | string
    approvedAt?: Date | string | null
    completedAt?: Date | string | null
    suspendedAt?: Date | string | null
    rejectionReason?: string | null
    extensionCount?: number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: $Enums.CancellationStatus | null
    cancellationRequestedAt?: Date | string | null
    responses?: SurveyResponseCreateNestedManyWithoutSurveyInput
    seller: UserCreateNestedOneWithoutSurveysInput
    template: SurveyTemplateCreateNestedOneWithoutSurveysInput
    cancellationRequest?: SurveyCancellationRequestCreateNestedOneWithoutSurveyInput
  }

  export type SurveyUncheckedCreateInput = {
    id?: string
    title: string
    storeName?: string
    description?: string | null
    url: string
    sellerId: string
    templateId: string
    targetAgeMin: number
    targetAgeMax: number
    targetGender: $Enums.Gender
    reward: number
    maxParticipants?: number
    totalBudget?: number | null
    status?: $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    endDate: Date | string
    approvedAt?: Date | string | null
    completedAt?: Date | string | null
    suspendedAt?: Date | string | null
    rejectionReason?: string | null
    extensionCount?: number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: $Enums.CancellationStatus | null
    cancellationRequestedAt?: Date | string | null
    responses?: SurveyResponseUncheckedCreateNestedManyWithoutSurveyInput
    cancellationRequest?: SurveyCancellationRequestUncheckedCreateNestedOneWithoutSurveyInput
  }

  export type SurveyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    targetAgeMin?: IntFieldUpdateOperationsInput | number
    targetAgeMax?: IntFieldUpdateOperationsInput | number
    targetGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    reward?: FloatFieldUpdateOperationsInput | number
    maxParticipants?: IntFieldUpdateOperationsInput | number
    totalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumSurveyStatusFieldUpdateOperationsInput | $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    extensionCount?: IntFieldUpdateOperationsInput | number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: NullableEnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus | null
    cancellationRequestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responses?: SurveyResponseUpdateManyWithoutSurveyNestedInput
    seller?: UserUpdateOneRequiredWithoutSurveysNestedInput
    template?: SurveyTemplateUpdateOneRequiredWithoutSurveysNestedInput
    cancellationRequest?: SurveyCancellationRequestUpdateOneWithoutSurveyNestedInput
  }

  export type SurveyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    sellerId?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    targetAgeMin?: IntFieldUpdateOperationsInput | number
    targetAgeMax?: IntFieldUpdateOperationsInput | number
    targetGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    reward?: FloatFieldUpdateOperationsInput | number
    maxParticipants?: IntFieldUpdateOperationsInput | number
    totalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumSurveyStatusFieldUpdateOperationsInput | $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    extensionCount?: IntFieldUpdateOperationsInput | number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: NullableEnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus | null
    cancellationRequestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responses?: SurveyResponseUncheckedUpdateManyWithoutSurveyNestedInput
    cancellationRequest?: SurveyCancellationRequestUncheckedUpdateOneWithoutSurveyNestedInput
  }

  export type SurveyCreateManyInput = {
    id?: string
    title: string
    storeName?: string
    description?: string | null
    url: string
    sellerId: string
    templateId: string
    targetAgeMin: number
    targetAgeMax: number
    targetGender: $Enums.Gender
    reward: number
    maxParticipants?: number
    totalBudget?: number | null
    status?: $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    endDate: Date | string
    approvedAt?: Date | string | null
    completedAt?: Date | string | null
    suspendedAt?: Date | string | null
    rejectionReason?: string | null
    extensionCount?: number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: $Enums.CancellationStatus | null
    cancellationRequestedAt?: Date | string | null
  }

  export type SurveyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    targetAgeMin?: IntFieldUpdateOperationsInput | number
    targetAgeMax?: IntFieldUpdateOperationsInput | number
    targetGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    reward?: FloatFieldUpdateOperationsInput | number
    maxParticipants?: IntFieldUpdateOperationsInput | number
    totalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumSurveyStatusFieldUpdateOperationsInput | $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    extensionCount?: IntFieldUpdateOperationsInput | number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: NullableEnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus | null
    cancellationRequestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SurveyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    sellerId?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    targetAgeMin?: IntFieldUpdateOperationsInput | number
    targetAgeMax?: IntFieldUpdateOperationsInput | number
    targetGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    reward?: FloatFieldUpdateOperationsInput | number
    maxParticipants?: IntFieldUpdateOperationsInput | number
    totalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumSurveyStatusFieldUpdateOperationsInput | $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    extensionCount?: IntFieldUpdateOperationsInput | number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: NullableEnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus | null
    cancellationRequestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SurveyResponseCreateInput = {
    id?: string
    responses: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    consumer: UserCreateNestedOneWithoutResponsesInput
    survey: SurveyCreateNestedOneWithoutResponsesInput
  }

  export type SurveyResponseUncheckedCreateInput = {
    id?: string
    surveyId: string
    consumerId: string
    responses: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SurveyResponseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    responses?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumer?: UserUpdateOneRequiredWithoutResponsesNestedInput
    survey?: SurveyUpdateOneRequiredWithoutResponsesNestedInput
  }

  export type SurveyResponseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    surveyId?: StringFieldUpdateOperationsInput | string
    consumerId?: StringFieldUpdateOperationsInput | string
    responses?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyResponseCreateManyInput = {
    id?: string
    surveyId: string
    consumerId: string
    responses: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SurveyResponseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    responses?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyResponseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    surveyId?: StringFieldUpdateOperationsInput | string
    consumerId?: StringFieldUpdateOperationsInput | string
    responses?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewardCreateInput = {
    id?: string
    amount: number
    type: $Enums.RewardType
    status?: $Enums.RewardStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRewardsInput
  }

  export type RewardUncheckedCreateInput = {
    id?: string
    userId: string
    amount: number
    type: $Enums.RewardType
    status?: $Enums.RewardStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RewardUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumRewardTypeFieldUpdateOperationsInput | $Enums.RewardType
    status?: EnumRewardStatusFieldUpdateOperationsInput | $Enums.RewardStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRewardsNestedInput
  }

  export type RewardUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumRewardTypeFieldUpdateOperationsInput | $Enums.RewardType
    status?: EnumRewardStatusFieldUpdateOperationsInput | $Enums.RewardStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewardCreateManyInput = {
    id?: string
    userId: string
    amount: number
    type: $Enums.RewardType
    status?: $Enums.RewardStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RewardUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumRewardTypeFieldUpdateOperationsInput | $Enums.RewardType
    status?: EnumRewardStatusFieldUpdateOperationsInput | $Enums.RewardStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewardUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumRewardTypeFieldUpdateOperationsInput | $Enums.RewardType
    status?: EnumRewardStatusFieldUpdateOperationsInput | $Enums.RewardStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyCancellationRequestCreateInput = {
    id?: string
    reason: string
    refundAmount: number
    status?: $Enums.CancellationStatus
    requestedAt?: Date | string
    processedAt?: Date | string | null
    processedBy?: string | null
    survey: SurveyCreateNestedOneWithoutCancellationRequestInput
  }

  export type SurveyCancellationRequestUncheckedCreateInput = {
    id?: string
    surveyId: string
    reason: string
    refundAmount: number
    status?: $Enums.CancellationStatus
    requestedAt?: Date | string
    processedAt?: Date | string | null
    processedBy?: string | null
  }

  export type SurveyCancellationRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    refundAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedBy?: NullableStringFieldUpdateOperationsInput | string | null
    survey?: SurveyUpdateOneRequiredWithoutCancellationRequestNestedInput
  }

  export type SurveyCancellationRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    surveyId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    refundAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SurveyCancellationRequestCreateManyInput = {
    id?: string
    surveyId: string
    reason: string
    refundAmount: number
    status?: $Enums.CancellationStatus
    requestedAt?: Date | string
    processedAt?: Date | string | null
    processedBy?: string | null
  }

  export type SurveyCancellationRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    refundAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SurveyCancellationRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    surveyId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    refundAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WithdrawalRequestCreateInput = {
    id?: string
    amount: number
    status?: $Enums.WithdrawalStatus
    requestedAt?: Date | string
    processedAt?: Date | string | null
    processedBy?: string | null
    note?: string | null
    user: UserCreateNestedOneWithoutWithdrawalRequestsInput
  }

  export type WithdrawalRequestUncheckedCreateInput = {
    id?: string
    userId: string
    amount: number
    status?: $Enums.WithdrawalStatus
    requestedAt?: Date | string
    processedAt?: Date | string | null
    processedBy?: string | null
    note?: string | null
  }

  export type WithdrawalRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedBy?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutWithdrawalRequestsNestedInput
  }

  export type WithdrawalRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedBy?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WithdrawalRequestCreateManyInput = {
    id?: string
    userId: string
    amount: number
    status?: $Enums.WithdrawalStatus
    requestedAt?: Date | string
    processedAt?: Date | string | null
    processedBy?: string | null
    note?: string | null
  }

  export type WithdrawalRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedBy?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WithdrawalRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedBy?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RewardListRelationFilter = {
    every?: RewardWhereInput
    some?: RewardWhereInput
    none?: RewardWhereInput
  }

  export type SurveyResponseListRelationFilter = {
    every?: SurveyResponseWhereInput
    some?: SurveyResponseWhereInput
    none?: SurveyResponseWhereInput
  }

  export type SurveyListRelationFilter = {
    every?: SurveyWhereInput
    some?: SurveyWhereInput
    none?: SurveyWhereInput
  }

  export type WithdrawalRequestListRelationFilter = {
    every?: WithdrawalRequestWhereInput
    some?: WithdrawalRequestWhereInput
    none?: WithdrawalRequestWhereInput
  }

  export type RewardOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SurveyResponseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SurveyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WithdrawalRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    gender?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountNumber?: SortOrder
    bankCode?: SortOrder
    birthDate?: SortOrder
    phoneNumber?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    gender?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountNumber?: SortOrder
    bankCode?: SortOrder
    birthDate?: SortOrder
    phoneNumber?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    gender?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountNumber?: SortOrder
    bankCode?: SortOrder
    birthDate?: SortOrder
    phoneNumber?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SurveyStepListRelationFilter = {
    every?: SurveyStepWhereInput
    some?: SurveyStepWhereInput
    none?: SurveyStepWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SurveyStepOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SurveyTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SurveyTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SurveyTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type SurveyQuestionListRelationFilter = {
    every?: SurveyQuestionWhereInput
    some?: SurveyQuestionWhereInput
    none?: SurveyQuestionWhereInput
  }

  export type SurveyTemplateScalarRelationFilter = {
    is?: SurveyTemplateWhereInput
    isNot?: SurveyTemplateWhereInput
  }

  export type SurveyQuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SurveyStepTemplateIdStepNumberCompoundUniqueInput = {
    templateId: string
    stepNumber: number
  }

  export type SurveyStepCountOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
    stepNumber?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SurveyStepAvgOrderByAggregateInput = {
    stepNumber?: SortOrder
  }

  export type SurveyStepMaxOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
    stepNumber?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SurveyStepMinOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
    stepNumber?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SurveyStepSumOrderByAggregateInput = {
    stepNumber?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeFilter<$PrismaModel> | $Enums.QuestionType
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type QuestionOptionListRelationFilter = {
    every?: QuestionOptionWhereInput
    some?: QuestionOptionWhereInput
    none?: QuestionOptionWhereInput
  }

  export type SurveyStepScalarRelationFilter = {
    is?: SurveyStepWhereInput
    isNot?: SurveyStepWhereInput
  }

  export type QuestionOptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SurveyQuestionStepIdQuestionNumberCompoundUniqueInput = {
    stepId: string
    questionNumber: number
  }

  export type SurveyQuestionCountOrderByAggregateInput = {
    id?: SortOrder
    stepId?: SortOrder
    questionNumber?: SortOrder
    text?: SortOrder
    type?: SortOrder
    required?: SortOrder
    minLength?: SortOrder
    maxLength?: SortOrder
    placeholder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SurveyQuestionAvgOrderByAggregateInput = {
    questionNumber?: SortOrder
    minLength?: SortOrder
    maxLength?: SortOrder
  }

  export type SurveyQuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    stepId?: SortOrder
    questionNumber?: SortOrder
    text?: SortOrder
    type?: SortOrder
    required?: SortOrder
    minLength?: SortOrder
    maxLength?: SortOrder
    placeholder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SurveyQuestionMinOrderByAggregateInput = {
    id?: SortOrder
    stepId?: SortOrder
    questionNumber?: SortOrder
    text?: SortOrder
    type?: SortOrder
    required?: SortOrder
    minLength?: SortOrder
    maxLength?: SortOrder
    placeholder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SurveyQuestionSumOrderByAggregateInput = {
    questionNumber?: SortOrder
    minLength?: SortOrder
    maxLength?: SortOrder
  }

  export type EnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuestionTypeFilter<$PrismaModel>
    _max?: NestedEnumQuestionTypeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SurveyQuestionScalarRelationFilter = {
    is?: SurveyQuestionWhereInput
    isNot?: SurveyQuestionWhereInput
  }

  export type QuestionOptionQuestionIdOptionNumberCompoundUniqueInput = {
    questionId: string
    optionNumber: number
  }

  export type QuestionOptionCountOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    optionNumber?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuestionOptionAvgOrderByAggregateInput = {
    optionNumber?: SortOrder
  }

  export type QuestionOptionMaxOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    optionNumber?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuestionOptionMinOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    optionNumber?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuestionOptionSumOrderByAggregateInput = {
    optionNumber?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumSurveyStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SurveyStatus | EnumSurveyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SurveyStatus[] | ListEnumSurveyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SurveyStatus[] | ListEnumSurveyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSurveyStatusFilter<$PrismaModel> | $Enums.SurveyStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumCancellationStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CancellationStatus | EnumCancellationStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.CancellationStatus[] | ListEnumCancellationStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CancellationStatus[] | ListEnumCancellationStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCancellationStatusNullableFilter<$PrismaModel> | $Enums.CancellationStatus | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SurveyCancellationRequestNullableScalarRelationFilter = {
    is?: SurveyCancellationRequestWhereInput | null
    isNot?: SurveyCancellationRequestWhereInput | null
  }

  export type SurveyCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    storeName?: SortOrder
    description?: SortOrder
    url?: SortOrder
    sellerId?: SortOrder
    templateId?: SortOrder
    targetAgeMin?: SortOrder
    targetAgeMax?: SortOrder
    targetGender?: SortOrder
    reward?: SortOrder
    maxParticipants?: SortOrder
    totalBudget?: SortOrder
    status?: SortOrder
    customSteps?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    endDate?: SortOrder
    approvedAt?: SortOrder
    completedAt?: SortOrder
    suspendedAt?: SortOrder
    rejectionReason?: SortOrder
    extensionCount?: SortOrder
    extensionHistory?: SortOrder
    cancellationStatus?: SortOrder
    cancellationRequestedAt?: SortOrder
  }

  export type SurveyAvgOrderByAggregateInput = {
    targetAgeMin?: SortOrder
    targetAgeMax?: SortOrder
    reward?: SortOrder
    maxParticipants?: SortOrder
    totalBudget?: SortOrder
    extensionCount?: SortOrder
  }

  export type SurveyMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    storeName?: SortOrder
    description?: SortOrder
    url?: SortOrder
    sellerId?: SortOrder
    templateId?: SortOrder
    targetAgeMin?: SortOrder
    targetAgeMax?: SortOrder
    targetGender?: SortOrder
    reward?: SortOrder
    maxParticipants?: SortOrder
    totalBudget?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    endDate?: SortOrder
    approvedAt?: SortOrder
    completedAt?: SortOrder
    suspendedAt?: SortOrder
    rejectionReason?: SortOrder
    extensionCount?: SortOrder
    cancellationStatus?: SortOrder
    cancellationRequestedAt?: SortOrder
  }

  export type SurveyMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    storeName?: SortOrder
    description?: SortOrder
    url?: SortOrder
    sellerId?: SortOrder
    templateId?: SortOrder
    targetAgeMin?: SortOrder
    targetAgeMax?: SortOrder
    targetGender?: SortOrder
    reward?: SortOrder
    maxParticipants?: SortOrder
    totalBudget?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    endDate?: SortOrder
    approvedAt?: SortOrder
    completedAt?: SortOrder
    suspendedAt?: SortOrder
    rejectionReason?: SortOrder
    extensionCount?: SortOrder
    cancellationStatus?: SortOrder
    cancellationRequestedAt?: SortOrder
  }

  export type SurveySumOrderByAggregateInput = {
    targetAgeMin?: SortOrder
    targetAgeMax?: SortOrder
    reward?: SortOrder
    maxParticipants?: SortOrder
    totalBudget?: SortOrder
    extensionCount?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumSurveyStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SurveyStatus | EnumSurveyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SurveyStatus[] | ListEnumSurveyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SurveyStatus[] | ListEnumSurveyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSurveyStatusWithAggregatesFilter<$PrismaModel> | $Enums.SurveyStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSurveyStatusFilter<$PrismaModel>
    _max?: NestedEnumSurveyStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumCancellationStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CancellationStatus | EnumCancellationStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.CancellationStatus[] | ListEnumCancellationStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CancellationStatus[] | ListEnumCancellationStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCancellationStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.CancellationStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCancellationStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumCancellationStatusNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SurveyScalarRelationFilter = {
    is?: SurveyWhereInput
    isNot?: SurveyWhereInput
  }

  export type SurveyResponseSurveyIdConsumerIdCompoundUniqueInput = {
    surveyId: string
    consumerId: string
  }

  export type SurveyResponseCountOrderByAggregateInput = {
    id?: SortOrder
    surveyId?: SortOrder
    consumerId?: SortOrder
    responses?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SurveyResponseMaxOrderByAggregateInput = {
    id?: SortOrder
    surveyId?: SortOrder
    consumerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SurveyResponseMinOrderByAggregateInput = {
    id?: SortOrder
    surveyId?: SortOrder
    consumerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumRewardTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RewardType | EnumRewardTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RewardType[] | ListEnumRewardTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RewardType[] | ListEnumRewardTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRewardTypeFilter<$PrismaModel> | $Enums.RewardType
  }

  export type EnumRewardStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RewardStatus | EnumRewardStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RewardStatus[] | ListEnumRewardStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RewardStatus[] | ListEnumRewardStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRewardStatusFilter<$PrismaModel> | $Enums.RewardStatus
  }

  export type RewardCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RewardAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type RewardMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RewardMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RewardSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumRewardTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RewardType | EnumRewardTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RewardType[] | ListEnumRewardTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RewardType[] | ListEnumRewardTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRewardTypeWithAggregatesFilter<$PrismaModel> | $Enums.RewardType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRewardTypeFilter<$PrismaModel>
    _max?: NestedEnumRewardTypeFilter<$PrismaModel>
  }

  export type EnumRewardStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RewardStatus | EnumRewardStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RewardStatus[] | ListEnumRewardStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RewardStatus[] | ListEnumRewardStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRewardStatusWithAggregatesFilter<$PrismaModel> | $Enums.RewardStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRewardStatusFilter<$PrismaModel>
    _max?: NestedEnumRewardStatusFilter<$PrismaModel>
  }

  export type EnumCancellationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CancellationStatus | EnumCancellationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CancellationStatus[] | ListEnumCancellationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CancellationStatus[] | ListEnumCancellationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCancellationStatusFilter<$PrismaModel> | $Enums.CancellationStatus
  }

  export type SurveyCancellationRequestCountOrderByAggregateInput = {
    id?: SortOrder
    surveyId?: SortOrder
    reason?: SortOrder
    refundAmount?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    processedAt?: SortOrder
    processedBy?: SortOrder
  }

  export type SurveyCancellationRequestAvgOrderByAggregateInput = {
    refundAmount?: SortOrder
  }

  export type SurveyCancellationRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    surveyId?: SortOrder
    reason?: SortOrder
    refundAmount?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    processedAt?: SortOrder
    processedBy?: SortOrder
  }

  export type SurveyCancellationRequestMinOrderByAggregateInput = {
    id?: SortOrder
    surveyId?: SortOrder
    reason?: SortOrder
    refundAmount?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    processedAt?: SortOrder
    processedBy?: SortOrder
  }

  export type SurveyCancellationRequestSumOrderByAggregateInput = {
    refundAmount?: SortOrder
  }

  export type EnumCancellationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CancellationStatus | EnumCancellationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CancellationStatus[] | ListEnumCancellationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CancellationStatus[] | ListEnumCancellationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCancellationStatusWithAggregatesFilter<$PrismaModel> | $Enums.CancellationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCancellationStatusFilter<$PrismaModel>
    _max?: NestedEnumCancellationStatusFilter<$PrismaModel>
  }

  export type EnumWithdrawalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WithdrawalStatus | EnumWithdrawalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WithdrawalStatus[] | ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WithdrawalStatus[] | ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWithdrawalStatusFilter<$PrismaModel> | $Enums.WithdrawalStatus
  }

  export type WithdrawalRequestCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    processedAt?: SortOrder
    processedBy?: SortOrder
    note?: SortOrder
  }

  export type WithdrawalRequestAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type WithdrawalRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    processedAt?: SortOrder
    processedBy?: SortOrder
    note?: SortOrder
  }

  export type WithdrawalRequestMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    processedAt?: SortOrder
    processedBy?: SortOrder
    note?: SortOrder
  }

  export type WithdrawalRequestSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumWithdrawalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WithdrawalStatus | EnumWithdrawalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WithdrawalStatus[] | ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WithdrawalStatus[] | ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWithdrawalStatusWithAggregatesFilter<$PrismaModel> | $Enums.WithdrawalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWithdrawalStatusFilter<$PrismaModel>
    _max?: NestedEnumWithdrawalStatusFilter<$PrismaModel>
  }

  export type RewardCreateNestedManyWithoutUserInput = {
    create?: XOR<RewardCreateWithoutUserInput, RewardUncheckedCreateWithoutUserInput> | RewardCreateWithoutUserInput[] | RewardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RewardCreateOrConnectWithoutUserInput | RewardCreateOrConnectWithoutUserInput[]
    createMany?: RewardCreateManyUserInputEnvelope
    connect?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
  }

  export type SurveyResponseCreateNestedManyWithoutConsumerInput = {
    create?: XOR<SurveyResponseCreateWithoutConsumerInput, SurveyResponseUncheckedCreateWithoutConsumerInput> | SurveyResponseCreateWithoutConsumerInput[] | SurveyResponseUncheckedCreateWithoutConsumerInput[]
    connectOrCreate?: SurveyResponseCreateOrConnectWithoutConsumerInput | SurveyResponseCreateOrConnectWithoutConsumerInput[]
    createMany?: SurveyResponseCreateManyConsumerInputEnvelope
    connect?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
  }

  export type SurveyCreateNestedManyWithoutSellerInput = {
    create?: XOR<SurveyCreateWithoutSellerInput, SurveyUncheckedCreateWithoutSellerInput> | SurveyCreateWithoutSellerInput[] | SurveyUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: SurveyCreateOrConnectWithoutSellerInput | SurveyCreateOrConnectWithoutSellerInput[]
    createMany?: SurveyCreateManySellerInputEnvelope
    connect?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
  }

  export type WithdrawalRequestCreateNestedManyWithoutUserInput = {
    create?: XOR<WithdrawalRequestCreateWithoutUserInput, WithdrawalRequestUncheckedCreateWithoutUserInput> | WithdrawalRequestCreateWithoutUserInput[] | WithdrawalRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WithdrawalRequestCreateOrConnectWithoutUserInput | WithdrawalRequestCreateOrConnectWithoutUserInput[]
    createMany?: WithdrawalRequestCreateManyUserInputEnvelope
    connect?: WithdrawalRequestWhereUniqueInput | WithdrawalRequestWhereUniqueInput[]
  }

  export type RewardUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RewardCreateWithoutUserInput, RewardUncheckedCreateWithoutUserInput> | RewardCreateWithoutUserInput[] | RewardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RewardCreateOrConnectWithoutUserInput | RewardCreateOrConnectWithoutUserInput[]
    createMany?: RewardCreateManyUserInputEnvelope
    connect?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
  }

  export type SurveyResponseUncheckedCreateNestedManyWithoutConsumerInput = {
    create?: XOR<SurveyResponseCreateWithoutConsumerInput, SurveyResponseUncheckedCreateWithoutConsumerInput> | SurveyResponseCreateWithoutConsumerInput[] | SurveyResponseUncheckedCreateWithoutConsumerInput[]
    connectOrCreate?: SurveyResponseCreateOrConnectWithoutConsumerInput | SurveyResponseCreateOrConnectWithoutConsumerInput[]
    createMany?: SurveyResponseCreateManyConsumerInputEnvelope
    connect?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
  }

  export type SurveyUncheckedCreateNestedManyWithoutSellerInput = {
    create?: XOR<SurveyCreateWithoutSellerInput, SurveyUncheckedCreateWithoutSellerInput> | SurveyCreateWithoutSellerInput[] | SurveyUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: SurveyCreateOrConnectWithoutSellerInput | SurveyCreateOrConnectWithoutSellerInput[]
    createMany?: SurveyCreateManySellerInputEnvelope
    connect?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
  }

  export type WithdrawalRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WithdrawalRequestCreateWithoutUserInput, WithdrawalRequestUncheckedCreateWithoutUserInput> | WithdrawalRequestCreateWithoutUserInput[] | WithdrawalRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WithdrawalRequestCreateOrConnectWithoutUserInput | WithdrawalRequestCreateOrConnectWithoutUserInput[]
    createMany?: WithdrawalRequestCreateManyUserInputEnvelope
    connect?: WithdrawalRequestWhereUniqueInput | WithdrawalRequestWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RewardUpdateManyWithoutUserNestedInput = {
    create?: XOR<RewardCreateWithoutUserInput, RewardUncheckedCreateWithoutUserInput> | RewardCreateWithoutUserInput[] | RewardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RewardCreateOrConnectWithoutUserInput | RewardCreateOrConnectWithoutUserInput[]
    upsert?: RewardUpsertWithWhereUniqueWithoutUserInput | RewardUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RewardCreateManyUserInputEnvelope
    set?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    disconnect?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    delete?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    connect?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    update?: RewardUpdateWithWhereUniqueWithoutUserInput | RewardUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RewardUpdateManyWithWhereWithoutUserInput | RewardUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RewardScalarWhereInput | RewardScalarWhereInput[]
  }

  export type SurveyResponseUpdateManyWithoutConsumerNestedInput = {
    create?: XOR<SurveyResponseCreateWithoutConsumerInput, SurveyResponseUncheckedCreateWithoutConsumerInput> | SurveyResponseCreateWithoutConsumerInput[] | SurveyResponseUncheckedCreateWithoutConsumerInput[]
    connectOrCreate?: SurveyResponseCreateOrConnectWithoutConsumerInput | SurveyResponseCreateOrConnectWithoutConsumerInput[]
    upsert?: SurveyResponseUpsertWithWhereUniqueWithoutConsumerInput | SurveyResponseUpsertWithWhereUniqueWithoutConsumerInput[]
    createMany?: SurveyResponseCreateManyConsumerInputEnvelope
    set?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    disconnect?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    delete?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    connect?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    update?: SurveyResponseUpdateWithWhereUniqueWithoutConsumerInput | SurveyResponseUpdateWithWhereUniqueWithoutConsumerInput[]
    updateMany?: SurveyResponseUpdateManyWithWhereWithoutConsumerInput | SurveyResponseUpdateManyWithWhereWithoutConsumerInput[]
    deleteMany?: SurveyResponseScalarWhereInput | SurveyResponseScalarWhereInput[]
  }

  export type SurveyUpdateManyWithoutSellerNestedInput = {
    create?: XOR<SurveyCreateWithoutSellerInput, SurveyUncheckedCreateWithoutSellerInput> | SurveyCreateWithoutSellerInput[] | SurveyUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: SurveyCreateOrConnectWithoutSellerInput | SurveyCreateOrConnectWithoutSellerInput[]
    upsert?: SurveyUpsertWithWhereUniqueWithoutSellerInput | SurveyUpsertWithWhereUniqueWithoutSellerInput[]
    createMany?: SurveyCreateManySellerInputEnvelope
    set?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    disconnect?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    delete?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    connect?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    update?: SurveyUpdateWithWhereUniqueWithoutSellerInput | SurveyUpdateWithWhereUniqueWithoutSellerInput[]
    updateMany?: SurveyUpdateManyWithWhereWithoutSellerInput | SurveyUpdateManyWithWhereWithoutSellerInput[]
    deleteMany?: SurveyScalarWhereInput | SurveyScalarWhereInput[]
  }

  export type WithdrawalRequestUpdateManyWithoutUserNestedInput = {
    create?: XOR<WithdrawalRequestCreateWithoutUserInput, WithdrawalRequestUncheckedCreateWithoutUserInput> | WithdrawalRequestCreateWithoutUserInput[] | WithdrawalRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WithdrawalRequestCreateOrConnectWithoutUserInput | WithdrawalRequestCreateOrConnectWithoutUserInput[]
    upsert?: WithdrawalRequestUpsertWithWhereUniqueWithoutUserInput | WithdrawalRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WithdrawalRequestCreateManyUserInputEnvelope
    set?: WithdrawalRequestWhereUniqueInput | WithdrawalRequestWhereUniqueInput[]
    disconnect?: WithdrawalRequestWhereUniqueInput | WithdrawalRequestWhereUniqueInput[]
    delete?: WithdrawalRequestWhereUniqueInput | WithdrawalRequestWhereUniqueInput[]
    connect?: WithdrawalRequestWhereUniqueInput | WithdrawalRequestWhereUniqueInput[]
    update?: WithdrawalRequestUpdateWithWhereUniqueWithoutUserInput | WithdrawalRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WithdrawalRequestUpdateManyWithWhereWithoutUserInput | WithdrawalRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WithdrawalRequestScalarWhereInput | WithdrawalRequestScalarWhereInput[]
  }

  export type RewardUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RewardCreateWithoutUserInput, RewardUncheckedCreateWithoutUserInput> | RewardCreateWithoutUserInput[] | RewardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RewardCreateOrConnectWithoutUserInput | RewardCreateOrConnectWithoutUserInput[]
    upsert?: RewardUpsertWithWhereUniqueWithoutUserInput | RewardUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RewardCreateManyUserInputEnvelope
    set?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    disconnect?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    delete?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    connect?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    update?: RewardUpdateWithWhereUniqueWithoutUserInput | RewardUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RewardUpdateManyWithWhereWithoutUserInput | RewardUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RewardScalarWhereInput | RewardScalarWhereInput[]
  }

  export type SurveyResponseUncheckedUpdateManyWithoutConsumerNestedInput = {
    create?: XOR<SurveyResponseCreateWithoutConsumerInput, SurveyResponseUncheckedCreateWithoutConsumerInput> | SurveyResponseCreateWithoutConsumerInput[] | SurveyResponseUncheckedCreateWithoutConsumerInput[]
    connectOrCreate?: SurveyResponseCreateOrConnectWithoutConsumerInput | SurveyResponseCreateOrConnectWithoutConsumerInput[]
    upsert?: SurveyResponseUpsertWithWhereUniqueWithoutConsumerInput | SurveyResponseUpsertWithWhereUniqueWithoutConsumerInput[]
    createMany?: SurveyResponseCreateManyConsumerInputEnvelope
    set?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    disconnect?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    delete?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    connect?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    update?: SurveyResponseUpdateWithWhereUniqueWithoutConsumerInput | SurveyResponseUpdateWithWhereUniqueWithoutConsumerInput[]
    updateMany?: SurveyResponseUpdateManyWithWhereWithoutConsumerInput | SurveyResponseUpdateManyWithWhereWithoutConsumerInput[]
    deleteMany?: SurveyResponseScalarWhereInput | SurveyResponseScalarWhereInput[]
  }

  export type SurveyUncheckedUpdateManyWithoutSellerNestedInput = {
    create?: XOR<SurveyCreateWithoutSellerInput, SurveyUncheckedCreateWithoutSellerInput> | SurveyCreateWithoutSellerInput[] | SurveyUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: SurveyCreateOrConnectWithoutSellerInput | SurveyCreateOrConnectWithoutSellerInput[]
    upsert?: SurveyUpsertWithWhereUniqueWithoutSellerInput | SurveyUpsertWithWhereUniqueWithoutSellerInput[]
    createMany?: SurveyCreateManySellerInputEnvelope
    set?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    disconnect?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    delete?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    connect?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    update?: SurveyUpdateWithWhereUniqueWithoutSellerInput | SurveyUpdateWithWhereUniqueWithoutSellerInput[]
    updateMany?: SurveyUpdateManyWithWhereWithoutSellerInput | SurveyUpdateManyWithWhereWithoutSellerInput[]
    deleteMany?: SurveyScalarWhereInput | SurveyScalarWhereInput[]
  }

  export type WithdrawalRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WithdrawalRequestCreateWithoutUserInput, WithdrawalRequestUncheckedCreateWithoutUserInput> | WithdrawalRequestCreateWithoutUserInput[] | WithdrawalRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WithdrawalRequestCreateOrConnectWithoutUserInput | WithdrawalRequestCreateOrConnectWithoutUserInput[]
    upsert?: WithdrawalRequestUpsertWithWhereUniqueWithoutUserInput | WithdrawalRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WithdrawalRequestCreateManyUserInputEnvelope
    set?: WithdrawalRequestWhereUniqueInput | WithdrawalRequestWhereUniqueInput[]
    disconnect?: WithdrawalRequestWhereUniqueInput | WithdrawalRequestWhereUniqueInput[]
    delete?: WithdrawalRequestWhereUniqueInput | WithdrawalRequestWhereUniqueInput[]
    connect?: WithdrawalRequestWhereUniqueInput | WithdrawalRequestWhereUniqueInput[]
    update?: WithdrawalRequestUpdateWithWhereUniqueWithoutUserInput | WithdrawalRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WithdrawalRequestUpdateManyWithWhereWithoutUserInput | WithdrawalRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WithdrawalRequestScalarWhereInput | WithdrawalRequestScalarWhereInput[]
  }

  export type SurveyStepCreateNestedManyWithoutTemplateInput = {
    create?: XOR<SurveyStepCreateWithoutTemplateInput, SurveyStepUncheckedCreateWithoutTemplateInput> | SurveyStepCreateWithoutTemplateInput[] | SurveyStepUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: SurveyStepCreateOrConnectWithoutTemplateInput | SurveyStepCreateOrConnectWithoutTemplateInput[]
    createMany?: SurveyStepCreateManyTemplateInputEnvelope
    connect?: SurveyStepWhereUniqueInput | SurveyStepWhereUniqueInput[]
  }

  export type SurveyCreateNestedManyWithoutTemplateInput = {
    create?: XOR<SurveyCreateWithoutTemplateInput, SurveyUncheckedCreateWithoutTemplateInput> | SurveyCreateWithoutTemplateInput[] | SurveyUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: SurveyCreateOrConnectWithoutTemplateInput | SurveyCreateOrConnectWithoutTemplateInput[]
    createMany?: SurveyCreateManyTemplateInputEnvelope
    connect?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
  }

  export type SurveyStepUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<SurveyStepCreateWithoutTemplateInput, SurveyStepUncheckedCreateWithoutTemplateInput> | SurveyStepCreateWithoutTemplateInput[] | SurveyStepUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: SurveyStepCreateOrConnectWithoutTemplateInput | SurveyStepCreateOrConnectWithoutTemplateInput[]
    createMany?: SurveyStepCreateManyTemplateInputEnvelope
    connect?: SurveyStepWhereUniqueInput | SurveyStepWhereUniqueInput[]
  }

  export type SurveyUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<SurveyCreateWithoutTemplateInput, SurveyUncheckedCreateWithoutTemplateInput> | SurveyCreateWithoutTemplateInput[] | SurveyUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: SurveyCreateOrConnectWithoutTemplateInput | SurveyCreateOrConnectWithoutTemplateInput[]
    createMany?: SurveyCreateManyTemplateInputEnvelope
    connect?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type SurveyStepUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<SurveyStepCreateWithoutTemplateInput, SurveyStepUncheckedCreateWithoutTemplateInput> | SurveyStepCreateWithoutTemplateInput[] | SurveyStepUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: SurveyStepCreateOrConnectWithoutTemplateInput | SurveyStepCreateOrConnectWithoutTemplateInput[]
    upsert?: SurveyStepUpsertWithWhereUniqueWithoutTemplateInput | SurveyStepUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: SurveyStepCreateManyTemplateInputEnvelope
    set?: SurveyStepWhereUniqueInput | SurveyStepWhereUniqueInput[]
    disconnect?: SurveyStepWhereUniqueInput | SurveyStepWhereUniqueInput[]
    delete?: SurveyStepWhereUniqueInput | SurveyStepWhereUniqueInput[]
    connect?: SurveyStepWhereUniqueInput | SurveyStepWhereUniqueInput[]
    update?: SurveyStepUpdateWithWhereUniqueWithoutTemplateInput | SurveyStepUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: SurveyStepUpdateManyWithWhereWithoutTemplateInput | SurveyStepUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: SurveyStepScalarWhereInput | SurveyStepScalarWhereInput[]
  }

  export type SurveyUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<SurveyCreateWithoutTemplateInput, SurveyUncheckedCreateWithoutTemplateInput> | SurveyCreateWithoutTemplateInput[] | SurveyUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: SurveyCreateOrConnectWithoutTemplateInput | SurveyCreateOrConnectWithoutTemplateInput[]
    upsert?: SurveyUpsertWithWhereUniqueWithoutTemplateInput | SurveyUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: SurveyCreateManyTemplateInputEnvelope
    set?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    disconnect?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    delete?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    connect?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    update?: SurveyUpdateWithWhereUniqueWithoutTemplateInput | SurveyUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: SurveyUpdateManyWithWhereWithoutTemplateInput | SurveyUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: SurveyScalarWhereInput | SurveyScalarWhereInput[]
  }

  export type SurveyStepUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<SurveyStepCreateWithoutTemplateInput, SurveyStepUncheckedCreateWithoutTemplateInput> | SurveyStepCreateWithoutTemplateInput[] | SurveyStepUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: SurveyStepCreateOrConnectWithoutTemplateInput | SurveyStepCreateOrConnectWithoutTemplateInput[]
    upsert?: SurveyStepUpsertWithWhereUniqueWithoutTemplateInput | SurveyStepUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: SurveyStepCreateManyTemplateInputEnvelope
    set?: SurveyStepWhereUniqueInput | SurveyStepWhereUniqueInput[]
    disconnect?: SurveyStepWhereUniqueInput | SurveyStepWhereUniqueInput[]
    delete?: SurveyStepWhereUniqueInput | SurveyStepWhereUniqueInput[]
    connect?: SurveyStepWhereUniqueInput | SurveyStepWhereUniqueInput[]
    update?: SurveyStepUpdateWithWhereUniqueWithoutTemplateInput | SurveyStepUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: SurveyStepUpdateManyWithWhereWithoutTemplateInput | SurveyStepUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: SurveyStepScalarWhereInput | SurveyStepScalarWhereInput[]
  }

  export type SurveyUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<SurveyCreateWithoutTemplateInput, SurveyUncheckedCreateWithoutTemplateInput> | SurveyCreateWithoutTemplateInput[] | SurveyUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: SurveyCreateOrConnectWithoutTemplateInput | SurveyCreateOrConnectWithoutTemplateInput[]
    upsert?: SurveyUpsertWithWhereUniqueWithoutTemplateInput | SurveyUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: SurveyCreateManyTemplateInputEnvelope
    set?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    disconnect?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    delete?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    connect?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    update?: SurveyUpdateWithWhereUniqueWithoutTemplateInput | SurveyUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: SurveyUpdateManyWithWhereWithoutTemplateInput | SurveyUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: SurveyScalarWhereInput | SurveyScalarWhereInput[]
  }

  export type SurveyQuestionCreateNestedManyWithoutStepInput = {
    create?: XOR<SurveyQuestionCreateWithoutStepInput, SurveyQuestionUncheckedCreateWithoutStepInput> | SurveyQuestionCreateWithoutStepInput[] | SurveyQuestionUncheckedCreateWithoutStepInput[]
    connectOrCreate?: SurveyQuestionCreateOrConnectWithoutStepInput | SurveyQuestionCreateOrConnectWithoutStepInput[]
    createMany?: SurveyQuestionCreateManyStepInputEnvelope
    connect?: SurveyQuestionWhereUniqueInput | SurveyQuestionWhereUniqueInput[]
  }

  export type SurveyTemplateCreateNestedOneWithoutStepsInput = {
    create?: XOR<SurveyTemplateCreateWithoutStepsInput, SurveyTemplateUncheckedCreateWithoutStepsInput>
    connectOrCreate?: SurveyTemplateCreateOrConnectWithoutStepsInput
    connect?: SurveyTemplateWhereUniqueInput
  }

  export type SurveyQuestionUncheckedCreateNestedManyWithoutStepInput = {
    create?: XOR<SurveyQuestionCreateWithoutStepInput, SurveyQuestionUncheckedCreateWithoutStepInput> | SurveyQuestionCreateWithoutStepInput[] | SurveyQuestionUncheckedCreateWithoutStepInput[]
    connectOrCreate?: SurveyQuestionCreateOrConnectWithoutStepInput | SurveyQuestionCreateOrConnectWithoutStepInput[]
    createMany?: SurveyQuestionCreateManyStepInputEnvelope
    connect?: SurveyQuestionWhereUniqueInput | SurveyQuestionWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SurveyQuestionUpdateManyWithoutStepNestedInput = {
    create?: XOR<SurveyQuestionCreateWithoutStepInput, SurveyQuestionUncheckedCreateWithoutStepInput> | SurveyQuestionCreateWithoutStepInput[] | SurveyQuestionUncheckedCreateWithoutStepInput[]
    connectOrCreate?: SurveyQuestionCreateOrConnectWithoutStepInput | SurveyQuestionCreateOrConnectWithoutStepInput[]
    upsert?: SurveyQuestionUpsertWithWhereUniqueWithoutStepInput | SurveyQuestionUpsertWithWhereUniqueWithoutStepInput[]
    createMany?: SurveyQuestionCreateManyStepInputEnvelope
    set?: SurveyQuestionWhereUniqueInput | SurveyQuestionWhereUniqueInput[]
    disconnect?: SurveyQuestionWhereUniqueInput | SurveyQuestionWhereUniqueInput[]
    delete?: SurveyQuestionWhereUniqueInput | SurveyQuestionWhereUniqueInput[]
    connect?: SurveyQuestionWhereUniqueInput | SurveyQuestionWhereUniqueInput[]
    update?: SurveyQuestionUpdateWithWhereUniqueWithoutStepInput | SurveyQuestionUpdateWithWhereUniqueWithoutStepInput[]
    updateMany?: SurveyQuestionUpdateManyWithWhereWithoutStepInput | SurveyQuestionUpdateManyWithWhereWithoutStepInput[]
    deleteMany?: SurveyQuestionScalarWhereInput | SurveyQuestionScalarWhereInput[]
  }

  export type SurveyTemplateUpdateOneRequiredWithoutStepsNestedInput = {
    create?: XOR<SurveyTemplateCreateWithoutStepsInput, SurveyTemplateUncheckedCreateWithoutStepsInput>
    connectOrCreate?: SurveyTemplateCreateOrConnectWithoutStepsInput
    upsert?: SurveyTemplateUpsertWithoutStepsInput
    connect?: SurveyTemplateWhereUniqueInput
    update?: XOR<XOR<SurveyTemplateUpdateToOneWithWhereWithoutStepsInput, SurveyTemplateUpdateWithoutStepsInput>, SurveyTemplateUncheckedUpdateWithoutStepsInput>
  }

  export type SurveyQuestionUncheckedUpdateManyWithoutStepNestedInput = {
    create?: XOR<SurveyQuestionCreateWithoutStepInput, SurveyQuestionUncheckedCreateWithoutStepInput> | SurveyQuestionCreateWithoutStepInput[] | SurveyQuestionUncheckedCreateWithoutStepInput[]
    connectOrCreate?: SurveyQuestionCreateOrConnectWithoutStepInput | SurveyQuestionCreateOrConnectWithoutStepInput[]
    upsert?: SurveyQuestionUpsertWithWhereUniqueWithoutStepInput | SurveyQuestionUpsertWithWhereUniqueWithoutStepInput[]
    createMany?: SurveyQuestionCreateManyStepInputEnvelope
    set?: SurveyQuestionWhereUniqueInput | SurveyQuestionWhereUniqueInput[]
    disconnect?: SurveyQuestionWhereUniqueInput | SurveyQuestionWhereUniqueInput[]
    delete?: SurveyQuestionWhereUniqueInput | SurveyQuestionWhereUniqueInput[]
    connect?: SurveyQuestionWhereUniqueInput | SurveyQuestionWhereUniqueInput[]
    update?: SurveyQuestionUpdateWithWhereUniqueWithoutStepInput | SurveyQuestionUpdateWithWhereUniqueWithoutStepInput[]
    updateMany?: SurveyQuestionUpdateManyWithWhereWithoutStepInput | SurveyQuestionUpdateManyWithWhereWithoutStepInput[]
    deleteMany?: SurveyQuestionScalarWhereInput | SurveyQuestionScalarWhereInput[]
  }

  export type QuestionOptionCreateNestedManyWithoutQuestionInput = {
    create?: XOR<QuestionOptionCreateWithoutQuestionInput, QuestionOptionUncheckedCreateWithoutQuestionInput> | QuestionOptionCreateWithoutQuestionInput[] | QuestionOptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: QuestionOptionCreateOrConnectWithoutQuestionInput | QuestionOptionCreateOrConnectWithoutQuestionInput[]
    createMany?: QuestionOptionCreateManyQuestionInputEnvelope
    connect?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
  }

  export type SurveyStepCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<SurveyStepCreateWithoutQuestionsInput, SurveyStepUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: SurveyStepCreateOrConnectWithoutQuestionsInput
    connect?: SurveyStepWhereUniqueInput
  }

  export type QuestionOptionUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<QuestionOptionCreateWithoutQuestionInput, QuestionOptionUncheckedCreateWithoutQuestionInput> | QuestionOptionCreateWithoutQuestionInput[] | QuestionOptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: QuestionOptionCreateOrConnectWithoutQuestionInput | QuestionOptionCreateOrConnectWithoutQuestionInput[]
    createMany?: QuestionOptionCreateManyQuestionInputEnvelope
    connect?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
  }

  export type EnumQuestionTypeFieldUpdateOperationsInput = {
    set?: $Enums.QuestionType
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type QuestionOptionUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<QuestionOptionCreateWithoutQuestionInput, QuestionOptionUncheckedCreateWithoutQuestionInput> | QuestionOptionCreateWithoutQuestionInput[] | QuestionOptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: QuestionOptionCreateOrConnectWithoutQuestionInput | QuestionOptionCreateOrConnectWithoutQuestionInput[]
    upsert?: QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput | QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: QuestionOptionCreateManyQuestionInputEnvelope
    set?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    disconnect?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    delete?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    connect?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    update?: QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput | QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: QuestionOptionUpdateManyWithWhereWithoutQuestionInput | QuestionOptionUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: QuestionOptionScalarWhereInput | QuestionOptionScalarWhereInput[]
  }

  export type SurveyStepUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<SurveyStepCreateWithoutQuestionsInput, SurveyStepUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: SurveyStepCreateOrConnectWithoutQuestionsInput
    upsert?: SurveyStepUpsertWithoutQuestionsInput
    connect?: SurveyStepWhereUniqueInput
    update?: XOR<XOR<SurveyStepUpdateToOneWithWhereWithoutQuestionsInput, SurveyStepUpdateWithoutQuestionsInput>, SurveyStepUncheckedUpdateWithoutQuestionsInput>
  }

  export type QuestionOptionUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<QuestionOptionCreateWithoutQuestionInput, QuestionOptionUncheckedCreateWithoutQuestionInput> | QuestionOptionCreateWithoutQuestionInput[] | QuestionOptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: QuestionOptionCreateOrConnectWithoutQuestionInput | QuestionOptionCreateOrConnectWithoutQuestionInput[]
    upsert?: QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput | QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: QuestionOptionCreateManyQuestionInputEnvelope
    set?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    disconnect?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    delete?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    connect?: QuestionOptionWhereUniqueInput | QuestionOptionWhereUniqueInput[]
    update?: QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput | QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: QuestionOptionUpdateManyWithWhereWithoutQuestionInput | QuestionOptionUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: QuestionOptionScalarWhereInput | QuestionOptionScalarWhereInput[]
  }

  export type SurveyQuestionCreateNestedOneWithoutOptionsInput = {
    create?: XOR<SurveyQuestionCreateWithoutOptionsInput, SurveyQuestionUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: SurveyQuestionCreateOrConnectWithoutOptionsInput
    connect?: SurveyQuestionWhereUniqueInput
  }

  export type SurveyQuestionUpdateOneRequiredWithoutOptionsNestedInput = {
    create?: XOR<SurveyQuestionCreateWithoutOptionsInput, SurveyQuestionUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: SurveyQuestionCreateOrConnectWithoutOptionsInput
    upsert?: SurveyQuestionUpsertWithoutOptionsInput
    connect?: SurveyQuestionWhereUniqueInput
    update?: XOR<XOR<SurveyQuestionUpdateToOneWithWhereWithoutOptionsInput, SurveyQuestionUpdateWithoutOptionsInput>, SurveyQuestionUncheckedUpdateWithoutOptionsInput>
  }

  export type SurveyResponseCreateNestedManyWithoutSurveyInput = {
    create?: XOR<SurveyResponseCreateWithoutSurveyInput, SurveyResponseUncheckedCreateWithoutSurveyInput> | SurveyResponseCreateWithoutSurveyInput[] | SurveyResponseUncheckedCreateWithoutSurveyInput[]
    connectOrCreate?: SurveyResponseCreateOrConnectWithoutSurveyInput | SurveyResponseCreateOrConnectWithoutSurveyInput[]
    createMany?: SurveyResponseCreateManySurveyInputEnvelope
    connect?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutSurveysInput = {
    create?: XOR<UserCreateWithoutSurveysInput, UserUncheckedCreateWithoutSurveysInput>
    connectOrCreate?: UserCreateOrConnectWithoutSurveysInput
    connect?: UserWhereUniqueInput
  }

  export type SurveyTemplateCreateNestedOneWithoutSurveysInput = {
    create?: XOR<SurveyTemplateCreateWithoutSurveysInput, SurveyTemplateUncheckedCreateWithoutSurveysInput>
    connectOrCreate?: SurveyTemplateCreateOrConnectWithoutSurveysInput
    connect?: SurveyTemplateWhereUniqueInput
  }

  export type SurveyCancellationRequestCreateNestedOneWithoutSurveyInput = {
    create?: XOR<SurveyCancellationRequestCreateWithoutSurveyInput, SurveyCancellationRequestUncheckedCreateWithoutSurveyInput>
    connectOrCreate?: SurveyCancellationRequestCreateOrConnectWithoutSurveyInput
    connect?: SurveyCancellationRequestWhereUniqueInput
  }

  export type SurveyResponseUncheckedCreateNestedManyWithoutSurveyInput = {
    create?: XOR<SurveyResponseCreateWithoutSurveyInput, SurveyResponseUncheckedCreateWithoutSurveyInput> | SurveyResponseCreateWithoutSurveyInput[] | SurveyResponseUncheckedCreateWithoutSurveyInput[]
    connectOrCreate?: SurveyResponseCreateOrConnectWithoutSurveyInput | SurveyResponseCreateOrConnectWithoutSurveyInput[]
    createMany?: SurveyResponseCreateManySurveyInputEnvelope
    connect?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
  }

  export type SurveyCancellationRequestUncheckedCreateNestedOneWithoutSurveyInput = {
    create?: XOR<SurveyCancellationRequestCreateWithoutSurveyInput, SurveyCancellationRequestUncheckedCreateWithoutSurveyInput>
    connectOrCreate?: SurveyCancellationRequestCreateOrConnectWithoutSurveyInput
    connect?: SurveyCancellationRequestWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumSurveyStatusFieldUpdateOperationsInput = {
    set?: $Enums.SurveyStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableEnumCancellationStatusFieldUpdateOperationsInput = {
    set?: $Enums.CancellationStatus | null
  }

  export type SurveyResponseUpdateManyWithoutSurveyNestedInput = {
    create?: XOR<SurveyResponseCreateWithoutSurveyInput, SurveyResponseUncheckedCreateWithoutSurveyInput> | SurveyResponseCreateWithoutSurveyInput[] | SurveyResponseUncheckedCreateWithoutSurveyInput[]
    connectOrCreate?: SurveyResponseCreateOrConnectWithoutSurveyInput | SurveyResponseCreateOrConnectWithoutSurveyInput[]
    upsert?: SurveyResponseUpsertWithWhereUniqueWithoutSurveyInput | SurveyResponseUpsertWithWhereUniqueWithoutSurveyInput[]
    createMany?: SurveyResponseCreateManySurveyInputEnvelope
    set?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    disconnect?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    delete?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    connect?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    update?: SurveyResponseUpdateWithWhereUniqueWithoutSurveyInput | SurveyResponseUpdateWithWhereUniqueWithoutSurveyInput[]
    updateMany?: SurveyResponseUpdateManyWithWhereWithoutSurveyInput | SurveyResponseUpdateManyWithWhereWithoutSurveyInput[]
    deleteMany?: SurveyResponseScalarWhereInput | SurveyResponseScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutSurveysNestedInput = {
    create?: XOR<UserCreateWithoutSurveysInput, UserUncheckedCreateWithoutSurveysInput>
    connectOrCreate?: UserCreateOrConnectWithoutSurveysInput
    upsert?: UserUpsertWithoutSurveysInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSurveysInput, UserUpdateWithoutSurveysInput>, UserUncheckedUpdateWithoutSurveysInput>
  }

  export type SurveyTemplateUpdateOneRequiredWithoutSurveysNestedInput = {
    create?: XOR<SurveyTemplateCreateWithoutSurveysInput, SurveyTemplateUncheckedCreateWithoutSurveysInput>
    connectOrCreate?: SurveyTemplateCreateOrConnectWithoutSurveysInput
    upsert?: SurveyTemplateUpsertWithoutSurveysInput
    connect?: SurveyTemplateWhereUniqueInput
    update?: XOR<XOR<SurveyTemplateUpdateToOneWithWhereWithoutSurveysInput, SurveyTemplateUpdateWithoutSurveysInput>, SurveyTemplateUncheckedUpdateWithoutSurveysInput>
  }

  export type SurveyCancellationRequestUpdateOneWithoutSurveyNestedInput = {
    create?: XOR<SurveyCancellationRequestCreateWithoutSurveyInput, SurveyCancellationRequestUncheckedCreateWithoutSurveyInput>
    connectOrCreate?: SurveyCancellationRequestCreateOrConnectWithoutSurveyInput
    upsert?: SurveyCancellationRequestUpsertWithoutSurveyInput
    disconnect?: SurveyCancellationRequestWhereInput | boolean
    delete?: SurveyCancellationRequestWhereInput | boolean
    connect?: SurveyCancellationRequestWhereUniqueInput
    update?: XOR<XOR<SurveyCancellationRequestUpdateToOneWithWhereWithoutSurveyInput, SurveyCancellationRequestUpdateWithoutSurveyInput>, SurveyCancellationRequestUncheckedUpdateWithoutSurveyInput>
  }

  export type SurveyResponseUncheckedUpdateManyWithoutSurveyNestedInput = {
    create?: XOR<SurveyResponseCreateWithoutSurveyInput, SurveyResponseUncheckedCreateWithoutSurveyInput> | SurveyResponseCreateWithoutSurveyInput[] | SurveyResponseUncheckedCreateWithoutSurveyInput[]
    connectOrCreate?: SurveyResponseCreateOrConnectWithoutSurveyInput | SurveyResponseCreateOrConnectWithoutSurveyInput[]
    upsert?: SurveyResponseUpsertWithWhereUniqueWithoutSurveyInput | SurveyResponseUpsertWithWhereUniqueWithoutSurveyInput[]
    createMany?: SurveyResponseCreateManySurveyInputEnvelope
    set?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    disconnect?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    delete?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    connect?: SurveyResponseWhereUniqueInput | SurveyResponseWhereUniqueInput[]
    update?: SurveyResponseUpdateWithWhereUniqueWithoutSurveyInput | SurveyResponseUpdateWithWhereUniqueWithoutSurveyInput[]
    updateMany?: SurveyResponseUpdateManyWithWhereWithoutSurveyInput | SurveyResponseUpdateManyWithWhereWithoutSurveyInput[]
    deleteMany?: SurveyResponseScalarWhereInput | SurveyResponseScalarWhereInput[]
  }

  export type SurveyCancellationRequestUncheckedUpdateOneWithoutSurveyNestedInput = {
    create?: XOR<SurveyCancellationRequestCreateWithoutSurveyInput, SurveyCancellationRequestUncheckedCreateWithoutSurveyInput>
    connectOrCreate?: SurveyCancellationRequestCreateOrConnectWithoutSurveyInput
    upsert?: SurveyCancellationRequestUpsertWithoutSurveyInput
    disconnect?: SurveyCancellationRequestWhereInput | boolean
    delete?: SurveyCancellationRequestWhereInput | boolean
    connect?: SurveyCancellationRequestWhereUniqueInput
    update?: XOR<XOR<SurveyCancellationRequestUpdateToOneWithWhereWithoutSurveyInput, SurveyCancellationRequestUpdateWithoutSurveyInput>, SurveyCancellationRequestUncheckedUpdateWithoutSurveyInput>
  }

  export type UserCreateNestedOneWithoutResponsesInput = {
    create?: XOR<UserCreateWithoutResponsesInput, UserUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: UserCreateOrConnectWithoutResponsesInput
    connect?: UserWhereUniqueInput
  }

  export type SurveyCreateNestedOneWithoutResponsesInput = {
    create?: XOR<SurveyCreateWithoutResponsesInput, SurveyUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: SurveyCreateOrConnectWithoutResponsesInput
    connect?: SurveyWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutResponsesNestedInput = {
    create?: XOR<UserCreateWithoutResponsesInput, UserUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: UserCreateOrConnectWithoutResponsesInput
    upsert?: UserUpsertWithoutResponsesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResponsesInput, UserUpdateWithoutResponsesInput>, UserUncheckedUpdateWithoutResponsesInput>
  }

  export type SurveyUpdateOneRequiredWithoutResponsesNestedInput = {
    create?: XOR<SurveyCreateWithoutResponsesInput, SurveyUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: SurveyCreateOrConnectWithoutResponsesInput
    upsert?: SurveyUpsertWithoutResponsesInput
    connect?: SurveyWhereUniqueInput
    update?: XOR<XOR<SurveyUpdateToOneWithWhereWithoutResponsesInput, SurveyUpdateWithoutResponsesInput>, SurveyUncheckedUpdateWithoutResponsesInput>
  }

  export type UserCreateNestedOneWithoutRewardsInput = {
    create?: XOR<UserCreateWithoutRewardsInput, UserUncheckedCreateWithoutRewardsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRewardsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumRewardTypeFieldUpdateOperationsInput = {
    set?: $Enums.RewardType
  }

  export type EnumRewardStatusFieldUpdateOperationsInput = {
    set?: $Enums.RewardStatus
  }

  export type UserUpdateOneRequiredWithoutRewardsNestedInput = {
    create?: XOR<UserCreateWithoutRewardsInput, UserUncheckedCreateWithoutRewardsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRewardsInput
    upsert?: UserUpsertWithoutRewardsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRewardsInput, UserUpdateWithoutRewardsInput>, UserUncheckedUpdateWithoutRewardsInput>
  }

  export type SurveyCreateNestedOneWithoutCancellationRequestInput = {
    create?: XOR<SurveyCreateWithoutCancellationRequestInput, SurveyUncheckedCreateWithoutCancellationRequestInput>
    connectOrCreate?: SurveyCreateOrConnectWithoutCancellationRequestInput
    connect?: SurveyWhereUniqueInput
  }

  export type EnumCancellationStatusFieldUpdateOperationsInput = {
    set?: $Enums.CancellationStatus
  }

  export type SurveyUpdateOneRequiredWithoutCancellationRequestNestedInput = {
    create?: XOR<SurveyCreateWithoutCancellationRequestInput, SurveyUncheckedCreateWithoutCancellationRequestInput>
    connectOrCreate?: SurveyCreateOrConnectWithoutCancellationRequestInput
    upsert?: SurveyUpsertWithoutCancellationRequestInput
    connect?: SurveyWhereUniqueInput
    update?: XOR<XOR<SurveyUpdateToOneWithWhereWithoutCancellationRequestInput, SurveyUpdateWithoutCancellationRequestInput>, SurveyUncheckedUpdateWithoutCancellationRequestInput>
  }

  export type UserCreateNestedOneWithoutWithdrawalRequestsInput = {
    create?: XOR<UserCreateWithoutWithdrawalRequestsInput, UserUncheckedCreateWithoutWithdrawalRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWithdrawalRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumWithdrawalStatusFieldUpdateOperationsInput = {
    set?: $Enums.WithdrawalStatus
  }

  export type UserUpdateOneRequiredWithoutWithdrawalRequestsNestedInput = {
    create?: XOR<UserCreateWithoutWithdrawalRequestsInput, UserUncheckedCreateWithoutWithdrawalRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWithdrawalRequestsInput
    upsert?: UserUpsertWithoutWithdrawalRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWithdrawalRequestsInput, UserUpdateWithoutWithdrawalRequestsInput>, UserUncheckedUpdateWithoutWithdrawalRequestsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeFilter<$PrismaModel> | $Enums.QuestionType
  }

  export type NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuestionTypeFilter<$PrismaModel>
    _max?: NestedEnumQuestionTypeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumSurveyStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SurveyStatus | EnumSurveyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SurveyStatus[] | ListEnumSurveyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SurveyStatus[] | ListEnumSurveyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSurveyStatusFilter<$PrismaModel> | $Enums.SurveyStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumCancellationStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CancellationStatus | EnumCancellationStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.CancellationStatus[] | ListEnumCancellationStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CancellationStatus[] | ListEnumCancellationStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCancellationStatusNullableFilter<$PrismaModel> | $Enums.CancellationStatus | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumSurveyStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SurveyStatus | EnumSurveyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SurveyStatus[] | ListEnumSurveyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SurveyStatus[] | ListEnumSurveyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSurveyStatusWithAggregatesFilter<$PrismaModel> | $Enums.SurveyStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSurveyStatusFilter<$PrismaModel>
    _max?: NestedEnumSurveyStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumCancellationStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CancellationStatus | EnumCancellationStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.CancellationStatus[] | ListEnumCancellationStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CancellationStatus[] | ListEnumCancellationStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCancellationStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.CancellationStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCancellationStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumCancellationStatusNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumRewardTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RewardType | EnumRewardTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RewardType[] | ListEnumRewardTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RewardType[] | ListEnumRewardTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRewardTypeFilter<$PrismaModel> | $Enums.RewardType
  }

  export type NestedEnumRewardStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RewardStatus | EnumRewardStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RewardStatus[] | ListEnumRewardStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RewardStatus[] | ListEnumRewardStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRewardStatusFilter<$PrismaModel> | $Enums.RewardStatus
  }

  export type NestedEnumRewardTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RewardType | EnumRewardTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RewardType[] | ListEnumRewardTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RewardType[] | ListEnumRewardTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRewardTypeWithAggregatesFilter<$PrismaModel> | $Enums.RewardType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRewardTypeFilter<$PrismaModel>
    _max?: NestedEnumRewardTypeFilter<$PrismaModel>
  }

  export type NestedEnumRewardStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RewardStatus | EnumRewardStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RewardStatus[] | ListEnumRewardStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RewardStatus[] | ListEnumRewardStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRewardStatusWithAggregatesFilter<$PrismaModel> | $Enums.RewardStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRewardStatusFilter<$PrismaModel>
    _max?: NestedEnumRewardStatusFilter<$PrismaModel>
  }

  export type NestedEnumCancellationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CancellationStatus | EnumCancellationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CancellationStatus[] | ListEnumCancellationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CancellationStatus[] | ListEnumCancellationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCancellationStatusFilter<$PrismaModel> | $Enums.CancellationStatus
  }

  export type NestedEnumCancellationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CancellationStatus | EnumCancellationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CancellationStatus[] | ListEnumCancellationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CancellationStatus[] | ListEnumCancellationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCancellationStatusWithAggregatesFilter<$PrismaModel> | $Enums.CancellationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCancellationStatusFilter<$PrismaModel>
    _max?: NestedEnumCancellationStatusFilter<$PrismaModel>
  }

  export type NestedEnumWithdrawalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WithdrawalStatus | EnumWithdrawalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WithdrawalStatus[] | ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WithdrawalStatus[] | ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWithdrawalStatusFilter<$PrismaModel> | $Enums.WithdrawalStatus
  }

  export type NestedEnumWithdrawalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WithdrawalStatus | EnumWithdrawalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WithdrawalStatus[] | ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WithdrawalStatus[] | ListEnumWithdrawalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWithdrawalStatusWithAggregatesFilter<$PrismaModel> | $Enums.WithdrawalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWithdrawalStatusFilter<$PrismaModel>
    _max?: NestedEnumWithdrawalStatusFilter<$PrismaModel>
  }

  export type RewardCreateWithoutUserInput = {
    id?: string
    amount: number
    type: $Enums.RewardType
    status?: $Enums.RewardStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RewardUncheckedCreateWithoutUserInput = {
    id?: string
    amount: number
    type: $Enums.RewardType
    status?: $Enums.RewardStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RewardCreateOrConnectWithoutUserInput = {
    where: RewardWhereUniqueInput
    create: XOR<RewardCreateWithoutUserInput, RewardUncheckedCreateWithoutUserInput>
  }

  export type RewardCreateManyUserInputEnvelope = {
    data: RewardCreateManyUserInput | RewardCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SurveyResponseCreateWithoutConsumerInput = {
    id?: string
    responses: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    survey: SurveyCreateNestedOneWithoutResponsesInput
  }

  export type SurveyResponseUncheckedCreateWithoutConsumerInput = {
    id?: string
    surveyId: string
    responses: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SurveyResponseCreateOrConnectWithoutConsumerInput = {
    where: SurveyResponseWhereUniqueInput
    create: XOR<SurveyResponseCreateWithoutConsumerInput, SurveyResponseUncheckedCreateWithoutConsumerInput>
  }

  export type SurveyResponseCreateManyConsumerInputEnvelope = {
    data: SurveyResponseCreateManyConsumerInput | SurveyResponseCreateManyConsumerInput[]
    skipDuplicates?: boolean
  }

  export type SurveyCreateWithoutSellerInput = {
    id?: string
    title: string
    storeName?: string
    description?: string | null
    url: string
    targetAgeMin: number
    targetAgeMax: number
    targetGender: $Enums.Gender
    reward: number
    maxParticipants?: number
    totalBudget?: number | null
    status?: $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    endDate: Date | string
    approvedAt?: Date | string | null
    completedAt?: Date | string | null
    suspendedAt?: Date | string | null
    rejectionReason?: string | null
    extensionCount?: number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: $Enums.CancellationStatus | null
    cancellationRequestedAt?: Date | string | null
    responses?: SurveyResponseCreateNestedManyWithoutSurveyInput
    template: SurveyTemplateCreateNestedOneWithoutSurveysInput
    cancellationRequest?: SurveyCancellationRequestCreateNestedOneWithoutSurveyInput
  }

  export type SurveyUncheckedCreateWithoutSellerInput = {
    id?: string
    title: string
    storeName?: string
    description?: string | null
    url: string
    templateId: string
    targetAgeMin: number
    targetAgeMax: number
    targetGender: $Enums.Gender
    reward: number
    maxParticipants?: number
    totalBudget?: number | null
    status?: $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    endDate: Date | string
    approvedAt?: Date | string | null
    completedAt?: Date | string | null
    suspendedAt?: Date | string | null
    rejectionReason?: string | null
    extensionCount?: number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: $Enums.CancellationStatus | null
    cancellationRequestedAt?: Date | string | null
    responses?: SurveyResponseUncheckedCreateNestedManyWithoutSurveyInput
    cancellationRequest?: SurveyCancellationRequestUncheckedCreateNestedOneWithoutSurveyInput
  }

  export type SurveyCreateOrConnectWithoutSellerInput = {
    where: SurveyWhereUniqueInput
    create: XOR<SurveyCreateWithoutSellerInput, SurveyUncheckedCreateWithoutSellerInput>
  }

  export type SurveyCreateManySellerInputEnvelope = {
    data: SurveyCreateManySellerInput | SurveyCreateManySellerInput[]
    skipDuplicates?: boolean
  }

  export type WithdrawalRequestCreateWithoutUserInput = {
    id?: string
    amount: number
    status?: $Enums.WithdrawalStatus
    requestedAt?: Date | string
    processedAt?: Date | string | null
    processedBy?: string | null
    note?: string | null
  }

  export type WithdrawalRequestUncheckedCreateWithoutUserInput = {
    id?: string
    amount: number
    status?: $Enums.WithdrawalStatus
    requestedAt?: Date | string
    processedAt?: Date | string | null
    processedBy?: string | null
    note?: string | null
  }

  export type WithdrawalRequestCreateOrConnectWithoutUserInput = {
    where: WithdrawalRequestWhereUniqueInput
    create: XOR<WithdrawalRequestCreateWithoutUserInput, WithdrawalRequestUncheckedCreateWithoutUserInput>
  }

  export type WithdrawalRequestCreateManyUserInputEnvelope = {
    data: WithdrawalRequestCreateManyUserInput | WithdrawalRequestCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RewardUpsertWithWhereUniqueWithoutUserInput = {
    where: RewardWhereUniqueInput
    update: XOR<RewardUpdateWithoutUserInput, RewardUncheckedUpdateWithoutUserInput>
    create: XOR<RewardCreateWithoutUserInput, RewardUncheckedCreateWithoutUserInput>
  }

  export type RewardUpdateWithWhereUniqueWithoutUserInput = {
    where: RewardWhereUniqueInput
    data: XOR<RewardUpdateWithoutUserInput, RewardUncheckedUpdateWithoutUserInput>
  }

  export type RewardUpdateManyWithWhereWithoutUserInput = {
    where: RewardScalarWhereInput
    data: XOR<RewardUpdateManyMutationInput, RewardUncheckedUpdateManyWithoutUserInput>
  }

  export type RewardScalarWhereInput = {
    AND?: RewardScalarWhereInput | RewardScalarWhereInput[]
    OR?: RewardScalarWhereInput[]
    NOT?: RewardScalarWhereInput | RewardScalarWhereInput[]
    id?: StringFilter<"Reward"> | string
    userId?: StringFilter<"Reward"> | string
    amount?: FloatFilter<"Reward"> | number
    type?: EnumRewardTypeFilter<"Reward"> | $Enums.RewardType
    status?: EnumRewardStatusFilter<"Reward"> | $Enums.RewardStatus
    createdAt?: DateTimeFilter<"Reward"> | Date | string
    updatedAt?: DateTimeFilter<"Reward"> | Date | string
  }

  export type SurveyResponseUpsertWithWhereUniqueWithoutConsumerInput = {
    where: SurveyResponseWhereUniqueInput
    update: XOR<SurveyResponseUpdateWithoutConsumerInput, SurveyResponseUncheckedUpdateWithoutConsumerInput>
    create: XOR<SurveyResponseCreateWithoutConsumerInput, SurveyResponseUncheckedCreateWithoutConsumerInput>
  }

  export type SurveyResponseUpdateWithWhereUniqueWithoutConsumerInput = {
    where: SurveyResponseWhereUniqueInput
    data: XOR<SurveyResponseUpdateWithoutConsumerInput, SurveyResponseUncheckedUpdateWithoutConsumerInput>
  }

  export type SurveyResponseUpdateManyWithWhereWithoutConsumerInput = {
    where: SurveyResponseScalarWhereInput
    data: XOR<SurveyResponseUpdateManyMutationInput, SurveyResponseUncheckedUpdateManyWithoutConsumerInput>
  }

  export type SurveyResponseScalarWhereInput = {
    AND?: SurveyResponseScalarWhereInput | SurveyResponseScalarWhereInput[]
    OR?: SurveyResponseScalarWhereInput[]
    NOT?: SurveyResponseScalarWhereInput | SurveyResponseScalarWhereInput[]
    id?: StringFilter<"SurveyResponse"> | string
    surveyId?: StringFilter<"SurveyResponse"> | string
    consumerId?: StringFilter<"SurveyResponse"> | string
    responses?: JsonFilter<"SurveyResponse">
    createdAt?: DateTimeFilter<"SurveyResponse"> | Date | string
    updatedAt?: DateTimeFilter<"SurveyResponse"> | Date | string
  }

  export type SurveyUpsertWithWhereUniqueWithoutSellerInput = {
    where: SurveyWhereUniqueInput
    update: XOR<SurveyUpdateWithoutSellerInput, SurveyUncheckedUpdateWithoutSellerInput>
    create: XOR<SurveyCreateWithoutSellerInput, SurveyUncheckedCreateWithoutSellerInput>
  }

  export type SurveyUpdateWithWhereUniqueWithoutSellerInput = {
    where: SurveyWhereUniqueInput
    data: XOR<SurveyUpdateWithoutSellerInput, SurveyUncheckedUpdateWithoutSellerInput>
  }

  export type SurveyUpdateManyWithWhereWithoutSellerInput = {
    where: SurveyScalarWhereInput
    data: XOR<SurveyUpdateManyMutationInput, SurveyUncheckedUpdateManyWithoutSellerInput>
  }

  export type SurveyScalarWhereInput = {
    AND?: SurveyScalarWhereInput | SurveyScalarWhereInput[]
    OR?: SurveyScalarWhereInput[]
    NOT?: SurveyScalarWhereInput | SurveyScalarWhereInput[]
    id?: StringFilter<"Survey"> | string
    title?: StringFilter<"Survey"> | string
    storeName?: StringFilter<"Survey"> | string
    description?: StringNullableFilter<"Survey"> | string | null
    url?: StringFilter<"Survey"> | string
    sellerId?: StringFilter<"Survey"> | string
    templateId?: StringFilter<"Survey"> | string
    targetAgeMin?: IntFilter<"Survey"> | number
    targetAgeMax?: IntFilter<"Survey"> | number
    targetGender?: EnumGenderFilter<"Survey"> | $Enums.Gender
    reward?: FloatFilter<"Survey"> | number
    maxParticipants?: IntFilter<"Survey"> | number
    totalBudget?: FloatNullableFilter<"Survey"> | number | null
    status?: EnumSurveyStatusFilter<"Survey"> | $Enums.SurveyStatus
    customSteps?: JsonNullableFilter<"Survey">
    createdAt?: DateTimeFilter<"Survey"> | Date | string
    updatedAt?: DateTimeFilter<"Survey"> | Date | string
    endDate?: DateTimeFilter<"Survey"> | Date | string
    approvedAt?: DateTimeNullableFilter<"Survey"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Survey"> | Date | string | null
    suspendedAt?: DateTimeNullableFilter<"Survey"> | Date | string | null
    rejectionReason?: StringNullableFilter<"Survey"> | string | null
    extensionCount?: IntFilter<"Survey"> | number
    extensionHistory?: JsonNullableFilter<"Survey">
    cancellationStatus?: EnumCancellationStatusNullableFilter<"Survey"> | $Enums.CancellationStatus | null
    cancellationRequestedAt?: DateTimeNullableFilter<"Survey"> | Date | string | null
  }

  export type WithdrawalRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: WithdrawalRequestWhereUniqueInput
    update: XOR<WithdrawalRequestUpdateWithoutUserInput, WithdrawalRequestUncheckedUpdateWithoutUserInput>
    create: XOR<WithdrawalRequestCreateWithoutUserInput, WithdrawalRequestUncheckedCreateWithoutUserInput>
  }

  export type WithdrawalRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: WithdrawalRequestWhereUniqueInput
    data: XOR<WithdrawalRequestUpdateWithoutUserInput, WithdrawalRequestUncheckedUpdateWithoutUserInput>
  }

  export type WithdrawalRequestUpdateManyWithWhereWithoutUserInput = {
    where: WithdrawalRequestScalarWhereInput
    data: XOR<WithdrawalRequestUpdateManyMutationInput, WithdrawalRequestUncheckedUpdateManyWithoutUserInput>
  }

  export type WithdrawalRequestScalarWhereInput = {
    AND?: WithdrawalRequestScalarWhereInput | WithdrawalRequestScalarWhereInput[]
    OR?: WithdrawalRequestScalarWhereInput[]
    NOT?: WithdrawalRequestScalarWhereInput | WithdrawalRequestScalarWhereInput[]
    id?: StringFilter<"WithdrawalRequest"> | string
    userId?: StringFilter<"WithdrawalRequest"> | string
    amount?: FloatFilter<"WithdrawalRequest"> | number
    status?: EnumWithdrawalStatusFilter<"WithdrawalRequest"> | $Enums.WithdrawalStatus
    requestedAt?: DateTimeFilter<"WithdrawalRequest"> | Date | string
    processedAt?: DateTimeNullableFilter<"WithdrawalRequest"> | Date | string | null
    processedBy?: StringNullableFilter<"WithdrawalRequest"> | string | null
    note?: StringNullableFilter<"WithdrawalRequest"> | string | null
  }

  export type SurveyStepCreateWithoutTemplateInput = {
    id?: string
    stepNumber: number
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: SurveyQuestionCreateNestedManyWithoutStepInput
  }

  export type SurveyStepUncheckedCreateWithoutTemplateInput = {
    id?: string
    stepNumber: number
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: SurveyQuestionUncheckedCreateNestedManyWithoutStepInput
  }

  export type SurveyStepCreateOrConnectWithoutTemplateInput = {
    where: SurveyStepWhereUniqueInput
    create: XOR<SurveyStepCreateWithoutTemplateInput, SurveyStepUncheckedCreateWithoutTemplateInput>
  }

  export type SurveyStepCreateManyTemplateInputEnvelope = {
    data: SurveyStepCreateManyTemplateInput | SurveyStepCreateManyTemplateInput[]
    skipDuplicates?: boolean
  }

  export type SurveyCreateWithoutTemplateInput = {
    id?: string
    title: string
    storeName?: string
    description?: string | null
    url: string
    targetAgeMin: number
    targetAgeMax: number
    targetGender: $Enums.Gender
    reward: number
    maxParticipants?: number
    totalBudget?: number | null
    status?: $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    endDate: Date | string
    approvedAt?: Date | string | null
    completedAt?: Date | string | null
    suspendedAt?: Date | string | null
    rejectionReason?: string | null
    extensionCount?: number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: $Enums.CancellationStatus | null
    cancellationRequestedAt?: Date | string | null
    responses?: SurveyResponseCreateNestedManyWithoutSurveyInput
    seller: UserCreateNestedOneWithoutSurveysInput
    cancellationRequest?: SurveyCancellationRequestCreateNestedOneWithoutSurveyInput
  }

  export type SurveyUncheckedCreateWithoutTemplateInput = {
    id?: string
    title: string
    storeName?: string
    description?: string | null
    url: string
    sellerId: string
    targetAgeMin: number
    targetAgeMax: number
    targetGender: $Enums.Gender
    reward: number
    maxParticipants?: number
    totalBudget?: number | null
    status?: $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    endDate: Date | string
    approvedAt?: Date | string | null
    completedAt?: Date | string | null
    suspendedAt?: Date | string | null
    rejectionReason?: string | null
    extensionCount?: number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: $Enums.CancellationStatus | null
    cancellationRequestedAt?: Date | string | null
    responses?: SurveyResponseUncheckedCreateNestedManyWithoutSurveyInput
    cancellationRequest?: SurveyCancellationRequestUncheckedCreateNestedOneWithoutSurveyInput
  }

  export type SurveyCreateOrConnectWithoutTemplateInput = {
    where: SurveyWhereUniqueInput
    create: XOR<SurveyCreateWithoutTemplateInput, SurveyUncheckedCreateWithoutTemplateInput>
  }

  export type SurveyCreateManyTemplateInputEnvelope = {
    data: SurveyCreateManyTemplateInput | SurveyCreateManyTemplateInput[]
    skipDuplicates?: boolean
  }

  export type SurveyStepUpsertWithWhereUniqueWithoutTemplateInput = {
    where: SurveyStepWhereUniqueInput
    update: XOR<SurveyStepUpdateWithoutTemplateInput, SurveyStepUncheckedUpdateWithoutTemplateInput>
    create: XOR<SurveyStepCreateWithoutTemplateInput, SurveyStepUncheckedCreateWithoutTemplateInput>
  }

  export type SurveyStepUpdateWithWhereUniqueWithoutTemplateInput = {
    where: SurveyStepWhereUniqueInput
    data: XOR<SurveyStepUpdateWithoutTemplateInput, SurveyStepUncheckedUpdateWithoutTemplateInput>
  }

  export type SurveyStepUpdateManyWithWhereWithoutTemplateInput = {
    where: SurveyStepScalarWhereInput
    data: XOR<SurveyStepUpdateManyMutationInput, SurveyStepUncheckedUpdateManyWithoutTemplateInput>
  }

  export type SurveyStepScalarWhereInput = {
    AND?: SurveyStepScalarWhereInput | SurveyStepScalarWhereInput[]
    OR?: SurveyStepScalarWhereInput[]
    NOT?: SurveyStepScalarWhereInput | SurveyStepScalarWhereInput[]
    id?: StringFilter<"SurveyStep"> | string
    templateId?: StringFilter<"SurveyStep"> | string
    stepNumber?: IntFilter<"SurveyStep"> | number
    title?: StringFilter<"SurveyStep"> | string
    description?: StringNullableFilter<"SurveyStep"> | string | null
    createdAt?: DateTimeFilter<"SurveyStep"> | Date | string
    updatedAt?: DateTimeFilter<"SurveyStep"> | Date | string
  }

  export type SurveyUpsertWithWhereUniqueWithoutTemplateInput = {
    where: SurveyWhereUniqueInput
    update: XOR<SurveyUpdateWithoutTemplateInput, SurveyUncheckedUpdateWithoutTemplateInput>
    create: XOR<SurveyCreateWithoutTemplateInput, SurveyUncheckedCreateWithoutTemplateInput>
  }

  export type SurveyUpdateWithWhereUniqueWithoutTemplateInput = {
    where: SurveyWhereUniqueInput
    data: XOR<SurveyUpdateWithoutTemplateInput, SurveyUncheckedUpdateWithoutTemplateInput>
  }

  export type SurveyUpdateManyWithWhereWithoutTemplateInput = {
    where: SurveyScalarWhereInput
    data: XOR<SurveyUpdateManyMutationInput, SurveyUncheckedUpdateManyWithoutTemplateInput>
  }

  export type SurveyQuestionCreateWithoutStepInput = {
    id?: string
    questionNumber: number
    text: string
    type: $Enums.QuestionType
    required?: boolean
    minLength?: number | null
    maxLength?: number | null
    placeholder?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    options?: QuestionOptionCreateNestedManyWithoutQuestionInput
  }

  export type SurveyQuestionUncheckedCreateWithoutStepInput = {
    id?: string
    questionNumber: number
    text: string
    type: $Enums.QuestionType
    required?: boolean
    minLength?: number | null
    maxLength?: number | null
    placeholder?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    options?: QuestionOptionUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type SurveyQuestionCreateOrConnectWithoutStepInput = {
    where: SurveyQuestionWhereUniqueInput
    create: XOR<SurveyQuestionCreateWithoutStepInput, SurveyQuestionUncheckedCreateWithoutStepInput>
  }

  export type SurveyQuestionCreateManyStepInputEnvelope = {
    data: SurveyQuestionCreateManyStepInput | SurveyQuestionCreateManyStepInput[]
    skipDuplicates?: boolean
  }

  export type SurveyTemplateCreateWithoutStepsInput = {
    id?: string
    name: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    surveys?: SurveyCreateNestedManyWithoutTemplateInput
  }

  export type SurveyTemplateUncheckedCreateWithoutStepsInput = {
    id?: string
    name: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    surveys?: SurveyUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type SurveyTemplateCreateOrConnectWithoutStepsInput = {
    where: SurveyTemplateWhereUniqueInput
    create: XOR<SurveyTemplateCreateWithoutStepsInput, SurveyTemplateUncheckedCreateWithoutStepsInput>
  }

  export type SurveyQuestionUpsertWithWhereUniqueWithoutStepInput = {
    where: SurveyQuestionWhereUniqueInput
    update: XOR<SurveyQuestionUpdateWithoutStepInput, SurveyQuestionUncheckedUpdateWithoutStepInput>
    create: XOR<SurveyQuestionCreateWithoutStepInput, SurveyQuestionUncheckedCreateWithoutStepInput>
  }

  export type SurveyQuestionUpdateWithWhereUniqueWithoutStepInput = {
    where: SurveyQuestionWhereUniqueInput
    data: XOR<SurveyQuestionUpdateWithoutStepInput, SurveyQuestionUncheckedUpdateWithoutStepInput>
  }

  export type SurveyQuestionUpdateManyWithWhereWithoutStepInput = {
    where: SurveyQuestionScalarWhereInput
    data: XOR<SurveyQuestionUpdateManyMutationInput, SurveyQuestionUncheckedUpdateManyWithoutStepInput>
  }

  export type SurveyQuestionScalarWhereInput = {
    AND?: SurveyQuestionScalarWhereInput | SurveyQuestionScalarWhereInput[]
    OR?: SurveyQuestionScalarWhereInput[]
    NOT?: SurveyQuestionScalarWhereInput | SurveyQuestionScalarWhereInput[]
    id?: StringFilter<"SurveyQuestion"> | string
    stepId?: StringFilter<"SurveyQuestion"> | string
    questionNumber?: IntFilter<"SurveyQuestion"> | number
    text?: StringFilter<"SurveyQuestion"> | string
    type?: EnumQuestionTypeFilter<"SurveyQuestion"> | $Enums.QuestionType
    required?: BoolFilter<"SurveyQuestion"> | boolean
    minLength?: IntNullableFilter<"SurveyQuestion"> | number | null
    maxLength?: IntNullableFilter<"SurveyQuestion"> | number | null
    placeholder?: StringNullableFilter<"SurveyQuestion"> | string | null
    createdAt?: DateTimeFilter<"SurveyQuestion"> | Date | string
    updatedAt?: DateTimeFilter<"SurveyQuestion"> | Date | string
  }

  export type SurveyTemplateUpsertWithoutStepsInput = {
    update: XOR<SurveyTemplateUpdateWithoutStepsInput, SurveyTemplateUncheckedUpdateWithoutStepsInput>
    create: XOR<SurveyTemplateCreateWithoutStepsInput, SurveyTemplateUncheckedCreateWithoutStepsInput>
    where?: SurveyTemplateWhereInput
  }

  export type SurveyTemplateUpdateToOneWithWhereWithoutStepsInput = {
    where?: SurveyTemplateWhereInput
    data: XOR<SurveyTemplateUpdateWithoutStepsInput, SurveyTemplateUncheckedUpdateWithoutStepsInput>
  }

  export type SurveyTemplateUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    surveys?: SurveyUpdateManyWithoutTemplateNestedInput
  }

  export type SurveyTemplateUncheckedUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    surveys?: SurveyUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type QuestionOptionCreateWithoutQuestionInput = {
    id?: string
    optionNumber: number
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuestionOptionUncheckedCreateWithoutQuestionInput = {
    id?: string
    optionNumber: number
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuestionOptionCreateOrConnectWithoutQuestionInput = {
    where: QuestionOptionWhereUniqueInput
    create: XOR<QuestionOptionCreateWithoutQuestionInput, QuestionOptionUncheckedCreateWithoutQuestionInput>
  }

  export type QuestionOptionCreateManyQuestionInputEnvelope = {
    data: QuestionOptionCreateManyQuestionInput | QuestionOptionCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }

  export type SurveyStepCreateWithoutQuestionsInput = {
    id?: string
    stepNumber: number
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    template: SurveyTemplateCreateNestedOneWithoutStepsInput
  }

  export type SurveyStepUncheckedCreateWithoutQuestionsInput = {
    id?: string
    templateId: string
    stepNumber: number
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SurveyStepCreateOrConnectWithoutQuestionsInput = {
    where: SurveyStepWhereUniqueInput
    create: XOR<SurveyStepCreateWithoutQuestionsInput, SurveyStepUncheckedCreateWithoutQuestionsInput>
  }

  export type QuestionOptionUpsertWithWhereUniqueWithoutQuestionInput = {
    where: QuestionOptionWhereUniqueInput
    update: XOR<QuestionOptionUpdateWithoutQuestionInput, QuestionOptionUncheckedUpdateWithoutQuestionInput>
    create: XOR<QuestionOptionCreateWithoutQuestionInput, QuestionOptionUncheckedCreateWithoutQuestionInput>
  }

  export type QuestionOptionUpdateWithWhereUniqueWithoutQuestionInput = {
    where: QuestionOptionWhereUniqueInput
    data: XOR<QuestionOptionUpdateWithoutQuestionInput, QuestionOptionUncheckedUpdateWithoutQuestionInput>
  }

  export type QuestionOptionUpdateManyWithWhereWithoutQuestionInput = {
    where: QuestionOptionScalarWhereInput
    data: XOR<QuestionOptionUpdateManyMutationInput, QuestionOptionUncheckedUpdateManyWithoutQuestionInput>
  }

  export type QuestionOptionScalarWhereInput = {
    AND?: QuestionOptionScalarWhereInput | QuestionOptionScalarWhereInput[]
    OR?: QuestionOptionScalarWhereInput[]
    NOT?: QuestionOptionScalarWhereInput | QuestionOptionScalarWhereInput[]
    id?: StringFilter<"QuestionOption"> | string
    questionId?: StringFilter<"QuestionOption"> | string
    optionNumber?: IntFilter<"QuestionOption"> | number
    text?: StringFilter<"QuestionOption"> | string
    createdAt?: DateTimeFilter<"QuestionOption"> | Date | string
    updatedAt?: DateTimeFilter<"QuestionOption"> | Date | string
  }

  export type SurveyStepUpsertWithoutQuestionsInput = {
    update: XOR<SurveyStepUpdateWithoutQuestionsInput, SurveyStepUncheckedUpdateWithoutQuestionsInput>
    create: XOR<SurveyStepCreateWithoutQuestionsInput, SurveyStepUncheckedCreateWithoutQuestionsInput>
    where?: SurveyStepWhereInput
  }

  export type SurveyStepUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: SurveyStepWhereInput
    data: XOR<SurveyStepUpdateWithoutQuestionsInput, SurveyStepUncheckedUpdateWithoutQuestionsInput>
  }

  export type SurveyStepUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    template?: SurveyTemplateUpdateOneRequiredWithoutStepsNestedInput
  }

  export type SurveyStepUncheckedUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyQuestionCreateWithoutOptionsInput = {
    id?: string
    questionNumber: number
    text: string
    type: $Enums.QuestionType
    required?: boolean
    minLength?: number | null
    maxLength?: number | null
    placeholder?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    step: SurveyStepCreateNestedOneWithoutQuestionsInput
  }

  export type SurveyQuestionUncheckedCreateWithoutOptionsInput = {
    id?: string
    stepId: string
    questionNumber: number
    text: string
    type: $Enums.QuestionType
    required?: boolean
    minLength?: number | null
    maxLength?: number | null
    placeholder?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SurveyQuestionCreateOrConnectWithoutOptionsInput = {
    where: SurveyQuestionWhereUniqueInput
    create: XOR<SurveyQuestionCreateWithoutOptionsInput, SurveyQuestionUncheckedCreateWithoutOptionsInput>
  }

  export type SurveyQuestionUpsertWithoutOptionsInput = {
    update: XOR<SurveyQuestionUpdateWithoutOptionsInput, SurveyQuestionUncheckedUpdateWithoutOptionsInput>
    create: XOR<SurveyQuestionCreateWithoutOptionsInput, SurveyQuestionUncheckedCreateWithoutOptionsInput>
    where?: SurveyQuestionWhereInput
  }

  export type SurveyQuestionUpdateToOneWithWhereWithoutOptionsInput = {
    where?: SurveyQuestionWhereInput
    data: XOR<SurveyQuestionUpdateWithoutOptionsInput, SurveyQuestionUncheckedUpdateWithoutOptionsInput>
  }

  export type SurveyQuestionUpdateWithoutOptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    required?: BoolFieldUpdateOperationsInput | boolean
    minLength?: NullableIntFieldUpdateOperationsInput | number | null
    maxLength?: NullableIntFieldUpdateOperationsInput | number | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    step?: SurveyStepUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type SurveyQuestionUncheckedUpdateWithoutOptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    required?: BoolFieldUpdateOperationsInput | boolean
    minLength?: NullableIntFieldUpdateOperationsInput | number | null
    maxLength?: NullableIntFieldUpdateOperationsInput | number | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyResponseCreateWithoutSurveyInput = {
    id?: string
    responses: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    consumer: UserCreateNestedOneWithoutResponsesInput
  }

  export type SurveyResponseUncheckedCreateWithoutSurveyInput = {
    id?: string
    consumerId: string
    responses: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SurveyResponseCreateOrConnectWithoutSurveyInput = {
    where: SurveyResponseWhereUniqueInput
    create: XOR<SurveyResponseCreateWithoutSurveyInput, SurveyResponseUncheckedCreateWithoutSurveyInput>
  }

  export type SurveyResponseCreateManySurveyInputEnvelope = {
    data: SurveyResponseCreateManySurveyInput | SurveyResponseCreateManySurveyInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutSurveysInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.Role
    gender: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
    accountNumber: string
    bankCode: string
    birthDate: string
    phoneNumber: string
    rewards?: RewardCreateNestedManyWithoutUserInput
    responses?: SurveyResponseCreateNestedManyWithoutConsumerInput
    withdrawalRequests?: WithdrawalRequestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSurveysInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.Role
    gender: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
    accountNumber: string
    bankCode: string
    birthDate: string
    phoneNumber: string
    rewards?: RewardUncheckedCreateNestedManyWithoutUserInput
    responses?: SurveyResponseUncheckedCreateNestedManyWithoutConsumerInput
    withdrawalRequests?: WithdrawalRequestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSurveysInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSurveysInput, UserUncheckedCreateWithoutSurveysInput>
  }

  export type SurveyTemplateCreateWithoutSurveysInput = {
    id?: string
    name: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: SurveyStepCreateNestedManyWithoutTemplateInput
  }

  export type SurveyTemplateUncheckedCreateWithoutSurveysInput = {
    id?: string
    name: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: SurveyStepUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type SurveyTemplateCreateOrConnectWithoutSurveysInput = {
    where: SurveyTemplateWhereUniqueInput
    create: XOR<SurveyTemplateCreateWithoutSurveysInput, SurveyTemplateUncheckedCreateWithoutSurveysInput>
  }

  export type SurveyCancellationRequestCreateWithoutSurveyInput = {
    id?: string
    reason: string
    refundAmount: number
    status?: $Enums.CancellationStatus
    requestedAt?: Date | string
    processedAt?: Date | string | null
    processedBy?: string | null
  }

  export type SurveyCancellationRequestUncheckedCreateWithoutSurveyInput = {
    id?: string
    reason: string
    refundAmount: number
    status?: $Enums.CancellationStatus
    requestedAt?: Date | string
    processedAt?: Date | string | null
    processedBy?: string | null
  }

  export type SurveyCancellationRequestCreateOrConnectWithoutSurveyInput = {
    where: SurveyCancellationRequestWhereUniqueInput
    create: XOR<SurveyCancellationRequestCreateWithoutSurveyInput, SurveyCancellationRequestUncheckedCreateWithoutSurveyInput>
  }

  export type SurveyResponseUpsertWithWhereUniqueWithoutSurveyInput = {
    where: SurveyResponseWhereUniqueInput
    update: XOR<SurveyResponseUpdateWithoutSurveyInput, SurveyResponseUncheckedUpdateWithoutSurveyInput>
    create: XOR<SurveyResponseCreateWithoutSurveyInput, SurveyResponseUncheckedCreateWithoutSurveyInput>
  }

  export type SurveyResponseUpdateWithWhereUniqueWithoutSurveyInput = {
    where: SurveyResponseWhereUniqueInput
    data: XOR<SurveyResponseUpdateWithoutSurveyInput, SurveyResponseUncheckedUpdateWithoutSurveyInput>
  }

  export type SurveyResponseUpdateManyWithWhereWithoutSurveyInput = {
    where: SurveyResponseScalarWhereInput
    data: XOR<SurveyResponseUpdateManyMutationInput, SurveyResponseUncheckedUpdateManyWithoutSurveyInput>
  }

  export type UserUpsertWithoutSurveysInput = {
    update: XOR<UserUpdateWithoutSurveysInput, UserUncheckedUpdateWithoutSurveysInput>
    create: XOR<UserCreateWithoutSurveysInput, UserUncheckedCreateWithoutSurveysInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSurveysInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSurveysInput, UserUncheckedUpdateWithoutSurveysInput>
  }

  export type UserUpdateWithoutSurveysInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bankCode?: StringFieldUpdateOperationsInput | string
    birthDate?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    rewards?: RewardUpdateManyWithoutUserNestedInput
    responses?: SurveyResponseUpdateManyWithoutConsumerNestedInput
    withdrawalRequests?: WithdrawalRequestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSurveysInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bankCode?: StringFieldUpdateOperationsInput | string
    birthDate?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    rewards?: RewardUncheckedUpdateManyWithoutUserNestedInput
    responses?: SurveyResponseUncheckedUpdateManyWithoutConsumerNestedInput
    withdrawalRequests?: WithdrawalRequestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SurveyTemplateUpsertWithoutSurveysInput = {
    update: XOR<SurveyTemplateUpdateWithoutSurveysInput, SurveyTemplateUncheckedUpdateWithoutSurveysInput>
    create: XOR<SurveyTemplateCreateWithoutSurveysInput, SurveyTemplateUncheckedCreateWithoutSurveysInput>
    where?: SurveyTemplateWhereInput
  }

  export type SurveyTemplateUpdateToOneWithWhereWithoutSurveysInput = {
    where?: SurveyTemplateWhereInput
    data: XOR<SurveyTemplateUpdateWithoutSurveysInput, SurveyTemplateUncheckedUpdateWithoutSurveysInput>
  }

  export type SurveyTemplateUpdateWithoutSurveysInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: SurveyStepUpdateManyWithoutTemplateNestedInput
  }

  export type SurveyTemplateUncheckedUpdateWithoutSurveysInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: SurveyStepUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type SurveyCancellationRequestUpsertWithoutSurveyInput = {
    update: XOR<SurveyCancellationRequestUpdateWithoutSurveyInput, SurveyCancellationRequestUncheckedUpdateWithoutSurveyInput>
    create: XOR<SurveyCancellationRequestCreateWithoutSurveyInput, SurveyCancellationRequestUncheckedCreateWithoutSurveyInput>
    where?: SurveyCancellationRequestWhereInput
  }

  export type SurveyCancellationRequestUpdateToOneWithWhereWithoutSurveyInput = {
    where?: SurveyCancellationRequestWhereInput
    data: XOR<SurveyCancellationRequestUpdateWithoutSurveyInput, SurveyCancellationRequestUncheckedUpdateWithoutSurveyInput>
  }

  export type SurveyCancellationRequestUpdateWithoutSurveyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    refundAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SurveyCancellationRequestUncheckedUpdateWithoutSurveyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    refundAmount?: FloatFieldUpdateOperationsInput | number
    status?: EnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateWithoutResponsesInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.Role
    gender: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
    accountNumber: string
    bankCode: string
    birthDate: string
    phoneNumber: string
    rewards?: RewardCreateNestedManyWithoutUserInput
    surveys?: SurveyCreateNestedManyWithoutSellerInput
    withdrawalRequests?: WithdrawalRequestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutResponsesInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.Role
    gender: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
    accountNumber: string
    bankCode: string
    birthDate: string
    phoneNumber: string
    rewards?: RewardUncheckedCreateNestedManyWithoutUserInput
    surveys?: SurveyUncheckedCreateNestedManyWithoutSellerInput
    withdrawalRequests?: WithdrawalRequestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutResponsesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResponsesInput, UserUncheckedCreateWithoutResponsesInput>
  }

  export type SurveyCreateWithoutResponsesInput = {
    id?: string
    title: string
    storeName?: string
    description?: string | null
    url: string
    targetAgeMin: number
    targetAgeMax: number
    targetGender: $Enums.Gender
    reward: number
    maxParticipants?: number
    totalBudget?: number | null
    status?: $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    endDate: Date | string
    approvedAt?: Date | string | null
    completedAt?: Date | string | null
    suspendedAt?: Date | string | null
    rejectionReason?: string | null
    extensionCount?: number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: $Enums.CancellationStatus | null
    cancellationRequestedAt?: Date | string | null
    seller: UserCreateNestedOneWithoutSurveysInput
    template: SurveyTemplateCreateNestedOneWithoutSurveysInput
    cancellationRequest?: SurveyCancellationRequestCreateNestedOneWithoutSurveyInput
  }

  export type SurveyUncheckedCreateWithoutResponsesInput = {
    id?: string
    title: string
    storeName?: string
    description?: string | null
    url: string
    sellerId: string
    templateId: string
    targetAgeMin: number
    targetAgeMax: number
    targetGender: $Enums.Gender
    reward: number
    maxParticipants?: number
    totalBudget?: number | null
    status?: $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    endDate: Date | string
    approvedAt?: Date | string | null
    completedAt?: Date | string | null
    suspendedAt?: Date | string | null
    rejectionReason?: string | null
    extensionCount?: number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: $Enums.CancellationStatus | null
    cancellationRequestedAt?: Date | string | null
    cancellationRequest?: SurveyCancellationRequestUncheckedCreateNestedOneWithoutSurveyInput
  }

  export type SurveyCreateOrConnectWithoutResponsesInput = {
    where: SurveyWhereUniqueInput
    create: XOR<SurveyCreateWithoutResponsesInput, SurveyUncheckedCreateWithoutResponsesInput>
  }

  export type UserUpsertWithoutResponsesInput = {
    update: XOR<UserUpdateWithoutResponsesInput, UserUncheckedUpdateWithoutResponsesInput>
    create: XOR<UserCreateWithoutResponsesInput, UserUncheckedCreateWithoutResponsesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutResponsesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutResponsesInput, UserUncheckedUpdateWithoutResponsesInput>
  }

  export type UserUpdateWithoutResponsesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bankCode?: StringFieldUpdateOperationsInput | string
    birthDate?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    rewards?: RewardUpdateManyWithoutUserNestedInput
    surveys?: SurveyUpdateManyWithoutSellerNestedInput
    withdrawalRequests?: WithdrawalRequestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutResponsesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bankCode?: StringFieldUpdateOperationsInput | string
    birthDate?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    rewards?: RewardUncheckedUpdateManyWithoutUserNestedInput
    surveys?: SurveyUncheckedUpdateManyWithoutSellerNestedInput
    withdrawalRequests?: WithdrawalRequestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SurveyUpsertWithoutResponsesInput = {
    update: XOR<SurveyUpdateWithoutResponsesInput, SurveyUncheckedUpdateWithoutResponsesInput>
    create: XOR<SurveyCreateWithoutResponsesInput, SurveyUncheckedCreateWithoutResponsesInput>
    where?: SurveyWhereInput
  }

  export type SurveyUpdateToOneWithWhereWithoutResponsesInput = {
    where?: SurveyWhereInput
    data: XOR<SurveyUpdateWithoutResponsesInput, SurveyUncheckedUpdateWithoutResponsesInput>
  }

  export type SurveyUpdateWithoutResponsesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    targetAgeMin?: IntFieldUpdateOperationsInput | number
    targetAgeMax?: IntFieldUpdateOperationsInput | number
    targetGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    reward?: FloatFieldUpdateOperationsInput | number
    maxParticipants?: IntFieldUpdateOperationsInput | number
    totalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumSurveyStatusFieldUpdateOperationsInput | $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    extensionCount?: IntFieldUpdateOperationsInput | number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: NullableEnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus | null
    cancellationRequestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seller?: UserUpdateOneRequiredWithoutSurveysNestedInput
    template?: SurveyTemplateUpdateOneRequiredWithoutSurveysNestedInput
    cancellationRequest?: SurveyCancellationRequestUpdateOneWithoutSurveyNestedInput
  }

  export type SurveyUncheckedUpdateWithoutResponsesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    sellerId?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    targetAgeMin?: IntFieldUpdateOperationsInput | number
    targetAgeMax?: IntFieldUpdateOperationsInput | number
    targetGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    reward?: FloatFieldUpdateOperationsInput | number
    maxParticipants?: IntFieldUpdateOperationsInput | number
    totalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumSurveyStatusFieldUpdateOperationsInput | $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    extensionCount?: IntFieldUpdateOperationsInput | number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: NullableEnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus | null
    cancellationRequestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancellationRequest?: SurveyCancellationRequestUncheckedUpdateOneWithoutSurveyNestedInput
  }

  export type UserCreateWithoutRewardsInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.Role
    gender: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
    accountNumber: string
    bankCode: string
    birthDate: string
    phoneNumber: string
    responses?: SurveyResponseCreateNestedManyWithoutConsumerInput
    surveys?: SurveyCreateNestedManyWithoutSellerInput
    withdrawalRequests?: WithdrawalRequestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRewardsInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.Role
    gender: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
    accountNumber: string
    bankCode: string
    birthDate: string
    phoneNumber: string
    responses?: SurveyResponseUncheckedCreateNestedManyWithoutConsumerInput
    surveys?: SurveyUncheckedCreateNestedManyWithoutSellerInput
    withdrawalRequests?: WithdrawalRequestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRewardsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRewardsInput, UserUncheckedCreateWithoutRewardsInput>
  }

  export type UserUpsertWithoutRewardsInput = {
    update: XOR<UserUpdateWithoutRewardsInput, UserUncheckedUpdateWithoutRewardsInput>
    create: XOR<UserCreateWithoutRewardsInput, UserUncheckedCreateWithoutRewardsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRewardsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRewardsInput, UserUncheckedUpdateWithoutRewardsInput>
  }

  export type UserUpdateWithoutRewardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bankCode?: StringFieldUpdateOperationsInput | string
    birthDate?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    responses?: SurveyResponseUpdateManyWithoutConsumerNestedInput
    surveys?: SurveyUpdateManyWithoutSellerNestedInput
    withdrawalRequests?: WithdrawalRequestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRewardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bankCode?: StringFieldUpdateOperationsInput | string
    birthDate?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    responses?: SurveyResponseUncheckedUpdateManyWithoutConsumerNestedInput
    surveys?: SurveyUncheckedUpdateManyWithoutSellerNestedInput
    withdrawalRequests?: WithdrawalRequestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SurveyCreateWithoutCancellationRequestInput = {
    id?: string
    title: string
    storeName?: string
    description?: string | null
    url: string
    targetAgeMin: number
    targetAgeMax: number
    targetGender: $Enums.Gender
    reward: number
    maxParticipants?: number
    totalBudget?: number | null
    status?: $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    endDate: Date | string
    approvedAt?: Date | string | null
    completedAt?: Date | string | null
    suspendedAt?: Date | string | null
    rejectionReason?: string | null
    extensionCount?: number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: $Enums.CancellationStatus | null
    cancellationRequestedAt?: Date | string | null
    responses?: SurveyResponseCreateNestedManyWithoutSurveyInput
    seller: UserCreateNestedOneWithoutSurveysInput
    template: SurveyTemplateCreateNestedOneWithoutSurveysInput
  }

  export type SurveyUncheckedCreateWithoutCancellationRequestInput = {
    id?: string
    title: string
    storeName?: string
    description?: string | null
    url: string
    sellerId: string
    templateId: string
    targetAgeMin: number
    targetAgeMax: number
    targetGender: $Enums.Gender
    reward: number
    maxParticipants?: number
    totalBudget?: number | null
    status?: $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    endDate: Date | string
    approvedAt?: Date | string | null
    completedAt?: Date | string | null
    suspendedAt?: Date | string | null
    rejectionReason?: string | null
    extensionCount?: number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: $Enums.CancellationStatus | null
    cancellationRequestedAt?: Date | string | null
    responses?: SurveyResponseUncheckedCreateNestedManyWithoutSurveyInput
  }

  export type SurveyCreateOrConnectWithoutCancellationRequestInput = {
    where: SurveyWhereUniqueInput
    create: XOR<SurveyCreateWithoutCancellationRequestInput, SurveyUncheckedCreateWithoutCancellationRequestInput>
  }

  export type SurveyUpsertWithoutCancellationRequestInput = {
    update: XOR<SurveyUpdateWithoutCancellationRequestInput, SurveyUncheckedUpdateWithoutCancellationRequestInput>
    create: XOR<SurveyCreateWithoutCancellationRequestInput, SurveyUncheckedCreateWithoutCancellationRequestInput>
    where?: SurveyWhereInput
  }

  export type SurveyUpdateToOneWithWhereWithoutCancellationRequestInput = {
    where?: SurveyWhereInput
    data: XOR<SurveyUpdateWithoutCancellationRequestInput, SurveyUncheckedUpdateWithoutCancellationRequestInput>
  }

  export type SurveyUpdateWithoutCancellationRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    targetAgeMin?: IntFieldUpdateOperationsInput | number
    targetAgeMax?: IntFieldUpdateOperationsInput | number
    targetGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    reward?: FloatFieldUpdateOperationsInput | number
    maxParticipants?: IntFieldUpdateOperationsInput | number
    totalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumSurveyStatusFieldUpdateOperationsInput | $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    extensionCount?: IntFieldUpdateOperationsInput | number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: NullableEnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus | null
    cancellationRequestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responses?: SurveyResponseUpdateManyWithoutSurveyNestedInput
    seller?: UserUpdateOneRequiredWithoutSurveysNestedInput
    template?: SurveyTemplateUpdateOneRequiredWithoutSurveysNestedInput
  }

  export type SurveyUncheckedUpdateWithoutCancellationRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    sellerId?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    targetAgeMin?: IntFieldUpdateOperationsInput | number
    targetAgeMax?: IntFieldUpdateOperationsInput | number
    targetGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    reward?: FloatFieldUpdateOperationsInput | number
    maxParticipants?: IntFieldUpdateOperationsInput | number
    totalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumSurveyStatusFieldUpdateOperationsInput | $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    extensionCount?: IntFieldUpdateOperationsInput | number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: NullableEnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus | null
    cancellationRequestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responses?: SurveyResponseUncheckedUpdateManyWithoutSurveyNestedInput
  }

  export type UserCreateWithoutWithdrawalRequestsInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.Role
    gender: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
    accountNumber: string
    bankCode: string
    birthDate: string
    phoneNumber: string
    rewards?: RewardCreateNestedManyWithoutUserInput
    responses?: SurveyResponseCreateNestedManyWithoutConsumerInput
    surveys?: SurveyCreateNestedManyWithoutSellerInput
  }

  export type UserUncheckedCreateWithoutWithdrawalRequestsInput = {
    id?: string
    email: string
    password: string
    name: string
    role?: $Enums.Role
    gender: $Enums.Gender
    createdAt?: Date | string
    updatedAt?: Date | string
    accountNumber: string
    bankCode: string
    birthDate: string
    phoneNumber: string
    rewards?: RewardUncheckedCreateNestedManyWithoutUserInput
    responses?: SurveyResponseUncheckedCreateNestedManyWithoutConsumerInput
    surveys?: SurveyUncheckedCreateNestedManyWithoutSellerInput
  }

  export type UserCreateOrConnectWithoutWithdrawalRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWithdrawalRequestsInput, UserUncheckedCreateWithoutWithdrawalRequestsInput>
  }

  export type UserUpsertWithoutWithdrawalRequestsInput = {
    update: XOR<UserUpdateWithoutWithdrawalRequestsInput, UserUncheckedUpdateWithoutWithdrawalRequestsInput>
    create: XOR<UserCreateWithoutWithdrawalRequestsInput, UserUncheckedCreateWithoutWithdrawalRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWithdrawalRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWithdrawalRequestsInput, UserUncheckedUpdateWithoutWithdrawalRequestsInput>
  }

  export type UserUpdateWithoutWithdrawalRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bankCode?: StringFieldUpdateOperationsInput | string
    birthDate?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    rewards?: RewardUpdateManyWithoutUserNestedInput
    responses?: SurveyResponseUpdateManyWithoutConsumerNestedInput
    surveys?: SurveyUpdateManyWithoutSellerNestedInput
  }

  export type UserUncheckedUpdateWithoutWithdrawalRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    bankCode?: StringFieldUpdateOperationsInput | string
    birthDate?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    rewards?: RewardUncheckedUpdateManyWithoutUserNestedInput
    responses?: SurveyResponseUncheckedUpdateManyWithoutConsumerNestedInput
    surveys?: SurveyUncheckedUpdateManyWithoutSellerNestedInput
  }

  export type RewardCreateManyUserInput = {
    id?: string
    amount: number
    type: $Enums.RewardType
    status?: $Enums.RewardStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SurveyResponseCreateManyConsumerInput = {
    id?: string
    surveyId: string
    responses: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SurveyCreateManySellerInput = {
    id?: string
    title: string
    storeName?: string
    description?: string | null
    url: string
    templateId: string
    targetAgeMin: number
    targetAgeMax: number
    targetGender: $Enums.Gender
    reward: number
    maxParticipants?: number
    totalBudget?: number | null
    status?: $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    endDate: Date | string
    approvedAt?: Date | string | null
    completedAt?: Date | string | null
    suspendedAt?: Date | string | null
    rejectionReason?: string | null
    extensionCount?: number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: $Enums.CancellationStatus | null
    cancellationRequestedAt?: Date | string | null
  }

  export type WithdrawalRequestCreateManyUserInput = {
    id?: string
    amount: number
    status?: $Enums.WithdrawalStatus
    requestedAt?: Date | string
    processedAt?: Date | string | null
    processedBy?: string | null
    note?: string | null
  }

  export type RewardUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumRewardTypeFieldUpdateOperationsInput | $Enums.RewardType
    status?: EnumRewardStatusFieldUpdateOperationsInput | $Enums.RewardStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewardUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumRewardTypeFieldUpdateOperationsInput | $Enums.RewardType
    status?: EnumRewardStatusFieldUpdateOperationsInput | $Enums.RewardStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewardUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumRewardTypeFieldUpdateOperationsInput | $Enums.RewardType
    status?: EnumRewardStatusFieldUpdateOperationsInput | $Enums.RewardStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyResponseUpdateWithoutConsumerInput = {
    id?: StringFieldUpdateOperationsInput | string
    responses?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    survey?: SurveyUpdateOneRequiredWithoutResponsesNestedInput
  }

  export type SurveyResponseUncheckedUpdateWithoutConsumerInput = {
    id?: StringFieldUpdateOperationsInput | string
    surveyId?: StringFieldUpdateOperationsInput | string
    responses?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyResponseUncheckedUpdateManyWithoutConsumerInput = {
    id?: StringFieldUpdateOperationsInput | string
    surveyId?: StringFieldUpdateOperationsInput | string
    responses?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyUpdateWithoutSellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    targetAgeMin?: IntFieldUpdateOperationsInput | number
    targetAgeMax?: IntFieldUpdateOperationsInput | number
    targetGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    reward?: FloatFieldUpdateOperationsInput | number
    maxParticipants?: IntFieldUpdateOperationsInput | number
    totalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumSurveyStatusFieldUpdateOperationsInput | $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    extensionCount?: IntFieldUpdateOperationsInput | number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: NullableEnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus | null
    cancellationRequestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responses?: SurveyResponseUpdateManyWithoutSurveyNestedInput
    template?: SurveyTemplateUpdateOneRequiredWithoutSurveysNestedInput
    cancellationRequest?: SurveyCancellationRequestUpdateOneWithoutSurveyNestedInput
  }

  export type SurveyUncheckedUpdateWithoutSellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    targetAgeMin?: IntFieldUpdateOperationsInput | number
    targetAgeMax?: IntFieldUpdateOperationsInput | number
    targetGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    reward?: FloatFieldUpdateOperationsInput | number
    maxParticipants?: IntFieldUpdateOperationsInput | number
    totalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumSurveyStatusFieldUpdateOperationsInput | $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    extensionCount?: IntFieldUpdateOperationsInput | number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: NullableEnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus | null
    cancellationRequestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responses?: SurveyResponseUncheckedUpdateManyWithoutSurveyNestedInput
    cancellationRequest?: SurveyCancellationRequestUncheckedUpdateOneWithoutSurveyNestedInput
  }

  export type SurveyUncheckedUpdateManyWithoutSellerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    targetAgeMin?: IntFieldUpdateOperationsInput | number
    targetAgeMax?: IntFieldUpdateOperationsInput | number
    targetGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    reward?: FloatFieldUpdateOperationsInput | number
    maxParticipants?: IntFieldUpdateOperationsInput | number
    totalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumSurveyStatusFieldUpdateOperationsInput | $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    extensionCount?: IntFieldUpdateOperationsInput | number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: NullableEnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus | null
    cancellationRequestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WithdrawalRequestUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedBy?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WithdrawalRequestUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedBy?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WithdrawalRequestUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedBy?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SurveyStepCreateManyTemplateInput = {
    id?: string
    stepNumber: number
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SurveyCreateManyTemplateInput = {
    id?: string
    title: string
    storeName?: string
    description?: string | null
    url: string
    sellerId: string
    targetAgeMin: number
    targetAgeMax: number
    targetGender: $Enums.Gender
    reward: number
    maxParticipants?: number
    totalBudget?: number | null
    status?: $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    endDate: Date | string
    approvedAt?: Date | string | null
    completedAt?: Date | string | null
    suspendedAt?: Date | string | null
    rejectionReason?: string | null
    extensionCount?: number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: $Enums.CancellationStatus | null
    cancellationRequestedAt?: Date | string | null
  }

  export type SurveyStepUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: SurveyQuestionUpdateManyWithoutStepNestedInput
  }

  export type SurveyStepUncheckedUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: SurveyQuestionUncheckedUpdateManyWithoutStepNestedInput
  }

  export type SurveyStepUncheckedUpdateManyWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    targetAgeMin?: IntFieldUpdateOperationsInput | number
    targetAgeMax?: IntFieldUpdateOperationsInput | number
    targetGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    reward?: FloatFieldUpdateOperationsInput | number
    maxParticipants?: IntFieldUpdateOperationsInput | number
    totalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumSurveyStatusFieldUpdateOperationsInput | $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    extensionCount?: IntFieldUpdateOperationsInput | number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: NullableEnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus | null
    cancellationRequestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responses?: SurveyResponseUpdateManyWithoutSurveyNestedInput
    seller?: UserUpdateOneRequiredWithoutSurveysNestedInput
    cancellationRequest?: SurveyCancellationRequestUpdateOneWithoutSurveyNestedInput
  }

  export type SurveyUncheckedUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    sellerId?: StringFieldUpdateOperationsInput | string
    targetAgeMin?: IntFieldUpdateOperationsInput | number
    targetAgeMax?: IntFieldUpdateOperationsInput | number
    targetGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    reward?: FloatFieldUpdateOperationsInput | number
    maxParticipants?: IntFieldUpdateOperationsInput | number
    totalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumSurveyStatusFieldUpdateOperationsInput | $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    extensionCount?: IntFieldUpdateOperationsInput | number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: NullableEnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus | null
    cancellationRequestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responses?: SurveyResponseUncheckedUpdateManyWithoutSurveyNestedInput
    cancellationRequest?: SurveyCancellationRequestUncheckedUpdateOneWithoutSurveyNestedInput
  }

  export type SurveyUncheckedUpdateManyWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    storeName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    sellerId?: StringFieldUpdateOperationsInput | string
    targetAgeMin?: IntFieldUpdateOperationsInput | number
    targetAgeMax?: IntFieldUpdateOperationsInput | number
    targetGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    reward?: FloatFieldUpdateOperationsInput | number
    maxParticipants?: IntFieldUpdateOperationsInput | number
    totalBudget?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumSurveyStatusFieldUpdateOperationsInput | $Enums.SurveyStatus
    customSteps?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    extensionCount?: IntFieldUpdateOperationsInput | number
    extensionHistory?: NullableJsonNullValueInput | InputJsonValue
    cancellationStatus?: NullableEnumCancellationStatusFieldUpdateOperationsInput | $Enums.CancellationStatus | null
    cancellationRequestedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SurveyQuestionCreateManyStepInput = {
    id?: string
    questionNumber: number
    text: string
    type: $Enums.QuestionType
    required?: boolean
    minLength?: number | null
    maxLength?: number | null
    placeholder?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SurveyQuestionUpdateWithoutStepInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    required?: BoolFieldUpdateOperationsInput | boolean
    minLength?: NullableIntFieldUpdateOperationsInput | number | null
    maxLength?: NullableIntFieldUpdateOperationsInput | number | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: QuestionOptionUpdateManyWithoutQuestionNestedInput
  }

  export type SurveyQuestionUncheckedUpdateWithoutStepInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    required?: BoolFieldUpdateOperationsInput | boolean
    minLength?: NullableIntFieldUpdateOperationsInput | number | null
    maxLength?: NullableIntFieldUpdateOperationsInput | number | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: QuestionOptionUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type SurveyQuestionUncheckedUpdateManyWithoutStepInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionNumber?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    required?: BoolFieldUpdateOperationsInput | boolean
    minLength?: NullableIntFieldUpdateOperationsInput | number | null
    maxLength?: NullableIntFieldUpdateOperationsInput | number | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionOptionCreateManyQuestionInput = {
    id?: string
    optionNumber: number
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuestionOptionUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    optionNumber?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionOptionUncheckedUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    optionNumber?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionOptionUncheckedUpdateManyWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    optionNumber?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyResponseCreateManySurveyInput = {
    id?: string
    consumerId: string
    responses: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SurveyResponseUpdateWithoutSurveyInput = {
    id?: StringFieldUpdateOperationsInput | string
    responses?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consumer?: UserUpdateOneRequiredWithoutResponsesNestedInput
  }

  export type SurveyResponseUncheckedUpdateWithoutSurveyInput = {
    id?: StringFieldUpdateOperationsInput | string
    consumerId?: StringFieldUpdateOperationsInput | string
    responses?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyResponseUncheckedUpdateManyWithoutSurveyInput = {
    id?: StringFieldUpdateOperationsInput | string
    consumerId?: StringFieldUpdateOperationsInput | string
    responses?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}