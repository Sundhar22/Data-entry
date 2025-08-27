
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
 * Model Commissioner
 * 
 */
export type Commissioner = $Result.DefaultSelection<Prisma.$CommissionerPayload>
/**
 * Model PasswordReset
 * 
 */
export type PasswordReset = $Result.DefaultSelection<Prisma.$PasswordResetPayload>
/**
 * Model Farmer
 * 
 */
export type Farmer = $Result.DefaultSelection<Prisma.$FarmerPayload>
/**
 * Model Buyer
 * 
 */
export type Buyer = $Result.DefaultSelection<Prisma.$BuyerPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model AuctionSession
 * 
 */
export type AuctionSession = $Result.DefaultSelection<Prisma.$AuctionSessionPayload>
/**
 * Model AuctionItem
 * 
 */
export type AuctionItem = $Result.DefaultSelection<Prisma.$AuctionItemPayload>
/**
 * Model Bill
 * 
 */
export type Bill = $Result.DefaultSelection<Prisma.$BillPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const SessionStatus: {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED'
};

export type SessionStatus = (typeof SessionStatus)[keyof typeof SessionStatus]


export const SessionPaymentStatus: {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED'
};

export type SessionPaymentStatus = (typeof SessionPaymentStatus)[keyof typeof SessionPaymentStatus]


export const BillPaymentStatus: {
  UNPAID: 'UNPAID',
  PAID: 'PAID'
};

export type BillPaymentStatus = (typeof BillPaymentStatus)[keyof typeof BillPaymentStatus]


export const Unit: {
  KG: 'KG',
  GRAM: 'GRAM',
  QUINTAL: 'QUINTAL',
  TON: 'TON',
  BUNDLE: 'BUNDLE',
  PIECE: 'PIECE',
  LITRE: 'LITRE',
  MILLILITRE: 'MILLILITRE',
  GALLON: 'GALLON',
  DOZEN: 'DOZEN',
  BOX: 'BOX',
  BAG: 'BAG',
  OTHER: 'OTHER'
};

export type Unit = (typeof Unit)[keyof typeof Unit]

}

export type SessionStatus = $Enums.SessionStatus

export const SessionStatus: typeof $Enums.SessionStatus

export type SessionPaymentStatus = $Enums.SessionPaymentStatus

export const SessionPaymentStatus: typeof $Enums.SessionPaymentStatus

export type BillPaymentStatus = $Enums.BillPaymentStatus

export const BillPaymentStatus: typeof $Enums.BillPaymentStatus

export type Unit = $Enums.Unit

export const Unit: typeof $Enums.Unit

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Commissioners
 * const commissioners = await prisma.commissioner.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Commissioners
   * const commissioners = await prisma.commissioner.findMany()
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
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

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
   * `prisma.commissioner`: Exposes CRUD operations for the **Commissioner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Commissioners
    * const commissioners = await prisma.commissioner.findMany()
    * ```
    */
  get commissioner(): Prisma.CommissionerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordReset`: Exposes CRUD operations for the **PasswordReset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResets
    * const passwordResets = await prisma.passwordReset.findMany()
    * ```
    */
  get passwordReset(): Prisma.PasswordResetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.farmer`: Exposes CRUD operations for the **Farmer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Farmers
    * const farmers = await prisma.farmer.findMany()
    * ```
    */
  get farmer(): Prisma.FarmerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.buyer`: Exposes CRUD operations for the **Buyer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Buyers
    * const buyers = await prisma.buyer.findMany()
    * ```
    */
  get buyer(): Prisma.BuyerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auctionSession`: Exposes CRUD operations for the **AuctionSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuctionSessions
    * const auctionSessions = await prisma.auctionSession.findMany()
    * ```
    */
  get auctionSession(): Prisma.AuctionSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auctionItem`: Exposes CRUD operations for the **AuctionItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuctionItems
    * const auctionItems = await prisma.auctionItem.findMany()
    * ```
    */
  get auctionItem(): Prisma.AuctionItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bill`: Exposes CRUD operations for the **Bill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bills
    * const bills = await prisma.bill.findMany()
    * ```
    */
  get bill(): Prisma.BillDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
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
    Commissioner: 'Commissioner',
    PasswordReset: 'PasswordReset',
    Farmer: 'Farmer',
    Buyer: 'Buyer',
    Category: 'Category',
    Product: 'Product',
    AuctionSession: 'AuctionSession',
    AuctionItem: 'AuctionItem',
    Bill: 'Bill'
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
      modelProps: "commissioner" | "passwordReset" | "farmer" | "buyer" | "category" | "product" | "auctionSession" | "auctionItem" | "bill"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Commissioner: {
        payload: Prisma.$CommissionerPayload<ExtArgs>
        fields: Prisma.CommissionerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommissionerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommissionerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionerPayload>
          }
          findFirst: {
            args: Prisma.CommissionerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommissionerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionerPayload>
          }
          findMany: {
            args: Prisma.CommissionerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionerPayload>[]
          }
          create: {
            args: Prisma.CommissionerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionerPayload>
          }
          createMany: {
            args: Prisma.CommissionerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommissionerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionerPayload>[]
          }
          delete: {
            args: Prisma.CommissionerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionerPayload>
          }
          update: {
            args: Prisma.CommissionerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionerPayload>
          }
          deleteMany: {
            args: Prisma.CommissionerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommissionerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommissionerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionerPayload>[]
          }
          upsert: {
            args: Prisma.CommissionerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommissionerPayload>
          }
          aggregate: {
            args: Prisma.CommissionerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommissioner>
          }
          groupBy: {
            args: Prisma.CommissionerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommissionerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommissionerCountArgs<ExtArgs>
            result: $Utils.Optional<CommissionerCountAggregateOutputType> | number
          }
        }
      }
      PasswordReset: {
        payload: Prisma.$PasswordResetPayload<ExtArgs>
        fields: Prisma.PasswordResetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          findMany: {
            args: Prisma.PasswordResetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>[]
          }
          create: {
            args: Prisma.PasswordResetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          createMany: {
            args: Prisma.PasswordResetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordResetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>[]
          }
          delete: {
            args: Prisma.PasswordResetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          update: {
            args: Prisma.PasswordResetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PasswordResetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>[]
          }
          upsert: {
            args: Prisma.PasswordResetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordReset>
          }
          groupBy: {
            args: Prisma.PasswordResetGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetCountAggregateOutputType> | number
          }
        }
      }
      Farmer: {
        payload: Prisma.$FarmerPayload<ExtArgs>
        fields: Prisma.FarmerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FarmerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FarmerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload>
          }
          findFirst: {
            args: Prisma.FarmerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FarmerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload>
          }
          findMany: {
            args: Prisma.FarmerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload>[]
          }
          create: {
            args: Prisma.FarmerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload>
          }
          createMany: {
            args: Prisma.FarmerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FarmerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload>[]
          }
          delete: {
            args: Prisma.FarmerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload>
          }
          update: {
            args: Prisma.FarmerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload>
          }
          deleteMany: {
            args: Prisma.FarmerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FarmerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FarmerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload>[]
          }
          upsert: {
            args: Prisma.FarmerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload>
          }
          aggregate: {
            args: Prisma.FarmerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFarmer>
          }
          groupBy: {
            args: Prisma.FarmerGroupByArgs<ExtArgs>
            result: $Utils.Optional<FarmerGroupByOutputType>[]
          }
          count: {
            args: Prisma.FarmerCountArgs<ExtArgs>
            result: $Utils.Optional<FarmerCountAggregateOutputType> | number
          }
        }
      }
      Buyer: {
        payload: Prisma.$BuyerPayload<ExtArgs>
        fields: Prisma.BuyerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BuyerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BuyerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyerPayload>
          }
          findFirst: {
            args: Prisma.BuyerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BuyerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyerPayload>
          }
          findMany: {
            args: Prisma.BuyerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyerPayload>[]
          }
          create: {
            args: Prisma.BuyerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyerPayload>
          }
          createMany: {
            args: Prisma.BuyerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BuyerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyerPayload>[]
          }
          delete: {
            args: Prisma.BuyerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyerPayload>
          }
          update: {
            args: Prisma.BuyerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyerPayload>
          }
          deleteMany: {
            args: Prisma.BuyerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BuyerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BuyerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyerPayload>[]
          }
          upsert: {
            args: Prisma.BuyerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuyerPayload>
          }
          aggregate: {
            args: Prisma.BuyerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBuyer>
          }
          groupBy: {
            args: Prisma.BuyerGroupByArgs<ExtArgs>
            result: $Utils.Optional<BuyerGroupByOutputType>[]
          }
          count: {
            args: Prisma.BuyerCountArgs<ExtArgs>
            result: $Utils.Optional<BuyerCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      AuctionSession: {
        payload: Prisma.$AuctionSessionPayload<ExtArgs>
        fields: Prisma.AuctionSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuctionSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuctionSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionSessionPayload>
          }
          findFirst: {
            args: Prisma.AuctionSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuctionSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionSessionPayload>
          }
          findMany: {
            args: Prisma.AuctionSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionSessionPayload>[]
          }
          create: {
            args: Prisma.AuctionSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionSessionPayload>
          }
          createMany: {
            args: Prisma.AuctionSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuctionSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionSessionPayload>[]
          }
          delete: {
            args: Prisma.AuctionSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionSessionPayload>
          }
          update: {
            args: Prisma.AuctionSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionSessionPayload>
          }
          deleteMany: {
            args: Prisma.AuctionSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuctionSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuctionSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionSessionPayload>[]
          }
          upsert: {
            args: Prisma.AuctionSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionSessionPayload>
          }
          aggregate: {
            args: Prisma.AuctionSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuctionSession>
          }
          groupBy: {
            args: Prisma.AuctionSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuctionSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuctionSessionCountArgs<ExtArgs>
            result: $Utils.Optional<AuctionSessionCountAggregateOutputType> | number
          }
        }
      }
      AuctionItem: {
        payload: Prisma.$AuctionItemPayload<ExtArgs>
        fields: Prisma.AuctionItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuctionItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuctionItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionItemPayload>
          }
          findFirst: {
            args: Prisma.AuctionItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuctionItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionItemPayload>
          }
          findMany: {
            args: Prisma.AuctionItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionItemPayload>[]
          }
          create: {
            args: Prisma.AuctionItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionItemPayload>
          }
          createMany: {
            args: Prisma.AuctionItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuctionItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionItemPayload>[]
          }
          delete: {
            args: Prisma.AuctionItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionItemPayload>
          }
          update: {
            args: Prisma.AuctionItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionItemPayload>
          }
          deleteMany: {
            args: Prisma.AuctionItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuctionItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuctionItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionItemPayload>[]
          }
          upsert: {
            args: Prisma.AuctionItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuctionItemPayload>
          }
          aggregate: {
            args: Prisma.AuctionItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuctionItem>
          }
          groupBy: {
            args: Prisma.AuctionItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuctionItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuctionItemCountArgs<ExtArgs>
            result: $Utils.Optional<AuctionItemCountAggregateOutputType> | number
          }
        }
      }
      Bill: {
        payload: Prisma.$BillPayload<ExtArgs>
        fields: Prisma.BillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          findFirst: {
            args: Prisma.BillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          findMany: {
            args: Prisma.BillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>[]
          }
          create: {
            args: Prisma.BillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          createMany: {
            args: Prisma.BillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BillCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>[]
          }
          delete: {
            args: Prisma.BillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          update: {
            args: Prisma.BillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          deleteMany: {
            args: Prisma.BillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BillUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>[]
          }
          upsert: {
            args: Prisma.BillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          aggregate: {
            args: Prisma.BillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBill>
          }
          groupBy: {
            args: Prisma.BillGroupByArgs<ExtArgs>
            result: $Utils.Optional<BillGroupByOutputType>[]
          }
          count: {
            args: Prisma.BillCountArgs<ExtArgs>
            result: $Utils.Optional<BillCountAggregateOutputType> | number
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
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
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
    commissioner?: CommissionerOmit
    passwordReset?: PasswordResetOmit
    farmer?: FarmerOmit
    buyer?: BuyerOmit
    category?: CategoryOmit
    product?: ProductOmit
    auctionSession?: AuctionSessionOmit
    auctionItem?: AuctionItemOmit
    bill?: BillOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type CommissionerCountOutputType
   */

  export type CommissionerCountOutputType = {
    auction_sessions: number
    bills: number
    buyers: number
    farmers: number
    password_resets: number
  }

  export type CommissionerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auction_sessions?: boolean | CommissionerCountOutputTypeCountAuction_sessionsArgs
    bills?: boolean | CommissionerCountOutputTypeCountBillsArgs
    buyers?: boolean | CommissionerCountOutputTypeCountBuyersArgs
    farmers?: boolean | CommissionerCountOutputTypeCountFarmersArgs
    password_resets?: boolean | CommissionerCountOutputTypeCountPassword_resetsArgs
  }

  // Custom InputTypes
  /**
   * CommissionerCountOutputType without action
   */
  export type CommissionerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommissionerCountOutputType
     */
    select?: CommissionerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CommissionerCountOutputType without action
   */
  export type CommissionerCountOutputTypeCountAuction_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuctionSessionWhereInput
  }

  /**
   * CommissionerCountOutputType without action
   */
  export type CommissionerCountOutputTypeCountBillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillWhereInput
  }

  /**
   * CommissionerCountOutputType without action
   */
  export type CommissionerCountOutputTypeCountBuyersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BuyerWhereInput
  }

  /**
   * CommissionerCountOutputType without action
   */
  export type CommissionerCountOutputTypeCountFarmersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FarmerWhereInput
  }

  /**
   * CommissionerCountOutputType without action
   */
  export type CommissionerCountOutputTypeCountPassword_resetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetWhereInput
  }


  /**
   * Count Type FarmerCountOutputType
   */

  export type FarmerCountOutputType = {
    auction_items: number
    bills: number
  }

  export type FarmerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auction_items?: boolean | FarmerCountOutputTypeCountAuction_itemsArgs
    bills?: boolean | FarmerCountOutputTypeCountBillsArgs
  }

  // Custom InputTypes
  /**
   * FarmerCountOutputType without action
   */
  export type FarmerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmerCountOutputType
     */
    select?: FarmerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FarmerCountOutputType without action
   */
  export type FarmerCountOutputTypeCountAuction_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuctionItemWhereInput
  }

  /**
   * FarmerCountOutputType without action
   */
  export type FarmerCountOutputTypeCountBillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillWhereInput
  }


  /**
   * Count Type BuyerCountOutputType
   */

  export type BuyerCountOutputType = {
    auction_items: number
  }

  export type BuyerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auction_items?: boolean | BuyerCountOutputTypeCountAuction_itemsArgs
  }

  // Custom InputTypes
  /**
   * BuyerCountOutputType without action
   */
  export type BuyerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuyerCountOutputType
     */
    select?: BuyerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BuyerCountOutputType without action
   */
  export type BuyerCountOutputTypeCountAuction_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuctionItemWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    products: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    auction_items: number
    bills: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auction_items?: boolean | ProductCountOutputTypeCountAuction_itemsArgs
    bills?: boolean | ProductCountOutputTypeCountBillsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountAuction_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuctionItemWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountBillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillWhereInput
  }


  /**
   * Count Type AuctionSessionCountOutputType
   */

  export type AuctionSessionCountOutputType = {
    auction_items: number
  }

  export type AuctionSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auction_items?: boolean | AuctionSessionCountOutputTypeCountAuction_itemsArgs
  }

  // Custom InputTypes
  /**
   * AuctionSessionCountOutputType without action
   */
  export type AuctionSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionSessionCountOutputType
     */
    select?: AuctionSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AuctionSessionCountOutputType without action
   */
  export type AuctionSessionCountOutputTypeCountAuction_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuctionItemWhereInput
  }


  /**
   * Count Type BillCountOutputType
   */

  export type BillCountOutputType = {
    auction_items: number
  }

  export type BillCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auction_items?: boolean | BillCountOutputTypeCountAuction_itemsArgs
  }

  // Custom InputTypes
  /**
   * BillCountOutputType without action
   */
  export type BillCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillCountOutputType
     */
    select?: BillCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BillCountOutputType without action
   */
  export type BillCountOutputTypeCountAuction_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuctionItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Commissioner
   */

  export type AggregateCommissioner = {
    _count: CommissionerCountAggregateOutputType | null
    _avg: CommissionerAvgAggregateOutputType | null
    _sum: CommissionerSumAggregateOutputType | null
    _min: CommissionerMinAggregateOutputType | null
    _max: CommissionerMaxAggregateOutputType | null
  }

  export type CommissionerAvgAggregateOutputType = {
    commission_rate: number | null
  }

  export type CommissionerSumAggregateOutputType = {
    commission_rate: number | null
  }

  export type CommissionerMinAggregateOutputType = {
    id: string | null
    name: string | null
    location: string | null
    phone: string | null
    email: string | null
    password: string | null
    commission_rate: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CommissionerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    location: string | null
    phone: string | null
    email: string | null
    password: string | null
    commission_rate: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CommissionerCountAggregateOutputType = {
    id: number
    name: number
    location: number
    phone: number
    email: number
    password: number
    commission_rate: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type CommissionerAvgAggregateInputType = {
    commission_rate?: true
  }

  export type CommissionerSumAggregateInputType = {
    commission_rate?: true
  }

  export type CommissionerMinAggregateInputType = {
    id?: true
    name?: true
    location?: true
    phone?: true
    email?: true
    password?: true
    commission_rate?: true
    created_at?: true
    updated_at?: true
  }

  export type CommissionerMaxAggregateInputType = {
    id?: true
    name?: true
    location?: true
    phone?: true
    email?: true
    password?: true
    commission_rate?: true
    created_at?: true
    updated_at?: true
  }

  export type CommissionerCountAggregateInputType = {
    id?: true
    name?: true
    location?: true
    phone?: true
    email?: true
    password?: true
    commission_rate?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type CommissionerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Commissioner to aggregate.
     */
    where?: CommissionerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commissioners to fetch.
     */
    orderBy?: CommissionerOrderByWithRelationInput | CommissionerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommissionerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commissioners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commissioners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Commissioners
    **/
    _count?: true | CommissionerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommissionerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommissionerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommissionerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommissionerMaxAggregateInputType
  }

  export type GetCommissionerAggregateType<T extends CommissionerAggregateArgs> = {
        [P in keyof T & keyof AggregateCommissioner]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommissioner[P]>
      : GetScalarType<T[P], AggregateCommissioner[P]>
  }




  export type CommissionerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommissionerWhereInput
    orderBy?: CommissionerOrderByWithAggregationInput | CommissionerOrderByWithAggregationInput[]
    by: CommissionerScalarFieldEnum[] | CommissionerScalarFieldEnum
    having?: CommissionerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommissionerCountAggregateInputType | true
    _avg?: CommissionerAvgAggregateInputType
    _sum?: CommissionerSumAggregateInputType
    _min?: CommissionerMinAggregateInputType
    _max?: CommissionerMaxAggregateInputType
  }

  export type CommissionerGroupByOutputType = {
    id: string
    name: string
    location: string
    phone: string
    email: string
    password: string
    commission_rate: number
    created_at: Date
    updated_at: Date
    _count: CommissionerCountAggregateOutputType | null
    _avg: CommissionerAvgAggregateOutputType | null
    _sum: CommissionerSumAggregateOutputType | null
    _min: CommissionerMinAggregateOutputType | null
    _max: CommissionerMaxAggregateOutputType | null
  }

  type GetCommissionerGroupByPayload<T extends CommissionerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommissionerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommissionerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommissionerGroupByOutputType[P]>
            : GetScalarType<T[P], CommissionerGroupByOutputType[P]>
        }
      >
    >


  export type CommissionerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    commission_rate?: boolean
    created_at?: boolean
    updated_at?: boolean
    auction_sessions?: boolean | Commissioner$auction_sessionsArgs<ExtArgs>
    bills?: boolean | Commissioner$billsArgs<ExtArgs>
    buyers?: boolean | Commissioner$buyersArgs<ExtArgs>
    farmers?: boolean | Commissioner$farmersArgs<ExtArgs>
    password_resets?: boolean | Commissioner$password_resetsArgs<ExtArgs>
    _count?: boolean | CommissionerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commissioner"]>

  export type CommissionerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    commission_rate?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["commissioner"]>

  export type CommissionerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    commission_rate?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["commissioner"]>

  export type CommissionerSelectScalar = {
    id?: boolean
    name?: boolean
    location?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    commission_rate?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type CommissionerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "location" | "phone" | "email" | "password" | "commission_rate" | "created_at" | "updated_at", ExtArgs["result"]["commissioner"]>
  export type CommissionerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auction_sessions?: boolean | Commissioner$auction_sessionsArgs<ExtArgs>
    bills?: boolean | Commissioner$billsArgs<ExtArgs>
    buyers?: boolean | Commissioner$buyersArgs<ExtArgs>
    farmers?: boolean | Commissioner$farmersArgs<ExtArgs>
    password_resets?: boolean | Commissioner$password_resetsArgs<ExtArgs>
    _count?: boolean | CommissionerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CommissionerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CommissionerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CommissionerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Commissioner"
    objects: {
      auction_sessions: Prisma.$AuctionSessionPayload<ExtArgs>[]
      bills: Prisma.$BillPayload<ExtArgs>[]
      buyers: Prisma.$BuyerPayload<ExtArgs>[]
      farmers: Prisma.$FarmerPayload<ExtArgs>[]
      password_resets: Prisma.$PasswordResetPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      location: string
      phone: string
      email: string
      password: string
      commission_rate: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["commissioner"]>
    composites: {}
  }

  type CommissionerGetPayload<S extends boolean | null | undefined | CommissionerDefaultArgs> = $Result.GetResult<Prisma.$CommissionerPayload, S>

  type CommissionerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommissionerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommissionerCountAggregateInputType | true
    }

  export interface CommissionerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Commissioner'], meta: { name: 'Commissioner' } }
    /**
     * Find zero or one Commissioner that matches the filter.
     * @param {CommissionerFindUniqueArgs} args - Arguments to find a Commissioner
     * @example
     * // Get one Commissioner
     * const commissioner = await prisma.commissioner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommissionerFindUniqueArgs>(args: SelectSubset<T, CommissionerFindUniqueArgs<ExtArgs>>): Prisma__CommissionerClient<$Result.GetResult<Prisma.$CommissionerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Commissioner that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommissionerFindUniqueOrThrowArgs} args - Arguments to find a Commissioner
     * @example
     * // Get one Commissioner
     * const commissioner = await prisma.commissioner.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommissionerFindUniqueOrThrowArgs>(args: SelectSubset<T, CommissionerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommissionerClient<$Result.GetResult<Prisma.$CommissionerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Commissioner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionerFindFirstArgs} args - Arguments to find a Commissioner
     * @example
     * // Get one Commissioner
     * const commissioner = await prisma.commissioner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommissionerFindFirstArgs>(args?: SelectSubset<T, CommissionerFindFirstArgs<ExtArgs>>): Prisma__CommissionerClient<$Result.GetResult<Prisma.$CommissionerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Commissioner that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionerFindFirstOrThrowArgs} args - Arguments to find a Commissioner
     * @example
     * // Get one Commissioner
     * const commissioner = await prisma.commissioner.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommissionerFindFirstOrThrowArgs>(args?: SelectSubset<T, CommissionerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommissionerClient<$Result.GetResult<Prisma.$CommissionerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Commissioners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Commissioners
     * const commissioners = await prisma.commissioner.findMany()
     * 
     * // Get first 10 Commissioners
     * const commissioners = await prisma.commissioner.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commissionerWithIdOnly = await prisma.commissioner.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommissionerFindManyArgs>(args?: SelectSubset<T, CommissionerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommissionerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Commissioner.
     * @param {CommissionerCreateArgs} args - Arguments to create a Commissioner.
     * @example
     * // Create one Commissioner
     * const Commissioner = await prisma.commissioner.create({
     *   data: {
     *     // ... data to create a Commissioner
     *   }
     * })
     * 
     */
    create<T extends CommissionerCreateArgs>(args: SelectSubset<T, CommissionerCreateArgs<ExtArgs>>): Prisma__CommissionerClient<$Result.GetResult<Prisma.$CommissionerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Commissioners.
     * @param {CommissionerCreateManyArgs} args - Arguments to create many Commissioners.
     * @example
     * // Create many Commissioners
     * const commissioner = await prisma.commissioner.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommissionerCreateManyArgs>(args?: SelectSubset<T, CommissionerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Commissioners and returns the data saved in the database.
     * @param {CommissionerCreateManyAndReturnArgs} args - Arguments to create many Commissioners.
     * @example
     * // Create many Commissioners
     * const commissioner = await prisma.commissioner.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Commissioners and only return the `id`
     * const commissionerWithIdOnly = await prisma.commissioner.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommissionerCreateManyAndReturnArgs>(args?: SelectSubset<T, CommissionerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommissionerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Commissioner.
     * @param {CommissionerDeleteArgs} args - Arguments to delete one Commissioner.
     * @example
     * // Delete one Commissioner
     * const Commissioner = await prisma.commissioner.delete({
     *   where: {
     *     // ... filter to delete one Commissioner
     *   }
     * })
     * 
     */
    delete<T extends CommissionerDeleteArgs>(args: SelectSubset<T, CommissionerDeleteArgs<ExtArgs>>): Prisma__CommissionerClient<$Result.GetResult<Prisma.$CommissionerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Commissioner.
     * @param {CommissionerUpdateArgs} args - Arguments to update one Commissioner.
     * @example
     * // Update one Commissioner
     * const commissioner = await prisma.commissioner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommissionerUpdateArgs>(args: SelectSubset<T, CommissionerUpdateArgs<ExtArgs>>): Prisma__CommissionerClient<$Result.GetResult<Prisma.$CommissionerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Commissioners.
     * @param {CommissionerDeleteManyArgs} args - Arguments to filter Commissioners to delete.
     * @example
     * // Delete a few Commissioners
     * const { count } = await prisma.commissioner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommissionerDeleteManyArgs>(args?: SelectSubset<T, CommissionerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Commissioners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Commissioners
     * const commissioner = await prisma.commissioner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommissionerUpdateManyArgs>(args: SelectSubset<T, CommissionerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Commissioners and returns the data updated in the database.
     * @param {CommissionerUpdateManyAndReturnArgs} args - Arguments to update many Commissioners.
     * @example
     * // Update many Commissioners
     * const commissioner = await prisma.commissioner.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Commissioners and only return the `id`
     * const commissionerWithIdOnly = await prisma.commissioner.updateManyAndReturn({
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
    updateManyAndReturn<T extends CommissionerUpdateManyAndReturnArgs>(args: SelectSubset<T, CommissionerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommissionerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Commissioner.
     * @param {CommissionerUpsertArgs} args - Arguments to update or create a Commissioner.
     * @example
     * // Update or create a Commissioner
     * const commissioner = await prisma.commissioner.upsert({
     *   create: {
     *     // ... data to create a Commissioner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Commissioner we want to update
     *   }
     * })
     */
    upsert<T extends CommissionerUpsertArgs>(args: SelectSubset<T, CommissionerUpsertArgs<ExtArgs>>): Prisma__CommissionerClient<$Result.GetResult<Prisma.$CommissionerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Commissioners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionerCountArgs} args - Arguments to filter Commissioners to count.
     * @example
     * // Count the number of Commissioners
     * const count = await prisma.commissioner.count({
     *   where: {
     *     // ... the filter for the Commissioners we want to count
     *   }
     * })
    **/
    count<T extends CommissionerCountArgs>(
      args?: Subset<T, CommissionerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommissionerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Commissioner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CommissionerAggregateArgs>(args: Subset<T, CommissionerAggregateArgs>): Prisma.PrismaPromise<GetCommissionerAggregateType<T>>

    /**
     * Group by Commissioner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommissionerGroupByArgs} args - Group by arguments.
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
      T extends CommissionerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommissionerGroupByArgs['orderBy'] }
        : { orderBy?: CommissionerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CommissionerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommissionerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Commissioner model
   */
  readonly fields: CommissionerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Commissioner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommissionerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auction_sessions<T extends Commissioner$auction_sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Commissioner$auction_sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuctionSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bills<T extends Commissioner$billsArgs<ExtArgs> = {}>(args?: Subset<T, Commissioner$billsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    buyers<T extends Commissioner$buyersArgs<ExtArgs> = {}>(args?: Subset<T, Commissioner$buyersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuyerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    farmers<T extends Commissioner$farmersArgs<ExtArgs> = {}>(args?: Subset<T, Commissioner$farmersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    password_resets<T extends Commissioner$password_resetsArgs<ExtArgs> = {}>(args?: Subset<T, Commissioner$password_resetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Commissioner model
   */
  interface CommissionerFieldRefs {
    readonly id: FieldRef<"Commissioner", 'String'>
    readonly name: FieldRef<"Commissioner", 'String'>
    readonly location: FieldRef<"Commissioner", 'String'>
    readonly phone: FieldRef<"Commissioner", 'String'>
    readonly email: FieldRef<"Commissioner", 'String'>
    readonly password: FieldRef<"Commissioner", 'String'>
    readonly commission_rate: FieldRef<"Commissioner", 'Float'>
    readonly created_at: FieldRef<"Commissioner", 'DateTime'>
    readonly updated_at: FieldRef<"Commissioner", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Commissioner findUnique
   */
  export type CommissionerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commissioner
     */
    select?: CommissionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commissioner
     */
    omit?: CommissionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionerInclude<ExtArgs> | null
    /**
     * Filter, which Commissioner to fetch.
     */
    where: CommissionerWhereUniqueInput
  }

  /**
   * Commissioner findUniqueOrThrow
   */
  export type CommissionerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commissioner
     */
    select?: CommissionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commissioner
     */
    omit?: CommissionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionerInclude<ExtArgs> | null
    /**
     * Filter, which Commissioner to fetch.
     */
    where: CommissionerWhereUniqueInput
  }

  /**
   * Commissioner findFirst
   */
  export type CommissionerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commissioner
     */
    select?: CommissionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commissioner
     */
    omit?: CommissionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionerInclude<ExtArgs> | null
    /**
     * Filter, which Commissioner to fetch.
     */
    where?: CommissionerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commissioners to fetch.
     */
    orderBy?: CommissionerOrderByWithRelationInput | CommissionerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commissioners.
     */
    cursor?: CommissionerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commissioners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commissioners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commissioners.
     */
    distinct?: CommissionerScalarFieldEnum | CommissionerScalarFieldEnum[]
  }

  /**
   * Commissioner findFirstOrThrow
   */
  export type CommissionerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commissioner
     */
    select?: CommissionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commissioner
     */
    omit?: CommissionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionerInclude<ExtArgs> | null
    /**
     * Filter, which Commissioner to fetch.
     */
    where?: CommissionerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commissioners to fetch.
     */
    orderBy?: CommissionerOrderByWithRelationInput | CommissionerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commissioners.
     */
    cursor?: CommissionerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commissioners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commissioners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commissioners.
     */
    distinct?: CommissionerScalarFieldEnum | CommissionerScalarFieldEnum[]
  }

  /**
   * Commissioner findMany
   */
  export type CommissionerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commissioner
     */
    select?: CommissionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commissioner
     */
    omit?: CommissionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionerInclude<ExtArgs> | null
    /**
     * Filter, which Commissioners to fetch.
     */
    where?: CommissionerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commissioners to fetch.
     */
    orderBy?: CommissionerOrderByWithRelationInput | CommissionerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Commissioners.
     */
    cursor?: CommissionerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commissioners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commissioners.
     */
    skip?: number
    distinct?: CommissionerScalarFieldEnum | CommissionerScalarFieldEnum[]
  }

  /**
   * Commissioner create
   */
  export type CommissionerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commissioner
     */
    select?: CommissionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commissioner
     */
    omit?: CommissionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionerInclude<ExtArgs> | null
    /**
     * The data needed to create a Commissioner.
     */
    data: XOR<CommissionerCreateInput, CommissionerUncheckedCreateInput>
  }

  /**
   * Commissioner createMany
   */
  export type CommissionerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Commissioners.
     */
    data: CommissionerCreateManyInput | CommissionerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Commissioner createManyAndReturn
   */
  export type CommissionerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commissioner
     */
    select?: CommissionerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Commissioner
     */
    omit?: CommissionerOmit<ExtArgs> | null
    /**
     * The data used to create many Commissioners.
     */
    data: CommissionerCreateManyInput | CommissionerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Commissioner update
   */
  export type CommissionerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commissioner
     */
    select?: CommissionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commissioner
     */
    omit?: CommissionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionerInclude<ExtArgs> | null
    /**
     * The data needed to update a Commissioner.
     */
    data: XOR<CommissionerUpdateInput, CommissionerUncheckedUpdateInput>
    /**
     * Choose, which Commissioner to update.
     */
    where: CommissionerWhereUniqueInput
  }

  /**
   * Commissioner updateMany
   */
  export type CommissionerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Commissioners.
     */
    data: XOR<CommissionerUpdateManyMutationInput, CommissionerUncheckedUpdateManyInput>
    /**
     * Filter which Commissioners to update
     */
    where?: CommissionerWhereInput
    /**
     * Limit how many Commissioners to update.
     */
    limit?: number
  }

  /**
   * Commissioner updateManyAndReturn
   */
  export type CommissionerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commissioner
     */
    select?: CommissionerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Commissioner
     */
    omit?: CommissionerOmit<ExtArgs> | null
    /**
     * The data used to update Commissioners.
     */
    data: XOR<CommissionerUpdateManyMutationInput, CommissionerUncheckedUpdateManyInput>
    /**
     * Filter which Commissioners to update
     */
    where?: CommissionerWhereInput
    /**
     * Limit how many Commissioners to update.
     */
    limit?: number
  }

  /**
   * Commissioner upsert
   */
  export type CommissionerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commissioner
     */
    select?: CommissionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commissioner
     */
    omit?: CommissionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionerInclude<ExtArgs> | null
    /**
     * The filter to search for the Commissioner to update in case it exists.
     */
    where: CommissionerWhereUniqueInput
    /**
     * In case the Commissioner found by the `where` argument doesn't exist, create a new Commissioner with this data.
     */
    create: XOR<CommissionerCreateInput, CommissionerUncheckedCreateInput>
    /**
     * In case the Commissioner was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommissionerUpdateInput, CommissionerUncheckedUpdateInput>
  }

  /**
   * Commissioner delete
   */
  export type CommissionerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commissioner
     */
    select?: CommissionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commissioner
     */
    omit?: CommissionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionerInclude<ExtArgs> | null
    /**
     * Filter which Commissioner to delete.
     */
    where: CommissionerWhereUniqueInput
  }

  /**
   * Commissioner deleteMany
   */
  export type CommissionerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Commissioners to delete
     */
    where?: CommissionerWhereInput
    /**
     * Limit how many Commissioners to delete.
     */
    limit?: number
  }

  /**
   * Commissioner.auction_sessions
   */
  export type Commissioner$auction_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionSession
     */
    select?: AuctionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionSession
     */
    omit?: AuctionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionSessionInclude<ExtArgs> | null
    where?: AuctionSessionWhereInput
    orderBy?: AuctionSessionOrderByWithRelationInput | AuctionSessionOrderByWithRelationInput[]
    cursor?: AuctionSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuctionSessionScalarFieldEnum | AuctionSessionScalarFieldEnum[]
  }

  /**
   * Commissioner.bills
   */
  export type Commissioner$billsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bill
     */
    omit?: BillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    where?: BillWhereInput
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    cursor?: BillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * Commissioner.buyers
   */
  export type Commissioner$buyersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buyer
     */
    select?: BuyerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buyer
     */
    omit?: BuyerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuyerInclude<ExtArgs> | null
    where?: BuyerWhereInput
    orderBy?: BuyerOrderByWithRelationInput | BuyerOrderByWithRelationInput[]
    cursor?: BuyerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BuyerScalarFieldEnum | BuyerScalarFieldEnum[]
  }

  /**
   * Commissioner.farmers
   */
  export type Commissioner$farmersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farmer
     */
    omit?: FarmerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
    where?: FarmerWhereInput
    orderBy?: FarmerOrderByWithRelationInput | FarmerOrderByWithRelationInput[]
    cursor?: FarmerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FarmerScalarFieldEnum | FarmerScalarFieldEnum[]
  }

  /**
   * Commissioner.password_resets
   */
  export type Commissioner$password_resetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    where?: PasswordResetWhereInput
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    cursor?: PasswordResetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * Commissioner without action
   */
  export type CommissionerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commissioner
     */
    select?: CommissionerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commissioner
     */
    omit?: CommissionerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommissionerInclude<ExtArgs> | null
  }


  /**
   * Model PasswordReset
   */

  export type AggregatePasswordReset = {
    _count: PasswordResetCountAggregateOutputType | null
    _min: PasswordResetMinAggregateOutputType | null
    _max: PasswordResetMaxAggregateOutputType | null
  }

  export type PasswordResetMinAggregateOutputType = {
    id: string | null
    commissioner_id: string | null
    token: string | null
    expires_at: Date | null
    used: boolean | null
    created_at: Date | null
    used_at: Date | null
  }

  export type PasswordResetMaxAggregateOutputType = {
    id: string | null
    commissioner_id: string | null
    token: string | null
    expires_at: Date | null
    used: boolean | null
    created_at: Date | null
    used_at: Date | null
  }

  export type PasswordResetCountAggregateOutputType = {
    id: number
    commissioner_id: number
    token: number
    expires_at: number
    used: number
    created_at: number
    used_at: number
    _all: number
  }


  export type PasswordResetMinAggregateInputType = {
    id?: true
    commissioner_id?: true
    token?: true
    expires_at?: true
    used?: true
    created_at?: true
    used_at?: true
  }

  export type PasswordResetMaxAggregateInputType = {
    id?: true
    commissioner_id?: true
    token?: true
    expires_at?: true
    used?: true
    created_at?: true
    used_at?: true
  }

  export type PasswordResetCountAggregateInputType = {
    id?: true
    commissioner_id?: true
    token?: true
    expires_at?: true
    used?: true
    created_at?: true
    used_at?: true
    _all?: true
  }

  export type PasswordResetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordReset to aggregate.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResets
    **/
    _count?: true | PasswordResetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetMaxAggregateInputType
  }

  export type GetPasswordResetAggregateType<T extends PasswordResetAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordReset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordReset[P]>
      : GetScalarType<T[P], AggregatePasswordReset[P]>
  }




  export type PasswordResetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetWhereInput
    orderBy?: PasswordResetOrderByWithAggregationInput | PasswordResetOrderByWithAggregationInput[]
    by: PasswordResetScalarFieldEnum[] | PasswordResetScalarFieldEnum
    having?: PasswordResetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetCountAggregateInputType | true
    _min?: PasswordResetMinAggregateInputType
    _max?: PasswordResetMaxAggregateInputType
  }

  export type PasswordResetGroupByOutputType = {
    id: string
    commissioner_id: string
    token: string
    expires_at: Date
    used: boolean
    created_at: Date
    used_at: Date | null
    _count: PasswordResetCountAggregateOutputType | null
    _min: PasswordResetMinAggregateOutputType | null
    _max: PasswordResetMaxAggregateOutputType | null
  }

  type GetPasswordResetGroupByPayload<T extends PasswordResetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commissioner_id?: boolean
    token?: boolean
    expires_at?: boolean
    used?: boolean
    created_at?: boolean
    used_at?: boolean
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordReset"]>

  export type PasswordResetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commissioner_id?: boolean
    token?: boolean
    expires_at?: boolean
    used?: boolean
    created_at?: boolean
    used_at?: boolean
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordReset"]>

  export type PasswordResetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commissioner_id?: boolean
    token?: boolean
    expires_at?: boolean
    used?: boolean
    created_at?: boolean
    used_at?: boolean
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordReset"]>

  export type PasswordResetSelectScalar = {
    id?: boolean
    commissioner_id?: boolean
    token?: boolean
    expires_at?: boolean
    used?: boolean
    created_at?: boolean
    used_at?: boolean
  }

  export type PasswordResetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "commissioner_id" | "token" | "expires_at" | "used" | "created_at" | "used_at", ExtArgs["result"]["passwordReset"]>
  export type PasswordResetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
  }
  export type PasswordResetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
  }
  export type PasswordResetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
  }

  export type $PasswordResetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordReset"
    objects: {
      commissioner: Prisma.$CommissionerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      commissioner_id: string
      token: string
      expires_at: Date
      used: boolean
      created_at: Date
      used_at: Date | null
    }, ExtArgs["result"]["passwordReset"]>
    composites: {}
  }

  type PasswordResetGetPayload<S extends boolean | null | undefined | PasswordResetDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetPayload, S>

  type PasswordResetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetCountAggregateInputType | true
    }

  export interface PasswordResetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordReset'], meta: { name: 'PasswordReset' } }
    /**
     * Find zero or one PasswordReset that matches the filter.
     * @param {PasswordResetFindUniqueArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetFindUniqueArgs>(args: SelectSubset<T, PasswordResetFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordReset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetFindUniqueOrThrowArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordReset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindFirstArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetFindFirstArgs>(args?: SelectSubset<T, PasswordResetFindFirstArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordReset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindFirstOrThrowArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResets
     * const passwordResets = await prisma.passwordReset.findMany()
     * 
     * // Get first 10 PasswordResets
     * const passwordResets = await prisma.passwordReset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetWithIdOnly = await prisma.passwordReset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetFindManyArgs>(args?: SelectSubset<T, PasswordResetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordReset.
     * @param {PasswordResetCreateArgs} args - Arguments to create a PasswordReset.
     * @example
     * // Create one PasswordReset
     * const PasswordReset = await prisma.passwordReset.create({
     *   data: {
     *     // ... data to create a PasswordReset
     *   }
     * })
     * 
     */
    create<T extends PasswordResetCreateArgs>(args: SelectSubset<T, PasswordResetCreateArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResets.
     * @param {PasswordResetCreateManyArgs} args - Arguments to create many PasswordResets.
     * @example
     * // Create many PasswordResets
     * const passwordReset = await prisma.passwordReset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetCreateManyArgs>(args?: SelectSubset<T, PasswordResetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordResets and returns the data saved in the database.
     * @param {PasswordResetCreateManyAndReturnArgs} args - Arguments to create many PasswordResets.
     * @example
     * // Create many PasswordResets
     * const passwordReset = await prisma.passwordReset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordResets and only return the `id`
     * const passwordResetWithIdOnly = await prisma.passwordReset.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordResetCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordResetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PasswordReset.
     * @param {PasswordResetDeleteArgs} args - Arguments to delete one PasswordReset.
     * @example
     * // Delete one PasswordReset
     * const PasswordReset = await prisma.passwordReset.delete({
     *   where: {
     *     // ... filter to delete one PasswordReset
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetDeleteArgs>(args: SelectSubset<T, PasswordResetDeleteArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordReset.
     * @param {PasswordResetUpdateArgs} args - Arguments to update one PasswordReset.
     * @example
     * // Update one PasswordReset
     * const passwordReset = await prisma.passwordReset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetUpdateArgs>(args: SelectSubset<T, PasswordResetUpdateArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResets.
     * @param {PasswordResetDeleteManyArgs} args - Arguments to filter PasswordResets to delete.
     * @example
     * // Delete a few PasswordResets
     * const { count } = await prisma.passwordReset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetDeleteManyArgs>(args?: SelectSubset<T, PasswordResetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResets
     * const passwordReset = await prisma.passwordReset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetUpdateManyArgs>(args: SelectSubset<T, PasswordResetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResets and returns the data updated in the database.
     * @param {PasswordResetUpdateManyAndReturnArgs} args - Arguments to update many PasswordResets.
     * @example
     * // Update many PasswordResets
     * const passwordReset = await prisma.passwordReset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PasswordResets and only return the `id`
     * const passwordResetWithIdOnly = await prisma.passwordReset.updateManyAndReturn({
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
    updateManyAndReturn<T extends PasswordResetUpdateManyAndReturnArgs>(args: SelectSubset<T, PasswordResetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PasswordReset.
     * @param {PasswordResetUpsertArgs} args - Arguments to update or create a PasswordReset.
     * @example
     * // Update or create a PasswordReset
     * const passwordReset = await prisma.passwordReset.upsert({
     *   create: {
     *     // ... data to create a PasswordReset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordReset we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetUpsertArgs>(args: SelectSubset<T, PasswordResetUpsertArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordResets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetCountArgs} args - Arguments to filter PasswordResets to count.
     * @example
     * // Count the number of PasswordResets
     * const count = await prisma.passwordReset.count({
     *   where: {
     *     // ... the filter for the PasswordResets we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetCountArgs>(
      args?: Subset<T, PasswordResetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordReset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PasswordResetAggregateArgs>(args: Subset<T, PasswordResetAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetAggregateType<T>>

    /**
     * Group by PasswordReset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetGroupByArgs} args - Group by arguments.
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
      T extends PasswordResetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PasswordResetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordReset model
   */
  readonly fields: PasswordResetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordReset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    commissioner<T extends CommissionerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CommissionerDefaultArgs<ExtArgs>>): Prisma__CommissionerClient<$Result.GetResult<Prisma.$CommissionerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PasswordReset model
   */
  interface PasswordResetFieldRefs {
    readonly id: FieldRef<"PasswordReset", 'String'>
    readonly commissioner_id: FieldRef<"PasswordReset", 'String'>
    readonly token: FieldRef<"PasswordReset", 'String'>
    readonly expires_at: FieldRef<"PasswordReset", 'DateTime'>
    readonly used: FieldRef<"PasswordReset", 'Boolean'>
    readonly created_at: FieldRef<"PasswordReset", 'DateTime'>
    readonly used_at: FieldRef<"PasswordReset", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordReset findUnique
   */
  export type PasswordResetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset findUniqueOrThrow
   */
  export type PasswordResetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset findFirst
   */
  export type PasswordResetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResets.
     */
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset findFirstOrThrow
   */
  export type PasswordResetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResets.
     */
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset findMany
   */
  export type PasswordResetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResets to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset create
   */
  export type PasswordResetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordReset.
     */
    data: XOR<PasswordResetCreateInput, PasswordResetUncheckedCreateInput>
  }

  /**
   * PasswordReset createMany
   */
  export type PasswordResetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResets.
     */
    data: PasswordResetCreateManyInput | PasswordResetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordReset createManyAndReturn
   */
  export type PasswordResetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * The data used to create many PasswordResets.
     */
    data: PasswordResetCreateManyInput | PasswordResetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordReset update
   */
  export type PasswordResetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordReset.
     */
    data: XOR<PasswordResetUpdateInput, PasswordResetUncheckedUpdateInput>
    /**
     * Choose, which PasswordReset to update.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset updateMany
   */
  export type PasswordResetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResets.
     */
    data: XOR<PasswordResetUpdateManyMutationInput, PasswordResetUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResets to update
     */
    where?: PasswordResetWhereInput
    /**
     * Limit how many PasswordResets to update.
     */
    limit?: number
  }

  /**
   * PasswordReset updateManyAndReturn
   */
  export type PasswordResetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * The data used to update PasswordResets.
     */
    data: XOR<PasswordResetUpdateManyMutationInput, PasswordResetUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResets to update
     */
    where?: PasswordResetWhereInput
    /**
     * Limit how many PasswordResets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordReset upsert
   */
  export type PasswordResetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordReset to update in case it exists.
     */
    where: PasswordResetWhereUniqueInput
    /**
     * In case the PasswordReset found by the `where` argument doesn't exist, create a new PasswordReset with this data.
     */
    create: XOR<PasswordResetCreateInput, PasswordResetUncheckedCreateInput>
    /**
     * In case the PasswordReset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetUpdateInput, PasswordResetUncheckedUpdateInput>
  }

  /**
   * PasswordReset delete
   */
  export type PasswordResetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter which PasswordReset to delete.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset deleteMany
   */
  export type PasswordResetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResets to delete
     */
    where?: PasswordResetWhereInput
    /**
     * Limit how many PasswordResets to delete.
     */
    limit?: number
  }

  /**
   * PasswordReset without action
   */
  export type PasswordResetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
  }


  /**
   * Model Farmer
   */

  export type AggregateFarmer = {
    _count: FarmerCountAggregateOutputType | null
    _min: FarmerMinAggregateOutputType | null
    _max: FarmerMaxAggregateOutputType | null
  }

  export type FarmerMinAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    village: string | null
    commissioner_id: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FarmerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    village: string | null
    commissioner_id: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FarmerCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    village: number
    commissioner_id: number
    is_active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type FarmerMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    village?: true
    commissioner_id?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type FarmerMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    village?: true
    commissioner_id?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type FarmerCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    village?: true
    commissioner_id?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type FarmerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Farmer to aggregate.
     */
    where?: FarmerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farmers to fetch.
     */
    orderBy?: FarmerOrderByWithRelationInput | FarmerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FarmerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farmers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farmers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Farmers
    **/
    _count?: true | FarmerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FarmerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FarmerMaxAggregateInputType
  }

  export type GetFarmerAggregateType<T extends FarmerAggregateArgs> = {
        [P in keyof T & keyof AggregateFarmer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFarmer[P]>
      : GetScalarType<T[P], AggregateFarmer[P]>
  }




  export type FarmerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FarmerWhereInput
    orderBy?: FarmerOrderByWithAggregationInput | FarmerOrderByWithAggregationInput[]
    by: FarmerScalarFieldEnum[] | FarmerScalarFieldEnum
    having?: FarmerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FarmerCountAggregateInputType | true
    _min?: FarmerMinAggregateInputType
    _max?: FarmerMaxAggregateInputType
  }

  export type FarmerGroupByOutputType = {
    id: string
    name: string
    phone: string
    village: string
    commissioner_id: string
    is_active: boolean
    created_at: Date
    updated_at: Date
    _count: FarmerCountAggregateOutputType | null
    _min: FarmerMinAggregateOutputType | null
    _max: FarmerMaxAggregateOutputType | null
  }

  type GetFarmerGroupByPayload<T extends FarmerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FarmerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FarmerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FarmerGroupByOutputType[P]>
            : GetScalarType<T[P], FarmerGroupByOutputType[P]>
        }
      >
    >


  export type FarmerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    village?: boolean
    commissioner_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    auction_items?: boolean | Farmer$auction_itemsArgs<ExtArgs>
    bills?: boolean | Farmer$billsArgs<ExtArgs>
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
    _count?: boolean | FarmerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farmer"]>

  export type FarmerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    village?: boolean
    commissioner_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farmer"]>

  export type FarmerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    village?: boolean
    commissioner_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farmer"]>

  export type FarmerSelectScalar = {
    id?: boolean
    name?: boolean
    phone?: boolean
    village?: boolean
    commissioner_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type FarmerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "phone" | "village" | "commissioner_id" | "is_active" | "created_at" | "updated_at", ExtArgs["result"]["farmer"]>
  export type FarmerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auction_items?: boolean | Farmer$auction_itemsArgs<ExtArgs>
    bills?: boolean | Farmer$billsArgs<ExtArgs>
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
    _count?: boolean | FarmerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FarmerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
  }
  export type FarmerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
  }

  export type $FarmerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Farmer"
    objects: {
      auction_items: Prisma.$AuctionItemPayload<ExtArgs>[]
      bills: Prisma.$BillPayload<ExtArgs>[]
      commissioner: Prisma.$CommissionerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      phone: string
      village: string
      commissioner_id: string
      is_active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["farmer"]>
    composites: {}
  }

  type FarmerGetPayload<S extends boolean | null | undefined | FarmerDefaultArgs> = $Result.GetResult<Prisma.$FarmerPayload, S>

  type FarmerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FarmerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FarmerCountAggregateInputType | true
    }

  export interface FarmerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Farmer'], meta: { name: 'Farmer' } }
    /**
     * Find zero or one Farmer that matches the filter.
     * @param {FarmerFindUniqueArgs} args - Arguments to find a Farmer
     * @example
     * // Get one Farmer
     * const farmer = await prisma.farmer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FarmerFindUniqueArgs>(args: SelectSubset<T, FarmerFindUniqueArgs<ExtArgs>>): Prisma__FarmerClient<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Farmer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FarmerFindUniqueOrThrowArgs} args - Arguments to find a Farmer
     * @example
     * // Get one Farmer
     * const farmer = await prisma.farmer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FarmerFindUniqueOrThrowArgs>(args: SelectSubset<T, FarmerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FarmerClient<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Farmer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerFindFirstArgs} args - Arguments to find a Farmer
     * @example
     * // Get one Farmer
     * const farmer = await prisma.farmer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FarmerFindFirstArgs>(args?: SelectSubset<T, FarmerFindFirstArgs<ExtArgs>>): Prisma__FarmerClient<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Farmer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerFindFirstOrThrowArgs} args - Arguments to find a Farmer
     * @example
     * // Get one Farmer
     * const farmer = await prisma.farmer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FarmerFindFirstOrThrowArgs>(args?: SelectSubset<T, FarmerFindFirstOrThrowArgs<ExtArgs>>): Prisma__FarmerClient<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Farmers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Farmers
     * const farmers = await prisma.farmer.findMany()
     * 
     * // Get first 10 Farmers
     * const farmers = await prisma.farmer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const farmerWithIdOnly = await prisma.farmer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FarmerFindManyArgs>(args?: SelectSubset<T, FarmerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Farmer.
     * @param {FarmerCreateArgs} args - Arguments to create a Farmer.
     * @example
     * // Create one Farmer
     * const Farmer = await prisma.farmer.create({
     *   data: {
     *     // ... data to create a Farmer
     *   }
     * })
     * 
     */
    create<T extends FarmerCreateArgs>(args: SelectSubset<T, FarmerCreateArgs<ExtArgs>>): Prisma__FarmerClient<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Farmers.
     * @param {FarmerCreateManyArgs} args - Arguments to create many Farmers.
     * @example
     * // Create many Farmers
     * const farmer = await prisma.farmer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FarmerCreateManyArgs>(args?: SelectSubset<T, FarmerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Farmers and returns the data saved in the database.
     * @param {FarmerCreateManyAndReturnArgs} args - Arguments to create many Farmers.
     * @example
     * // Create many Farmers
     * const farmer = await prisma.farmer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Farmers and only return the `id`
     * const farmerWithIdOnly = await prisma.farmer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FarmerCreateManyAndReturnArgs>(args?: SelectSubset<T, FarmerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Farmer.
     * @param {FarmerDeleteArgs} args - Arguments to delete one Farmer.
     * @example
     * // Delete one Farmer
     * const Farmer = await prisma.farmer.delete({
     *   where: {
     *     // ... filter to delete one Farmer
     *   }
     * })
     * 
     */
    delete<T extends FarmerDeleteArgs>(args: SelectSubset<T, FarmerDeleteArgs<ExtArgs>>): Prisma__FarmerClient<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Farmer.
     * @param {FarmerUpdateArgs} args - Arguments to update one Farmer.
     * @example
     * // Update one Farmer
     * const farmer = await prisma.farmer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FarmerUpdateArgs>(args: SelectSubset<T, FarmerUpdateArgs<ExtArgs>>): Prisma__FarmerClient<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Farmers.
     * @param {FarmerDeleteManyArgs} args - Arguments to filter Farmers to delete.
     * @example
     * // Delete a few Farmers
     * const { count } = await prisma.farmer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FarmerDeleteManyArgs>(args?: SelectSubset<T, FarmerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Farmers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Farmers
     * const farmer = await prisma.farmer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FarmerUpdateManyArgs>(args: SelectSubset<T, FarmerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Farmers and returns the data updated in the database.
     * @param {FarmerUpdateManyAndReturnArgs} args - Arguments to update many Farmers.
     * @example
     * // Update many Farmers
     * const farmer = await prisma.farmer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Farmers and only return the `id`
     * const farmerWithIdOnly = await prisma.farmer.updateManyAndReturn({
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
    updateManyAndReturn<T extends FarmerUpdateManyAndReturnArgs>(args: SelectSubset<T, FarmerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Farmer.
     * @param {FarmerUpsertArgs} args - Arguments to update or create a Farmer.
     * @example
     * // Update or create a Farmer
     * const farmer = await prisma.farmer.upsert({
     *   create: {
     *     // ... data to create a Farmer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Farmer we want to update
     *   }
     * })
     */
    upsert<T extends FarmerUpsertArgs>(args: SelectSubset<T, FarmerUpsertArgs<ExtArgs>>): Prisma__FarmerClient<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Farmers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerCountArgs} args - Arguments to filter Farmers to count.
     * @example
     * // Count the number of Farmers
     * const count = await prisma.farmer.count({
     *   where: {
     *     // ... the filter for the Farmers we want to count
     *   }
     * })
    **/
    count<T extends FarmerCountArgs>(
      args?: Subset<T, FarmerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FarmerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Farmer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FarmerAggregateArgs>(args: Subset<T, FarmerAggregateArgs>): Prisma.PrismaPromise<GetFarmerAggregateType<T>>

    /**
     * Group by Farmer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerGroupByArgs} args - Group by arguments.
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
      T extends FarmerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FarmerGroupByArgs['orderBy'] }
        : { orderBy?: FarmerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FarmerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFarmerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Farmer model
   */
  readonly fields: FarmerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Farmer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FarmerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auction_items<T extends Farmer$auction_itemsArgs<ExtArgs> = {}>(args?: Subset<T, Farmer$auction_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuctionItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bills<T extends Farmer$billsArgs<ExtArgs> = {}>(args?: Subset<T, Farmer$billsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    commissioner<T extends CommissionerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CommissionerDefaultArgs<ExtArgs>>): Prisma__CommissionerClient<$Result.GetResult<Prisma.$CommissionerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Farmer model
   */
  interface FarmerFieldRefs {
    readonly id: FieldRef<"Farmer", 'String'>
    readonly name: FieldRef<"Farmer", 'String'>
    readonly phone: FieldRef<"Farmer", 'String'>
    readonly village: FieldRef<"Farmer", 'String'>
    readonly commissioner_id: FieldRef<"Farmer", 'String'>
    readonly is_active: FieldRef<"Farmer", 'Boolean'>
    readonly created_at: FieldRef<"Farmer", 'DateTime'>
    readonly updated_at: FieldRef<"Farmer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Farmer findUnique
   */
  export type FarmerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farmer
     */
    omit?: FarmerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
    /**
     * Filter, which Farmer to fetch.
     */
    where: FarmerWhereUniqueInput
  }

  /**
   * Farmer findUniqueOrThrow
   */
  export type FarmerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farmer
     */
    omit?: FarmerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
    /**
     * Filter, which Farmer to fetch.
     */
    where: FarmerWhereUniqueInput
  }

  /**
   * Farmer findFirst
   */
  export type FarmerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farmer
     */
    omit?: FarmerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
    /**
     * Filter, which Farmer to fetch.
     */
    where?: FarmerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farmers to fetch.
     */
    orderBy?: FarmerOrderByWithRelationInput | FarmerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Farmers.
     */
    cursor?: FarmerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farmers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farmers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farmers.
     */
    distinct?: FarmerScalarFieldEnum | FarmerScalarFieldEnum[]
  }

  /**
   * Farmer findFirstOrThrow
   */
  export type FarmerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farmer
     */
    omit?: FarmerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
    /**
     * Filter, which Farmer to fetch.
     */
    where?: FarmerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farmers to fetch.
     */
    orderBy?: FarmerOrderByWithRelationInput | FarmerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Farmers.
     */
    cursor?: FarmerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farmers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farmers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farmers.
     */
    distinct?: FarmerScalarFieldEnum | FarmerScalarFieldEnum[]
  }

  /**
   * Farmer findMany
   */
  export type FarmerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farmer
     */
    omit?: FarmerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
    /**
     * Filter, which Farmers to fetch.
     */
    where?: FarmerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farmers to fetch.
     */
    orderBy?: FarmerOrderByWithRelationInput | FarmerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Farmers.
     */
    cursor?: FarmerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farmers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farmers.
     */
    skip?: number
    distinct?: FarmerScalarFieldEnum | FarmerScalarFieldEnum[]
  }

  /**
   * Farmer create
   */
  export type FarmerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farmer
     */
    omit?: FarmerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
    /**
     * The data needed to create a Farmer.
     */
    data: XOR<FarmerCreateInput, FarmerUncheckedCreateInput>
  }

  /**
   * Farmer createMany
   */
  export type FarmerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Farmers.
     */
    data: FarmerCreateManyInput | FarmerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Farmer createManyAndReturn
   */
  export type FarmerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Farmer
     */
    omit?: FarmerOmit<ExtArgs> | null
    /**
     * The data used to create many Farmers.
     */
    data: FarmerCreateManyInput | FarmerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Farmer update
   */
  export type FarmerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farmer
     */
    omit?: FarmerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
    /**
     * The data needed to update a Farmer.
     */
    data: XOR<FarmerUpdateInput, FarmerUncheckedUpdateInput>
    /**
     * Choose, which Farmer to update.
     */
    where: FarmerWhereUniqueInput
  }

  /**
   * Farmer updateMany
   */
  export type FarmerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Farmers.
     */
    data: XOR<FarmerUpdateManyMutationInput, FarmerUncheckedUpdateManyInput>
    /**
     * Filter which Farmers to update
     */
    where?: FarmerWhereInput
    /**
     * Limit how many Farmers to update.
     */
    limit?: number
  }

  /**
   * Farmer updateManyAndReturn
   */
  export type FarmerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Farmer
     */
    omit?: FarmerOmit<ExtArgs> | null
    /**
     * The data used to update Farmers.
     */
    data: XOR<FarmerUpdateManyMutationInput, FarmerUncheckedUpdateManyInput>
    /**
     * Filter which Farmers to update
     */
    where?: FarmerWhereInput
    /**
     * Limit how many Farmers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Farmer upsert
   */
  export type FarmerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farmer
     */
    omit?: FarmerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
    /**
     * The filter to search for the Farmer to update in case it exists.
     */
    where: FarmerWhereUniqueInput
    /**
     * In case the Farmer found by the `where` argument doesn't exist, create a new Farmer with this data.
     */
    create: XOR<FarmerCreateInput, FarmerUncheckedCreateInput>
    /**
     * In case the Farmer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FarmerUpdateInput, FarmerUncheckedUpdateInput>
  }

  /**
   * Farmer delete
   */
  export type FarmerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farmer
     */
    omit?: FarmerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
    /**
     * Filter which Farmer to delete.
     */
    where: FarmerWhereUniqueInput
  }

  /**
   * Farmer deleteMany
   */
  export type FarmerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Farmers to delete
     */
    where?: FarmerWhereInput
    /**
     * Limit how many Farmers to delete.
     */
    limit?: number
  }

  /**
   * Farmer.auction_items
   */
  export type Farmer$auction_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionItem
     */
    select?: AuctionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionItem
     */
    omit?: AuctionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionItemInclude<ExtArgs> | null
    where?: AuctionItemWhereInput
    orderBy?: AuctionItemOrderByWithRelationInput | AuctionItemOrderByWithRelationInput[]
    cursor?: AuctionItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuctionItemScalarFieldEnum | AuctionItemScalarFieldEnum[]
  }

  /**
   * Farmer.bills
   */
  export type Farmer$billsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bill
     */
    omit?: BillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    where?: BillWhereInput
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    cursor?: BillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * Farmer without action
   */
  export type FarmerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farmer
     */
    omit?: FarmerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
  }


  /**
   * Model Buyer
   */

  export type AggregateBuyer = {
    _count: BuyerCountAggregateOutputType | null
    _min: BuyerMinAggregateOutputType | null
    _max: BuyerMaxAggregateOutputType | null
  }

  export type BuyerMinAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    commissioner_id: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BuyerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    commissioner_id: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BuyerCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    commissioner_id: number
    is_active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type BuyerMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    commissioner_id?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type BuyerMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    commissioner_id?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type BuyerCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    commissioner_id?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type BuyerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Buyer to aggregate.
     */
    where?: BuyerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buyers to fetch.
     */
    orderBy?: BuyerOrderByWithRelationInput | BuyerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BuyerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buyers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buyers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Buyers
    **/
    _count?: true | BuyerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BuyerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BuyerMaxAggregateInputType
  }

  export type GetBuyerAggregateType<T extends BuyerAggregateArgs> = {
        [P in keyof T & keyof AggregateBuyer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBuyer[P]>
      : GetScalarType<T[P], AggregateBuyer[P]>
  }




  export type BuyerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BuyerWhereInput
    orderBy?: BuyerOrderByWithAggregationInput | BuyerOrderByWithAggregationInput[]
    by: BuyerScalarFieldEnum[] | BuyerScalarFieldEnum
    having?: BuyerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BuyerCountAggregateInputType | true
    _min?: BuyerMinAggregateInputType
    _max?: BuyerMaxAggregateInputType
  }

  export type BuyerGroupByOutputType = {
    id: string
    name: string
    phone: string
    commissioner_id: string
    is_active: boolean
    created_at: Date
    updated_at: Date
    _count: BuyerCountAggregateOutputType | null
    _min: BuyerMinAggregateOutputType | null
    _max: BuyerMaxAggregateOutputType | null
  }

  type GetBuyerGroupByPayload<T extends BuyerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BuyerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BuyerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BuyerGroupByOutputType[P]>
            : GetScalarType<T[P], BuyerGroupByOutputType[P]>
        }
      >
    >


  export type BuyerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    commissioner_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    auction_items?: boolean | Buyer$auction_itemsArgs<ExtArgs>
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
    _count?: boolean | BuyerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["buyer"]>

  export type BuyerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    commissioner_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["buyer"]>

  export type BuyerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    commissioner_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["buyer"]>

  export type BuyerSelectScalar = {
    id?: boolean
    name?: boolean
    phone?: boolean
    commissioner_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type BuyerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "phone" | "commissioner_id" | "is_active" | "created_at" | "updated_at", ExtArgs["result"]["buyer"]>
  export type BuyerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auction_items?: boolean | Buyer$auction_itemsArgs<ExtArgs>
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
    _count?: boolean | BuyerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BuyerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
  }
  export type BuyerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
  }

  export type $BuyerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Buyer"
    objects: {
      auction_items: Prisma.$AuctionItemPayload<ExtArgs>[]
      commissioner: Prisma.$CommissionerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      phone: string
      commissioner_id: string
      is_active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["buyer"]>
    composites: {}
  }

  type BuyerGetPayload<S extends boolean | null | undefined | BuyerDefaultArgs> = $Result.GetResult<Prisma.$BuyerPayload, S>

  type BuyerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BuyerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BuyerCountAggregateInputType | true
    }

  export interface BuyerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Buyer'], meta: { name: 'Buyer' } }
    /**
     * Find zero or one Buyer that matches the filter.
     * @param {BuyerFindUniqueArgs} args - Arguments to find a Buyer
     * @example
     * // Get one Buyer
     * const buyer = await prisma.buyer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BuyerFindUniqueArgs>(args: SelectSubset<T, BuyerFindUniqueArgs<ExtArgs>>): Prisma__BuyerClient<$Result.GetResult<Prisma.$BuyerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Buyer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BuyerFindUniqueOrThrowArgs} args - Arguments to find a Buyer
     * @example
     * // Get one Buyer
     * const buyer = await prisma.buyer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BuyerFindUniqueOrThrowArgs>(args: SelectSubset<T, BuyerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BuyerClient<$Result.GetResult<Prisma.$BuyerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Buyer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuyerFindFirstArgs} args - Arguments to find a Buyer
     * @example
     * // Get one Buyer
     * const buyer = await prisma.buyer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BuyerFindFirstArgs>(args?: SelectSubset<T, BuyerFindFirstArgs<ExtArgs>>): Prisma__BuyerClient<$Result.GetResult<Prisma.$BuyerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Buyer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuyerFindFirstOrThrowArgs} args - Arguments to find a Buyer
     * @example
     * // Get one Buyer
     * const buyer = await prisma.buyer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BuyerFindFirstOrThrowArgs>(args?: SelectSubset<T, BuyerFindFirstOrThrowArgs<ExtArgs>>): Prisma__BuyerClient<$Result.GetResult<Prisma.$BuyerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Buyers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuyerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Buyers
     * const buyers = await prisma.buyer.findMany()
     * 
     * // Get first 10 Buyers
     * const buyers = await prisma.buyer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const buyerWithIdOnly = await prisma.buyer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BuyerFindManyArgs>(args?: SelectSubset<T, BuyerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuyerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Buyer.
     * @param {BuyerCreateArgs} args - Arguments to create a Buyer.
     * @example
     * // Create one Buyer
     * const Buyer = await prisma.buyer.create({
     *   data: {
     *     // ... data to create a Buyer
     *   }
     * })
     * 
     */
    create<T extends BuyerCreateArgs>(args: SelectSubset<T, BuyerCreateArgs<ExtArgs>>): Prisma__BuyerClient<$Result.GetResult<Prisma.$BuyerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Buyers.
     * @param {BuyerCreateManyArgs} args - Arguments to create many Buyers.
     * @example
     * // Create many Buyers
     * const buyer = await prisma.buyer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BuyerCreateManyArgs>(args?: SelectSubset<T, BuyerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Buyers and returns the data saved in the database.
     * @param {BuyerCreateManyAndReturnArgs} args - Arguments to create many Buyers.
     * @example
     * // Create many Buyers
     * const buyer = await prisma.buyer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Buyers and only return the `id`
     * const buyerWithIdOnly = await prisma.buyer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BuyerCreateManyAndReturnArgs>(args?: SelectSubset<T, BuyerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuyerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Buyer.
     * @param {BuyerDeleteArgs} args - Arguments to delete one Buyer.
     * @example
     * // Delete one Buyer
     * const Buyer = await prisma.buyer.delete({
     *   where: {
     *     // ... filter to delete one Buyer
     *   }
     * })
     * 
     */
    delete<T extends BuyerDeleteArgs>(args: SelectSubset<T, BuyerDeleteArgs<ExtArgs>>): Prisma__BuyerClient<$Result.GetResult<Prisma.$BuyerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Buyer.
     * @param {BuyerUpdateArgs} args - Arguments to update one Buyer.
     * @example
     * // Update one Buyer
     * const buyer = await prisma.buyer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BuyerUpdateArgs>(args: SelectSubset<T, BuyerUpdateArgs<ExtArgs>>): Prisma__BuyerClient<$Result.GetResult<Prisma.$BuyerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Buyers.
     * @param {BuyerDeleteManyArgs} args - Arguments to filter Buyers to delete.
     * @example
     * // Delete a few Buyers
     * const { count } = await prisma.buyer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BuyerDeleteManyArgs>(args?: SelectSubset<T, BuyerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Buyers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuyerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Buyers
     * const buyer = await prisma.buyer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BuyerUpdateManyArgs>(args: SelectSubset<T, BuyerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Buyers and returns the data updated in the database.
     * @param {BuyerUpdateManyAndReturnArgs} args - Arguments to update many Buyers.
     * @example
     * // Update many Buyers
     * const buyer = await prisma.buyer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Buyers and only return the `id`
     * const buyerWithIdOnly = await prisma.buyer.updateManyAndReturn({
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
    updateManyAndReturn<T extends BuyerUpdateManyAndReturnArgs>(args: SelectSubset<T, BuyerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuyerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Buyer.
     * @param {BuyerUpsertArgs} args - Arguments to update or create a Buyer.
     * @example
     * // Update or create a Buyer
     * const buyer = await prisma.buyer.upsert({
     *   create: {
     *     // ... data to create a Buyer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Buyer we want to update
     *   }
     * })
     */
    upsert<T extends BuyerUpsertArgs>(args: SelectSubset<T, BuyerUpsertArgs<ExtArgs>>): Prisma__BuyerClient<$Result.GetResult<Prisma.$BuyerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Buyers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuyerCountArgs} args - Arguments to filter Buyers to count.
     * @example
     * // Count the number of Buyers
     * const count = await prisma.buyer.count({
     *   where: {
     *     // ... the filter for the Buyers we want to count
     *   }
     * })
    **/
    count<T extends BuyerCountArgs>(
      args?: Subset<T, BuyerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BuyerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Buyer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuyerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BuyerAggregateArgs>(args: Subset<T, BuyerAggregateArgs>): Prisma.PrismaPromise<GetBuyerAggregateType<T>>

    /**
     * Group by Buyer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuyerGroupByArgs} args - Group by arguments.
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
      T extends BuyerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BuyerGroupByArgs['orderBy'] }
        : { orderBy?: BuyerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BuyerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBuyerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Buyer model
   */
  readonly fields: BuyerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Buyer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BuyerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auction_items<T extends Buyer$auction_itemsArgs<ExtArgs> = {}>(args?: Subset<T, Buyer$auction_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuctionItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    commissioner<T extends CommissionerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CommissionerDefaultArgs<ExtArgs>>): Prisma__CommissionerClient<$Result.GetResult<Prisma.$CommissionerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Buyer model
   */
  interface BuyerFieldRefs {
    readonly id: FieldRef<"Buyer", 'String'>
    readonly name: FieldRef<"Buyer", 'String'>
    readonly phone: FieldRef<"Buyer", 'String'>
    readonly commissioner_id: FieldRef<"Buyer", 'String'>
    readonly is_active: FieldRef<"Buyer", 'Boolean'>
    readonly created_at: FieldRef<"Buyer", 'DateTime'>
    readonly updated_at: FieldRef<"Buyer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Buyer findUnique
   */
  export type BuyerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buyer
     */
    select?: BuyerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buyer
     */
    omit?: BuyerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuyerInclude<ExtArgs> | null
    /**
     * Filter, which Buyer to fetch.
     */
    where: BuyerWhereUniqueInput
  }

  /**
   * Buyer findUniqueOrThrow
   */
  export type BuyerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buyer
     */
    select?: BuyerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buyer
     */
    omit?: BuyerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuyerInclude<ExtArgs> | null
    /**
     * Filter, which Buyer to fetch.
     */
    where: BuyerWhereUniqueInput
  }

  /**
   * Buyer findFirst
   */
  export type BuyerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buyer
     */
    select?: BuyerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buyer
     */
    omit?: BuyerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuyerInclude<ExtArgs> | null
    /**
     * Filter, which Buyer to fetch.
     */
    where?: BuyerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buyers to fetch.
     */
    orderBy?: BuyerOrderByWithRelationInput | BuyerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Buyers.
     */
    cursor?: BuyerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buyers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buyers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Buyers.
     */
    distinct?: BuyerScalarFieldEnum | BuyerScalarFieldEnum[]
  }

  /**
   * Buyer findFirstOrThrow
   */
  export type BuyerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buyer
     */
    select?: BuyerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buyer
     */
    omit?: BuyerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuyerInclude<ExtArgs> | null
    /**
     * Filter, which Buyer to fetch.
     */
    where?: BuyerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buyers to fetch.
     */
    orderBy?: BuyerOrderByWithRelationInput | BuyerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Buyers.
     */
    cursor?: BuyerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buyers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buyers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Buyers.
     */
    distinct?: BuyerScalarFieldEnum | BuyerScalarFieldEnum[]
  }

  /**
   * Buyer findMany
   */
  export type BuyerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buyer
     */
    select?: BuyerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buyer
     */
    omit?: BuyerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuyerInclude<ExtArgs> | null
    /**
     * Filter, which Buyers to fetch.
     */
    where?: BuyerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buyers to fetch.
     */
    orderBy?: BuyerOrderByWithRelationInput | BuyerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Buyers.
     */
    cursor?: BuyerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buyers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buyers.
     */
    skip?: number
    distinct?: BuyerScalarFieldEnum | BuyerScalarFieldEnum[]
  }

  /**
   * Buyer create
   */
  export type BuyerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buyer
     */
    select?: BuyerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buyer
     */
    omit?: BuyerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuyerInclude<ExtArgs> | null
    /**
     * The data needed to create a Buyer.
     */
    data: XOR<BuyerCreateInput, BuyerUncheckedCreateInput>
  }

  /**
   * Buyer createMany
   */
  export type BuyerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Buyers.
     */
    data: BuyerCreateManyInput | BuyerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Buyer createManyAndReturn
   */
  export type BuyerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buyer
     */
    select?: BuyerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Buyer
     */
    omit?: BuyerOmit<ExtArgs> | null
    /**
     * The data used to create many Buyers.
     */
    data: BuyerCreateManyInput | BuyerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuyerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Buyer update
   */
  export type BuyerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buyer
     */
    select?: BuyerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buyer
     */
    omit?: BuyerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuyerInclude<ExtArgs> | null
    /**
     * The data needed to update a Buyer.
     */
    data: XOR<BuyerUpdateInput, BuyerUncheckedUpdateInput>
    /**
     * Choose, which Buyer to update.
     */
    where: BuyerWhereUniqueInput
  }

  /**
   * Buyer updateMany
   */
  export type BuyerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Buyers.
     */
    data: XOR<BuyerUpdateManyMutationInput, BuyerUncheckedUpdateManyInput>
    /**
     * Filter which Buyers to update
     */
    where?: BuyerWhereInput
    /**
     * Limit how many Buyers to update.
     */
    limit?: number
  }

  /**
   * Buyer updateManyAndReturn
   */
  export type BuyerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buyer
     */
    select?: BuyerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Buyer
     */
    omit?: BuyerOmit<ExtArgs> | null
    /**
     * The data used to update Buyers.
     */
    data: XOR<BuyerUpdateManyMutationInput, BuyerUncheckedUpdateManyInput>
    /**
     * Filter which Buyers to update
     */
    where?: BuyerWhereInput
    /**
     * Limit how many Buyers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuyerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Buyer upsert
   */
  export type BuyerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buyer
     */
    select?: BuyerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buyer
     */
    omit?: BuyerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuyerInclude<ExtArgs> | null
    /**
     * The filter to search for the Buyer to update in case it exists.
     */
    where: BuyerWhereUniqueInput
    /**
     * In case the Buyer found by the `where` argument doesn't exist, create a new Buyer with this data.
     */
    create: XOR<BuyerCreateInput, BuyerUncheckedCreateInput>
    /**
     * In case the Buyer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BuyerUpdateInput, BuyerUncheckedUpdateInput>
  }

  /**
   * Buyer delete
   */
  export type BuyerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buyer
     */
    select?: BuyerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buyer
     */
    omit?: BuyerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuyerInclude<ExtArgs> | null
    /**
     * Filter which Buyer to delete.
     */
    where: BuyerWhereUniqueInput
  }

  /**
   * Buyer deleteMany
   */
  export type BuyerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Buyers to delete
     */
    where?: BuyerWhereInput
    /**
     * Limit how many Buyers to delete.
     */
    limit?: number
  }

  /**
   * Buyer.auction_items
   */
  export type Buyer$auction_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionItem
     */
    select?: AuctionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionItem
     */
    omit?: AuctionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionItemInclude<ExtArgs> | null
    where?: AuctionItemWhereInput
    orderBy?: AuctionItemOrderByWithRelationInput | AuctionItemOrderByWithRelationInput[]
    cursor?: AuctionItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuctionItemScalarFieldEnum | AuctionItemScalarFieldEnum[]
  }

  /**
   * Buyer without action
   */
  export type BuyerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buyer
     */
    select?: BuyerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buyer
     */
    omit?: BuyerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuyerInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    created_at: Date
    updated_at: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "created_at" | "updated_at", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
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
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
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
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly created_at: FieldRef<"Category", 'DateTime'>
    readonly updated_at: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    category_id: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    category_id: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    category_id: number
    is_active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    category_id?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    category_id?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    category_id?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    name: string
    category_id: string
    is_active: boolean
    created_at: Date
    updated_at: Date
    _count: ProductCountAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    auction_items?: boolean | Product$auction_itemsArgs<ExtArgs>
    bills?: boolean | Product$billsArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    category_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "category_id" | "is_active" | "created_at" | "updated_at", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auction_items?: boolean | Product$auction_itemsArgs<ExtArgs>
    bills?: boolean | Product$billsArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      auction_items: Prisma.$AuctionItemPayload<ExtArgs>[]
      bills: Prisma.$BillPayload<ExtArgs>[]
      category: Prisma.$CategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      category_id: string
      is_active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
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
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auction_items<T extends Product$auction_itemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$auction_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuctionItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bills<T extends Product$billsArgs<ExtArgs> = {}>(args?: Subset<T, Product$billsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly category_id: FieldRef<"Product", 'String'>
    readonly is_active: FieldRef<"Product", 'Boolean'>
    readonly created_at: FieldRef<"Product", 'DateTime'>
    readonly updated_at: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.auction_items
   */
  export type Product$auction_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionItem
     */
    select?: AuctionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionItem
     */
    omit?: AuctionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionItemInclude<ExtArgs> | null
    where?: AuctionItemWhereInput
    orderBy?: AuctionItemOrderByWithRelationInput | AuctionItemOrderByWithRelationInput[]
    cursor?: AuctionItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuctionItemScalarFieldEnum | AuctionItemScalarFieldEnum[]
  }

  /**
   * Product.bills
   */
  export type Product$billsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bill
     */
    omit?: BillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    where?: BillWhereInput
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    cursor?: BillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model AuctionSession
   */

  export type AggregateAuctionSession = {
    _count: AuctionSessionCountAggregateOutputType | null
    _min: AuctionSessionMinAggregateOutputType | null
    _max: AuctionSessionMaxAggregateOutputType | null
  }

  export type AuctionSessionMinAggregateOutputType = {
    id: string | null
    date: Date | null
    commissioner_id: string | null
    status: $Enums.SessionStatus | null
    payment_status: $Enums.SessionPaymentStatus | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AuctionSessionMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    commissioner_id: string | null
    status: $Enums.SessionStatus | null
    payment_status: $Enums.SessionPaymentStatus | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AuctionSessionCountAggregateOutputType = {
    id: number
    date: number
    commissioner_id: number
    status: number
    payment_status: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AuctionSessionMinAggregateInputType = {
    id?: true
    date?: true
    commissioner_id?: true
    status?: true
    payment_status?: true
    created_at?: true
    updated_at?: true
  }

  export type AuctionSessionMaxAggregateInputType = {
    id?: true
    date?: true
    commissioner_id?: true
    status?: true
    payment_status?: true
    created_at?: true
    updated_at?: true
  }

  export type AuctionSessionCountAggregateInputType = {
    id?: true
    date?: true
    commissioner_id?: true
    status?: true
    payment_status?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AuctionSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuctionSession to aggregate.
     */
    where?: AuctionSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuctionSessions to fetch.
     */
    orderBy?: AuctionSessionOrderByWithRelationInput | AuctionSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuctionSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuctionSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuctionSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuctionSessions
    **/
    _count?: true | AuctionSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuctionSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuctionSessionMaxAggregateInputType
  }

  export type GetAuctionSessionAggregateType<T extends AuctionSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateAuctionSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuctionSession[P]>
      : GetScalarType<T[P], AggregateAuctionSession[P]>
  }




  export type AuctionSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuctionSessionWhereInput
    orderBy?: AuctionSessionOrderByWithAggregationInput | AuctionSessionOrderByWithAggregationInput[]
    by: AuctionSessionScalarFieldEnum[] | AuctionSessionScalarFieldEnum
    having?: AuctionSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuctionSessionCountAggregateInputType | true
    _min?: AuctionSessionMinAggregateInputType
    _max?: AuctionSessionMaxAggregateInputType
  }

  export type AuctionSessionGroupByOutputType = {
    id: string
    date: Date
    commissioner_id: string
    status: $Enums.SessionStatus
    payment_status: $Enums.SessionPaymentStatus
    created_at: Date
    updated_at: Date
    _count: AuctionSessionCountAggregateOutputType | null
    _min: AuctionSessionMinAggregateOutputType | null
    _max: AuctionSessionMaxAggregateOutputType | null
  }

  type GetAuctionSessionGroupByPayload<T extends AuctionSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuctionSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuctionSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuctionSessionGroupByOutputType[P]>
            : GetScalarType<T[P], AuctionSessionGroupByOutputType[P]>
        }
      >
    >


  export type AuctionSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    commissioner_id?: boolean
    status?: boolean
    payment_status?: boolean
    created_at?: boolean
    updated_at?: boolean
    auction_items?: boolean | AuctionSession$auction_itemsArgs<ExtArgs>
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
    _count?: boolean | AuctionSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auctionSession"]>

  export type AuctionSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    commissioner_id?: boolean
    status?: boolean
    payment_status?: boolean
    created_at?: boolean
    updated_at?: boolean
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auctionSession"]>

  export type AuctionSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    commissioner_id?: boolean
    status?: boolean
    payment_status?: boolean
    created_at?: boolean
    updated_at?: boolean
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auctionSession"]>

  export type AuctionSessionSelectScalar = {
    id?: boolean
    date?: boolean
    commissioner_id?: boolean
    status?: boolean
    payment_status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AuctionSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "commissioner_id" | "status" | "payment_status" | "created_at" | "updated_at", ExtArgs["result"]["auctionSession"]>
  export type AuctionSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auction_items?: boolean | AuctionSession$auction_itemsArgs<ExtArgs>
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
    _count?: boolean | AuctionSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AuctionSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
  }
  export type AuctionSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
  }

  export type $AuctionSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuctionSession"
    objects: {
      auction_items: Prisma.$AuctionItemPayload<ExtArgs>[]
      commissioner: Prisma.$CommissionerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      commissioner_id: string
      status: $Enums.SessionStatus
      payment_status: $Enums.SessionPaymentStatus
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["auctionSession"]>
    composites: {}
  }

  type AuctionSessionGetPayload<S extends boolean | null | undefined | AuctionSessionDefaultArgs> = $Result.GetResult<Prisma.$AuctionSessionPayload, S>

  type AuctionSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuctionSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuctionSessionCountAggregateInputType | true
    }

  export interface AuctionSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuctionSession'], meta: { name: 'AuctionSession' } }
    /**
     * Find zero or one AuctionSession that matches the filter.
     * @param {AuctionSessionFindUniqueArgs} args - Arguments to find a AuctionSession
     * @example
     * // Get one AuctionSession
     * const auctionSession = await prisma.auctionSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuctionSessionFindUniqueArgs>(args: SelectSubset<T, AuctionSessionFindUniqueArgs<ExtArgs>>): Prisma__AuctionSessionClient<$Result.GetResult<Prisma.$AuctionSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuctionSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuctionSessionFindUniqueOrThrowArgs} args - Arguments to find a AuctionSession
     * @example
     * // Get one AuctionSession
     * const auctionSession = await prisma.auctionSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuctionSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, AuctionSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuctionSessionClient<$Result.GetResult<Prisma.$AuctionSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuctionSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuctionSessionFindFirstArgs} args - Arguments to find a AuctionSession
     * @example
     * // Get one AuctionSession
     * const auctionSession = await prisma.auctionSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuctionSessionFindFirstArgs>(args?: SelectSubset<T, AuctionSessionFindFirstArgs<ExtArgs>>): Prisma__AuctionSessionClient<$Result.GetResult<Prisma.$AuctionSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuctionSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuctionSessionFindFirstOrThrowArgs} args - Arguments to find a AuctionSession
     * @example
     * // Get one AuctionSession
     * const auctionSession = await prisma.auctionSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuctionSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, AuctionSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuctionSessionClient<$Result.GetResult<Prisma.$AuctionSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuctionSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuctionSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuctionSessions
     * const auctionSessions = await prisma.auctionSession.findMany()
     * 
     * // Get first 10 AuctionSessions
     * const auctionSessions = await prisma.auctionSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auctionSessionWithIdOnly = await prisma.auctionSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuctionSessionFindManyArgs>(args?: SelectSubset<T, AuctionSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuctionSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuctionSession.
     * @param {AuctionSessionCreateArgs} args - Arguments to create a AuctionSession.
     * @example
     * // Create one AuctionSession
     * const AuctionSession = await prisma.auctionSession.create({
     *   data: {
     *     // ... data to create a AuctionSession
     *   }
     * })
     * 
     */
    create<T extends AuctionSessionCreateArgs>(args: SelectSubset<T, AuctionSessionCreateArgs<ExtArgs>>): Prisma__AuctionSessionClient<$Result.GetResult<Prisma.$AuctionSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuctionSessions.
     * @param {AuctionSessionCreateManyArgs} args - Arguments to create many AuctionSessions.
     * @example
     * // Create many AuctionSessions
     * const auctionSession = await prisma.auctionSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuctionSessionCreateManyArgs>(args?: SelectSubset<T, AuctionSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuctionSessions and returns the data saved in the database.
     * @param {AuctionSessionCreateManyAndReturnArgs} args - Arguments to create many AuctionSessions.
     * @example
     * // Create many AuctionSessions
     * const auctionSession = await prisma.auctionSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuctionSessions and only return the `id`
     * const auctionSessionWithIdOnly = await prisma.auctionSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuctionSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, AuctionSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuctionSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuctionSession.
     * @param {AuctionSessionDeleteArgs} args - Arguments to delete one AuctionSession.
     * @example
     * // Delete one AuctionSession
     * const AuctionSession = await prisma.auctionSession.delete({
     *   where: {
     *     // ... filter to delete one AuctionSession
     *   }
     * })
     * 
     */
    delete<T extends AuctionSessionDeleteArgs>(args: SelectSubset<T, AuctionSessionDeleteArgs<ExtArgs>>): Prisma__AuctionSessionClient<$Result.GetResult<Prisma.$AuctionSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuctionSession.
     * @param {AuctionSessionUpdateArgs} args - Arguments to update one AuctionSession.
     * @example
     * // Update one AuctionSession
     * const auctionSession = await prisma.auctionSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuctionSessionUpdateArgs>(args: SelectSubset<T, AuctionSessionUpdateArgs<ExtArgs>>): Prisma__AuctionSessionClient<$Result.GetResult<Prisma.$AuctionSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuctionSessions.
     * @param {AuctionSessionDeleteManyArgs} args - Arguments to filter AuctionSessions to delete.
     * @example
     * // Delete a few AuctionSessions
     * const { count } = await prisma.auctionSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuctionSessionDeleteManyArgs>(args?: SelectSubset<T, AuctionSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuctionSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuctionSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuctionSessions
     * const auctionSession = await prisma.auctionSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuctionSessionUpdateManyArgs>(args: SelectSubset<T, AuctionSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuctionSessions and returns the data updated in the database.
     * @param {AuctionSessionUpdateManyAndReturnArgs} args - Arguments to update many AuctionSessions.
     * @example
     * // Update many AuctionSessions
     * const auctionSession = await prisma.auctionSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuctionSessions and only return the `id`
     * const auctionSessionWithIdOnly = await prisma.auctionSession.updateManyAndReturn({
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
    updateManyAndReturn<T extends AuctionSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, AuctionSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuctionSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuctionSession.
     * @param {AuctionSessionUpsertArgs} args - Arguments to update or create a AuctionSession.
     * @example
     * // Update or create a AuctionSession
     * const auctionSession = await prisma.auctionSession.upsert({
     *   create: {
     *     // ... data to create a AuctionSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuctionSession we want to update
     *   }
     * })
     */
    upsert<T extends AuctionSessionUpsertArgs>(args: SelectSubset<T, AuctionSessionUpsertArgs<ExtArgs>>): Prisma__AuctionSessionClient<$Result.GetResult<Prisma.$AuctionSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuctionSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuctionSessionCountArgs} args - Arguments to filter AuctionSessions to count.
     * @example
     * // Count the number of AuctionSessions
     * const count = await prisma.auctionSession.count({
     *   where: {
     *     // ... the filter for the AuctionSessions we want to count
     *   }
     * })
    **/
    count<T extends AuctionSessionCountArgs>(
      args?: Subset<T, AuctionSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuctionSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuctionSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuctionSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuctionSessionAggregateArgs>(args: Subset<T, AuctionSessionAggregateArgs>): Prisma.PrismaPromise<GetAuctionSessionAggregateType<T>>

    /**
     * Group by AuctionSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuctionSessionGroupByArgs} args - Group by arguments.
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
      T extends AuctionSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuctionSessionGroupByArgs['orderBy'] }
        : { orderBy?: AuctionSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuctionSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuctionSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuctionSession model
   */
  readonly fields: AuctionSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuctionSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuctionSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auction_items<T extends AuctionSession$auction_itemsArgs<ExtArgs> = {}>(args?: Subset<T, AuctionSession$auction_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuctionItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    commissioner<T extends CommissionerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CommissionerDefaultArgs<ExtArgs>>): Prisma__CommissionerClient<$Result.GetResult<Prisma.$CommissionerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AuctionSession model
   */
  interface AuctionSessionFieldRefs {
    readonly id: FieldRef<"AuctionSession", 'String'>
    readonly date: FieldRef<"AuctionSession", 'DateTime'>
    readonly commissioner_id: FieldRef<"AuctionSession", 'String'>
    readonly status: FieldRef<"AuctionSession", 'SessionStatus'>
    readonly payment_status: FieldRef<"AuctionSession", 'SessionPaymentStatus'>
    readonly created_at: FieldRef<"AuctionSession", 'DateTime'>
    readonly updated_at: FieldRef<"AuctionSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuctionSession findUnique
   */
  export type AuctionSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionSession
     */
    select?: AuctionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionSession
     */
    omit?: AuctionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionSessionInclude<ExtArgs> | null
    /**
     * Filter, which AuctionSession to fetch.
     */
    where: AuctionSessionWhereUniqueInput
  }

  /**
   * AuctionSession findUniqueOrThrow
   */
  export type AuctionSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionSession
     */
    select?: AuctionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionSession
     */
    omit?: AuctionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionSessionInclude<ExtArgs> | null
    /**
     * Filter, which AuctionSession to fetch.
     */
    where: AuctionSessionWhereUniqueInput
  }

  /**
   * AuctionSession findFirst
   */
  export type AuctionSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionSession
     */
    select?: AuctionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionSession
     */
    omit?: AuctionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionSessionInclude<ExtArgs> | null
    /**
     * Filter, which AuctionSession to fetch.
     */
    where?: AuctionSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuctionSessions to fetch.
     */
    orderBy?: AuctionSessionOrderByWithRelationInput | AuctionSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuctionSessions.
     */
    cursor?: AuctionSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuctionSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuctionSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuctionSessions.
     */
    distinct?: AuctionSessionScalarFieldEnum | AuctionSessionScalarFieldEnum[]
  }

  /**
   * AuctionSession findFirstOrThrow
   */
  export type AuctionSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionSession
     */
    select?: AuctionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionSession
     */
    omit?: AuctionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionSessionInclude<ExtArgs> | null
    /**
     * Filter, which AuctionSession to fetch.
     */
    where?: AuctionSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuctionSessions to fetch.
     */
    orderBy?: AuctionSessionOrderByWithRelationInput | AuctionSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuctionSessions.
     */
    cursor?: AuctionSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuctionSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuctionSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuctionSessions.
     */
    distinct?: AuctionSessionScalarFieldEnum | AuctionSessionScalarFieldEnum[]
  }

  /**
   * AuctionSession findMany
   */
  export type AuctionSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionSession
     */
    select?: AuctionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionSession
     */
    omit?: AuctionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionSessionInclude<ExtArgs> | null
    /**
     * Filter, which AuctionSessions to fetch.
     */
    where?: AuctionSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuctionSessions to fetch.
     */
    orderBy?: AuctionSessionOrderByWithRelationInput | AuctionSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuctionSessions.
     */
    cursor?: AuctionSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuctionSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuctionSessions.
     */
    skip?: number
    distinct?: AuctionSessionScalarFieldEnum | AuctionSessionScalarFieldEnum[]
  }

  /**
   * AuctionSession create
   */
  export type AuctionSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionSession
     */
    select?: AuctionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionSession
     */
    omit?: AuctionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a AuctionSession.
     */
    data: XOR<AuctionSessionCreateInput, AuctionSessionUncheckedCreateInput>
  }

  /**
   * AuctionSession createMany
   */
  export type AuctionSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuctionSessions.
     */
    data: AuctionSessionCreateManyInput | AuctionSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuctionSession createManyAndReturn
   */
  export type AuctionSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionSession
     */
    select?: AuctionSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionSession
     */
    omit?: AuctionSessionOmit<ExtArgs> | null
    /**
     * The data used to create many AuctionSessions.
     */
    data: AuctionSessionCreateManyInput | AuctionSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuctionSession update
   */
  export type AuctionSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionSession
     */
    select?: AuctionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionSession
     */
    omit?: AuctionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a AuctionSession.
     */
    data: XOR<AuctionSessionUpdateInput, AuctionSessionUncheckedUpdateInput>
    /**
     * Choose, which AuctionSession to update.
     */
    where: AuctionSessionWhereUniqueInput
  }

  /**
   * AuctionSession updateMany
   */
  export type AuctionSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuctionSessions.
     */
    data: XOR<AuctionSessionUpdateManyMutationInput, AuctionSessionUncheckedUpdateManyInput>
    /**
     * Filter which AuctionSessions to update
     */
    where?: AuctionSessionWhereInput
    /**
     * Limit how many AuctionSessions to update.
     */
    limit?: number
  }

  /**
   * AuctionSession updateManyAndReturn
   */
  export type AuctionSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionSession
     */
    select?: AuctionSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionSession
     */
    omit?: AuctionSessionOmit<ExtArgs> | null
    /**
     * The data used to update AuctionSessions.
     */
    data: XOR<AuctionSessionUpdateManyMutationInput, AuctionSessionUncheckedUpdateManyInput>
    /**
     * Filter which AuctionSessions to update
     */
    where?: AuctionSessionWhereInput
    /**
     * Limit how many AuctionSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuctionSession upsert
   */
  export type AuctionSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionSession
     */
    select?: AuctionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionSession
     */
    omit?: AuctionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the AuctionSession to update in case it exists.
     */
    where: AuctionSessionWhereUniqueInput
    /**
     * In case the AuctionSession found by the `where` argument doesn't exist, create a new AuctionSession with this data.
     */
    create: XOR<AuctionSessionCreateInput, AuctionSessionUncheckedCreateInput>
    /**
     * In case the AuctionSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuctionSessionUpdateInput, AuctionSessionUncheckedUpdateInput>
  }

  /**
   * AuctionSession delete
   */
  export type AuctionSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionSession
     */
    select?: AuctionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionSession
     */
    omit?: AuctionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionSessionInclude<ExtArgs> | null
    /**
     * Filter which AuctionSession to delete.
     */
    where: AuctionSessionWhereUniqueInput
  }

  /**
   * AuctionSession deleteMany
   */
  export type AuctionSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuctionSessions to delete
     */
    where?: AuctionSessionWhereInput
    /**
     * Limit how many AuctionSessions to delete.
     */
    limit?: number
  }

  /**
   * AuctionSession.auction_items
   */
  export type AuctionSession$auction_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionItem
     */
    select?: AuctionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionItem
     */
    omit?: AuctionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionItemInclude<ExtArgs> | null
    where?: AuctionItemWhereInput
    orderBy?: AuctionItemOrderByWithRelationInput | AuctionItemOrderByWithRelationInput[]
    cursor?: AuctionItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuctionItemScalarFieldEnum | AuctionItemScalarFieldEnum[]
  }

  /**
   * AuctionSession without action
   */
  export type AuctionSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionSession
     */
    select?: AuctionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionSession
     */
    omit?: AuctionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionSessionInclude<ExtArgs> | null
  }


  /**
   * Model AuctionItem
   */

  export type AggregateAuctionItem = {
    _count: AuctionItemCountAggregateOutputType | null
    _avg: AuctionItemAvgAggregateOutputType | null
    _sum: AuctionItemSumAggregateOutputType | null
    _min: AuctionItemMinAggregateOutputType | null
    _max: AuctionItemMaxAggregateOutputType | null
  }

  export type AuctionItemAvgAggregateOutputType = {
    quantity: number | null
    rate: number | null
  }

  export type AuctionItemSumAggregateOutputType = {
    quantity: number | null
    rate: number | null
  }

  export type AuctionItemMinAggregateOutputType = {
    id: string | null
    session_id: string | null
    farmer_id: string | null
    product_id: string | null
    unit: $Enums.Unit | null
    quantity: number | null
    buyer_id: string | null
    bill_id: string | null
    created_at: Date | null
    updated_at: Date | null
    rate: number | null
  }

  export type AuctionItemMaxAggregateOutputType = {
    id: string | null
    session_id: string | null
    farmer_id: string | null
    product_id: string | null
    unit: $Enums.Unit | null
    quantity: number | null
    buyer_id: string | null
    bill_id: string | null
    created_at: Date | null
    updated_at: Date | null
    rate: number | null
  }

  export type AuctionItemCountAggregateOutputType = {
    id: number
    session_id: number
    farmer_id: number
    product_id: number
    unit: number
    quantity: number
    buyer_id: number
    bill_id: number
    created_at: number
    updated_at: number
    rate: number
    _all: number
  }


  export type AuctionItemAvgAggregateInputType = {
    quantity?: true
    rate?: true
  }

  export type AuctionItemSumAggregateInputType = {
    quantity?: true
    rate?: true
  }

  export type AuctionItemMinAggregateInputType = {
    id?: true
    session_id?: true
    farmer_id?: true
    product_id?: true
    unit?: true
    quantity?: true
    buyer_id?: true
    bill_id?: true
    created_at?: true
    updated_at?: true
    rate?: true
  }

  export type AuctionItemMaxAggregateInputType = {
    id?: true
    session_id?: true
    farmer_id?: true
    product_id?: true
    unit?: true
    quantity?: true
    buyer_id?: true
    bill_id?: true
    created_at?: true
    updated_at?: true
    rate?: true
  }

  export type AuctionItemCountAggregateInputType = {
    id?: true
    session_id?: true
    farmer_id?: true
    product_id?: true
    unit?: true
    quantity?: true
    buyer_id?: true
    bill_id?: true
    created_at?: true
    updated_at?: true
    rate?: true
    _all?: true
  }

  export type AuctionItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuctionItem to aggregate.
     */
    where?: AuctionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuctionItems to fetch.
     */
    orderBy?: AuctionItemOrderByWithRelationInput | AuctionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuctionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuctionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuctionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuctionItems
    **/
    _count?: true | AuctionItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuctionItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuctionItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuctionItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuctionItemMaxAggregateInputType
  }

  export type GetAuctionItemAggregateType<T extends AuctionItemAggregateArgs> = {
        [P in keyof T & keyof AggregateAuctionItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuctionItem[P]>
      : GetScalarType<T[P], AggregateAuctionItem[P]>
  }




  export type AuctionItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuctionItemWhereInput
    orderBy?: AuctionItemOrderByWithAggregationInput | AuctionItemOrderByWithAggregationInput[]
    by: AuctionItemScalarFieldEnum[] | AuctionItemScalarFieldEnum
    having?: AuctionItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuctionItemCountAggregateInputType | true
    _avg?: AuctionItemAvgAggregateInputType
    _sum?: AuctionItemSumAggregateInputType
    _min?: AuctionItemMinAggregateInputType
    _max?: AuctionItemMaxAggregateInputType
  }

  export type AuctionItemGroupByOutputType = {
    id: string
    session_id: string
    farmer_id: string
    product_id: string
    unit: $Enums.Unit
    quantity: number
    buyer_id: string | null
    bill_id: string | null
    created_at: Date
    updated_at: Date
    rate: number | null
    _count: AuctionItemCountAggregateOutputType | null
    _avg: AuctionItemAvgAggregateOutputType | null
    _sum: AuctionItemSumAggregateOutputType | null
    _min: AuctionItemMinAggregateOutputType | null
    _max: AuctionItemMaxAggregateOutputType | null
  }

  type GetAuctionItemGroupByPayload<T extends AuctionItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuctionItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuctionItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuctionItemGroupByOutputType[P]>
            : GetScalarType<T[P], AuctionItemGroupByOutputType[P]>
        }
      >
    >


  export type AuctionItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    session_id?: boolean
    farmer_id?: boolean
    product_id?: boolean
    unit?: boolean
    quantity?: boolean
    buyer_id?: boolean
    bill_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    rate?: boolean
    bill?: boolean | AuctionItem$billArgs<ExtArgs>
    buyer?: boolean | AuctionItem$buyerArgs<ExtArgs>
    farmer?: boolean | FarmerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    session?: boolean | AuctionSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auctionItem"]>

  export type AuctionItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    session_id?: boolean
    farmer_id?: boolean
    product_id?: boolean
    unit?: boolean
    quantity?: boolean
    buyer_id?: boolean
    bill_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    rate?: boolean
    bill?: boolean | AuctionItem$billArgs<ExtArgs>
    buyer?: boolean | AuctionItem$buyerArgs<ExtArgs>
    farmer?: boolean | FarmerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    session?: boolean | AuctionSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auctionItem"]>

  export type AuctionItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    session_id?: boolean
    farmer_id?: boolean
    product_id?: boolean
    unit?: boolean
    quantity?: boolean
    buyer_id?: boolean
    bill_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    rate?: boolean
    bill?: boolean | AuctionItem$billArgs<ExtArgs>
    buyer?: boolean | AuctionItem$buyerArgs<ExtArgs>
    farmer?: boolean | FarmerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    session?: boolean | AuctionSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auctionItem"]>

  export type AuctionItemSelectScalar = {
    id?: boolean
    session_id?: boolean
    farmer_id?: boolean
    product_id?: boolean
    unit?: boolean
    quantity?: boolean
    buyer_id?: boolean
    bill_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    rate?: boolean
  }

  export type AuctionItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "session_id" | "farmer_id" | "product_id" | "unit" | "quantity" | "buyer_id" | "bill_id" | "created_at" | "updated_at" | "rate", ExtArgs["result"]["auctionItem"]>
  export type AuctionItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bill?: boolean | AuctionItem$billArgs<ExtArgs>
    buyer?: boolean | AuctionItem$buyerArgs<ExtArgs>
    farmer?: boolean | FarmerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    session?: boolean | AuctionSessionDefaultArgs<ExtArgs>
  }
  export type AuctionItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bill?: boolean | AuctionItem$billArgs<ExtArgs>
    buyer?: boolean | AuctionItem$buyerArgs<ExtArgs>
    farmer?: boolean | FarmerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    session?: boolean | AuctionSessionDefaultArgs<ExtArgs>
  }
  export type AuctionItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bill?: boolean | AuctionItem$billArgs<ExtArgs>
    buyer?: boolean | AuctionItem$buyerArgs<ExtArgs>
    farmer?: boolean | FarmerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    session?: boolean | AuctionSessionDefaultArgs<ExtArgs>
  }

  export type $AuctionItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuctionItem"
    objects: {
      bill: Prisma.$BillPayload<ExtArgs> | null
      buyer: Prisma.$BuyerPayload<ExtArgs> | null
      farmer: Prisma.$FarmerPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
      session: Prisma.$AuctionSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      session_id: string
      farmer_id: string
      product_id: string
      unit: $Enums.Unit
      quantity: number
      buyer_id: string | null
      bill_id: string | null
      created_at: Date
      updated_at: Date
      rate: number | null
    }, ExtArgs["result"]["auctionItem"]>
    composites: {}
  }

  type AuctionItemGetPayload<S extends boolean | null | undefined | AuctionItemDefaultArgs> = $Result.GetResult<Prisma.$AuctionItemPayload, S>

  type AuctionItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuctionItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuctionItemCountAggregateInputType | true
    }

  export interface AuctionItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuctionItem'], meta: { name: 'AuctionItem' } }
    /**
     * Find zero or one AuctionItem that matches the filter.
     * @param {AuctionItemFindUniqueArgs} args - Arguments to find a AuctionItem
     * @example
     * // Get one AuctionItem
     * const auctionItem = await prisma.auctionItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuctionItemFindUniqueArgs>(args: SelectSubset<T, AuctionItemFindUniqueArgs<ExtArgs>>): Prisma__AuctionItemClient<$Result.GetResult<Prisma.$AuctionItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuctionItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuctionItemFindUniqueOrThrowArgs} args - Arguments to find a AuctionItem
     * @example
     * // Get one AuctionItem
     * const auctionItem = await prisma.auctionItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuctionItemFindUniqueOrThrowArgs>(args: SelectSubset<T, AuctionItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuctionItemClient<$Result.GetResult<Prisma.$AuctionItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuctionItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuctionItemFindFirstArgs} args - Arguments to find a AuctionItem
     * @example
     * // Get one AuctionItem
     * const auctionItem = await prisma.auctionItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuctionItemFindFirstArgs>(args?: SelectSubset<T, AuctionItemFindFirstArgs<ExtArgs>>): Prisma__AuctionItemClient<$Result.GetResult<Prisma.$AuctionItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuctionItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuctionItemFindFirstOrThrowArgs} args - Arguments to find a AuctionItem
     * @example
     * // Get one AuctionItem
     * const auctionItem = await prisma.auctionItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuctionItemFindFirstOrThrowArgs>(args?: SelectSubset<T, AuctionItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuctionItemClient<$Result.GetResult<Prisma.$AuctionItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuctionItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuctionItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuctionItems
     * const auctionItems = await prisma.auctionItem.findMany()
     * 
     * // Get first 10 AuctionItems
     * const auctionItems = await prisma.auctionItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auctionItemWithIdOnly = await prisma.auctionItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuctionItemFindManyArgs>(args?: SelectSubset<T, AuctionItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuctionItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuctionItem.
     * @param {AuctionItemCreateArgs} args - Arguments to create a AuctionItem.
     * @example
     * // Create one AuctionItem
     * const AuctionItem = await prisma.auctionItem.create({
     *   data: {
     *     // ... data to create a AuctionItem
     *   }
     * })
     * 
     */
    create<T extends AuctionItemCreateArgs>(args: SelectSubset<T, AuctionItemCreateArgs<ExtArgs>>): Prisma__AuctionItemClient<$Result.GetResult<Prisma.$AuctionItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuctionItems.
     * @param {AuctionItemCreateManyArgs} args - Arguments to create many AuctionItems.
     * @example
     * // Create many AuctionItems
     * const auctionItem = await prisma.auctionItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuctionItemCreateManyArgs>(args?: SelectSubset<T, AuctionItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuctionItems and returns the data saved in the database.
     * @param {AuctionItemCreateManyAndReturnArgs} args - Arguments to create many AuctionItems.
     * @example
     * // Create many AuctionItems
     * const auctionItem = await prisma.auctionItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuctionItems and only return the `id`
     * const auctionItemWithIdOnly = await prisma.auctionItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuctionItemCreateManyAndReturnArgs>(args?: SelectSubset<T, AuctionItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuctionItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuctionItem.
     * @param {AuctionItemDeleteArgs} args - Arguments to delete one AuctionItem.
     * @example
     * // Delete one AuctionItem
     * const AuctionItem = await prisma.auctionItem.delete({
     *   where: {
     *     // ... filter to delete one AuctionItem
     *   }
     * })
     * 
     */
    delete<T extends AuctionItemDeleteArgs>(args: SelectSubset<T, AuctionItemDeleteArgs<ExtArgs>>): Prisma__AuctionItemClient<$Result.GetResult<Prisma.$AuctionItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuctionItem.
     * @param {AuctionItemUpdateArgs} args - Arguments to update one AuctionItem.
     * @example
     * // Update one AuctionItem
     * const auctionItem = await prisma.auctionItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuctionItemUpdateArgs>(args: SelectSubset<T, AuctionItemUpdateArgs<ExtArgs>>): Prisma__AuctionItemClient<$Result.GetResult<Prisma.$AuctionItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuctionItems.
     * @param {AuctionItemDeleteManyArgs} args - Arguments to filter AuctionItems to delete.
     * @example
     * // Delete a few AuctionItems
     * const { count } = await prisma.auctionItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuctionItemDeleteManyArgs>(args?: SelectSubset<T, AuctionItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuctionItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuctionItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuctionItems
     * const auctionItem = await prisma.auctionItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuctionItemUpdateManyArgs>(args: SelectSubset<T, AuctionItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuctionItems and returns the data updated in the database.
     * @param {AuctionItemUpdateManyAndReturnArgs} args - Arguments to update many AuctionItems.
     * @example
     * // Update many AuctionItems
     * const auctionItem = await prisma.auctionItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuctionItems and only return the `id`
     * const auctionItemWithIdOnly = await prisma.auctionItem.updateManyAndReturn({
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
    updateManyAndReturn<T extends AuctionItemUpdateManyAndReturnArgs>(args: SelectSubset<T, AuctionItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuctionItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuctionItem.
     * @param {AuctionItemUpsertArgs} args - Arguments to update or create a AuctionItem.
     * @example
     * // Update or create a AuctionItem
     * const auctionItem = await prisma.auctionItem.upsert({
     *   create: {
     *     // ... data to create a AuctionItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuctionItem we want to update
     *   }
     * })
     */
    upsert<T extends AuctionItemUpsertArgs>(args: SelectSubset<T, AuctionItemUpsertArgs<ExtArgs>>): Prisma__AuctionItemClient<$Result.GetResult<Prisma.$AuctionItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuctionItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuctionItemCountArgs} args - Arguments to filter AuctionItems to count.
     * @example
     * // Count the number of AuctionItems
     * const count = await prisma.auctionItem.count({
     *   where: {
     *     // ... the filter for the AuctionItems we want to count
     *   }
     * })
    **/
    count<T extends AuctionItemCountArgs>(
      args?: Subset<T, AuctionItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuctionItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuctionItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuctionItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuctionItemAggregateArgs>(args: Subset<T, AuctionItemAggregateArgs>): Prisma.PrismaPromise<GetAuctionItemAggregateType<T>>

    /**
     * Group by AuctionItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuctionItemGroupByArgs} args - Group by arguments.
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
      T extends AuctionItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuctionItemGroupByArgs['orderBy'] }
        : { orderBy?: AuctionItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuctionItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuctionItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuctionItem model
   */
  readonly fields: AuctionItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuctionItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuctionItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bill<T extends AuctionItem$billArgs<ExtArgs> = {}>(args?: Subset<T, AuctionItem$billArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    buyer<T extends AuctionItem$buyerArgs<ExtArgs> = {}>(args?: Subset<T, AuctionItem$buyerArgs<ExtArgs>>): Prisma__BuyerClient<$Result.GetResult<Prisma.$BuyerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    farmer<T extends FarmerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmerDefaultArgs<ExtArgs>>): Prisma__FarmerClient<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    session<T extends AuctionSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AuctionSessionDefaultArgs<ExtArgs>>): Prisma__AuctionSessionClient<$Result.GetResult<Prisma.$AuctionSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AuctionItem model
   */
  interface AuctionItemFieldRefs {
    readonly id: FieldRef<"AuctionItem", 'String'>
    readonly session_id: FieldRef<"AuctionItem", 'String'>
    readonly farmer_id: FieldRef<"AuctionItem", 'String'>
    readonly product_id: FieldRef<"AuctionItem", 'String'>
    readonly unit: FieldRef<"AuctionItem", 'Unit'>
    readonly quantity: FieldRef<"AuctionItem", 'Float'>
    readonly buyer_id: FieldRef<"AuctionItem", 'String'>
    readonly bill_id: FieldRef<"AuctionItem", 'String'>
    readonly created_at: FieldRef<"AuctionItem", 'DateTime'>
    readonly updated_at: FieldRef<"AuctionItem", 'DateTime'>
    readonly rate: FieldRef<"AuctionItem", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * AuctionItem findUnique
   */
  export type AuctionItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionItem
     */
    select?: AuctionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionItem
     */
    omit?: AuctionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionItemInclude<ExtArgs> | null
    /**
     * Filter, which AuctionItem to fetch.
     */
    where: AuctionItemWhereUniqueInput
  }

  /**
   * AuctionItem findUniqueOrThrow
   */
  export type AuctionItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionItem
     */
    select?: AuctionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionItem
     */
    omit?: AuctionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionItemInclude<ExtArgs> | null
    /**
     * Filter, which AuctionItem to fetch.
     */
    where: AuctionItemWhereUniqueInput
  }

  /**
   * AuctionItem findFirst
   */
  export type AuctionItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionItem
     */
    select?: AuctionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionItem
     */
    omit?: AuctionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionItemInclude<ExtArgs> | null
    /**
     * Filter, which AuctionItem to fetch.
     */
    where?: AuctionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuctionItems to fetch.
     */
    orderBy?: AuctionItemOrderByWithRelationInput | AuctionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuctionItems.
     */
    cursor?: AuctionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuctionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuctionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuctionItems.
     */
    distinct?: AuctionItemScalarFieldEnum | AuctionItemScalarFieldEnum[]
  }

  /**
   * AuctionItem findFirstOrThrow
   */
  export type AuctionItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionItem
     */
    select?: AuctionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionItem
     */
    omit?: AuctionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionItemInclude<ExtArgs> | null
    /**
     * Filter, which AuctionItem to fetch.
     */
    where?: AuctionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuctionItems to fetch.
     */
    orderBy?: AuctionItemOrderByWithRelationInput | AuctionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuctionItems.
     */
    cursor?: AuctionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuctionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuctionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuctionItems.
     */
    distinct?: AuctionItemScalarFieldEnum | AuctionItemScalarFieldEnum[]
  }

  /**
   * AuctionItem findMany
   */
  export type AuctionItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionItem
     */
    select?: AuctionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionItem
     */
    omit?: AuctionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionItemInclude<ExtArgs> | null
    /**
     * Filter, which AuctionItems to fetch.
     */
    where?: AuctionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuctionItems to fetch.
     */
    orderBy?: AuctionItemOrderByWithRelationInput | AuctionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuctionItems.
     */
    cursor?: AuctionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuctionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuctionItems.
     */
    skip?: number
    distinct?: AuctionItemScalarFieldEnum | AuctionItemScalarFieldEnum[]
  }

  /**
   * AuctionItem create
   */
  export type AuctionItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionItem
     */
    select?: AuctionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionItem
     */
    omit?: AuctionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionItemInclude<ExtArgs> | null
    /**
     * The data needed to create a AuctionItem.
     */
    data: XOR<AuctionItemCreateInput, AuctionItemUncheckedCreateInput>
  }

  /**
   * AuctionItem createMany
   */
  export type AuctionItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuctionItems.
     */
    data: AuctionItemCreateManyInput | AuctionItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuctionItem createManyAndReturn
   */
  export type AuctionItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionItem
     */
    select?: AuctionItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionItem
     */
    omit?: AuctionItemOmit<ExtArgs> | null
    /**
     * The data used to create many AuctionItems.
     */
    data: AuctionItemCreateManyInput | AuctionItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuctionItem update
   */
  export type AuctionItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionItem
     */
    select?: AuctionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionItem
     */
    omit?: AuctionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionItemInclude<ExtArgs> | null
    /**
     * The data needed to update a AuctionItem.
     */
    data: XOR<AuctionItemUpdateInput, AuctionItemUncheckedUpdateInput>
    /**
     * Choose, which AuctionItem to update.
     */
    where: AuctionItemWhereUniqueInput
  }

  /**
   * AuctionItem updateMany
   */
  export type AuctionItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuctionItems.
     */
    data: XOR<AuctionItemUpdateManyMutationInput, AuctionItemUncheckedUpdateManyInput>
    /**
     * Filter which AuctionItems to update
     */
    where?: AuctionItemWhereInput
    /**
     * Limit how many AuctionItems to update.
     */
    limit?: number
  }

  /**
   * AuctionItem updateManyAndReturn
   */
  export type AuctionItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionItem
     */
    select?: AuctionItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionItem
     */
    omit?: AuctionItemOmit<ExtArgs> | null
    /**
     * The data used to update AuctionItems.
     */
    data: XOR<AuctionItemUpdateManyMutationInput, AuctionItemUncheckedUpdateManyInput>
    /**
     * Filter which AuctionItems to update
     */
    where?: AuctionItemWhereInput
    /**
     * Limit how many AuctionItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuctionItem upsert
   */
  export type AuctionItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionItem
     */
    select?: AuctionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionItem
     */
    omit?: AuctionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionItemInclude<ExtArgs> | null
    /**
     * The filter to search for the AuctionItem to update in case it exists.
     */
    where: AuctionItemWhereUniqueInput
    /**
     * In case the AuctionItem found by the `where` argument doesn't exist, create a new AuctionItem with this data.
     */
    create: XOR<AuctionItemCreateInput, AuctionItemUncheckedCreateInput>
    /**
     * In case the AuctionItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuctionItemUpdateInput, AuctionItemUncheckedUpdateInput>
  }

  /**
   * AuctionItem delete
   */
  export type AuctionItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionItem
     */
    select?: AuctionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionItem
     */
    omit?: AuctionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionItemInclude<ExtArgs> | null
    /**
     * Filter which AuctionItem to delete.
     */
    where: AuctionItemWhereUniqueInput
  }

  /**
   * AuctionItem deleteMany
   */
  export type AuctionItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuctionItems to delete
     */
    where?: AuctionItemWhereInput
    /**
     * Limit how many AuctionItems to delete.
     */
    limit?: number
  }

  /**
   * AuctionItem.bill
   */
  export type AuctionItem$billArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bill
     */
    omit?: BillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    where?: BillWhereInput
  }

  /**
   * AuctionItem.buyer
   */
  export type AuctionItem$buyerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buyer
     */
    select?: BuyerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buyer
     */
    omit?: BuyerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuyerInclude<ExtArgs> | null
    where?: BuyerWhereInput
  }

  /**
   * AuctionItem without action
   */
  export type AuctionItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionItem
     */
    select?: AuctionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionItem
     */
    omit?: AuctionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionItemInclude<ExtArgs> | null
  }


  /**
   * Model Bill
   */

  export type AggregateBill = {
    _count: BillCountAggregateOutputType | null
    _avg: BillAvgAggregateOutputType | null
    _sum: BillSumAggregateOutputType | null
    _min: BillMinAggregateOutputType | null
    _max: BillMaxAggregateOutputType | null
  }

  export type BillAvgAggregateOutputType = {
    total_quantity: number | null
    gross_amount: number | null
    commission_rate: number | null
    commission_amount: number | null
    net_payable: number | null
  }

  export type BillSumAggregateOutputType = {
    total_quantity: number | null
    gross_amount: number | null
    commission_rate: number | null
    commission_amount: number | null
    net_payable: number | null
  }

  export type BillMinAggregateOutputType = {
    id: string | null
    bill_number: string | null
    farmer_id: string | null
    commissioner_id: string | null
    product_id: string | null
    session_id: string | null
    total_quantity: number | null
    gross_amount: number | null
    commission_rate: number | null
    commission_amount: number | null
    net_payable: number | null
    payment_status: $Enums.BillPaymentStatus | null
    payment_method: string | null
    payment_date: Date | null
    notes: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BillMaxAggregateOutputType = {
    id: string | null
    bill_number: string | null
    farmer_id: string | null
    commissioner_id: string | null
    product_id: string | null
    session_id: string | null
    total_quantity: number | null
    gross_amount: number | null
    commission_rate: number | null
    commission_amount: number | null
    net_payable: number | null
    payment_status: $Enums.BillPaymentStatus | null
    payment_method: string | null
    payment_date: Date | null
    notes: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BillCountAggregateOutputType = {
    id: number
    bill_number: number
    farmer_id: number
    commissioner_id: number
    product_id: number
    session_id: number
    total_quantity: number
    gross_amount: number
    commission_rate: number
    commission_amount: number
    other_charges: number
    net_payable: number
    payment_status: number
    payment_method: number
    payment_date: number
    notes: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type BillAvgAggregateInputType = {
    total_quantity?: true
    gross_amount?: true
    commission_rate?: true
    commission_amount?: true
    net_payable?: true
  }

  export type BillSumAggregateInputType = {
    total_quantity?: true
    gross_amount?: true
    commission_rate?: true
    commission_amount?: true
    net_payable?: true
  }

  export type BillMinAggregateInputType = {
    id?: true
    bill_number?: true
    farmer_id?: true
    commissioner_id?: true
    product_id?: true
    session_id?: true
    total_quantity?: true
    gross_amount?: true
    commission_rate?: true
    commission_amount?: true
    net_payable?: true
    payment_status?: true
    payment_method?: true
    payment_date?: true
    notes?: true
    created_at?: true
    updated_at?: true
  }

  export type BillMaxAggregateInputType = {
    id?: true
    bill_number?: true
    farmer_id?: true
    commissioner_id?: true
    product_id?: true
    session_id?: true
    total_quantity?: true
    gross_amount?: true
    commission_rate?: true
    commission_amount?: true
    net_payable?: true
    payment_status?: true
    payment_method?: true
    payment_date?: true
    notes?: true
    created_at?: true
    updated_at?: true
  }

  export type BillCountAggregateInputType = {
    id?: true
    bill_number?: true
    farmer_id?: true
    commissioner_id?: true
    product_id?: true
    session_id?: true
    total_quantity?: true
    gross_amount?: true
    commission_rate?: true
    commission_amount?: true
    other_charges?: true
    net_payable?: true
    payment_status?: true
    payment_method?: true
    payment_date?: true
    notes?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type BillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bill to aggregate.
     */
    where?: BillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bills to fetch.
     */
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bills
    **/
    _count?: true | BillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BillMaxAggregateInputType
  }

  export type GetBillAggregateType<T extends BillAggregateArgs> = {
        [P in keyof T & keyof AggregateBill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBill[P]>
      : GetScalarType<T[P], AggregateBill[P]>
  }




  export type BillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillWhereInput
    orderBy?: BillOrderByWithAggregationInput | BillOrderByWithAggregationInput[]
    by: BillScalarFieldEnum[] | BillScalarFieldEnum
    having?: BillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BillCountAggregateInputType | true
    _avg?: BillAvgAggregateInputType
    _sum?: BillSumAggregateInputType
    _min?: BillMinAggregateInputType
    _max?: BillMaxAggregateInputType
  }

  export type BillGroupByOutputType = {
    id: string
    bill_number: string
    farmer_id: string
    commissioner_id: string
    product_id: string
    session_id: string
    total_quantity: number
    gross_amount: number
    commission_rate: number
    commission_amount: number
    other_charges: JsonValue
    net_payable: number
    payment_status: $Enums.BillPaymentStatus
    payment_method: string | null
    payment_date: Date | null
    notes: string | null
    created_at: Date
    updated_at: Date
    _count: BillCountAggregateOutputType | null
    _avg: BillAvgAggregateOutputType | null
    _sum: BillSumAggregateOutputType | null
    _min: BillMinAggregateOutputType | null
    _max: BillMaxAggregateOutputType | null
  }

  type GetBillGroupByPayload<T extends BillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BillGroupByOutputType[P]>
            : GetScalarType<T[P], BillGroupByOutputType[P]>
        }
      >
    >


  export type BillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bill_number?: boolean
    farmer_id?: boolean
    commissioner_id?: boolean
    product_id?: boolean
    session_id?: boolean
    total_quantity?: boolean
    gross_amount?: boolean
    commission_rate?: boolean
    commission_amount?: boolean
    other_charges?: boolean
    net_payable?: boolean
    payment_status?: boolean
    payment_method?: boolean
    payment_date?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
    auction_items?: boolean | Bill$auction_itemsArgs<ExtArgs>
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
    farmer?: boolean | FarmerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    _count?: boolean | BillCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bill"]>

  export type BillSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bill_number?: boolean
    farmer_id?: boolean
    commissioner_id?: boolean
    product_id?: boolean
    session_id?: boolean
    total_quantity?: boolean
    gross_amount?: boolean
    commission_rate?: boolean
    commission_amount?: boolean
    other_charges?: boolean
    net_payable?: boolean
    payment_status?: boolean
    payment_method?: boolean
    payment_date?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
    farmer?: boolean | FarmerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bill"]>

  export type BillSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bill_number?: boolean
    farmer_id?: boolean
    commissioner_id?: boolean
    product_id?: boolean
    session_id?: boolean
    total_quantity?: boolean
    gross_amount?: boolean
    commission_rate?: boolean
    commission_amount?: boolean
    other_charges?: boolean
    net_payable?: boolean
    payment_status?: boolean
    payment_method?: boolean
    payment_date?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
    farmer?: boolean | FarmerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bill"]>

  export type BillSelectScalar = {
    id?: boolean
    bill_number?: boolean
    farmer_id?: boolean
    commissioner_id?: boolean
    product_id?: boolean
    session_id?: boolean
    total_quantity?: boolean
    gross_amount?: boolean
    commission_rate?: boolean
    commission_amount?: boolean
    other_charges?: boolean
    net_payable?: boolean
    payment_status?: boolean
    payment_method?: boolean
    payment_date?: boolean
    notes?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type BillOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bill_number" | "farmer_id" | "commissioner_id" | "product_id" | "session_id" | "total_quantity" | "gross_amount" | "commission_rate" | "commission_amount" | "other_charges" | "net_payable" | "payment_status" | "payment_method" | "payment_date" | "notes" | "created_at" | "updated_at", ExtArgs["result"]["bill"]>
  export type BillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auction_items?: boolean | Bill$auction_itemsArgs<ExtArgs>
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
    farmer?: boolean | FarmerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    _count?: boolean | BillCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BillIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
    farmer?: boolean | FarmerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type BillIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commissioner?: boolean | CommissionerDefaultArgs<ExtArgs>
    farmer?: boolean | FarmerDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $BillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bill"
    objects: {
      auction_items: Prisma.$AuctionItemPayload<ExtArgs>[]
      commissioner: Prisma.$CommissionerPayload<ExtArgs>
      farmer: Prisma.$FarmerPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bill_number: string
      farmer_id: string
      commissioner_id: string
      product_id: string
      session_id: string
      total_quantity: number
      gross_amount: number
      commission_rate: number
      commission_amount: number
      other_charges: Prisma.JsonValue
      net_payable: number
      payment_status: $Enums.BillPaymentStatus
      payment_method: string | null
      payment_date: Date | null
      notes: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["bill"]>
    composites: {}
  }

  type BillGetPayload<S extends boolean | null | undefined | BillDefaultArgs> = $Result.GetResult<Prisma.$BillPayload, S>

  type BillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BillCountAggregateInputType | true
    }

  export interface BillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bill'], meta: { name: 'Bill' } }
    /**
     * Find zero or one Bill that matches the filter.
     * @param {BillFindUniqueArgs} args - Arguments to find a Bill
     * @example
     * // Get one Bill
     * const bill = await prisma.bill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BillFindUniqueArgs>(args: SelectSubset<T, BillFindUniqueArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bill that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BillFindUniqueOrThrowArgs} args - Arguments to find a Bill
     * @example
     * // Get one Bill
     * const bill = await prisma.bill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BillFindUniqueOrThrowArgs>(args: SelectSubset<T, BillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillFindFirstArgs} args - Arguments to find a Bill
     * @example
     * // Get one Bill
     * const bill = await prisma.bill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BillFindFirstArgs>(args?: SelectSubset<T, BillFindFirstArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillFindFirstOrThrowArgs} args - Arguments to find a Bill
     * @example
     * // Get one Bill
     * const bill = await prisma.bill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BillFindFirstOrThrowArgs>(args?: SelectSubset<T, BillFindFirstOrThrowArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bills
     * const bills = await prisma.bill.findMany()
     * 
     * // Get first 10 Bills
     * const bills = await prisma.bill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const billWithIdOnly = await prisma.bill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BillFindManyArgs>(args?: SelectSubset<T, BillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bill.
     * @param {BillCreateArgs} args - Arguments to create a Bill.
     * @example
     * // Create one Bill
     * const Bill = await prisma.bill.create({
     *   data: {
     *     // ... data to create a Bill
     *   }
     * })
     * 
     */
    create<T extends BillCreateArgs>(args: SelectSubset<T, BillCreateArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bills.
     * @param {BillCreateManyArgs} args - Arguments to create many Bills.
     * @example
     * // Create many Bills
     * const bill = await prisma.bill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BillCreateManyArgs>(args?: SelectSubset<T, BillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bills and returns the data saved in the database.
     * @param {BillCreateManyAndReturnArgs} args - Arguments to create many Bills.
     * @example
     * // Create many Bills
     * const bill = await prisma.bill.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bills and only return the `id`
     * const billWithIdOnly = await prisma.bill.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BillCreateManyAndReturnArgs>(args?: SelectSubset<T, BillCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bill.
     * @param {BillDeleteArgs} args - Arguments to delete one Bill.
     * @example
     * // Delete one Bill
     * const Bill = await prisma.bill.delete({
     *   where: {
     *     // ... filter to delete one Bill
     *   }
     * })
     * 
     */
    delete<T extends BillDeleteArgs>(args: SelectSubset<T, BillDeleteArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bill.
     * @param {BillUpdateArgs} args - Arguments to update one Bill.
     * @example
     * // Update one Bill
     * const bill = await prisma.bill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BillUpdateArgs>(args: SelectSubset<T, BillUpdateArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bills.
     * @param {BillDeleteManyArgs} args - Arguments to filter Bills to delete.
     * @example
     * // Delete a few Bills
     * const { count } = await prisma.bill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BillDeleteManyArgs>(args?: SelectSubset<T, BillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bills
     * const bill = await prisma.bill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BillUpdateManyArgs>(args: SelectSubset<T, BillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bills and returns the data updated in the database.
     * @param {BillUpdateManyAndReturnArgs} args - Arguments to update many Bills.
     * @example
     * // Update many Bills
     * const bill = await prisma.bill.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bills and only return the `id`
     * const billWithIdOnly = await prisma.bill.updateManyAndReturn({
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
    updateManyAndReturn<T extends BillUpdateManyAndReturnArgs>(args: SelectSubset<T, BillUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bill.
     * @param {BillUpsertArgs} args - Arguments to update or create a Bill.
     * @example
     * // Update or create a Bill
     * const bill = await prisma.bill.upsert({
     *   create: {
     *     // ... data to create a Bill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bill we want to update
     *   }
     * })
     */
    upsert<T extends BillUpsertArgs>(args: SelectSubset<T, BillUpsertArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillCountArgs} args - Arguments to filter Bills to count.
     * @example
     * // Count the number of Bills
     * const count = await prisma.bill.count({
     *   where: {
     *     // ... the filter for the Bills we want to count
     *   }
     * })
    **/
    count<T extends BillCountArgs>(
      args?: Subset<T, BillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BillAggregateArgs>(args: Subset<T, BillAggregateArgs>): Prisma.PrismaPromise<GetBillAggregateType<T>>

    /**
     * Group by Bill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillGroupByArgs} args - Group by arguments.
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
      T extends BillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BillGroupByArgs['orderBy'] }
        : { orderBy?: BillGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bill model
   */
  readonly fields: BillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auction_items<T extends Bill$auction_itemsArgs<ExtArgs> = {}>(args?: Subset<T, Bill$auction_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuctionItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    commissioner<T extends CommissionerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CommissionerDefaultArgs<ExtArgs>>): Prisma__CommissionerClient<$Result.GetResult<Prisma.$CommissionerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    farmer<T extends FarmerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmerDefaultArgs<ExtArgs>>): Prisma__FarmerClient<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Bill model
   */
  interface BillFieldRefs {
    readonly id: FieldRef<"Bill", 'String'>
    readonly bill_number: FieldRef<"Bill", 'String'>
    readonly farmer_id: FieldRef<"Bill", 'String'>
    readonly commissioner_id: FieldRef<"Bill", 'String'>
    readonly product_id: FieldRef<"Bill", 'String'>
    readonly session_id: FieldRef<"Bill", 'String'>
    readonly total_quantity: FieldRef<"Bill", 'Float'>
    readonly gross_amount: FieldRef<"Bill", 'Float'>
    readonly commission_rate: FieldRef<"Bill", 'Float'>
    readonly commission_amount: FieldRef<"Bill", 'Float'>
    readonly other_charges: FieldRef<"Bill", 'Json'>
    readonly net_payable: FieldRef<"Bill", 'Float'>
    readonly payment_status: FieldRef<"Bill", 'BillPaymentStatus'>
    readonly payment_method: FieldRef<"Bill", 'String'>
    readonly payment_date: FieldRef<"Bill", 'DateTime'>
    readonly notes: FieldRef<"Bill", 'String'>
    readonly created_at: FieldRef<"Bill", 'DateTime'>
    readonly updated_at: FieldRef<"Bill", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bill findUnique
   */
  export type BillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bill
     */
    omit?: BillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bill to fetch.
     */
    where: BillWhereUniqueInput
  }

  /**
   * Bill findUniqueOrThrow
   */
  export type BillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bill
     */
    omit?: BillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bill to fetch.
     */
    where: BillWhereUniqueInput
  }

  /**
   * Bill findFirst
   */
  export type BillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bill
     */
    omit?: BillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bill to fetch.
     */
    where?: BillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bills to fetch.
     */
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bills.
     */
    cursor?: BillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bills.
     */
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * Bill findFirstOrThrow
   */
  export type BillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bill
     */
    omit?: BillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bill to fetch.
     */
    where?: BillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bills to fetch.
     */
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bills.
     */
    cursor?: BillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bills.
     */
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * Bill findMany
   */
  export type BillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bill
     */
    omit?: BillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bills to fetch.
     */
    where?: BillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bills to fetch.
     */
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bills.
     */
    cursor?: BillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bills.
     */
    skip?: number
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * Bill create
   */
  export type BillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bill
     */
    omit?: BillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * The data needed to create a Bill.
     */
    data: XOR<BillCreateInput, BillUncheckedCreateInput>
  }

  /**
   * Bill createMany
   */
  export type BillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bills.
     */
    data: BillCreateManyInput | BillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bill createManyAndReturn
   */
  export type BillCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bill
     */
    omit?: BillOmit<ExtArgs> | null
    /**
     * The data used to create many Bills.
     */
    data: BillCreateManyInput | BillCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bill update
   */
  export type BillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bill
     */
    omit?: BillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * The data needed to update a Bill.
     */
    data: XOR<BillUpdateInput, BillUncheckedUpdateInput>
    /**
     * Choose, which Bill to update.
     */
    where: BillWhereUniqueInput
  }

  /**
   * Bill updateMany
   */
  export type BillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bills.
     */
    data: XOR<BillUpdateManyMutationInput, BillUncheckedUpdateManyInput>
    /**
     * Filter which Bills to update
     */
    where?: BillWhereInput
    /**
     * Limit how many Bills to update.
     */
    limit?: number
  }

  /**
   * Bill updateManyAndReturn
   */
  export type BillUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bill
     */
    omit?: BillOmit<ExtArgs> | null
    /**
     * The data used to update Bills.
     */
    data: XOR<BillUpdateManyMutationInput, BillUncheckedUpdateManyInput>
    /**
     * Filter which Bills to update
     */
    where?: BillWhereInput
    /**
     * Limit how many Bills to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bill upsert
   */
  export type BillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bill
     */
    omit?: BillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * The filter to search for the Bill to update in case it exists.
     */
    where: BillWhereUniqueInput
    /**
     * In case the Bill found by the `where` argument doesn't exist, create a new Bill with this data.
     */
    create: XOR<BillCreateInput, BillUncheckedCreateInput>
    /**
     * In case the Bill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BillUpdateInput, BillUncheckedUpdateInput>
  }

  /**
   * Bill delete
   */
  export type BillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bill
     */
    omit?: BillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter which Bill to delete.
     */
    where: BillWhereUniqueInput
  }

  /**
   * Bill deleteMany
   */
  export type BillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bills to delete
     */
    where?: BillWhereInput
    /**
     * Limit how many Bills to delete.
     */
    limit?: number
  }

  /**
   * Bill.auction_items
   */
  export type Bill$auction_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuctionItem
     */
    select?: AuctionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuctionItem
     */
    omit?: AuctionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuctionItemInclude<ExtArgs> | null
    where?: AuctionItemWhereInput
    orderBy?: AuctionItemOrderByWithRelationInput | AuctionItemOrderByWithRelationInput[]
    cursor?: AuctionItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuctionItemScalarFieldEnum | AuctionItemScalarFieldEnum[]
  }

  /**
   * Bill without action
   */
  export type BillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bill
     */
    omit?: BillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
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


  export const CommissionerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    location: 'location',
    phone: 'phone',
    email: 'email',
    password: 'password',
    commission_rate: 'commission_rate',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type CommissionerScalarFieldEnum = (typeof CommissionerScalarFieldEnum)[keyof typeof CommissionerScalarFieldEnum]


  export const PasswordResetScalarFieldEnum: {
    id: 'id',
    commissioner_id: 'commissioner_id',
    token: 'token',
    expires_at: 'expires_at',
    used: 'used',
    created_at: 'created_at',
    used_at: 'used_at'
  };

  export type PasswordResetScalarFieldEnum = (typeof PasswordResetScalarFieldEnum)[keyof typeof PasswordResetScalarFieldEnum]


  export const FarmerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phone: 'phone',
    village: 'village',
    commissioner_id: 'commissioner_id',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type FarmerScalarFieldEnum = (typeof FarmerScalarFieldEnum)[keyof typeof FarmerScalarFieldEnum]


  export const BuyerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phone: 'phone',
    commissioner_id: 'commissioner_id',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type BuyerScalarFieldEnum = (typeof BuyerScalarFieldEnum)[keyof typeof BuyerScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category_id: 'category_id',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const AuctionSessionScalarFieldEnum: {
    id: 'id',
    date: 'date',
    commissioner_id: 'commissioner_id',
    status: 'status',
    payment_status: 'payment_status',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AuctionSessionScalarFieldEnum = (typeof AuctionSessionScalarFieldEnum)[keyof typeof AuctionSessionScalarFieldEnum]


  export const AuctionItemScalarFieldEnum: {
    id: 'id',
    session_id: 'session_id',
    farmer_id: 'farmer_id',
    product_id: 'product_id',
    unit: 'unit',
    quantity: 'quantity',
    buyer_id: 'buyer_id',
    bill_id: 'bill_id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    rate: 'rate'
  };

  export type AuctionItemScalarFieldEnum = (typeof AuctionItemScalarFieldEnum)[keyof typeof AuctionItemScalarFieldEnum]


  export const BillScalarFieldEnum: {
    id: 'id',
    bill_number: 'bill_number',
    farmer_id: 'farmer_id',
    commissioner_id: 'commissioner_id',
    product_id: 'product_id',
    session_id: 'session_id',
    total_quantity: 'total_quantity',
    gross_amount: 'gross_amount',
    commission_rate: 'commission_rate',
    commission_amount: 'commission_amount',
    other_charges: 'other_charges',
    net_payable: 'net_payable',
    payment_status: 'payment_status',
    payment_method: 'payment_method',
    payment_date: 'payment_date',
    notes: 'notes',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type BillScalarFieldEnum = (typeof BillScalarFieldEnum)[keyof typeof BillScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


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
   * Reference to a field of type 'SessionStatus'
   */
  export type EnumSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionStatus'>
    


  /**
   * Reference to a field of type 'SessionStatus[]'
   */
  export type ListEnumSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionStatus[]'>
    


  /**
   * Reference to a field of type 'SessionPaymentStatus'
   */
  export type EnumSessionPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionPaymentStatus'>
    


  /**
   * Reference to a field of type 'SessionPaymentStatus[]'
   */
  export type ListEnumSessionPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionPaymentStatus[]'>
    


  /**
   * Reference to a field of type 'Unit'
   */
  export type EnumUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Unit'>
    


  /**
   * Reference to a field of type 'Unit[]'
   */
  export type ListEnumUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Unit[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'BillPaymentStatus'
   */
  export type EnumBillPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BillPaymentStatus'>
    


  /**
   * Reference to a field of type 'BillPaymentStatus[]'
   */
  export type ListEnumBillPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BillPaymentStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type CommissionerWhereInput = {
    AND?: CommissionerWhereInput | CommissionerWhereInput[]
    OR?: CommissionerWhereInput[]
    NOT?: CommissionerWhereInput | CommissionerWhereInput[]
    id?: StringFilter<"Commissioner"> | string
    name?: StringFilter<"Commissioner"> | string
    location?: StringFilter<"Commissioner"> | string
    phone?: StringFilter<"Commissioner"> | string
    email?: StringFilter<"Commissioner"> | string
    password?: StringFilter<"Commissioner"> | string
    commission_rate?: FloatFilter<"Commissioner"> | number
    created_at?: DateTimeFilter<"Commissioner"> | Date | string
    updated_at?: DateTimeFilter<"Commissioner"> | Date | string
    auction_sessions?: AuctionSessionListRelationFilter
    bills?: BillListRelationFilter
    buyers?: BuyerListRelationFilter
    farmers?: FarmerListRelationFilter
    password_resets?: PasswordResetListRelationFilter
  }

  export type CommissionerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    commission_rate?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    auction_sessions?: AuctionSessionOrderByRelationAggregateInput
    bills?: BillOrderByRelationAggregateInput
    buyers?: BuyerOrderByRelationAggregateInput
    farmers?: FarmerOrderByRelationAggregateInput
    password_resets?: PasswordResetOrderByRelationAggregateInput
  }

  export type CommissionerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: CommissionerWhereInput | CommissionerWhereInput[]
    OR?: CommissionerWhereInput[]
    NOT?: CommissionerWhereInput | CommissionerWhereInput[]
    name?: StringFilter<"Commissioner"> | string
    location?: StringFilter<"Commissioner"> | string
    phone?: StringFilter<"Commissioner"> | string
    password?: StringFilter<"Commissioner"> | string
    commission_rate?: FloatFilter<"Commissioner"> | number
    created_at?: DateTimeFilter<"Commissioner"> | Date | string
    updated_at?: DateTimeFilter<"Commissioner"> | Date | string
    auction_sessions?: AuctionSessionListRelationFilter
    bills?: BillListRelationFilter
    buyers?: BuyerListRelationFilter
    farmers?: FarmerListRelationFilter
    password_resets?: PasswordResetListRelationFilter
  }, "id" | "email">

  export type CommissionerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    commission_rate?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: CommissionerCountOrderByAggregateInput
    _avg?: CommissionerAvgOrderByAggregateInput
    _max?: CommissionerMaxOrderByAggregateInput
    _min?: CommissionerMinOrderByAggregateInput
    _sum?: CommissionerSumOrderByAggregateInput
  }

  export type CommissionerScalarWhereWithAggregatesInput = {
    AND?: CommissionerScalarWhereWithAggregatesInput | CommissionerScalarWhereWithAggregatesInput[]
    OR?: CommissionerScalarWhereWithAggregatesInput[]
    NOT?: CommissionerScalarWhereWithAggregatesInput | CommissionerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Commissioner"> | string
    name?: StringWithAggregatesFilter<"Commissioner"> | string
    location?: StringWithAggregatesFilter<"Commissioner"> | string
    phone?: StringWithAggregatesFilter<"Commissioner"> | string
    email?: StringWithAggregatesFilter<"Commissioner"> | string
    password?: StringWithAggregatesFilter<"Commissioner"> | string
    commission_rate?: FloatWithAggregatesFilter<"Commissioner"> | number
    created_at?: DateTimeWithAggregatesFilter<"Commissioner"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Commissioner"> | Date | string
  }

  export type PasswordResetWhereInput = {
    AND?: PasswordResetWhereInput | PasswordResetWhereInput[]
    OR?: PasswordResetWhereInput[]
    NOT?: PasswordResetWhereInput | PasswordResetWhereInput[]
    id?: StringFilter<"PasswordReset"> | string
    commissioner_id?: StringFilter<"PasswordReset"> | string
    token?: StringFilter<"PasswordReset"> | string
    expires_at?: DateTimeFilter<"PasswordReset"> | Date | string
    used?: BoolFilter<"PasswordReset"> | boolean
    created_at?: DateTimeFilter<"PasswordReset"> | Date | string
    used_at?: DateTimeNullableFilter<"PasswordReset"> | Date | string | null
    commissioner?: XOR<CommissionerScalarRelationFilter, CommissionerWhereInput>
  }

  export type PasswordResetOrderByWithRelationInput = {
    id?: SortOrder
    commissioner_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    used?: SortOrder
    created_at?: SortOrder
    used_at?: SortOrderInput | SortOrder
    commissioner?: CommissionerOrderByWithRelationInput
  }

  export type PasswordResetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: PasswordResetWhereInput | PasswordResetWhereInput[]
    OR?: PasswordResetWhereInput[]
    NOT?: PasswordResetWhereInput | PasswordResetWhereInput[]
    commissioner_id?: StringFilter<"PasswordReset"> | string
    expires_at?: DateTimeFilter<"PasswordReset"> | Date | string
    used?: BoolFilter<"PasswordReset"> | boolean
    created_at?: DateTimeFilter<"PasswordReset"> | Date | string
    used_at?: DateTimeNullableFilter<"PasswordReset"> | Date | string | null
    commissioner?: XOR<CommissionerScalarRelationFilter, CommissionerWhereInput>
  }, "id" | "token">

  export type PasswordResetOrderByWithAggregationInput = {
    id?: SortOrder
    commissioner_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    used?: SortOrder
    created_at?: SortOrder
    used_at?: SortOrderInput | SortOrder
    _count?: PasswordResetCountOrderByAggregateInput
    _max?: PasswordResetMaxOrderByAggregateInput
    _min?: PasswordResetMinOrderByAggregateInput
  }

  export type PasswordResetScalarWhereWithAggregatesInput = {
    AND?: PasswordResetScalarWhereWithAggregatesInput | PasswordResetScalarWhereWithAggregatesInput[]
    OR?: PasswordResetScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetScalarWhereWithAggregatesInput | PasswordResetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordReset"> | string
    commissioner_id?: StringWithAggregatesFilter<"PasswordReset"> | string
    token?: StringWithAggregatesFilter<"PasswordReset"> | string
    expires_at?: DateTimeWithAggregatesFilter<"PasswordReset"> | Date | string
    used?: BoolWithAggregatesFilter<"PasswordReset"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"PasswordReset"> | Date | string
    used_at?: DateTimeNullableWithAggregatesFilter<"PasswordReset"> | Date | string | null
  }

  export type FarmerWhereInput = {
    AND?: FarmerWhereInput | FarmerWhereInput[]
    OR?: FarmerWhereInput[]
    NOT?: FarmerWhereInput | FarmerWhereInput[]
    id?: StringFilter<"Farmer"> | string
    name?: StringFilter<"Farmer"> | string
    phone?: StringFilter<"Farmer"> | string
    village?: StringFilter<"Farmer"> | string
    commissioner_id?: StringFilter<"Farmer"> | string
    is_active?: BoolFilter<"Farmer"> | boolean
    created_at?: DateTimeFilter<"Farmer"> | Date | string
    updated_at?: DateTimeFilter<"Farmer"> | Date | string
    auction_items?: AuctionItemListRelationFilter
    bills?: BillListRelationFilter
    commissioner?: XOR<CommissionerScalarRelationFilter, CommissionerWhereInput>
  }

  export type FarmerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    village?: SortOrder
    commissioner_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    auction_items?: AuctionItemOrderByRelationAggregateInput
    bills?: BillOrderByRelationAggregateInput
    commissioner?: CommissionerOrderByWithRelationInput
  }

  export type FarmerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FarmerWhereInput | FarmerWhereInput[]
    OR?: FarmerWhereInput[]
    NOT?: FarmerWhereInput | FarmerWhereInput[]
    name?: StringFilter<"Farmer"> | string
    phone?: StringFilter<"Farmer"> | string
    village?: StringFilter<"Farmer"> | string
    commissioner_id?: StringFilter<"Farmer"> | string
    is_active?: BoolFilter<"Farmer"> | boolean
    created_at?: DateTimeFilter<"Farmer"> | Date | string
    updated_at?: DateTimeFilter<"Farmer"> | Date | string
    auction_items?: AuctionItemListRelationFilter
    bills?: BillListRelationFilter
    commissioner?: XOR<CommissionerScalarRelationFilter, CommissionerWhereInput>
  }, "id">

  export type FarmerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    village?: SortOrder
    commissioner_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: FarmerCountOrderByAggregateInput
    _max?: FarmerMaxOrderByAggregateInput
    _min?: FarmerMinOrderByAggregateInput
  }

  export type FarmerScalarWhereWithAggregatesInput = {
    AND?: FarmerScalarWhereWithAggregatesInput | FarmerScalarWhereWithAggregatesInput[]
    OR?: FarmerScalarWhereWithAggregatesInput[]
    NOT?: FarmerScalarWhereWithAggregatesInput | FarmerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Farmer"> | string
    name?: StringWithAggregatesFilter<"Farmer"> | string
    phone?: StringWithAggregatesFilter<"Farmer"> | string
    village?: StringWithAggregatesFilter<"Farmer"> | string
    commissioner_id?: StringWithAggregatesFilter<"Farmer"> | string
    is_active?: BoolWithAggregatesFilter<"Farmer"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Farmer"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Farmer"> | Date | string
  }

  export type BuyerWhereInput = {
    AND?: BuyerWhereInput | BuyerWhereInput[]
    OR?: BuyerWhereInput[]
    NOT?: BuyerWhereInput | BuyerWhereInput[]
    id?: StringFilter<"Buyer"> | string
    name?: StringFilter<"Buyer"> | string
    phone?: StringFilter<"Buyer"> | string
    commissioner_id?: StringFilter<"Buyer"> | string
    is_active?: BoolFilter<"Buyer"> | boolean
    created_at?: DateTimeFilter<"Buyer"> | Date | string
    updated_at?: DateTimeFilter<"Buyer"> | Date | string
    auction_items?: AuctionItemListRelationFilter
    commissioner?: XOR<CommissionerScalarRelationFilter, CommissionerWhereInput>
  }

  export type BuyerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    commissioner_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    auction_items?: AuctionItemOrderByRelationAggregateInput
    commissioner?: CommissionerOrderByWithRelationInput
  }

  export type BuyerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BuyerWhereInput | BuyerWhereInput[]
    OR?: BuyerWhereInput[]
    NOT?: BuyerWhereInput | BuyerWhereInput[]
    name?: StringFilter<"Buyer"> | string
    phone?: StringFilter<"Buyer"> | string
    commissioner_id?: StringFilter<"Buyer"> | string
    is_active?: BoolFilter<"Buyer"> | boolean
    created_at?: DateTimeFilter<"Buyer"> | Date | string
    updated_at?: DateTimeFilter<"Buyer"> | Date | string
    auction_items?: AuctionItemListRelationFilter
    commissioner?: XOR<CommissionerScalarRelationFilter, CommissionerWhereInput>
  }, "id">

  export type BuyerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    commissioner_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: BuyerCountOrderByAggregateInput
    _max?: BuyerMaxOrderByAggregateInput
    _min?: BuyerMinOrderByAggregateInput
  }

  export type BuyerScalarWhereWithAggregatesInput = {
    AND?: BuyerScalarWhereWithAggregatesInput | BuyerScalarWhereWithAggregatesInput[]
    OR?: BuyerScalarWhereWithAggregatesInput[]
    NOT?: BuyerScalarWhereWithAggregatesInput | BuyerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Buyer"> | string
    name?: StringWithAggregatesFilter<"Buyer"> | string
    phone?: StringWithAggregatesFilter<"Buyer"> | string
    commissioner_id?: StringWithAggregatesFilter<"Buyer"> | string
    is_active?: BoolWithAggregatesFilter<"Buyer"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Buyer"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Buyer"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    created_at?: DateTimeFilter<"Category"> | Date | string
    updated_at?: DateTimeFilter<"Category"> | Date | string
    products?: ProductListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    products?: ProductOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    created_at?: DateTimeFilter<"Category"> | Date | string
    updated_at?: DateTimeFilter<"Category"> | Date | string
    products?: ProductListRelationFilter
  }, "id" | "name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    created_at?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    category_id?: StringFilter<"Product"> | string
    is_active?: BoolFilter<"Product"> | boolean
    created_at?: DateTimeFilter<"Product"> | Date | string
    updated_at?: DateTimeFilter<"Product"> | Date | string
    auction_items?: AuctionItemListRelationFilter
    bills?: BillListRelationFilter
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    auction_items?: AuctionItemOrderByRelationAggregateInput
    bills?: BillOrderByRelationAggregateInput
    category?: CategoryOrderByWithRelationInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    category_id?: StringFilter<"Product"> | string
    is_active?: BoolFilter<"Product"> | boolean
    created_at?: DateTimeFilter<"Product"> | Date | string
    updated_at?: DateTimeFilter<"Product"> | Date | string
    auction_items?: AuctionItemListRelationFilter
    bills?: BillListRelationFilter
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }, "id" | "name">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    category_id?: StringWithAggregatesFilter<"Product"> | string
    is_active?: BoolWithAggregatesFilter<"Product"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type AuctionSessionWhereInput = {
    AND?: AuctionSessionWhereInput | AuctionSessionWhereInput[]
    OR?: AuctionSessionWhereInput[]
    NOT?: AuctionSessionWhereInput | AuctionSessionWhereInput[]
    id?: StringFilter<"AuctionSession"> | string
    date?: DateTimeFilter<"AuctionSession"> | Date | string
    commissioner_id?: StringFilter<"AuctionSession"> | string
    status?: EnumSessionStatusFilter<"AuctionSession"> | $Enums.SessionStatus
    payment_status?: EnumSessionPaymentStatusFilter<"AuctionSession"> | $Enums.SessionPaymentStatus
    created_at?: DateTimeFilter<"AuctionSession"> | Date | string
    updated_at?: DateTimeFilter<"AuctionSession"> | Date | string
    auction_items?: AuctionItemListRelationFilter
    commissioner?: XOR<CommissionerScalarRelationFilter, CommissionerWhereInput>
  }

  export type AuctionSessionOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    commissioner_id?: SortOrder
    status?: SortOrder
    payment_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    auction_items?: AuctionItemOrderByRelationAggregateInput
    commissioner?: CommissionerOrderByWithRelationInput
  }

  export type AuctionSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuctionSessionWhereInput | AuctionSessionWhereInput[]
    OR?: AuctionSessionWhereInput[]
    NOT?: AuctionSessionWhereInput | AuctionSessionWhereInput[]
    date?: DateTimeFilter<"AuctionSession"> | Date | string
    commissioner_id?: StringFilter<"AuctionSession"> | string
    status?: EnumSessionStatusFilter<"AuctionSession"> | $Enums.SessionStatus
    payment_status?: EnumSessionPaymentStatusFilter<"AuctionSession"> | $Enums.SessionPaymentStatus
    created_at?: DateTimeFilter<"AuctionSession"> | Date | string
    updated_at?: DateTimeFilter<"AuctionSession"> | Date | string
    auction_items?: AuctionItemListRelationFilter
    commissioner?: XOR<CommissionerScalarRelationFilter, CommissionerWhereInput>
  }, "id">

  export type AuctionSessionOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    commissioner_id?: SortOrder
    status?: SortOrder
    payment_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AuctionSessionCountOrderByAggregateInput
    _max?: AuctionSessionMaxOrderByAggregateInput
    _min?: AuctionSessionMinOrderByAggregateInput
  }

  export type AuctionSessionScalarWhereWithAggregatesInput = {
    AND?: AuctionSessionScalarWhereWithAggregatesInput | AuctionSessionScalarWhereWithAggregatesInput[]
    OR?: AuctionSessionScalarWhereWithAggregatesInput[]
    NOT?: AuctionSessionScalarWhereWithAggregatesInput | AuctionSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuctionSession"> | string
    date?: DateTimeWithAggregatesFilter<"AuctionSession"> | Date | string
    commissioner_id?: StringWithAggregatesFilter<"AuctionSession"> | string
    status?: EnumSessionStatusWithAggregatesFilter<"AuctionSession"> | $Enums.SessionStatus
    payment_status?: EnumSessionPaymentStatusWithAggregatesFilter<"AuctionSession"> | $Enums.SessionPaymentStatus
    created_at?: DateTimeWithAggregatesFilter<"AuctionSession"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"AuctionSession"> | Date | string
  }

  export type AuctionItemWhereInput = {
    AND?: AuctionItemWhereInput | AuctionItemWhereInput[]
    OR?: AuctionItemWhereInput[]
    NOT?: AuctionItemWhereInput | AuctionItemWhereInput[]
    id?: StringFilter<"AuctionItem"> | string
    session_id?: StringFilter<"AuctionItem"> | string
    farmer_id?: StringFilter<"AuctionItem"> | string
    product_id?: StringFilter<"AuctionItem"> | string
    unit?: EnumUnitFilter<"AuctionItem"> | $Enums.Unit
    quantity?: FloatFilter<"AuctionItem"> | number
    buyer_id?: StringNullableFilter<"AuctionItem"> | string | null
    bill_id?: StringNullableFilter<"AuctionItem"> | string | null
    created_at?: DateTimeFilter<"AuctionItem"> | Date | string
    updated_at?: DateTimeFilter<"AuctionItem"> | Date | string
    rate?: FloatNullableFilter<"AuctionItem"> | number | null
    bill?: XOR<BillNullableScalarRelationFilter, BillWhereInput> | null
    buyer?: XOR<BuyerNullableScalarRelationFilter, BuyerWhereInput> | null
    farmer?: XOR<FarmerScalarRelationFilter, FarmerWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    session?: XOR<AuctionSessionScalarRelationFilter, AuctionSessionWhereInput>
  }

  export type AuctionItemOrderByWithRelationInput = {
    id?: SortOrder
    session_id?: SortOrder
    farmer_id?: SortOrder
    product_id?: SortOrder
    unit?: SortOrder
    quantity?: SortOrder
    buyer_id?: SortOrderInput | SortOrder
    bill_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    rate?: SortOrderInput | SortOrder
    bill?: BillOrderByWithRelationInput
    buyer?: BuyerOrderByWithRelationInput
    farmer?: FarmerOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
    session?: AuctionSessionOrderByWithRelationInput
  }

  export type AuctionItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuctionItemWhereInput | AuctionItemWhereInput[]
    OR?: AuctionItemWhereInput[]
    NOT?: AuctionItemWhereInput | AuctionItemWhereInput[]
    session_id?: StringFilter<"AuctionItem"> | string
    farmer_id?: StringFilter<"AuctionItem"> | string
    product_id?: StringFilter<"AuctionItem"> | string
    unit?: EnumUnitFilter<"AuctionItem"> | $Enums.Unit
    quantity?: FloatFilter<"AuctionItem"> | number
    buyer_id?: StringNullableFilter<"AuctionItem"> | string | null
    bill_id?: StringNullableFilter<"AuctionItem"> | string | null
    created_at?: DateTimeFilter<"AuctionItem"> | Date | string
    updated_at?: DateTimeFilter<"AuctionItem"> | Date | string
    rate?: FloatNullableFilter<"AuctionItem"> | number | null
    bill?: XOR<BillNullableScalarRelationFilter, BillWhereInput> | null
    buyer?: XOR<BuyerNullableScalarRelationFilter, BuyerWhereInput> | null
    farmer?: XOR<FarmerScalarRelationFilter, FarmerWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    session?: XOR<AuctionSessionScalarRelationFilter, AuctionSessionWhereInput>
  }, "id">

  export type AuctionItemOrderByWithAggregationInput = {
    id?: SortOrder
    session_id?: SortOrder
    farmer_id?: SortOrder
    product_id?: SortOrder
    unit?: SortOrder
    quantity?: SortOrder
    buyer_id?: SortOrderInput | SortOrder
    bill_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    rate?: SortOrderInput | SortOrder
    _count?: AuctionItemCountOrderByAggregateInput
    _avg?: AuctionItemAvgOrderByAggregateInput
    _max?: AuctionItemMaxOrderByAggregateInput
    _min?: AuctionItemMinOrderByAggregateInput
    _sum?: AuctionItemSumOrderByAggregateInput
  }

  export type AuctionItemScalarWhereWithAggregatesInput = {
    AND?: AuctionItemScalarWhereWithAggregatesInput | AuctionItemScalarWhereWithAggregatesInput[]
    OR?: AuctionItemScalarWhereWithAggregatesInput[]
    NOT?: AuctionItemScalarWhereWithAggregatesInput | AuctionItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuctionItem"> | string
    session_id?: StringWithAggregatesFilter<"AuctionItem"> | string
    farmer_id?: StringWithAggregatesFilter<"AuctionItem"> | string
    product_id?: StringWithAggregatesFilter<"AuctionItem"> | string
    unit?: EnumUnitWithAggregatesFilter<"AuctionItem"> | $Enums.Unit
    quantity?: FloatWithAggregatesFilter<"AuctionItem"> | number
    buyer_id?: StringNullableWithAggregatesFilter<"AuctionItem"> | string | null
    bill_id?: StringNullableWithAggregatesFilter<"AuctionItem"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"AuctionItem"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"AuctionItem"> | Date | string
    rate?: FloatNullableWithAggregatesFilter<"AuctionItem"> | number | null
  }

  export type BillWhereInput = {
    AND?: BillWhereInput | BillWhereInput[]
    OR?: BillWhereInput[]
    NOT?: BillWhereInput | BillWhereInput[]
    id?: StringFilter<"Bill"> | string
    bill_number?: StringFilter<"Bill"> | string
    farmer_id?: StringFilter<"Bill"> | string
    commissioner_id?: StringFilter<"Bill"> | string
    product_id?: StringFilter<"Bill"> | string
    session_id?: StringFilter<"Bill"> | string
    total_quantity?: FloatFilter<"Bill"> | number
    gross_amount?: FloatFilter<"Bill"> | number
    commission_rate?: FloatFilter<"Bill"> | number
    commission_amount?: FloatFilter<"Bill"> | number
    other_charges?: JsonFilter<"Bill">
    net_payable?: FloatFilter<"Bill"> | number
    payment_status?: EnumBillPaymentStatusFilter<"Bill"> | $Enums.BillPaymentStatus
    payment_method?: StringNullableFilter<"Bill"> | string | null
    payment_date?: DateTimeNullableFilter<"Bill"> | Date | string | null
    notes?: StringNullableFilter<"Bill"> | string | null
    created_at?: DateTimeFilter<"Bill"> | Date | string
    updated_at?: DateTimeFilter<"Bill"> | Date | string
    auction_items?: AuctionItemListRelationFilter
    commissioner?: XOR<CommissionerScalarRelationFilter, CommissionerWhereInput>
    farmer?: XOR<FarmerScalarRelationFilter, FarmerWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type BillOrderByWithRelationInput = {
    id?: SortOrder
    bill_number?: SortOrder
    farmer_id?: SortOrder
    commissioner_id?: SortOrder
    product_id?: SortOrder
    session_id?: SortOrder
    total_quantity?: SortOrder
    gross_amount?: SortOrder
    commission_rate?: SortOrder
    commission_amount?: SortOrder
    other_charges?: SortOrder
    net_payable?: SortOrder
    payment_status?: SortOrder
    payment_method?: SortOrderInput | SortOrder
    payment_date?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    auction_items?: AuctionItemOrderByRelationAggregateInput
    commissioner?: CommissionerOrderByWithRelationInput
    farmer?: FarmerOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type BillWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bill_number?: string
    farmer_id_product_id_session_id?: BillFarmer_idProduct_idSession_idCompoundUniqueInput
    AND?: BillWhereInput | BillWhereInput[]
    OR?: BillWhereInput[]
    NOT?: BillWhereInput | BillWhereInput[]
    farmer_id?: StringFilter<"Bill"> | string
    commissioner_id?: StringFilter<"Bill"> | string
    product_id?: StringFilter<"Bill"> | string
    session_id?: StringFilter<"Bill"> | string
    total_quantity?: FloatFilter<"Bill"> | number
    gross_amount?: FloatFilter<"Bill"> | number
    commission_rate?: FloatFilter<"Bill"> | number
    commission_amount?: FloatFilter<"Bill"> | number
    other_charges?: JsonFilter<"Bill">
    net_payable?: FloatFilter<"Bill"> | number
    payment_status?: EnumBillPaymentStatusFilter<"Bill"> | $Enums.BillPaymentStatus
    payment_method?: StringNullableFilter<"Bill"> | string | null
    payment_date?: DateTimeNullableFilter<"Bill"> | Date | string | null
    notes?: StringNullableFilter<"Bill"> | string | null
    created_at?: DateTimeFilter<"Bill"> | Date | string
    updated_at?: DateTimeFilter<"Bill"> | Date | string
    auction_items?: AuctionItemListRelationFilter
    commissioner?: XOR<CommissionerScalarRelationFilter, CommissionerWhereInput>
    farmer?: XOR<FarmerScalarRelationFilter, FarmerWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id" | "bill_number" | "farmer_id_product_id_session_id">

  export type BillOrderByWithAggregationInput = {
    id?: SortOrder
    bill_number?: SortOrder
    farmer_id?: SortOrder
    commissioner_id?: SortOrder
    product_id?: SortOrder
    session_id?: SortOrder
    total_quantity?: SortOrder
    gross_amount?: SortOrder
    commission_rate?: SortOrder
    commission_amount?: SortOrder
    other_charges?: SortOrder
    net_payable?: SortOrder
    payment_status?: SortOrder
    payment_method?: SortOrderInput | SortOrder
    payment_date?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: BillCountOrderByAggregateInput
    _avg?: BillAvgOrderByAggregateInput
    _max?: BillMaxOrderByAggregateInput
    _min?: BillMinOrderByAggregateInput
    _sum?: BillSumOrderByAggregateInput
  }

  export type BillScalarWhereWithAggregatesInput = {
    AND?: BillScalarWhereWithAggregatesInput | BillScalarWhereWithAggregatesInput[]
    OR?: BillScalarWhereWithAggregatesInput[]
    NOT?: BillScalarWhereWithAggregatesInput | BillScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Bill"> | string
    bill_number?: StringWithAggregatesFilter<"Bill"> | string
    farmer_id?: StringWithAggregatesFilter<"Bill"> | string
    commissioner_id?: StringWithAggregatesFilter<"Bill"> | string
    product_id?: StringWithAggregatesFilter<"Bill"> | string
    session_id?: StringWithAggregatesFilter<"Bill"> | string
    total_quantity?: FloatWithAggregatesFilter<"Bill"> | number
    gross_amount?: FloatWithAggregatesFilter<"Bill"> | number
    commission_rate?: FloatWithAggregatesFilter<"Bill"> | number
    commission_amount?: FloatWithAggregatesFilter<"Bill"> | number
    other_charges?: JsonWithAggregatesFilter<"Bill">
    net_payable?: FloatWithAggregatesFilter<"Bill"> | number
    payment_status?: EnumBillPaymentStatusWithAggregatesFilter<"Bill"> | $Enums.BillPaymentStatus
    payment_method?: StringNullableWithAggregatesFilter<"Bill"> | string | null
    payment_date?: DateTimeNullableWithAggregatesFilter<"Bill"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"Bill"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Bill"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Bill"> | Date | string
  }

  export type CommissionerCreateInput = {
    id?: string
    name: string
    location: string
    phone: string
    email: string
    password: string
    commission_rate?: number
    created_at?: Date | string
    updated_at?: Date | string
    auction_sessions?: AuctionSessionCreateNestedManyWithoutCommissionerInput
    bills?: BillCreateNestedManyWithoutCommissionerInput
    buyers?: BuyerCreateNestedManyWithoutCommissionerInput
    farmers?: FarmerCreateNestedManyWithoutCommissionerInput
    password_resets?: PasswordResetCreateNestedManyWithoutCommissionerInput
  }

  export type CommissionerUncheckedCreateInput = {
    id?: string
    name: string
    location: string
    phone: string
    email: string
    password: string
    commission_rate?: number
    created_at?: Date | string
    updated_at?: Date | string
    auction_sessions?: AuctionSessionUncheckedCreateNestedManyWithoutCommissionerInput
    bills?: BillUncheckedCreateNestedManyWithoutCommissionerInput
    buyers?: BuyerUncheckedCreateNestedManyWithoutCommissionerInput
    farmers?: FarmerUncheckedCreateNestedManyWithoutCommissionerInput
    password_resets?: PasswordResetUncheckedCreateNestedManyWithoutCommissionerInput
  }

  export type CommissionerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    commission_rate?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_sessions?: AuctionSessionUpdateManyWithoutCommissionerNestedInput
    bills?: BillUpdateManyWithoutCommissionerNestedInput
    buyers?: BuyerUpdateManyWithoutCommissionerNestedInput
    farmers?: FarmerUpdateManyWithoutCommissionerNestedInput
    password_resets?: PasswordResetUpdateManyWithoutCommissionerNestedInput
  }

  export type CommissionerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    commission_rate?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_sessions?: AuctionSessionUncheckedUpdateManyWithoutCommissionerNestedInput
    bills?: BillUncheckedUpdateManyWithoutCommissionerNestedInput
    buyers?: BuyerUncheckedUpdateManyWithoutCommissionerNestedInput
    farmers?: FarmerUncheckedUpdateManyWithoutCommissionerNestedInput
    password_resets?: PasswordResetUncheckedUpdateManyWithoutCommissionerNestedInput
  }

  export type CommissionerCreateManyInput = {
    id?: string
    name: string
    location: string
    phone: string
    email: string
    password: string
    commission_rate?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CommissionerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    commission_rate?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommissionerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    commission_rate?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetCreateInput = {
    id?: string
    token: string
    expires_at: Date | string
    used?: boolean
    created_at?: Date | string
    used_at?: Date | string | null
    commissioner: CommissionerCreateNestedOneWithoutPassword_resetsInput
  }

  export type PasswordResetUncheckedCreateInput = {
    id?: string
    commissioner_id: string
    token: string
    expires_at: Date | string
    used?: boolean
    created_at?: Date | string
    used_at?: Date | string | null
  }

  export type PasswordResetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commissioner?: CommissionerUpdateOneRequiredWithoutPassword_resetsNestedInput
  }

  export type PasswordResetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    commissioner_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PasswordResetCreateManyInput = {
    id?: string
    commissioner_id: string
    token: string
    expires_at: Date | string
    used?: boolean
    created_at?: Date | string
    used_at?: Date | string | null
  }

  export type PasswordResetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PasswordResetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    commissioner_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FarmerCreateInput = {
    id?: string
    name: string
    phone: string
    village: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemCreateNestedManyWithoutFarmerInput
    bills?: BillCreateNestedManyWithoutFarmerInput
    commissioner: CommissionerCreateNestedOneWithoutFarmersInput
  }

  export type FarmerUncheckedCreateInput = {
    id?: string
    name: string
    phone: string
    village: string
    commissioner_id: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemUncheckedCreateNestedManyWithoutFarmerInput
    bills?: BillUncheckedCreateNestedManyWithoutFarmerInput
  }

  export type FarmerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    village?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUpdateManyWithoutFarmerNestedInput
    bills?: BillUpdateManyWithoutFarmerNestedInput
    commissioner?: CommissionerUpdateOneRequiredWithoutFarmersNestedInput
  }

  export type FarmerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    village?: StringFieldUpdateOperationsInput | string
    commissioner_id?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUncheckedUpdateManyWithoutFarmerNestedInput
    bills?: BillUncheckedUpdateManyWithoutFarmerNestedInput
  }

  export type FarmerCreateManyInput = {
    id?: string
    name: string
    phone: string
    village: string
    commissioner_id: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FarmerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    village?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    village?: StringFieldUpdateOperationsInput | string
    commissioner_id?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuyerCreateInput = {
    id?: string
    name: string
    phone: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemCreateNestedManyWithoutBuyerInput
    commissioner: CommissionerCreateNestedOneWithoutBuyersInput
  }

  export type BuyerUncheckedCreateInput = {
    id?: string
    name: string
    phone: string
    commissioner_id: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemUncheckedCreateNestedManyWithoutBuyerInput
  }

  export type BuyerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUpdateManyWithoutBuyerNestedInput
    commissioner?: CommissionerUpdateOneRequiredWithoutBuyersNestedInput
  }

  export type BuyerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    commissioner_id?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUncheckedUpdateManyWithoutBuyerNestedInput
  }

  export type BuyerCreateManyInput = {
    id?: string
    name: string
    phone: string
    commissioner_id: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BuyerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuyerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    commissioner_id?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    name: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemCreateNestedManyWithoutProductInput
    bills?: BillCreateNestedManyWithoutProductInput
    category: CategoryCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    name: string
    category_id: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemUncheckedCreateNestedManyWithoutProductInput
    bills?: BillUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUpdateManyWithoutProductNestedInput
    bills?: BillUpdateManyWithoutProductNestedInput
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category_id?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUncheckedUpdateManyWithoutProductNestedInput
    bills?: BillUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    name: string
    category_id: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category_id?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuctionSessionCreateInput = {
    id?: string
    date?: Date | string
    status?: $Enums.SessionStatus
    payment_status?: $Enums.SessionPaymentStatus
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemCreateNestedManyWithoutSessionInput
    commissioner: CommissionerCreateNestedOneWithoutAuction_sessionsInput
  }

  export type AuctionSessionUncheckedCreateInput = {
    id?: string
    date?: Date | string
    commissioner_id: string
    status?: $Enums.SessionStatus
    payment_status?: $Enums.SessionPaymentStatus
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemUncheckedCreateNestedManyWithoutSessionInput
  }

  export type AuctionSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    payment_status?: EnumSessionPaymentStatusFieldUpdateOperationsInput | $Enums.SessionPaymentStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUpdateManyWithoutSessionNestedInput
    commissioner?: CommissionerUpdateOneRequiredWithoutAuction_sessionsNestedInput
  }

  export type AuctionSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    commissioner_id?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    payment_status?: EnumSessionPaymentStatusFieldUpdateOperationsInput | $Enums.SessionPaymentStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type AuctionSessionCreateManyInput = {
    id?: string
    date?: Date | string
    commissioner_id: string
    status?: $Enums.SessionStatus
    payment_status?: $Enums.SessionPaymentStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AuctionSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    payment_status?: EnumSessionPaymentStatusFieldUpdateOperationsInput | $Enums.SessionPaymentStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuctionSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    commissioner_id?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    payment_status?: EnumSessionPaymentStatusFieldUpdateOperationsInput | $Enums.SessionPaymentStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuctionItemCreateInput = {
    id?: string
    unit: $Enums.Unit
    quantity: number
    created_at?: Date | string
    updated_at?: Date | string
    rate?: number | null
    bill?: BillCreateNestedOneWithoutAuction_itemsInput
    buyer?: BuyerCreateNestedOneWithoutAuction_itemsInput
    farmer: FarmerCreateNestedOneWithoutAuction_itemsInput
    product: ProductCreateNestedOneWithoutAuction_itemsInput
    session: AuctionSessionCreateNestedOneWithoutAuction_itemsInput
  }

  export type AuctionItemUncheckedCreateInput = {
    id?: string
    session_id: string
    farmer_id: string
    product_id: string
    unit: $Enums.Unit
    quantity: number
    buyer_id?: string | null
    bill_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    rate?: number | null
  }

  export type AuctionItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    unit?: EnumUnitFieldUpdateOperationsInput | $Enums.Unit
    quantity?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: NullableFloatFieldUpdateOperationsInput | number | null
    bill?: BillUpdateOneWithoutAuction_itemsNestedInput
    buyer?: BuyerUpdateOneWithoutAuction_itemsNestedInput
    farmer?: FarmerUpdateOneRequiredWithoutAuction_itemsNestedInput
    product?: ProductUpdateOneRequiredWithoutAuction_itemsNestedInput
    session?: AuctionSessionUpdateOneRequiredWithoutAuction_itemsNestedInput
  }

  export type AuctionItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    farmer_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    unit?: EnumUnitFieldUpdateOperationsInput | $Enums.Unit
    quantity?: FloatFieldUpdateOperationsInput | number
    buyer_id?: NullableStringFieldUpdateOperationsInput | string | null
    bill_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AuctionItemCreateManyInput = {
    id?: string
    session_id: string
    farmer_id: string
    product_id: string
    unit: $Enums.Unit
    quantity: number
    buyer_id?: string | null
    bill_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    rate?: number | null
  }

  export type AuctionItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    unit?: EnumUnitFieldUpdateOperationsInput | $Enums.Unit
    quantity?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AuctionItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    farmer_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    unit?: EnumUnitFieldUpdateOperationsInput | $Enums.Unit
    quantity?: FloatFieldUpdateOperationsInput | number
    buyer_id?: NullableStringFieldUpdateOperationsInput | string | null
    bill_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type BillCreateInput = {
    id?: string
    bill_number: string
    session_id: string
    total_quantity: number
    gross_amount: number
    commission_rate: number
    commission_amount: number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable: number
    payment_status?: $Enums.BillPaymentStatus
    payment_method?: string | null
    payment_date?: Date | string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemCreateNestedManyWithoutBillInput
    commissioner: CommissionerCreateNestedOneWithoutBillsInput
    farmer: FarmerCreateNestedOneWithoutBillsInput
    product: ProductCreateNestedOneWithoutBillsInput
  }

  export type BillUncheckedCreateInput = {
    id?: string
    bill_number: string
    farmer_id: string
    commissioner_id: string
    product_id: string
    session_id: string
    total_quantity: number
    gross_amount: number
    commission_rate: number
    commission_amount: number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable: number
    payment_status?: $Enums.BillPaymentStatus
    payment_method?: string | null
    payment_date?: Date | string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemUncheckedCreateNestedManyWithoutBillInput
  }

  export type BillUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bill_number?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    total_quantity?: FloatFieldUpdateOperationsInput | number
    gross_amount?: FloatFieldUpdateOperationsInput | number
    commission_rate?: FloatFieldUpdateOperationsInput | number
    commission_amount?: FloatFieldUpdateOperationsInput | number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable?: FloatFieldUpdateOperationsInput | number
    payment_status?: EnumBillPaymentStatusFieldUpdateOperationsInput | $Enums.BillPaymentStatus
    payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUpdateManyWithoutBillNestedInput
    commissioner?: CommissionerUpdateOneRequiredWithoutBillsNestedInput
    farmer?: FarmerUpdateOneRequiredWithoutBillsNestedInput
    product?: ProductUpdateOneRequiredWithoutBillsNestedInput
  }

  export type BillUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bill_number?: StringFieldUpdateOperationsInput | string
    farmer_id?: StringFieldUpdateOperationsInput | string
    commissioner_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    total_quantity?: FloatFieldUpdateOperationsInput | number
    gross_amount?: FloatFieldUpdateOperationsInput | number
    commission_rate?: FloatFieldUpdateOperationsInput | number
    commission_amount?: FloatFieldUpdateOperationsInput | number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable?: FloatFieldUpdateOperationsInput | number
    payment_status?: EnumBillPaymentStatusFieldUpdateOperationsInput | $Enums.BillPaymentStatus
    payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUncheckedUpdateManyWithoutBillNestedInput
  }

  export type BillCreateManyInput = {
    id?: string
    bill_number: string
    farmer_id: string
    commissioner_id: string
    product_id: string
    session_id: string
    total_quantity: number
    gross_amount: number
    commission_rate: number
    commission_amount: number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable: number
    payment_status?: $Enums.BillPaymentStatus
    payment_method?: string | null
    payment_date?: Date | string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BillUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bill_number?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    total_quantity?: FloatFieldUpdateOperationsInput | number
    gross_amount?: FloatFieldUpdateOperationsInput | number
    commission_rate?: FloatFieldUpdateOperationsInput | number
    commission_amount?: FloatFieldUpdateOperationsInput | number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable?: FloatFieldUpdateOperationsInput | number
    payment_status?: EnumBillPaymentStatusFieldUpdateOperationsInput | $Enums.BillPaymentStatus
    payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bill_number?: StringFieldUpdateOperationsInput | string
    farmer_id?: StringFieldUpdateOperationsInput | string
    commissioner_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    total_quantity?: FloatFieldUpdateOperationsInput | number
    gross_amount?: FloatFieldUpdateOperationsInput | number
    commission_rate?: FloatFieldUpdateOperationsInput | number
    commission_amount?: FloatFieldUpdateOperationsInput | number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable?: FloatFieldUpdateOperationsInput | number
    payment_status?: EnumBillPaymentStatusFieldUpdateOperationsInput | $Enums.BillPaymentStatus
    payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type AuctionSessionListRelationFilter = {
    every?: AuctionSessionWhereInput
    some?: AuctionSessionWhereInput
    none?: AuctionSessionWhereInput
  }

  export type BillListRelationFilter = {
    every?: BillWhereInput
    some?: BillWhereInput
    none?: BillWhereInput
  }

  export type BuyerListRelationFilter = {
    every?: BuyerWhereInput
    some?: BuyerWhereInput
    none?: BuyerWhereInput
  }

  export type FarmerListRelationFilter = {
    every?: FarmerWhereInput
    some?: FarmerWhereInput
    none?: FarmerWhereInput
  }

  export type PasswordResetListRelationFilter = {
    every?: PasswordResetWhereInput
    some?: PasswordResetWhereInput
    none?: PasswordResetWhereInput
  }

  export type AuctionSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BillOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BuyerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FarmerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PasswordResetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommissionerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    commission_rate?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CommissionerAvgOrderByAggregateInput = {
    commission_rate?: SortOrder
  }

  export type CommissionerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    commission_rate?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CommissionerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    commission_rate?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CommissionerSumOrderByAggregateInput = {
    commission_rate?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type CommissionerScalarRelationFilter = {
    is?: CommissionerWhereInput
    isNot?: CommissionerWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PasswordResetCountOrderByAggregateInput = {
    id?: SortOrder
    commissioner_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    used?: SortOrder
    created_at?: SortOrder
    used_at?: SortOrder
  }

  export type PasswordResetMaxOrderByAggregateInput = {
    id?: SortOrder
    commissioner_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    used?: SortOrder
    created_at?: SortOrder
    used_at?: SortOrder
  }

  export type PasswordResetMinOrderByAggregateInput = {
    id?: SortOrder
    commissioner_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    used?: SortOrder
    created_at?: SortOrder
    used_at?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type AuctionItemListRelationFilter = {
    every?: AuctionItemWhereInput
    some?: AuctionItemWhereInput
    none?: AuctionItemWhereInput
  }

  export type AuctionItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FarmerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    village?: SortOrder
    commissioner_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FarmerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    village?: SortOrder
    commissioner_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FarmerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    village?: SortOrder
    commissioner_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BuyerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    commissioner_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BuyerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    commissioner_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BuyerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    commissioner_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EnumSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusFilter<$PrismaModel> | $Enums.SessionStatus
  }

  export type EnumSessionPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionPaymentStatus | EnumSessionPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionPaymentStatus[] | ListEnumSessionPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionPaymentStatus[] | ListEnumSessionPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionPaymentStatusFilter<$PrismaModel> | $Enums.SessionPaymentStatus
  }

  export type AuctionSessionCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    commissioner_id?: SortOrder
    status?: SortOrder
    payment_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AuctionSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    commissioner_id?: SortOrder
    status?: SortOrder
    payment_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AuctionSessionMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    commissioner_id?: SortOrder
    status?: SortOrder
    payment_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EnumSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumSessionStatusFilter<$PrismaModel>
  }

  export type EnumSessionPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionPaymentStatus | EnumSessionPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionPaymentStatus[] | ListEnumSessionPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionPaymentStatus[] | ListEnumSessionPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.SessionPaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumSessionPaymentStatusFilter<$PrismaModel>
  }

  export type EnumUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.Unit | EnumUnitFieldRefInput<$PrismaModel>
    in?: $Enums.Unit[] | ListEnumUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.Unit[] | ListEnumUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumUnitFilter<$PrismaModel> | $Enums.Unit
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

  export type BillNullableScalarRelationFilter = {
    is?: BillWhereInput | null
    isNot?: BillWhereInput | null
  }

  export type BuyerNullableScalarRelationFilter = {
    is?: BuyerWhereInput | null
    isNot?: BuyerWhereInput | null
  }

  export type FarmerScalarRelationFilter = {
    is?: FarmerWhereInput
    isNot?: FarmerWhereInput
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type AuctionSessionScalarRelationFilter = {
    is?: AuctionSessionWhereInput
    isNot?: AuctionSessionWhereInput
  }

  export type AuctionItemCountOrderByAggregateInput = {
    id?: SortOrder
    session_id?: SortOrder
    farmer_id?: SortOrder
    product_id?: SortOrder
    unit?: SortOrder
    quantity?: SortOrder
    buyer_id?: SortOrder
    bill_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    rate?: SortOrder
  }

  export type AuctionItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    rate?: SortOrder
  }

  export type AuctionItemMaxOrderByAggregateInput = {
    id?: SortOrder
    session_id?: SortOrder
    farmer_id?: SortOrder
    product_id?: SortOrder
    unit?: SortOrder
    quantity?: SortOrder
    buyer_id?: SortOrder
    bill_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    rate?: SortOrder
  }

  export type AuctionItemMinOrderByAggregateInput = {
    id?: SortOrder
    session_id?: SortOrder
    farmer_id?: SortOrder
    product_id?: SortOrder
    unit?: SortOrder
    quantity?: SortOrder
    buyer_id?: SortOrder
    bill_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    rate?: SortOrder
  }

  export type AuctionItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    rate?: SortOrder
  }

  export type EnumUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Unit | EnumUnitFieldRefInput<$PrismaModel>
    in?: $Enums.Unit[] | ListEnumUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.Unit[] | ListEnumUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumUnitWithAggregatesFilter<$PrismaModel> | $Enums.Unit
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUnitFilter<$PrismaModel>
    _max?: NestedEnumUnitFilter<$PrismaModel>
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

  export type EnumBillPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BillPaymentStatus | EnumBillPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BillPaymentStatus[] | ListEnumBillPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BillPaymentStatus[] | ListEnumBillPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBillPaymentStatusFilter<$PrismaModel> | $Enums.BillPaymentStatus
  }

  export type BillFarmer_idProduct_idSession_idCompoundUniqueInput = {
    farmer_id: string
    product_id: string
    session_id: string
  }

  export type BillCountOrderByAggregateInput = {
    id?: SortOrder
    bill_number?: SortOrder
    farmer_id?: SortOrder
    commissioner_id?: SortOrder
    product_id?: SortOrder
    session_id?: SortOrder
    total_quantity?: SortOrder
    gross_amount?: SortOrder
    commission_rate?: SortOrder
    commission_amount?: SortOrder
    other_charges?: SortOrder
    net_payable?: SortOrder
    payment_status?: SortOrder
    payment_method?: SortOrder
    payment_date?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BillAvgOrderByAggregateInput = {
    total_quantity?: SortOrder
    gross_amount?: SortOrder
    commission_rate?: SortOrder
    commission_amount?: SortOrder
    net_payable?: SortOrder
  }

  export type BillMaxOrderByAggregateInput = {
    id?: SortOrder
    bill_number?: SortOrder
    farmer_id?: SortOrder
    commissioner_id?: SortOrder
    product_id?: SortOrder
    session_id?: SortOrder
    total_quantity?: SortOrder
    gross_amount?: SortOrder
    commission_rate?: SortOrder
    commission_amount?: SortOrder
    net_payable?: SortOrder
    payment_status?: SortOrder
    payment_method?: SortOrder
    payment_date?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BillMinOrderByAggregateInput = {
    id?: SortOrder
    bill_number?: SortOrder
    farmer_id?: SortOrder
    commissioner_id?: SortOrder
    product_id?: SortOrder
    session_id?: SortOrder
    total_quantity?: SortOrder
    gross_amount?: SortOrder
    commission_rate?: SortOrder
    commission_amount?: SortOrder
    net_payable?: SortOrder
    payment_status?: SortOrder
    payment_method?: SortOrder
    payment_date?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BillSumOrderByAggregateInput = {
    total_quantity?: SortOrder
    gross_amount?: SortOrder
    commission_rate?: SortOrder
    commission_amount?: SortOrder
    net_payable?: SortOrder
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

  export type EnumBillPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BillPaymentStatus | EnumBillPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BillPaymentStatus[] | ListEnumBillPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BillPaymentStatus[] | ListEnumBillPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBillPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.BillPaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBillPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumBillPaymentStatusFilter<$PrismaModel>
  }

  export type AuctionSessionCreateNestedManyWithoutCommissionerInput = {
    create?: XOR<AuctionSessionCreateWithoutCommissionerInput, AuctionSessionUncheckedCreateWithoutCommissionerInput> | AuctionSessionCreateWithoutCommissionerInput[] | AuctionSessionUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: AuctionSessionCreateOrConnectWithoutCommissionerInput | AuctionSessionCreateOrConnectWithoutCommissionerInput[]
    createMany?: AuctionSessionCreateManyCommissionerInputEnvelope
    connect?: AuctionSessionWhereUniqueInput | AuctionSessionWhereUniqueInput[]
  }

  export type BillCreateNestedManyWithoutCommissionerInput = {
    create?: XOR<BillCreateWithoutCommissionerInput, BillUncheckedCreateWithoutCommissionerInput> | BillCreateWithoutCommissionerInput[] | BillUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: BillCreateOrConnectWithoutCommissionerInput | BillCreateOrConnectWithoutCommissionerInput[]
    createMany?: BillCreateManyCommissionerInputEnvelope
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
  }

  export type BuyerCreateNestedManyWithoutCommissionerInput = {
    create?: XOR<BuyerCreateWithoutCommissionerInput, BuyerUncheckedCreateWithoutCommissionerInput> | BuyerCreateWithoutCommissionerInput[] | BuyerUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: BuyerCreateOrConnectWithoutCommissionerInput | BuyerCreateOrConnectWithoutCommissionerInput[]
    createMany?: BuyerCreateManyCommissionerInputEnvelope
    connect?: BuyerWhereUniqueInput | BuyerWhereUniqueInput[]
  }

  export type FarmerCreateNestedManyWithoutCommissionerInput = {
    create?: XOR<FarmerCreateWithoutCommissionerInput, FarmerUncheckedCreateWithoutCommissionerInput> | FarmerCreateWithoutCommissionerInput[] | FarmerUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: FarmerCreateOrConnectWithoutCommissionerInput | FarmerCreateOrConnectWithoutCommissionerInput[]
    createMany?: FarmerCreateManyCommissionerInputEnvelope
    connect?: FarmerWhereUniqueInput | FarmerWhereUniqueInput[]
  }

  export type PasswordResetCreateNestedManyWithoutCommissionerInput = {
    create?: XOR<PasswordResetCreateWithoutCommissionerInput, PasswordResetUncheckedCreateWithoutCommissionerInput> | PasswordResetCreateWithoutCommissionerInput[] | PasswordResetUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutCommissionerInput | PasswordResetCreateOrConnectWithoutCommissionerInput[]
    createMany?: PasswordResetCreateManyCommissionerInputEnvelope
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
  }

  export type AuctionSessionUncheckedCreateNestedManyWithoutCommissionerInput = {
    create?: XOR<AuctionSessionCreateWithoutCommissionerInput, AuctionSessionUncheckedCreateWithoutCommissionerInput> | AuctionSessionCreateWithoutCommissionerInput[] | AuctionSessionUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: AuctionSessionCreateOrConnectWithoutCommissionerInput | AuctionSessionCreateOrConnectWithoutCommissionerInput[]
    createMany?: AuctionSessionCreateManyCommissionerInputEnvelope
    connect?: AuctionSessionWhereUniqueInput | AuctionSessionWhereUniqueInput[]
  }

  export type BillUncheckedCreateNestedManyWithoutCommissionerInput = {
    create?: XOR<BillCreateWithoutCommissionerInput, BillUncheckedCreateWithoutCommissionerInput> | BillCreateWithoutCommissionerInput[] | BillUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: BillCreateOrConnectWithoutCommissionerInput | BillCreateOrConnectWithoutCommissionerInput[]
    createMany?: BillCreateManyCommissionerInputEnvelope
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
  }

  export type BuyerUncheckedCreateNestedManyWithoutCommissionerInput = {
    create?: XOR<BuyerCreateWithoutCommissionerInput, BuyerUncheckedCreateWithoutCommissionerInput> | BuyerCreateWithoutCommissionerInput[] | BuyerUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: BuyerCreateOrConnectWithoutCommissionerInput | BuyerCreateOrConnectWithoutCommissionerInput[]
    createMany?: BuyerCreateManyCommissionerInputEnvelope
    connect?: BuyerWhereUniqueInput | BuyerWhereUniqueInput[]
  }

  export type FarmerUncheckedCreateNestedManyWithoutCommissionerInput = {
    create?: XOR<FarmerCreateWithoutCommissionerInput, FarmerUncheckedCreateWithoutCommissionerInput> | FarmerCreateWithoutCommissionerInput[] | FarmerUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: FarmerCreateOrConnectWithoutCommissionerInput | FarmerCreateOrConnectWithoutCommissionerInput[]
    createMany?: FarmerCreateManyCommissionerInputEnvelope
    connect?: FarmerWhereUniqueInput | FarmerWhereUniqueInput[]
  }

  export type PasswordResetUncheckedCreateNestedManyWithoutCommissionerInput = {
    create?: XOR<PasswordResetCreateWithoutCommissionerInput, PasswordResetUncheckedCreateWithoutCommissionerInput> | PasswordResetCreateWithoutCommissionerInput[] | PasswordResetUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutCommissionerInput | PasswordResetCreateOrConnectWithoutCommissionerInput[]
    createMany?: PasswordResetCreateManyCommissionerInputEnvelope
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AuctionSessionUpdateManyWithoutCommissionerNestedInput = {
    create?: XOR<AuctionSessionCreateWithoutCommissionerInput, AuctionSessionUncheckedCreateWithoutCommissionerInput> | AuctionSessionCreateWithoutCommissionerInput[] | AuctionSessionUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: AuctionSessionCreateOrConnectWithoutCommissionerInput | AuctionSessionCreateOrConnectWithoutCommissionerInput[]
    upsert?: AuctionSessionUpsertWithWhereUniqueWithoutCommissionerInput | AuctionSessionUpsertWithWhereUniqueWithoutCommissionerInput[]
    createMany?: AuctionSessionCreateManyCommissionerInputEnvelope
    set?: AuctionSessionWhereUniqueInput | AuctionSessionWhereUniqueInput[]
    disconnect?: AuctionSessionWhereUniqueInput | AuctionSessionWhereUniqueInput[]
    delete?: AuctionSessionWhereUniqueInput | AuctionSessionWhereUniqueInput[]
    connect?: AuctionSessionWhereUniqueInput | AuctionSessionWhereUniqueInput[]
    update?: AuctionSessionUpdateWithWhereUniqueWithoutCommissionerInput | AuctionSessionUpdateWithWhereUniqueWithoutCommissionerInput[]
    updateMany?: AuctionSessionUpdateManyWithWhereWithoutCommissionerInput | AuctionSessionUpdateManyWithWhereWithoutCommissionerInput[]
    deleteMany?: AuctionSessionScalarWhereInput | AuctionSessionScalarWhereInput[]
  }

  export type BillUpdateManyWithoutCommissionerNestedInput = {
    create?: XOR<BillCreateWithoutCommissionerInput, BillUncheckedCreateWithoutCommissionerInput> | BillCreateWithoutCommissionerInput[] | BillUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: BillCreateOrConnectWithoutCommissionerInput | BillCreateOrConnectWithoutCommissionerInput[]
    upsert?: BillUpsertWithWhereUniqueWithoutCommissionerInput | BillUpsertWithWhereUniqueWithoutCommissionerInput[]
    createMany?: BillCreateManyCommissionerInputEnvelope
    set?: BillWhereUniqueInput | BillWhereUniqueInput[]
    disconnect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    delete?: BillWhereUniqueInput | BillWhereUniqueInput[]
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    update?: BillUpdateWithWhereUniqueWithoutCommissionerInput | BillUpdateWithWhereUniqueWithoutCommissionerInput[]
    updateMany?: BillUpdateManyWithWhereWithoutCommissionerInput | BillUpdateManyWithWhereWithoutCommissionerInput[]
    deleteMany?: BillScalarWhereInput | BillScalarWhereInput[]
  }

  export type BuyerUpdateManyWithoutCommissionerNestedInput = {
    create?: XOR<BuyerCreateWithoutCommissionerInput, BuyerUncheckedCreateWithoutCommissionerInput> | BuyerCreateWithoutCommissionerInput[] | BuyerUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: BuyerCreateOrConnectWithoutCommissionerInput | BuyerCreateOrConnectWithoutCommissionerInput[]
    upsert?: BuyerUpsertWithWhereUniqueWithoutCommissionerInput | BuyerUpsertWithWhereUniqueWithoutCommissionerInput[]
    createMany?: BuyerCreateManyCommissionerInputEnvelope
    set?: BuyerWhereUniqueInput | BuyerWhereUniqueInput[]
    disconnect?: BuyerWhereUniqueInput | BuyerWhereUniqueInput[]
    delete?: BuyerWhereUniqueInput | BuyerWhereUniqueInput[]
    connect?: BuyerWhereUniqueInput | BuyerWhereUniqueInput[]
    update?: BuyerUpdateWithWhereUniqueWithoutCommissionerInput | BuyerUpdateWithWhereUniqueWithoutCommissionerInput[]
    updateMany?: BuyerUpdateManyWithWhereWithoutCommissionerInput | BuyerUpdateManyWithWhereWithoutCommissionerInput[]
    deleteMany?: BuyerScalarWhereInput | BuyerScalarWhereInput[]
  }

  export type FarmerUpdateManyWithoutCommissionerNestedInput = {
    create?: XOR<FarmerCreateWithoutCommissionerInput, FarmerUncheckedCreateWithoutCommissionerInput> | FarmerCreateWithoutCommissionerInput[] | FarmerUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: FarmerCreateOrConnectWithoutCommissionerInput | FarmerCreateOrConnectWithoutCommissionerInput[]
    upsert?: FarmerUpsertWithWhereUniqueWithoutCommissionerInput | FarmerUpsertWithWhereUniqueWithoutCommissionerInput[]
    createMany?: FarmerCreateManyCommissionerInputEnvelope
    set?: FarmerWhereUniqueInput | FarmerWhereUniqueInput[]
    disconnect?: FarmerWhereUniqueInput | FarmerWhereUniqueInput[]
    delete?: FarmerWhereUniqueInput | FarmerWhereUniqueInput[]
    connect?: FarmerWhereUniqueInput | FarmerWhereUniqueInput[]
    update?: FarmerUpdateWithWhereUniqueWithoutCommissionerInput | FarmerUpdateWithWhereUniqueWithoutCommissionerInput[]
    updateMany?: FarmerUpdateManyWithWhereWithoutCommissionerInput | FarmerUpdateManyWithWhereWithoutCommissionerInput[]
    deleteMany?: FarmerScalarWhereInput | FarmerScalarWhereInput[]
  }

  export type PasswordResetUpdateManyWithoutCommissionerNestedInput = {
    create?: XOR<PasswordResetCreateWithoutCommissionerInput, PasswordResetUncheckedCreateWithoutCommissionerInput> | PasswordResetCreateWithoutCommissionerInput[] | PasswordResetUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutCommissionerInput | PasswordResetCreateOrConnectWithoutCommissionerInput[]
    upsert?: PasswordResetUpsertWithWhereUniqueWithoutCommissionerInput | PasswordResetUpsertWithWhereUniqueWithoutCommissionerInput[]
    createMany?: PasswordResetCreateManyCommissionerInputEnvelope
    set?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    disconnect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    delete?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    update?: PasswordResetUpdateWithWhereUniqueWithoutCommissionerInput | PasswordResetUpdateWithWhereUniqueWithoutCommissionerInput[]
    updateMany?: PasswordResetUpdateManyWithWhereWithoutCommissionerInput | PasswordResetUpdateManyWithWhereWithoutCommissionerInput[]
    deleteMany?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
  }

  export type AuctionSessionUncheckedUpdateManyWithoutCommissionerNestedInput = {
    create?: XOR<AuctionSessionCreateWithoutCommissionerInput, AuctionSessionUncheckedCreateWithoutCommissionerInput> | AuctionSessionCreateWithoutCommissionerInput[] | AuctionSessionUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: AuctionSessionCreateOrConnectWithoutCommissionerInput | AuctionSessionCreateOrConnectWithoutCommissionerInput[]
    upsert?: AuctionSessionUpsertWithWhereUniqueWithoutCommissionerInput | AuctionSessionUpsertWithWhereUniqueWithoutCommissionerInput[]
    createMany?: AuctionSessionCreateManyCommissionerInputEnvelope
    set?: AuctionSessionWhereUniqueInput | AuctionSessionWhereUniqueInput[]
    disconnect?: AuctionSessionWhereUniqueInput | AuctionSessionWhereUniqueInput[]
    delete?: AuctionSessionWhereUniqueInput | AuctionSessionWhereUniqueInput[]
    connect?: AuctionSessionWhereUniqueInput | AuctionSessionWhereUniqueInput[]
    update?: AuctionSessionUpdateWithWhereUniqueWithoutCommissionerInput | AuctionSessionUpdateWithWhereUniqueWithoutCommissionerInput[]
    updateMany?: AuctionSessionUpdateManyWithWhereWithoutCommissionerInput | AuctionSessionUpdateManyWithWhereWithoutCommissionerInput[]
    deleteMany?: AuctionSessionScalarWhereInput | AuctionSessionScalarWhereInput[]
  }

  export type BillUncheckedUpdateManyWithoutCommissionerNestedInput = {
    create?: XOR<BillCreateWithoutCommissionerInput, BillUncheckedCreateWithoutCommissionerInput> | BillCreateWithoutCommissionerInput[] | BillUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: BillCreateOrConnectWithoutCommissionerInput | BillCreateOrConnectWithoutCommissionerInput[]
    upsert?: BillUpsertWithWhereUniqueWithoutCommissionerInput | BillUpsertWithWhereUniqueWithoutCommissionerInput[]
    createMany?: BillCreateManyCommissionerInputEnvelope
    set?: BillWhereUniqueInput | BillWhereUniqueInput[]
    disconnect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    delete?: BillWhereUniqueInput | BillWhereUniqueInput[]
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    update?: BillUpdateWithWhereUniqueWithoutCommissionerInput | BillUpdateWithWhereUniqueWithoutCommissionerInput[]
    updateMany?: BillUpdateManyWithWhereWithoutCommissionerInput | BillUpdateManyWithWhereWithoutCommissionerInput[]
    deleteMany?: BillScalarWhereInput | BillScalarWhereInput[]
  }

  export type BuyerUncheckedUpdateManyWithoutCommissionerNestedInput = {
    create?: XOR<BuyerCreateWithoutCommissionerInput, BuyerUncheckedCreateWithoutCommissionerInput> | BuyerCreateWithoutCommissionerInput[] | BuyerUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: BuyerCreateOrConnectWithoutCommissionerInput | BuyerCreateOrConnectWithoutCommissionerInput[]
    upsert?: BuyerUpsertWithWhereUniqueWithoutCommissionerInput | BuyerUpsertWithWhereUniqueWithoutCommissionerInput[]
    createMany?: BuyerCreateManyCommissionerInputEnvelope
    set?: BuyerWhereUniqueInput | BuyerWhereUniqueInput[]
    disconnect?: BuyerWhereUniqueInput | BuyerWhereUniqueInput[]
    delete?: BuyerWhereUniqueInput | BuyerWhereUniqueInput[]
    connect?: BuyerWhereUniqueInput | BuyerWhereUniqueInput[]
    update?: BuyerUpdateWithWhereUniqueWithoutCommissionerInput | BuyerUpdateWithWhereUniqueWithoutCommissionerInput[]
    updateMany?: BuyerUpdateManyWithWhereWithoutCommissionerInput | BuyerUpdateManyWithWhereWithoutCommissionerInput[]
    deleteMany?: BuyerScalarWhereInput | BuyerScalarWhereInput[]
  }

  export type FarmerUncheckedUpdateManyWithoutCommissionerNestedInput = {
    create?: XOR<FarmerCreateWithoutCommissionerInput, FarmerUncheckedCreateWithoutCommissionerInput> | FarmerCreateWithoutCommissionerInput[] | FarmerUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: FarmerCreateOrConnectWithoutCommissionerInput | FarmerCreateOrConnectWithoutCommissionerInput[]
    upsert?: FarmerUpsertWithWhereUniqueWithoutCommissionerInput | FarmerUpsertWithWhereUniqueWithoutCommissionerInput[]
    createMany?: FarmerCreateManyCommissionerInputEnvelope
    set?: FarmerWhereUniqueInput | FarmerWhereUniqueInput[]
    disconnect?: FarmerWhereUniqueInput | FarmerWhereUniqueInput[]
    delete?: FarmerWhereUniqueInput | FarmerWhereUniqueInput[]
    connect?: FarmerWhereUniqueInput | FarmerWhereUniqueInput[]
    update?: FarmerUpdateWithWhereUniqueWithoutCommissionerInput | FarmerUpdateWithWhereUniqueWithoutCommissionerInput[]
    updateMany?: FarmerUpdateManyWithWhereWithoutCommissionerInput | FarmerUpdateManyWithWhereWithoutCommissionerInput[]
    deleteMany?: FarmerScalarWhereInput | FarmerScalarWhereInput[]
  }

  export type PasswordResetUncheckedUpdateManyWithoutCommissionerNestedInput = {
    create?: XOR<PasswordResetCreateWithoutCommissionerInput, PasswordResetUncheckedCreateWithoutCommissionerInput> | PasswordResetCreateWithoutCommissionerInput[] | PasswordResetUncheckedCreateWithoutCommissionerInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutCommissionerInput | PasswordResetCreateOrConnectWithoutCommissionerInput[]
    upsert?: PasswordResetUpsertWithWhereUniqueWithoutCommissionerInput | PasswordResetUpsertWithWhereUniqueWithoutCommissionerInput[]
    createMany?: PasswordResetCreateManyCommissionerInputEnvelope
    set?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    disconnect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    delete?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    update?: PasswordResetUpdateWithWhereUniqueWithoutCommissionerInput | PasswordResetUpdateWithWhereUniqueWithoutCommissionerInput[]
    updateMany?: PasswordResetUpdateManyWithWhereWithoutCommissionerInput | PasswordResetUpdateManyWithWhereWithoutCommissionerInput[]
    deleteMany?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
  }

  export type CommissionerCreateNestedOneWithoutPassword_resetsInput = {
    create?: XOR<CommissionerCreateWithoutPassword_resetsInput, CommissionerUncheckedCreateWithoutPassword_resetsInput>
    connectOrCreate?: CommissionerCreateOrConnectWithoutPassword_resetsInput
    connect?: CommissionerWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CommissionerUpdateOneRequiredWithoutPassword_resetsNestedInput = {
    create?: XOR<CommissionerCreateWithoutPassword_resetsInput, CommissionerUncheckedCreateWithoutPassword_resetsInput>
    connectOrCreate?: CommissionerCreateOrConnectWithoutPassword_resetsInput
    upsert?: CommissionerUpsertWithoutPassword_resetsInput
    connect?: CommissionerWhereUniqueInput
    update?: XOR<XOR<CommissionerUpdateToOneWithWhereWithoutPassword_resetsInput, CommissionerUpdateWithoutPassword_resetsInput>, CommissionerUncheckedUpdateWithoutPassword_resetsInput>
  }

  export type AuctionItemCreateNestedManyWithoutFarmerInput = {
    create?: XOR<AuctionItemCreateWithoutFarmerInput, AuctionItemUncheckedCreateWithoutFarmerInput> | AuctionItemCreateWithoutFarmerInput[] | AuctionItemUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutFarmerInput | AuctionItemCreateOrConnectWithoutFarmerInput[]
    createMany?: AuctionItemCreateManyFarmerInputEnvelope
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
  }

  export type BillCreateNestedManyWithoutFarmerInput = {
    create?: XOR<BillCreateWithoutFarmerInput, BillUncheckedCreateWithoutFarmerInput> | BillCreateWithoutFarmerInput[] | BillUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: BillCreateOrConnectWithoutFarmerInput | BillCreateOrConnectWithoutFarmerInput[]
    createMany?: BillCreateManyFarmerInputEnvelope
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
  }

  export type CommissionerCreateNestedOneWithoutFarmersInput = {
    create?: XOR<CommissionerCreateWithoutFarmersInput, CommissionerUncheckedCreateWithoutFarmersInput>
    connectOrCreate?: CommissionerCreateOrConnectWithoutFarmersInput
    connect?: CommissionerWhereUniqueInput
  }

  export type AuctionItemUncheckedCreateNestedManyWithoutFarmerInput = {
    create?: XOR<AuctionItemCreateWithoutFarmerInput, AuctionItemUncheckedCreateWithoutFarmerInput> | AuctionItemCreateWithoutFarmerInput[] | AuctionItemUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutFarmerInput | AuctionItemCreateOrConnectWithoutFarmerInput[]
    createMany?: AuctionItemCreateManyFarmerInputEnvelope
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
  }

  export type BillUncheckedCreateNestedManyWithoutFarmerInput = {
    create?: XOR<BillCreateWithoutFarmerInput, BillUncheckedCreateWithoutFarmerInput> | BillCreateWithoutFarmerInput[] | BillUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: BillCreateOrConnectWithoutFarmerInput | BillCreateOrConnectWithoutFarmerInput[]
    createMany?: BillCreateManyFarmerInputEnvelope
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
  }

  export type AuctionItemUpdateManyWithoutFarmerNestedInput = {
    create?: XOR<AuctionItemCreateWithoutFarmerInput, AuctionItemUncheckedCreateWithoutFarmerInput> | AuctionItemCreateWithoutFarmerInput[] | AuctionItemUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutFarmerInput | AuctionItemCreateOrConnectWithoutFarmerInput[]
    upsert?: AuctionItemUpsertWithWhereUniqueWithoutFarmerInput | AuctionItemUpsertWithWhereUniqueWithoutFarmerInput[]
    createMany?: AuctionItemCreateManyFarmerInputEnvelope
    set?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    disconnect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    delete?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    update?: AuctionItemUpdateWithWhereUniqueWithoutFarmerInput | AuctionItemUpdateWithWhereUniqueWithoutFarmerInput[]
    updateMany?: AuctionItemUpdateManyWithWhereWithoutFarmerInput | AuctionItemUpdateManyWithWhereWithoutFarmerInput[]
    deleteMany?: AuctionItemScalarWhereInput | AuctionItemScalarWhereInput[]
  }

  export type BillUpdateManyWithoutFarmerNestedInput = {
    create?: XOR<BillCreateWithoutFarmerInput, BillUncheckedCreateWithoutFarmerInput> | BillCreateWithoutFarmerInput[] | BillUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: BillCreateOrConnectWithoutFarmerInput | BillCreateOrConnectWithoutFarmerInput[]
    upsert?: BillUpsertWithWhereUniqueWithoutFarmerInput | BillUpsertWithWhereUniqueWithoutFarmerInput[]
    createMany?: BillCreateManyFarmerInputEnvelope
    set?: BillWhereUniqueInput | BillWhereUniqueInput[]
    disconnect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    delete?: BillWhereUniqueInput | BillWhereUniqueInput[]
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    update?: BillUpdateWithWhereUniqueWithoutFarmerInput | BillUpdateWithWhereUniqueWithoutFarmerInput[]
    updateMany?: BillUpdateManyWithWhereWithoutFarmerInput | BillUpdateManyWithWhereWithoutFarmerInput[]
    deleteMany?: BillScalarWhereInput | BillScalarWhereInput[]
  }

  export type CommissionerUpdateOneRequiredWithoutFarmersNestedInput = {
    create?: XOR<CommissionerCreateWithoutFarmersInput, CommissionerUncheckedCreateWithoutFarmersInput>
    connectOrCreate?: CommissionerCreateOrConnectWithoutFarmersInput
    upsert?: CommissionerUpsertWithoutFarmersInput
    connect?: CommissionerWhereUniqueInput
    update?: XOR<XOR<CommissionerUpdateToOneWithWhereWithoutFarmersInput, CommissionerUpdateWithoutFarmersInput>, CommissionerUncheckedUpdateWithoutFarmersInput>
  }

  export type AuctionItemUncheckedUpdateManyWithoutFarmerNestedInput = {
    create?: XOR<AuctionItemCreateWithoutFarmerInput, AuctionItemUncheckedCreateWithoutFarmerInput> | AuctionItemCreateWithoutFarmerInput[] | AuctionItemUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutFarmerInput | AuctionItemCreateOrConnectWithoutFarmerInput[]
    upsert?: AuctionItemUpsertWithWhereUniqueWithoutFarmerInput | AuctionItemUpsertWithWhereUniqueWithoutFarmerInput[]
    createMany?: AuctionItemCreateManyFarmerInputEnvelope
    set?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    disconnect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    delete?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    update?: AuctionItemUpdateWithWhereUniqueWithoutFarmerInput | AuctionItemUpdateWithWhereUniqueWithoutFarmerInput[]
    updateMany?: AuctionItemUpdateManyWithWhereWithoutFarmerInput | AuctionItemUpdateManyWithWhereWithoutFarmerInput[]
    deleteMany?: AuctionItemScalarWhereInput | AuctionItemScalarWhereInput[]
  }

  export type BillUncheckedUpdateManyWithoutFarmerNestedInput = {
    create?: XOR<BillCreateWithoutFarmerInput, BillUncheckedCreateWithoutFarmerInput> | BillCreateWithoutFarmerInput[] | BillUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: BillCreateOrConnectWithoutFarmerInput | BillCreateOrConnectWithoutFarmerInput[]
    upsert?: BillUpsertWithWhereUniqueWithoutFarmerInput | BillUpsertWithWhereUniqueWithoutFarmerInput[]
    createMany?: BillCreateManyFarmerInputEnvelope
    set?: BillWhereUniqueInput | BillWhereUniqueInput[]
    disconnect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    delete?: BillWhereUniqueInput | BillWhereUniqueInput[]
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    update?: BillUpdateWithWhereUniqueWithoutFarmerInput | BillUpdateWithWhereUniqueWithoutFarmerInput[]
    updateMany?: BillUpdateManyWithWhereWithoutFarmerInput | BillUpdateManyWithWhereWithoutFarmerInput[]
    deleteMany?: BillScalarWhereInput | BillScalarWhereInput[]
  }

  export type AuctionItemCreateNestedManyWithoutBuyerInput = {
    create?: XOR<AuctionItemCreateWithoutBuyerInput, AuctionItemUncheckedCreateWithoutBuyerInput> | AuctionItemCreateWithoutBuyerInput[] | AuctionItemUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutBuyerInput | AuctionItemCreateOrConnectWithoutBuyerInput[]
    createMany?: AuctionItemCreateManyBuyerInputEnvelope
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
  }

  export type CommissionerCreateNestedOneWithoutBuyersInput = {
    create?: XOR<CommissionerCreateWithoutBuyersInput, CommissionerUncheckedCreateWithoutBuyersInput>
    connectOrCreate?: CommissionerCreateOrConnectWithoutBuyersInput
    connect?: CommissionerWhereUniqueInput
  }

  export type AuctionItemUncheckedCreateNestedManyWithoutBuyerInput = {
    create?: XOR<AuctionItemCreateWithoutBuyerInput, AuctionItemUncheckedCreateWithoutBuyerInput> | AuctionItemCreateWithoutBuyerInput[] | AuctionItemUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutBuyerInput | AuctionItemCreateOrConnectWithoutBuyerInput[]
    createMany?: AuctionItemCreateManyBuyerInputEnvelope
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
  }

  export type AuctionItemUpdateManyWithoutBuyerNestedInput = {
    create?: XOR<AuctionItemCreateWithoutBuyerInput, AuctionItemUncheckedCreateWithoutBuyerInput> | AuctionItemCreateWithoutBuyerInput[] | AuctionItemUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutBuyerInput | AuctionItemCreateOrConnectWithoutBuyerInput[]
    upsert?: AuctionItemUpsertWithWhereUniqueWithoutBuyerInput | AuctionItemUpsertWithWhereUniqueWithoutBuyerInput[]
    createMany?: AuctionItemCreateManyBuyerInputEnvelope
    set?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    disconnect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    delete?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    update?: AuctionItemUpdateWithWhereUniqueWithoutBuyerInput | AuctionItemUpdateWithWhereUniqueWithoutBuyerInput[]
    updateMany?: AuctionItemUpdateManyWithWhereWithoutBuyerInput | AuctionItemUpdateManyWithWhereWithoutBuyerInput[]
    deleteMany?: AuctionItemScalarWhereInput | AuctionItemScalarWhereInput[]
  }

  export type CommissionerUpdateOneRequiredWithoutBuyersNestedInput = {
    create?: XOR<CommissionerCreateWithoutBuyersInput, CommissionerUncheckedCreateWithoutBuyersInput>
    connectOrCreate?: CommissionerCreateOrConnectWithoutBuyersInput
    upsert?: CommissionerUpsertWithoutBuyersInput
    connect?: CommissionerWhereUniqueInput
    update?: XOR<XOR<CommissionerUpdateToOneWithWhereWithoutBuyersInput, CommissionerUpdateWithoutBuyersInput>, CommissionerUncheckedUpdateWithoutBuyersInput>
  }

  export type AuctionItemUncheckedUpdateManyWithoutBuyerNestedInput = {
    create?: XOR<AuctionItemCreateWithoutBuyerInput, AuctionItemUncheckedCreateWithoutBuyerInput> | AuctionItemCreateWithoutBuyerInput[] | AuctionItemUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutBuyerInput | AuctionItemCreateOrConnectWithoutBuyerInput[]
    upsert?: AuctionItemUpsertWithWhereUniqueWithoutBuyerInput | AuctionItemUpsertWithWhereUniqueWithoutBuyerInput[]
    createMany?: AuctionItemCreateManyBuyerInputEnvelope
    set?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    disconnect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    delete?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    update?: AuctionItemUpdateWithWhereUniqueWithoutBuyerInput | AuctionItemUpdateWithWhereUniqueWithoutBuyerInput[]
    updateMany?: AuctionItemUpdateManyWithWhereWithoutBuyerInput | AuctionItemUpdateManyWithWhereWithoutBuyerInput[]
    deleteMany?: AuctionItemScalarWhereInput | AuctionItemScalarWhereInput[]
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type AuctionItemCreateNestedManyWithoutProductInput = {
    create?: XOR<AuctionItemCreateWithoutProductInput, AuctionItemUncheckedCreateWithoutProductInput> | AuctionItemCreateWithoutProductInput[] | AuctionItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutProductInput | AuctionItemCreateOrConnectWithoutProductInput[]
    createMany?: AuctionItemCreateManyProductInputEnvelope
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
  }

  export type BillCreateNestedManyWithoutProductInput = {
    create?: XOR<BillCreateWithoutProductInput, BillUncheckedCreateWithoutProductInput> | BillCreateWithoutProductInput[] | BillUncheckedCreateWithoutProductInput[]
    connectOrCreate?: BillCreateOrConnectWithoutProductInput | BillCreateOrConnectWithoutProductInput[]
    createMany?: BillCreateManyProductInputEnvelope
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type AuctionItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<AuctionItemCreateWithoutProductInput, AuctionItemUncheckedCreateWithoutProductInput> | AuctionItemCreateWithoutProductInput[] | AuctionItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutProductInput | AuctionItemCreateOrConnectWithoutProductInput[]
    createMany?: AuctionItemCreateManyProductInputEnvelope
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
  }

  export type BillUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<BillCreateWithoutProductInput, BillUncheckedCreateWithoutProductInput> | BillCreateWithoutProductInput[] | BillUncheckedCreateWithoutProductInput[]
    connectOrCreate?: BillCreateOrConnectWithoutProductInput | BillCreateOrConnectWithoutProductInput[]
    createMany?: BillCreateManyProductInputEnvelope
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
  }

  export type AuctionItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<AuctionItemCreateWithoutProductInput, AuctionItemUncheckedCreateWithoutProductInput> | AuctionItemCreateWithoutProductInput[] | AuctionItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutProductInput | AuctionItemCreateOrConnectWithoutProductInput[]
    upsert?: AuctionItemUpsertWithWhereUniqueWithoutProductInput | AuctionItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: AuctionItemCreateManyProductInputEnvelope
    set?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    disconnect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    delete?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    update?: AuctionItemUpdateWithWhereUniqueWithoutProductInput | AuctionItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: AuctionItemUpdateManyWithWhereWithoutProductInput | AuctionItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: AuctionItemScalarWhereInput | AuctionItemScalarWhereInput[]
  }

  export type BillUpdateManyWithoutProductNestedInput = {
    create?: XOR<BillCreateWithoutProductInput, BillUncheckedCreateWithoutProductInput> | BillCreateWithoutProductInput[] | BillUncheckedCreateWithoutProductInput[]
    connectOrCreate?: BillCreateOrConnectWithoutProductInput | BillCreateOrConnectWithoutProductInput[]
    upsert?: BillUpsertWithWhereUniqueWithoutProductInput | BillUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: BillCreateManyProductInputEnvelope
    set?: BillWhereUniqueInput | BillWhereUniqueInput[]
    disconnect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    delete?: BillWhereUniqueInput | BillWhereUniqueInput[]
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    update?: BillUpdateWithWhereUniqueWithoutProductInput | BillUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: BillUpdateManyWithWhereWithoutProductInput | BillUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: BillScalarWhereInput | BillScalarWhereInput[]
  }

  export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type AuctionItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<AuctionItemCreateWithoutProductInput, AuctionItemUncheckedCreateWithoutProductInput> | AuctionItemCreateWithoutProductInput[] | AuctionItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutProductInput | AuctionItemCreateOrConnectWithoutProductInput[]
    upsert?: AuctionItemUpsertWithWhereUniqueWithoutProductInput | AuctionItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: AuctionItemCreateManyProductInputEnvelope
    set?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    disconnect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    delete?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    update?: AuctionItemUpdateWithWhereUniqueWithoutProductInput | AuctionItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: AuctionItemUpdateManyWithWhereWithoutProductInput | AuctionItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: AuctionItemScalarWhereInput | AuctionItemScalarWhereInput[]
  }

  export type BillUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<BillCreateWithoutProductInput, BillUncheckedCreateWithoutProductInput> | BillCreateWithoutProductInput[] | BillUncheckedCreateWithoutProductInput[]
    connectOrCreate?: BillCreateOrConnectWithoutProductInput | BillCreateOrConnectWithoutProductInput[]
    upsert?: BillUpsertWithWhereUniqueWithoutProductInput | BillUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: BillCreateManyProductInputEnvelope
    set?: BillWhereUniqueInput | BillWhereUniqueInput[]
    disconnect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    delete?: BillWhereUniqueInput | BillWhereUniqueInput[]
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    update?: BillUpdateWithWhereUniqueWithoutProductInput | BillUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: BillUpdateManyWithWhereWithoutProductInput | BillUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: BillScalarWhereInput | BillScalarWhereInput[]
  }

  export type AuctionItemCreateNestedManyWithoutSessionInput = {
    create?: XOR<AuctionItemCreateWithoutSessionInput, AuctionItemUncheckedCreateWithoutSessionInput> | AuctionItemCreateWithoutSessionInput[] | AuctionItemUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutSessionInput | AuctionItemCreateOrConnectWithoutSessionInput[]
    createMany?: AuctionItemCreateManySessionInputEnvelope
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
  }

  export type CommissionerCreateNestedOneWithoutAuction_sessionsInput = {
    create?: XOR<CommissionerCreateWithoutAuction_sessionsInput, CommissionerUncheckedCreateWithoutAuction_sessionsInput>
    connectOrCreate?: CommissionerCreateOrConnectWithoutAuction_sessionsInput
    connect?: CommissionerWhereUniqueInput
  }

  export type AuctionItemUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<AuctionItemCreateWithoutSessionInput, AuctionItemUncheckedCreateWithoutSessionInput> | AuctionItemCreateWithoutSessionInput[] | AuctionItemUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutSessionInput | AuctionItemCreateOrConnectWithoutSessionInput[]
    createMany?: AuctionItemCreateManySessionInputEnvelope
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
  }

  export type EnumSessionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SessionStatus
  }

  export type EnumSessionPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.SessionPaymentStatus
  }

  export type AuctionItemUpdateManyWithoutSessionNestedInput = {
    create?: XOR<AuctionItemCreateWithoutSessionInput, AuctionItemUncheckedCreateWithoutSessionInput> | AuctionItemCreateWithoutSessionInput[] | AuctionItemUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutSessionInput | AuctionItemCreateOrConnectWithoutSessionInput[]
    upsert?: AuctionItemUpsertWithWhereUniqueWithoutSessionInput | AuctionItemUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: AuctionItemCreateManySessionInputEnvelope
    set?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    disconnect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    delete?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    update?: AuctionItemUpdateWithWhereUniqueWithoutSessionInput | AuctionItemUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: AuctionItemUpdateManyWithWhereWithoutSessionInput | AuctionItemUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: AuctionItemScalarWhereInput | AuctionItemScalarWhereInput[]
  }

  export type CommissionerUpdateOneRequiredWithoutAuction_sessionsNestedInput = {
    create?: XOR<CommissionerCreateWithoutAuction_sessionsInput, CommissionerUncheckedCreateWithoutAuction_sessionsInput>
    connectOrCreate?: CommissionerCreateOrConnectWithoutAuction_sessionsInput
    upsert?: CommissionerUpsertWithoutAuction_sessionsInput
    connect?: CommissionerWhereUniqueInput
    update?: XOR<XOR<CommissionerUpdateToOneWithWhereWithoutAuction_sessionsInput, CommissionerUpdateWithoutAuction_sessionsInput>, CommissionerUncheckedUpdateWithoutAuction_sessionsInput>
  }

  export type AuctionItemUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<AuctionItemCreateWithoutSessionInput, AuctionItemUncheckedCreateWithoutSessionInput> | AuctionItemCreateWithoutSessionInput[] | AuctionItemUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutSessionInput | AuctionItemCreateOrConnectWithoutSessionInput[]
    upsert?: AuctionItemUpsertWithWhereUniqueWithoutSessionInput | AuctionItemUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: AuctionItemCreateManySessionInputEnvelope
    set?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    disconnect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    delete?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    update?: AuctionItemUpdateWithWhereUniqueWithoutSessionInput | AuctionItemUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: AuctionItemUpdateManyWithWhereWithoutSessionInput | AuctionItemUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: AuctionItemScalarWhereInput | AuctionItemScalarWhereInput[]
  }

  export type BillCreateNestedOneWithoutAuction_itemsInput = {
    create?: XOR<BillCreateWithoutAuction_itemsInput, BillUncheckedCreateWithoutAuction_itemsInput>
    connectOrCreate?: BillCreateOrConnectWithoutAuction_itemsInput
    connect?: BillWhereUniqueInput
  }

  export type BuyerCreateNestedOneWithoutAuction_itemsInput = {
    create?: XOR<BuyerCreateWithoutAuction_itemsInput, BuyerUncheckedCreateWithoutAuction_itemsInput>
    connectOrCreate?: BuyerCreateOrConnectWithoutAuction_itemsInput
    connect?: BuyerWhereUniqueInput
  }

  export type FarmerCreateNestedOneWithoutAuction_itemsInput = {
    create?: XOR<FarmerCreateWithoutAuction_itemsInput, FarmerUncheckedCreateWithoutAuction_itemsInput>
    connectOrCreate?: FarmerCreateOrConnectWithoutAuction_itemsInput
    connect?: FarmerWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutAuction_itemsInput = {
    create?: XOR<ProductCreateWithoutAuction_itemsInput, ProductUncheckedCreateWithoutAuction_itemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutAuction_itemsInput
    connect?: ProductWhereUniqueInput
  }

  export type AuctionSessionCreateNestedOneWithoutAuction_itemsInput = {
    create?: XOR<AuctionSessionCreateWithoutAuction_itemsInput, AuctionSessionUncheckedCreateWithoutAuction_itemsInput>
    connectOrCreate?: AuctionSessionCreateOrConnectWithoutAuction_itemsInput
    connect?: AuctionSessionWhereUniqueInput
  }

  export type EnumUnitFieldUpdateOperationsInput = {
    set?: $Enums.Unit
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BillUpdateOneWithoutAuction_itemsNestedInput = {
    create?: XOR<BillCreateWithoutAuction_itemsInput, BillUncheckedCreateWithoutAuction_itemsInput>
    connectOrCreate?: BillCreateOrConnectWithoutAuction_itemsInput
    upsert?: BillUpsertWithoutAuction_itemsInput
    disconnect?: BillWhereInput | boolean
    delete?: BillWhereInput | boolean
    connect?: BillWhereUniqueInput
    update?: XOR<XOR<BillUpdateToOneWithWhereWithoutAuction_itemsInput, BillUpdateWithoutAuction_itemsInput>, BillUncheckedUpdateWithoutAuction_itemsInput>
  }

  export type BuyerUpdateOneWithoutAuction_itemsNestedInput = {
    create?: XOR<BuyerCreateWithoutAuction_itemsInput, BuyerUncheckedCreateWithoutAuction_itemsInput>
    connectOrCreate?: BuyerCreateOrConnectWithoutAuction_itemsInput
    upsert?: BuyerUpsertWithoutAuction_itemsInput
    disconnect?: BuyerWhereInput | boolean
    delete?: BuyerWhereInput | boolean
    connect?: BuyerWhereUniqueInput
    update?: XOR<XOR<BuyerUpdateToOneWithWhereWithoutAuction_itemsInput, BuyerUpdateWithoutAuction_itemsInput>, BuyerUncheckedUpdateWithoutAuction_itemsInput>
  }

  export type FarmerUpdateOneRequiredWithoutAuction_itemsNestedInput = {
    create?: XOR<FarmerCreateWithoutAuction_itemsInput, FarmerUncheckedCreateWithoutAuction_itemsInput>
    connectOrCreate?: FarmerCreateOrConnectWithoutAuction_itemsInput
    upsert?: FarmerUpsertWithoutAuction_itemsInput
    connect?: FarmerWhereUniqueInput
    update?: XOR<XOR<FarmerUpdateToOneWithWhereWithoutAuction_itemsInput, FarmerUpdateWithoutAuction_itemsInput>, FarmerUncheckedUpdateWithoutAuction_itemsInput>
  }

  export type ProductUpdateOneRequiredWithoutAuction_itemsNestedInput = {
    create?: XOR<ProductCreateWithoutAuction_itemsInput, ProductUncheckedCreateWithoutAuction_itemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutAuction_itemsInput
    upsert?: ProductUpsertWithoutAuction_itemsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutAuction_itemsInput, ProductUpdateWithoutAuction_itemsInput>, ProductUncheckedUpdateWithoutAuction_itemsInput>
  }

  export type AuctionSessionUpdateOneRequiredWithoutAuction_itemsNestedInput = {
    create?: XOR<AuctionSessionCreateWithoutAuction_itemsInput, AuctionSessionUncheckedCreateWithoutAuction_itemsInput>
    connectOrCreate?: AuctionSessionCreateOrConnectWithoutAuction_itemsInput
    upsert?: AuctionSessionUpsertWithoutAuction_itemsInput
    connect?: AuctionSessionWhereUniqueInput
    update?: XOR<XOR<AuctionSessionUpdateToOneWithWhereWithoutAuction_itemsInput, AuctionSessionUpdateWithoutAuction_itemsInput>, AuctionSessionUncheckedUpdateWithoutAuction_itemsInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type AuctionItemCreateNestedManyWithoutBillInput = {
    create?: XOR<AuctionItemCreateWithoutBillInput, AuctionItemUncheckedCreateWithoutBillInput> | AuctionItemCreateWithoutBillInput[] | AuctionItemUncheckedCreateWithoutBillInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutBillInput | AuctionItemCreateOrConnectWithoutBillInput[]
    createMany?: AuctionItemCreateManyBillInputEnvelope
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
  }

  export type CommissionerCreateNestedOneWithoutBillsInput = {
    create?: XOR<CommissionerCreateWithoutBillsInput, CommissionerUncheckedCreateWithoutBillsInput>
    connectOrCreate?: CommissionerCreateOrConnectWithoutBillsInput
    connect?: CommissionerWhereUniqueInput
  }

  export type FarmerCreateNestedOneWithoutBillsInput = {
    create?: XOR<FarmerCreateWithoutBillsInput, FarmerUncheckedCreateWithoutBillsInput>
    connectOrCreate?: FarmerCreateOrConnectWithoutBillsInput
    connect?: FarmerWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutBillsInput = {
    create?: XOR<ProductCreateWithoutBillsInput, ProductUncheckedCreateWithoutBillsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutBillsInput
    connect?: ProductWhereUniqueInput
  }

  export type AuctionItemUncheckedCreateNestedManyWithoutBillInput = {
    create?: XOR<AuctionItemCreateWithoutBillInput, AuctionItemUncheckedCreateWithoutBillInput> | AuctionItemCreateWithoutBillInput[] | AuctionItemUncheckedCreateWithoutBillInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutBillInput | AuctionItemCreateOrConnectWithoutBillInput[]
    createMany?: AuctionItemCreateManyBillInputEnvelope
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
  }

  export type EnumBillPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.BillPaymentStatus
  }

  export type AuctionItemUpdateManyWithoutBillNestedInput = {
    create?: XOR<AuctionItemCreateWithoutBillInput, AuctionItemUncheckedCreateWithoutBillInput> | AuctionItemCreateWithoutBillInput[] | AuctionItemUncheckedCreateWithoutBillInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutBillInput | AuctionItemCreateOrConnectWithoutBillInput[]
    upsert?: AuctionItemUpsertWithWhereUniqueWithoutBillInput | AuctionItemUpsertWithWhereUniqueWithoutBillInput[]
    createMany?: AuctionItemCreateManyBillInputEnvelope
    set?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    disconnect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    delete?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    update?: AuctionItemUpdateWithWhereUniqueWithoutBillInput | AuctionItemUpdateWithWhereUniqueWithoutBillInput[]
    updateMany?: AuctionItemUpdateManyWithWhereWithoutBillInput | AuctionItemUpdateManyWithWhereWithoutBillInput[]
    deleteMany?: AuctionItemScalarWhereInput | AuctionItemScalarWhereInput[]
  }

  export type CommissionerUpdateOneRequiredWithoutBillsNestedInput = {
    create?: XOR<CommissionerCreateWithoutBillsInput, CommissionerUncheckedCreateWithoutBillsInput>
    connectOrCreate?: CommissionerCreateOrConnectWithoutBillsInput
    upsert?: CommissionerUpsertWithoutBillsInput
    connect?: CommissionerWhereUniqueInput
    update?: XOR<XOR<CommissionerUpdateToOneWithWhereWithoutBillsInput, CommissionerUpdateWithoutBillsInput>, CommissionerUncheckedUpdateWithoutBillsInput>
  }

  export type FarmerUpdateOneRequiredWithoutBillsNestedInput = {
    create?: XOR<FarmerCreateWithoutBillsInput, FarmerUncheckedCreateWithoutBillsInput>
    connectOrCreate?: FarmerCreateOrConnectWithoutBillsInput
    upsert?: FarmerUpsertWithoutBillsInput
    connect?: FarmerWhereUniqueInput
    update?: XOR<XOR<FarmerUpdateToOneWithWhereWithoutBillsInput, FarmerUpdateWithoutBillsInput>, FarmerUncheckedUpdateWithoutBillsInput>
  }

  export type ProductUpdateOneRequiredWithoutBillsNestedInput = {
    create?: XOR<ProductCreateWithoutBillsInput, ProductUncheckedCreateWithoutBillsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutBillsInput
    upsert?: ProductUpsertWithoutBillsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutBillsInput, ProductUpdateWithoutBillsInput>, ProductUncheckedUpdateWithoutBillsInput>
  }

  export type AuctionItemUncheckedUpdateManyWithoutBillNestedInput = {
    create?: XOR<AuctionItemCreateWithoutBillInput, AuctionItemUncheckedCreateWithoutBillInput> | AuctionItemCreateWithoutBillInput[] | AuctionItemUncheckedCreateWithoutBillInput[]
    connectOrCreate?: AuctionItemCreateOrConnectWithoutBillInput | AuctionItemCreateOrConnectWithoutBillInput[]
    upsert?: AuctionItemUpsertWithWhereUniqueWithoutBillInput | AuctionItemUpsertWithWhereUniqueWithoutBillInput[]
    createMany?: AuctionItemCreateManyBillInputEnvelope
    set?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    disconnect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    delete?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    connect?: AuctionItemWhereUniqueInput | AuctionItemWhereUniqueInput[]
    update?: AuctionItemUpdateWithWhereUniqueWithoutBillInput | AuctionItemUpdateWithWhereUniqueWithoutBillInput[]
    updateMany?: AuctionItemUpdateManyWithWhereWithoutBillInput | AuctionItemUpdateManyWithWhereWithoutBillInput[]
    deleteMany?: AuctionItemScalarWhereInput | AuctionItemScalarWhereInput[]
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusFilter<$PrismaModel> | $Enums.SessionStatus
  }

  export type NestedEnumSessionPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionPaymentStatus | EnumSessionPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionPaymentStatus[] | ListEnumSessionPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionPaymentStatus[] | ListEnumSessionPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionPaymentStatusFilter<$PrismaModel> | $Enums.SessionPaymentStatus
  }

  export type NestedEnumSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumSessionStatusFilter<$PrismaModel>
  }

  export type NestedEnumSessionPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionPaymentStatus | EnumSessionPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionPaymentStatus[] | ListEnumSessionPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionPaymentStatus[] | ListEnumSessionPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.SessionPaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumSessionPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.Unit | EnumUnitFieldRefInput<$PrismaModel>
    in?: $Enums.Unit[] | ListEnumUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.Unit[] | ListEnumUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumUnitFilter<$PrismaModel> | $Enums.Unit
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

  export type NestedEnumUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Unit | EnumUnitFieldRefInput<$PrismaModel>
    in?: $Enums.Unit[] | ListEnumUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.Unit[] | ListEnumUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumUnitWithAggregatesFilter<$PrismaModel> | $Enums.Unit
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUnitFilter<$PrismaModel>
    _max?: NestedEnumUnitFilter<$PrismaModel>
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

  export type NestedEnumBillPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BillPaymentStatus | EnumBillPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BillPaymentStatus[] | ListEnumBillPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BillPaymentStatus[] | ListEnumBillPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBillPaymentStatusFilter<$PrismaModel> | $Enums.BillPaymentStatus
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

  export type NestedEnumBillPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BillPaymentStatus | EnumBillPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BillPaymentStatus[] | ListEnumBillPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BillPaymentStatus[] | ListEnumBillPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBillPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.BillPaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBillPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumBillPaymentStatusFilter<$PrismaModel>
  }

  export type AuctionSessionCreateWithoutCommissionerInput = {
    id?: string
    date?: Date | string
    status?: $Enums.SessionStatus
    payment_status?: $Enums.SessionPaymentStatus
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemCreateNestedManyWithoutSessionInput
  }

  export type AuctionSessionUncheckedCreateWithoutCommissionerInput = {
    id?: string
    date?: Date | string
    status?: $Enums.SessionStatus
    payment_status?: $Enums.SessionPaymentStatus
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemUncheckedCreateNestedManyWithoutSessionInput
  }

  export type AuctionSessionCreateOrConnectWithoutCommissionerInput = {
    where: AuctionSessionWhereUniqueInput
    create: XOR<AuctionSessionCreateWithoutCommissionerInput, AuctionSessionUncheckedCreateWithoutCommissionerInput>
  }

  export type AuctionSessionCreateManyCommissionerInputEnvelope = {
    data: AuctionSessionCreateManyCommissionerInput | AuctionSessionCreateManyCommissionerInput[]
    skipDuplicates?: boolean
  }

  export type BillCreateWithoutCommissionerInput = {
    id?: string
    bill_number: string
    session_id: string
    total_quantity: number
    gross_amount: number
    commission_rate: number
    commission_amount: number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable: number
    payment_status?: $Enums.BillPaymentStatus
    payment_method?: string | null
    payment_date?: Date | string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemCreateNestedManyWithoutBillInput
    farmer: FarmerCreateNestedOneWithoutBillsInput
    product: ProductCreateNestedOneWithoutBillsInput
  }

  export type BillUncheckedCreateWithoutCommissionerInput = {
    id?: string
    bill_number: string
    farmer_id: string
    product_id: string
    session_id: string
    total_quantity: number
    gross_amount: number
    commission_rate: number
    commission_amount: number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable: number
    payment_status?: $Enums.BillPaymentStatus
    payment_method?: string | null
    payment_date?: Date | string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemUncheckedCreateNestedManyWithoutBillInput
  }

  export type BillCreateOrConnectWithoutCommissionerInput = {
    where: BillWhereUniqueInput
    create: XOR<BillCreateWithoutCommissionerInput, BillUncheckedCreateWithoutCommissionerInput>
  }

  export type BillCreateManyCommissionerInputEnvelope = {
    data: BillCreateManyCommissionerInput | BillCreateManyCommissionerInput[]
    skipDuplicates?: boolean
  }

  export type BuyerCreateWithoutCommissionerInput = {
    id?: string
    name: string
    phone: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemCreateNestedManyWithoutBuyerInput
  }

  export type BuyerUncheckedCreateWithoutCommissionerInput = {
    id?: string
    name: string
    phone: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemUncheckedCreateNestedManyWithoutBuyerInput
  }

  export type BuyerCreateOrConnectWithoutCommissionerInput = {
    where: BuyerWhereUniqueInput
    create: XOR<BuyerCreateWithoutCommissionerInput, BuyerUncheckedCreateWithoutCommissionerInput>
  }

  export type BuyerCreateManyCommissionerInputEnvelope = {
    data: BuyerCreateManyCommissionerInput | BuyerCreateManyCommissionerInput[]
    skipDuplicates?: boolean
  }

  export type FarmerCreateWithoutCommissionerInput = {
    id?: string
    name: string
    phone: string
    village: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemCreateNestedManyWithoutFarmerInput
    bills?: BillCreateNestedManyWithoutFarmerInput
  }

  export type FarmerUncheckedCreateWithoutCommissionerInput = {
    id?: string
    name: string
    phone: string
    village: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemUncheckedCreateNestedManyWithoutFarmerInput
    bills?: BillUncheckedCreateNestedManyWithoutFarmerInput
  }

  export type FarmerCreateOrConnectWithoutCommissionerInput = {
    where: FarmerWhereUniqueInput
    create: XOR<FarmerCreateWithoutCommissionerInput, FarmerUncheckedCreateWithoutCommissionerInput>
  }

  export type FarmerCreateManyCommissionerInputEnvelope = {
    data: FarmerCreateManyCommissionerInput | FarmerCreateManyCommissionerInput[]
    skipDuplicates?: boolean
  }

  export type PasswordResetCreateWithoutCommissionerInput = {
    id?: string
    token: string
    expires_at: Date | string
    used?: boolean
    created_at?: Date | string
    used_at?: Date | string | null
  }

  export type PasswordResetUncheckedCreateWithoutCommissionerInput = {
    id?: string
    token: string
    expires_at: Date | string
    used?: boolean
    created_at?: Date | string
    used_at?: Date | string | null
  }

  export type PasswordResetCreateOrConnectWithoutCommissionerInput = {
    where: PasswordResetWhereUniqueInput
    create: XOR<PasswordResetCreateWithoutCommissionerInput, PasswordResetUncheckedCreateWithoutCommissionerInput>
  }

  export type PasswordResetCreateManyCommissionerInputEnvelope = {
    data: PasswordResetCreateManyCommissionerInput | PasswordResetCreateManyCommissionerInput[]
    skipDuplicates?: boolean
  }

  export type AuctionSessionUpsertWithWhereUniqueWithoutCommissionerInput = {
    where: AuctionSessionWhereUniqueInput
    update: XOR<AuctionSessionUpdateWithoutCommissionerInput, AuctionSessionUncheckedUpdateWithoutCommissionerInput>
    create: XOR<AuctionSessionCreateWithoutCommissionerInput, AuctionSessionUncheckedCreateWithoutCommissionerInput>
  }

  export type AuctionSessionUpdateWithWhereUniqueWithoutCommissionerInput = {
    where: AuctionSessionWhereUniqueInput
    data: XOR<AuctionSessionUpdateWithoutCommissionerInput, AuctionSessionUncheckedUpdateWithoutCommissionerInput>
  }

  export type AuctionSessionUpdateManyWithWhereWithoutCommissionerInput = {
    where: AuctionSessionScalarWhereInput
    data: XOR<AuctionSessionUpdateManyMutationInput, AuctionSessionUncheckedUpdateManyWithoutCommissionerInput>
  }

  export type AuctionSessionScalarWhereInput = {
    AND?: AuctionSessionScalarWhereInput | AuctionSessionScalarWhereInput[]
    OR?: AuctionSessionScalarWhereInput[]
    NOT?: AuctionSessionScalarWhereInput | AuctionSessionScalarWhereInput[]
    id?: StringFilter<"AuctionSession"> | string
    date?: DateTimeFilter<"AuctionSession"> | Date | string
    commissioner_id?: StringFilter<"AuctionSession"> | string
    status?: EnumSessionStatusFilter<"AuctionSession"> | $Enums.SessionStatus
    payment_status?: EnumSessionPaymentStatusFilter<"AuctionSession"> | $Enums.SessionPaymentStatus
    created_at?: DateTimeFilter<"AuctionSession"> | Date | string
    updated_at?: DateTimeFilter<"AuctionSession"> | Date | string
  }

  export type BillUpsertWithWhereUniqueWithoutCommissionerInput = {
    where: BillWhereUniqueInput
    update: XOR<BillUpdateWithoutCommissionerInput, BillUncheckedUpdateWithoutCommissionerInput>
    create: XOR<BillCreateWithoutCommissionerInput, BillUncheckedCreateWithoutCommissionerInput>
  }

  export type BillUpdateWithWhereUniqueWithoutCommissionerInput = {
    where: BillWhereUniqueInput
    data: XOR<BillUpdateWithoutCommissionerInput, BillUncheckedUpdateWithoutCommissionerInput>
  }

  export type BillUpdateManyWithWhereWithoutCommissionerInput = {
    where: BillScalarWhereInput
    data: XOR<BillUpdateManyMutationInput, BillUncheckedUpdateManyWithoutCommissionerInput>
  }

  export type BillScalarWhereInput = {
    AND?: BillScalarWhereInput | BillScalarWhereInput[]
    OR?: BillScalarWhereInput[]
    NOT?: BillScalarWhereInput | BillScalarWhereInput[]
    id?: StringFilter<"Bill"> | string
    bill_number?: StringFilter<"Bill"> | string
    farmer_id?: StringFilter<"Bill"> | string
    commissioner_id?: StringFilter<"Bill"> | string
    product_id?: StringFilter<"Bill"> | string
    session_id?: StringFilter<"Bill"> | string
    total_quantity?: FloatFilter<"Bill"> | number
    gross_amount?: FloatFilter<"Bill"> | number
    commission_rate?: FloatFilter<"Bill"> | number
    commission_amount?: FloatFilter<"Bill"> | number
    other_charges?: JsonFilter<"Bill">
    net_payable?: FloatFilter<"Bill"> | number
    payment_status?: EnumBillPaymentStatusFilter<"Bill"> | $Enums.BillPaymentStatus
    payment_method?: StringNullableFilter<"Bill"> | string | null
    payment_date?: DateTimeNullableFilter<"Bill"> | Date | string | null
    notes?: StringNullableFilter<"Bill"> | string | null
    created_at?: DateTimeFilter<"Bill"> | Date | string
    updated_at?: DateTimeFilter<"Bill"> | Date | string
  }

  export type BuyerUpsertWithWhereUniqueWithoutCommissionerInput = {
    where: BuyerWhereUniqueInput
    update: XOR<BuyerUpdateWithoutCommissionerInput, BuyerUncheckedUpdateWithoutCommissionerInput>
    create: XOR<BuyerCreateWithoutCommissionerInput, BuyerUncheckedCreateWithoutCommissionerInput>
  }

  export type BuyerUpdateWithWhereUniqueWithoutCommissionerInput = {
    where: BuyerWhereUniqueInput
    data: XOR<BuyerUpdateWithoutCommissionerInput, BuyerUncheckedUpdateWithoutCommissionerInput>
  }

  export type BuyerUpdateManyWithWhereWithoutCommissionerInput = {
    where: BuyerScalarWhereInput
    data: XOR<BuyerUpdateManyMutationInput, BuyerUncheckedUpdateManyWithoutCommissionerInput>
  }

  export type BuyerScalarWhereInput = {
    AND?: BuyerScalarWhereInput | BuyerScalarWhereInput[]
    OR?: BuyerScalarWhereInput[]
    NOT?: BuyerScalarWhereInput | BuyerScalarWhereInput[]
    id?: StringFilter<"Buyer"> | string
    name?: StringFilter<"Buyer"> | string
    phone?: StringFilter<"Buyer"> | string
    commissioner_id?: StringFilter<"Buyer"> | string
    is_active?: BoolFilter<"Buyer"> | boolean
    created_at?: DateTimeFilter<"Buyer"> | Date | string
    updated_at?: DateTimeFilter<"Buyer"> | Date | string
  }

  export type FarmerUpsertWithWhereUniqueWithoutCommissionerInput = {
    where: FarmerWhereUniqueInput
    update: XOR<FarmerUpdateWithoutCommissionerInput, FarmerUncheckedUpdateWithoutCommissionerInput>
    create: XOR<FarmerCreateWithoutCommissionerInput, FarmerUncheckedCreateWithoutCommissionerInput>
  }

  export type FarmerUpdateWithWhereUniqueWithoutCommissionerInput = {
    where: FarmerWhereUniqueInput
    data: XOR<FarmerUpdateWithoutCommissionerInput, FarmerUncheckedUpdateWithoutCommissionerInput>
  }

  export type FarmerUpdateManyWithWhereWithoutCommissionerInput = {
    where: FarmerScalarWhereInput
    data: XOR<FarmerUpdateManyMutationInput, FarmerUncheckedUpdateManyWithoutCommissionerInput>
  }

  export type FarmerScalarWhereInput = {
    AND?: FarmerScalarWhereInput | FarmerScalarWhereInput[]
    OR?: FarmerScalarWhereInput[]
    NOT?: FarmerScalarWhereInput | FarmerScalarWhereInput[]
    id?: StringFilter<"Farmer"> | string
    name?: StringFilter<"Farmer"> | string
    phone?: StringFilter<"Farmer"> | string
    village?: StringFilter<"Farmer"> | string
    commissioner_id?: StringFilter<"Farmer"> | string
    is_active?: BoolFilter<"Farmer"> | boolean
    created_at?: DateTimeFilter<"Farmer"> | Date | string
    updated_at?: DateTimeFilter<"Farmer"> | Date | string
  }

  export type PasswordResetUpsertWithWhereUniqueWithoutCommissionerInput = {
    where: PasswordResetWhereUniqueInput
    update: XOR<PasswordResetUpdateWithoutCommissionerInput, PasswordResetUncheckedUpdateWithoutCommissionerInput>
    create: XOR<PasswordResetCreateWithoutCommissionerInput, PasswordResetUncheckedCreateWithoutCommissionerInput>
  }

  export type PasswordResetUpdateWithWhereUniqueWithoutCommissionerInput = {
    where: PasswordResetWhereUniqueInput
    data: XOR<PasswordResetUpdateWithoutCommissionerInput, PasswordResetUncheckedUpdateWithoutCommissionerInput>
  }

  export type PasswordResetUpdateManyWithWhereWithoutCommissionerInput = {
    where: PasswordResetScalarWhereInput
    data: XOR<PasswordResetUpdateManyMutationInput, PasswordResetUncheckedUpdateManyWithoutCommissionerInput>
  }

  export type PasswordResetScalarWhereInput = {
    AND?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
    OR?: PasswordResetScalarWhereInput[]
    NOT?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
    id?: StringFilter<"PasswordReset"> | string
    commissioner_id?: StringFilter<"PasswordReset"> | string
    token?: StringFilter<"PasswordReset"> | string
    expires_at?: DateTimeFilter<"PasswordReset"> | Date | string
    used?: BoolFilter<"PasswordReset"> | boolean
    created_at?: DateTimeFilter<"PasswordReset"> | Date | string
    used_at?: DateTimeNullableFilter<"PasswordReset"> | Date | string | null
  }

  export type CommissionerCreateWithoutPassword_resetsInput = {
    id?: string
    name: string
    location: string
    phone: string
    email: string
    password: string
    commission_rate?: number
    created_at?: Date | string
    updated_at?: Date | string
    auction_sessions?: AuctionSessionCreateNestedManyWithoutCommissionerInput
    bills?: BillCreateNestedManyWithoutCommissionerInput
    buyers?: BuyerCreateNestedManyWithoutCommissionerInput
    farmers?: FarmerCreateNestedManyWithoutCommissionerInput
  }

  export type CommissionerUncheckedCreateWithoutPassword_resetsInput = {
    id?: string
    name: string
    location: string
    phone: string
    email: string
    password: string
    commission_rate?: number
    created_at?: Date | string
    updated_at?: Date | string
    auction_sessions?: AuctionSessionUncheckedCreateNestedManyWithoutCommissionerInput
    bills?: BillUncheckedCreateNestedManyWithoutCommissionerInput
    buyers?: BuyerUncheckedCreateNestedManyWithoutCommissionerInput
    farmers?: FarmerUncheckedCreateNestedManyWithoutCommissionerInput
  }

  export type CommissionerCreateOrConnectWithoutPassword_resetsInput = {
    where: CommissionerWhereUniqueInput
    create: XOR<CommissionerCreateWithoutPassword_resetsInput, CommissionerUncheckedCreateWithoutPassword_resetsInput>
  }

  export type CommissionerUpsertWithoutPassword_resetsInput = {
    update: XOR<CommissionerUpdateWithoutPassword_resetsInput, CommissionerUncheckedUpdateWithoutPassword_resetsInput>
    create: XOR<CommissionerCreateWithoutPassword_resetsInput, CommissionerUncheckedCreateWithoutPassword_resetsInput>
    where?: CommissionerWhereInput
  }

  export type CommissionerUpdateToOneWithWhereWithoutPassword_resetsInput = {
    where?: CommissionerWhereInput
    data: XOR<CommissionerUpdateWithoutPassword_resetsInput, CommissionerUncheckedUpdateWithoutPassword_resetsInput>
  }

  export type CommissionerUpdateWithoutPassword_resetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    commission_rate?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_sessions?: AuctionSessionUpdateManyWithoutCommissionerNestedInput
    bills?: BillUpdateManyWithoutCommissionerNestedInput
    buyers?: BuyerUpdateManyWithoutCommissionerNestedInput
    farmers?: FarmerUpdateManyWithoutCommissionerNestedInput
  }

  export type CommissionerUncheckedUpdateWithoutPassword_resetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    commission_rate?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_sessions?: AuctionSessionUncheckedUpdateManyWithoutCommissionerNestedInput
    bills?: BillUncheckedUpdateManyWithoutCommissionerNestedInput
    buyers?: BuyerUncheckedUpdateManyWithoutCommissionerNestedInput
    farmers?: FarmerUncheckedUpdateManyWithoutCommissionerNestedInput
  }

  export type AuctionItemCreateWithoutFarmerInput = {
    id?: string
    unit: $Enums.Unit
    quantity: number
    created_at?: Date | string
    updated_at?: Date | string
    rate?: number | null
    bill?: BillCreateNestedOneWithoutAuction_itemsInput
    buyer?: BuyerCreateNestedOneWithoutAuction_itemsInput
    product: ProductCreateNestedOneWithoutAuction_itemsInput
    session: AuctionSessionCreateNestedOneWithoutAuction_itemsInput
  }

  export type AuctionItemUncheckedCreateWithoutFarmerInput = {
    id?: string
    session_id: string
    product_id: string
    unit: $Enums.Unit
    quantity: number
    buyer_id?: string | null
    bill_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    rate?: number | null
  }

  export type AuctionItemCreateOrConnectWithoutFarmerInput = {
    where: AuctionItemWhereUniqueInput
    create: XOR<AuctionItemCreateWithoutFarmerInput, AuctionItemUncheckedCreateWithoutFarmerInput>
  }

  export type AuctionItemCreateManyFarmerInputEnvelope = {
    data: AuctionItemCreateManyFarmerInput | AuctionItemCreateManyFarmerInput[]
    skipDuplicates?: boolean
  }

  export type BillCreateWithoutFarmerInput = {
    id?: string
    bill_number: string
    session_id: string
    total_quantity: number
    gross_amount: number
    commission_rate: number
    commission_amount: number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable: number
    payment_status?: $Enums.BillPaymentStatus
    payment_method?: string | null
    payment_date?: Date | string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemCreateNestedManyWithoutBillInput
    commissioner: CommissionerCreateNestedOneWithoutBillsInput
    product: ProductCreateNestedOneWithoutBillsInput
  }

  export type BillUncheckedCreateWithoutFarmerInput = {
    id?: string
    bill_number: string
    commissioner_id: string
    product_id: string
    session_id: string
    total_quantity: number
    gross_amount: number
    commission_rate: number
    commission_amount: number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable: number
    payment_status?: $Enums.BillPaymentStatus
    payment_method?: string | null
    payment_date?: Date | string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemUncheckedCreateNestedManyWithoutBillInput
  }

  export type BillCreateOrConnectWithoutFarmerInput = {
    where: BillWhereUniqueInput
    create: XOR<BillCreateWithoutFarmerInput, BillUncheckedCreateWithoutFarmerInput>
  }

  export type BillCreateManyFarmerInputEnvelope = {
    data: BillCreateManyFarmerInput | BillCreateManyFarmerInput[]
    skipDuplicates?: boolean
  }

  export type CommissionerCreateWithoutFarmersInput = {
    id?: string
    name: string
    location: string
    phone: string
    email: string
    password: string
    commission_rate?: number
    created_at?: Date | string
    updated_at?: Date | string
    auction_sessions?: AuctionSessionCreateNestedManyWithoutCommissionerInput
    bills?: BillCreateNestedManyWithoutCommissionerInput
    buyers?: BuyerCreateNestedManyWithoutCommissionerInput
    password_resets?: PasswordResetCreateNestedManyWithoutCommissionerInput
  }

  export type CommissionerUncheckedCreateWithoutFarmersInput = {
    id?: string
    name: string
    location: string
    phone: string
    email: string
    password: string
    commission_rate?: number
    created_at?: Date | string
    updated_at?: Date | string
    auction_sessions?: AuctionSessionUncheckedCreateNestedManyWithoutCommissionerInput
    bills?: BillUncheckedCreateNestedManyWithoutCommissionerInput
    buyers?: BuyerUncheckedCreateNestedManyWithoutCommissionerInput
    password_resets?: PasswordResetUncheckedCreateNestedManyWithoutCommissionerInput
  }

  export type CommissionerCreateOrConnectWithoutFarmersInput = {
    where: CommissionerWhereUniqueInput
    create: XOR<CommissionerCreateWithoutFarmersInput, CommissionerUncheckedCreateWithoutFarmersInput>
  }

  export type AuctionItemUpsertWithWhereUniqueWithoutFarmerInput = {
    where: AuctionItemWhereUniqueInput
    update: XOR<AuctionItemUpdateWithoutFarmerInput, AuctionItemUncheckedUpdateWithoutFarmerInput>
    create: XOR<AuctionItemCreateWithoutFarmerInput, AuctionItemUncheckedCreateWithoutFarmerInput>
  }

  export type AuctionItemUpdateWithWhereUniqueWithoutFarmerInput = {
    where: AuctionItemWhereUniqueInput
    data: XOR<AuctionItemUpdateWithoutFarmerInput, AuctionItemUncheckedUpdateWithoutFarmerInput>
  }

  export type AuctionItemUpdateManyWithWhereWithoutFarmerInput = {
    where: AuctionItemScalarWhereInput
    data: XOR<AuctionItemUpdateManyMutationInput, AuctionItemUncheckedUpdateManyWithoutFarmerInput>
  }

  export type AuctionItemScalarWhereInput = {
    AND?: AuctionItemScalarWhereInput | AuctionItemScalarWhereInput[]
    OR?: AuctionItemScalarWhereInput[]
    NOT?: AuctionItemScalarWhereInput | AuctionItemScalarWhereInput[]
    id?: StringFilter<"AuctionItem"> | string
    session_id?: StringFilter<"AuctionItem"> | string
    farmer_id?: StringFilter<"AuctionItem"> | string
    product_id?: StringFilter<"AuctionItem"> | string
    unit?: EnumUnitFilter<"AuctionItem"> | $Enums.Unit
    quantity?: FloatFilter<"AuctionItem"> | number
    buyer_id?: StringNullableFilter<"AuctionItem"> | string | null
    bill_id?: StringNullableFilter<"AuctionItem"> | string | null
    created_at?: DateTimeFilter<"AuctionItem"> | Date | string
    updated_at?: DateTimeFilter<"AuctionItem"> | Date | string
    rate?: FloatNullableFilter<"AuctionItem"> | number | null
  }

  export type BillUpsertWithWhereUniqueWithoutFarmerInput = {
    where: BillWhereUniqueInput
    update: XOR<BillUpdateWithoutFarmerInput, BillUncheckedUpdateWithoutFarmerInput>
    create: XOR<BillCreateWithoutFarmerInput, BillUncheckedCreateWithoutFarmerInput>
  }

  export type BillUpdateWithWhereUniqueWithoutFarmerInput = {
    where: BillWhereUniqueInput
    data: XOR<BillUpdateWithoutFarmerInput, BillUncheckedUpdateWithoutFarmerInput>
  }

  export type BillUpdateManyWithWhereWithoutFarmerInput = {
    where: BillScalarWhereInput
    data: XOR<BillUpdateManyMutationInput, BillUncheckedUpdateManyWithoutFarmerInput>
  }

  export type CommissionerUpsertWithoutFarmersInput = {
    update: XOR<CommissionerUpdateWithoutFarmersInput, CommissionerUncheckedUpdateWithoutFarmersInput>
    create: XOR<CommissionerCreateWithoutFarmersInput, CommissionerUncheckedCreateWithoutFarmersInput>
    where?: CommissionerWhereInput
  }

  export type CommissionerUpdateToOneWithWhereWithoutFarmersInput = {
    where?: CommissionerWhereInput
    data: XOR<CommissionerUpdateWithoutFarmersInput, CommissionerUncheckedUpdateWithoutFarmersInput>
  }

  export type CommissionerUpdateWithoutFarmersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    commission_rate?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_sessions?: AuctionSessionUpdateManyWithoutCommissionerNestedInput
    bills?: BillUpdateManyWithoutCommissionerNestedInput
    buyers?: BuyerUpdateManyWithoutCommissionerNestedInput
    password_resets?: PasswordResetUpdateManyWithoutCommissionerNestedInput
  }

  export type CommissionerUncheckedUpdateWithoutFarmersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    commission_rate?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_sessions?: AuctionSessionUncheckedUpdateManyWithoutCommissionerNestedInput
    bills?: BillUncheckedUpdateManyWithoutCommissionerNestedInput
    buyers?: BuyerUncheckedUpdateManyWithoutCommissionerNestedInput
    password_resets?: PasswordResetUncheckedUpdateManyWithoutCommissionerNestedInput
  }

  export type AuctionItemCreateWithoutBuyerInput = {
    id?: string
    unit: $Enums.Unit
    quantity: number
    created_at?: Date | string
    updated_at?: Date | string
    rate?: number | null
    bill?: BillCreateNestedOneWithoutAuction_itemsInput
    farmer: FarmerCreateNestedOneWithoutAuction_itemsInput
    product: ProductCreateNestedOneWithoutAuction_itemsInput
    session: AuctionSessionCreateNestedOneWithoutAuction_itemsInput
  }

  export type AuctionItemUncheckedCreateWithoutBuyerInput = {
    id?: string
    session_id: string
    farmer_id: string
    product_id: string
    unit: $Enums.Unit
    quantity: number
    bill_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    rate?: number | null
  }

  export type AuctionItemCreateOrConnectWithoutBuyerInput = {
    where: AuctionItemWhereUniqueInput
    create: XOR<AuctionItemCreateWithoutBuyerInput, AuctionItemUncheckedCreateWithoutBuyerInput>
  }

  export type AuctionItemCreateManyBuyerInputEnvelope = {
    data: AuctionItemCreateManyBuyerInput | AuctionItemCreateManyBuyerInput[]
    skipDuplicates?: boolean
  }

  export type CommissionerCreateWithoutBuyersInput = {
    id?: string
    name: string
    location: string
    phone: string
    email: string
    password: string
    commission_rate?: number
    created_at?: Date | string
    updated_at?: Date | string
    auction_sessions?: AuctionSessionCreateNestedManyWithoutCommissionerInput
    bills?: BillCreateNestedManyWithoutCommissionerInput
    farmers?: FarmerCreateNestedManyWithoutCommissionerInput
    password_resets?: PasswordResetCreateNestedManyWithoutCommissionerInput
  }

  export type CommissionerUncheckedCreateWithoutBuyersInput = {
    id?: string
    name: string
    location: string
    phone: string
    email: string
    password: string
    commission_rate?: number
    created_at?: Date | string
    updated_at?: Date | string
    auction_sessions?: AuctionSessionUncheckedCreateNestedManyWithoutCommissionerInput
    bills?: BillUncheckedCreateNestedManyWithoutCommissionerInput
    farmers?: FarmerUncheckedCreateNestedManyWithoutCommissionerInput
    password_resets?: PasswordResetUncheckedCreateNestedManyWithoutCommissionerInput
  }

  export type CommissionerCreateOrConnectWithoutBuyersInput = {
    where: CommissionerWhereUniqueInput
    create: XOR<CommissionerCreateWithoutBuyersInput, CommissionerUncheckedCreateWithoutBuyersInput>
  }

  export type AuctionItemUpsertWithWhereUniqueWithoutBuyerInput = {
    where: AuctionItemWhereUniqueInput
    update: XOR<AuctionItemUpdateWithoutBuyerInput, AuctionItemUncheckedUpdateWithoutBuyerInput>
    create: XOR<AuctionItemCreateWithoutBuyerInput, AuctionItemUncheckedCreateWithoutBuyerInput>
  }

  export type AuctionItemUpdateWithWhereUniqueWithoutBuyerInput = {
    where: AuctionItemWhereUniqueInput
    data: XOR<AuctionItemUpdateWithoutBuyerInput, AuctionItemUncheckedUpdateWithoutBuyerInput>
  }

  export type AuctionItemUpdateManyWithWhereWithoutBuyerInput = {
    where: AuctionItemScalarWhereInput
    data: XOR<AuctionItemUpdateManyMutationInput, AuctionItemUncheckedUpdateManyWithoutBuyerInput>
  }

  export type CommissionerUpsertWithoutBuyersInput = {
    update: XOR<CommissionerUpdateWithoutBuyersInput, CommissionerUncheckedUpdateWithoutBuyersInput>
    create: XOR<CommissionerCreateWithoutBuyersInput, CommissionerUncheckedCreateWithoutBuyersInput>
    where?: CommissionerWhereInput
  }

  export type CommissionerUpdateToOneWithWhereWithoutBuyersInput = {
    where?: CommissionerWhereInput
    data: XOR<CommissionerUpdateWithoutBuyersInput, CommissionerUncheckedUpdateWithoutBuyersInput>
  }

  export type CommissionerUpdateWithoutBuyersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    commission_rate?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_sessions?: AuctionSessionUpdateManyWithoutCommissionerNestedInput
    bills?: BillUpdateManyWithoutCommissionerNestedInput
    farmers?: FarmerUpdateManyWithoutCommissionerNestedInput
    password_resets?: PasswordResetUpdateManyWithoutCommissionerNestedInput
  }

  export type CommissionerUncheckedUpdateWithoutBuyersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    commission_rate?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_sessions?: AuctionSessionUncheckedUpdateManyWithoutCommissionerNestedInput
    bills?: BillUncheckedUpdateManyWithoutCommissionerNestedInput
    farmers?: FarmerUncheckedUpdateManyWithoutCommissionerNestedInput
    password_resets?: PasswordResetUncheckedUpdateManyWithoutCommissionerNestedInput
  }

  export type ProductCreateWithoutCategoryInput = {
    id?: string
    name: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemCreateNestedManyWithoutProductInput
    bills?: BillCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemUncheckedCreateNestedManyWithoutProductInput
    bills?: BillUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    category_id?: StringFilter<"Product"> | string
    is_active?: BoolFilter<"Product"> | boolean
    created_at?: DateTimeFilter<"Product"> | Date | string
    updated_at?: DateTimeFilter<"Product"> | Date | string
  }

  export type AuctionItemCreateWithoutProductInput = {
    id?: string
    unit: $Enums.Unit
    quantity: number
    created_at?: Date | string
    updated_at?: Date | string
    rate?: number | null
    bill?: BillCreateNestedOneWithoutAuction_itemsInput
    buyer?: BuyerCreateNestedOneWithoutAuction_itemsInput
    farmer: FarmerCreateNestedOneWithoutAuction_itemsInput
    session: AuctionSessionCreateNestedOneWithoutAuction_itemsInput
  }

  export type AuctionItemUncheckedCreateWithoutProductInput = {
    id?: string
    session_id: string
    farmer_id: string
    unit: $Enums.Unit
    quantity: number
    buyer_id?: string | null
    bill_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    rate?: number | null
  }

  export type AuctionItemCreateOrConnectWithoutProductInput = {
    where: AuctionItemWhereUniqueInput
    create: XOR<AuctionItemCreateWithoutProductInput, AuctionItemUncheckedCreateWithoutProductInput>
  }

  export type AuctionItemCreateManyProductInputEnvelope = {
    data: AuctionItemCreateManyProductInput | AuctionItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type BillCreateWithoutProductInput = {
    id?: string
    bill_number: string
    session_id: string
    total_quantity: number
    gross_amount: number
    commission_rate: number
    commission_amount: number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable: number
    payment_status?: $Enums.BillPaymentStatus
    payment_method?: string | null
    payment_date?: Date | string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemCreateNestedManyWithoutBillInput
    commissioner: CommissionerCreateNestedOneWithoutBillsInput
    farmer: FarmerCreateNestedOneWithoutBillsInput
  }

  export type BillUncheckedCreateWithoutProductInput = {
    id?: string
    bill_number: string
    farmer_id: string
    commissioner_id: string
    session_id: string
    total_quantity: number
    gross_amount: number
    commission_rate: number
    commission_amount: number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable: number
    payment_status?: $Enums.BillPaymentStatus
    payment_method?: string | null
    payment_date?: Date | string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemUncheckedCreateNestedManyWithoutBillInput
  }

  export type BillCreateOrConnectWithoutProductInput = {
    where: BillWhereUniqueInput
    create: XOR<BillCreateWithoutProductInput, BillUncheckedCreateWithoutProductInput>
  }

  export type BillCreateManyProductInputEnvelope = {
    data: BillCreateManyProductInput | BillCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CategoryCreateWithoutProductsInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type AuctionItemUpsertWithWhereUniqueWithoutProductInput = {
    where: AuctionItemWhereUniqueInput
    update: XOR<AuctionItemUpdateWithoutProductInput, AuctionItemUncheckedUpdateWithoutProductInput>
    create: XOR<AuctionItemCreateWithoutProductInput, AuctionItemUncheckedCreateWithoutProductInput>
  }

  export type AuctionItemUpdateWithWhereUniqueWithoutProductInput = {
    where: AuctionItemWhereUniqueInput
    data: XOR<AuctionItemUpdateWithoutProductInput, AuctionItemUncheckedUpdateWithoutProductInput>
  }

  export type AuctionItemUpdateManyWithWhereWithoutProductInput = {
    where: AuctionItemScalarWhereInput
    data: XOR<AuctionItemUpdateManyMutationInput, AuctionItemUncheckedUpdateManyWithoutProductInput>
  }

  export type BillUpsertWithWhereUniqueWithoutProductInput = {
    where: BillWhereUniqueInput
    update: XOR<BillUpdateWithoutProductInput, BillUncheckedUpdateWithoutProductInput>
    create: XOR<BillCreateWithoutProductInput, BillUncheckedCreateWithoutProductInput>
  }

  export type BillUpdateWithWhereUniqueWithoutProductInput = {
    where: BillWhereUniqueInput
    data: XOR<BillUpdateWithoutProductInput, BillUncheckedUpdateWithoutProductInput>
  }

  export type BillUpdateManyWithWhereWithoutProductInput = {
    where: BillScalarWhereInput
    data: XOR<BillUpdateManyMutationInput, BillUncheckedUpdateManyWithoutProductInput>
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuctionItemCreateWithoutSessionInput = {
    id?: string
    unit: $Enums.Unit
    quantity: number
    created_at?: Date | string
    updated_at?: Date | string
    rate?: number | null
    bill?: BillCreateNestedOneWithoutAuction_itemsInput
    buyer?: BuyerCreateNestedOneWithoutAuction_itemsInput
    farmer: FarmerCreateNestedOneWithoutAuction_itemsInput
    product: ProductCreateNestedOneWithoutAuction_itemsInput
  }

  export type AuctionItemUncheckedCreateWithoutSessionInput = {
    id?: string
    farmer_id: string
    product_id: string
    unit: $Enums.Unit
    quantity: number
    buyer_id?: string | null
    bill_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    rate?: number | null
  }

  export type AuctionItemCreateOrConnectWithoutSessionInput = {
    where: AuctionItemWhereUniqueInput
    create: XOR<AuctionItemCreateWithoutSessionInput, AuctionItemUncheckedCreateWithoutSessionInput>
  }

  export type AuctionItemCreateManySessionInputEnvelope = {
    data: AuctionItemCreateManySessionInput | AuctionItemCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type CommissionerCreateWithoutAuction_sessionsInput = {
    id?: string
    name: string
    location: string
    phone: string
    email: string
    password: string
    commission_rate?: number
    created_at?: Date | string
    updated_at?: Date | string
    bills?: BillCreateNestedManyWithoutCommissionerInput
    buyers?: BuyerCreateNestedManyWithoutCommissionerInput
    farmers?: FarmerCreateNestedManyWithoutCommissionerInput
    password_resets?: PasswordResetCreateNestedManyWithoutCommissionerInput
  }

  export type CommissionerUncheckedCreateWithoutAuction_sessionsInput = {
    id?: string
    name: string
    location: string
    phone: string
    email: string
    password: string
    commission_rate?: number
    created_at?: Date | string
    updated_at?: Date | string
    bills?: BillUncheckedCreateNestedManyWithoutCommissionerInput
    buyers?: BuyerUncheckedCreateNestedManyWithoutCommissionerInput
    farmers?: FarmerUncheckedCreateNestedManyWithoutCommissionerInput
    password_resets?: PasswordResetUncheckedCreateNestedManyWithoutCommissionerInput
  }

  export type CommissionerCreateOrConnectWithoutAuction_sessionsInput = {
    where: CommissionerWhereUniqueInput
    create: XOR<CommissionerCreateWithoutAuction_sessionsInput, CommissionerUncheckedCreateWithoutAuction_sessionsInput>
  }

  export type AuctionItemUpsertWithWhereUniqueWithoutSessionInput = {
    where: AuctionItemWhereUniqueInput
    update: XOR<AuctionItemUpdateWithoutSessionInput, AuctionItemUncheckedUpdateWithoutSessionInput>
    create: XOR<AuctionItemCreateWithoutSessionInput, AuctionItemUncheckedCreateWithoutSessionInput>
  }

  export type AuctionItemUpdateWithWhereUniqueWithoutSessionInput = {
    where: AuctionItemWhereUniqueInput
    data: XOR<AuctionItemUpdateWithoutSessionInput, AuctionItemUncheckedUpdateWithoutSessionInput>
  }

  export type AuctionItemUpdateManyWithWhereWithoutSessionInput = {
    where: AuctionItemScalarWhereInput
    data: XOR<AuctionItemUpdateManyMutationInput, AuctionItemUncheckedUpdateManyWithoutSessionInput>
  }

  export type CommissionerUpsertWithoutAuction_sessionsInput = {
    update: XOR<CommissionerUpdateWithoutAuction_sessionsInput, CommissionerUncheckedUpdateWithoutAuction_sessionsInput>
    create: XOR<CommissionerCreateWithoutAuction_sessionsInput, CommissionerUncheckedCreateWithoutAuction_sessionsInput>
    where?: CommissionerWhereInput
  }

  export type CommissionerUpdateToOneWithWhereWithoutAuction_sessionsInput = {
    where?: CommissionerWhereInput
    data: XOR<CommissionerUpdateWithoutAuction_sessionsInput, CommissionerUncheckedUpdateWithoutAuction_sessionsInput>
  }

  export type CommissionerUpdateWithoutAuction_sessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    commission_rate?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bills?: BillUpdateManyWithoutCommissionerNestedInput
    buyers?: BuyerUpdateManyWithoutCommissionerNestedInput
    farmers?: FarmerUpdateManyWithoutCommissionerNestedInput
    password_resets?: PasswordResetUpdateManyWithoutCommissionerNestedInput
  }

  export type CommissionerUncheckedUpdateWithoutAuction_sessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    commission_rate?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bills?: BillUncheckedUpdateManyWithoutCommissionerNestedInput
    buyers?: BuyerUncheckedUpdateManyWithoutCommissionerNestedInput
    farmers?: FarmerUncheckedUpdateManyWithoutCommissionerNestedInput
    password_resets?: PasswordResetUncheckedUpdateManyWithoutCommissionerNestedInput
  }

  export type BillCreateWithoutAuction_itemsInput = {
    id?: string
    bill_number: string
    session_id: string
    total_quantity: number
    gross_amount: number
    commission_rate: number
    commission_amount: number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable: number
    payment_status?: $Enums.BillPaymentStatus
    payment_method?: string | null
    payment_date?: Date | string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    commissioner: CommissionerCreateNestedOneWithoutBillsInput
    farmer: FarmerCreateNestedOneWithoutBillsInput
    product: ProductCreateNestedOneWithoutBillsInput
  }

  export type BillUncheckedCreateWithoutAuction_itemsInput = {
    id?: string
    bill_number: string
    farmer_id: string
    commissioner_id: string
    product_id: string
    session_id: string
    total_quantity: number
    gross_amount: number
    commission_rate: number
    commission_amount: number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable: number
    payment_status?: $Enums.BillPaymentStatus
    payment_method?: string | null
    payment_date?: Date | string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BillCreateOrConnectWithoutAuction_itemsInput = {
    where: BillWhereUniqueInput
    create: XOR<BillCreateWithoutAuction_itemsInput, BillUncheckedCreateWithoutAuction_itemsInput>
  }

  export type BuyerCreateWithoutAuction_itemsInput = {
    id?: string
    name: string
    phone: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    commissioner: CommissionerCreateNestedOneWithoutBuyersInput
  }

  export type BuyerUncheckedCreateWithoutAuction_itemsInput = {
    id?: string
    name: string
    phone: string
    commissioner_id: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BuyerCreateOrConnectWithoutAuction_itemsInput = {
    where: BuyerWhereUniqueInput
    create: XOR<BuyerCreateWithoutAuction_itemsInput, BuyerUncheckedCreateWithoutAuction_itemsInput>
  }

  export type FarmerCreateWithoutAuction_itemsInput = {
    id?: string
    name: string
    phone: string
    village: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    bills?: BillCreateNestedManyWithoutFarmerInput
    commissioner: CommissionerCreateNestedOneWithoutFarmersInput
  }

  export type FarmerUncheckedCreateWithoutAuction_itemsInput = {
    id?: string
    name: string
    phone: string
    village: string
    commissioner_id: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    bills?: BillUncheckedCreateNestedManyWithoutFarmerInput
  }

  export type FarmerCreateOrConnectWithoutAuction_itemsInput = {
    where: FarmerWhereUniqueInput
    create: XOR<FarmerCreateWithoutAuction_itemsInput, FarmerUncheckedCreateWithoutAuction_itemsInput>
  }

  export type ProductCreateWithoutAuction_itemsInput = {
    id?: string
    name: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    bills?: BillCreateNestedManyWithoutProductInput
    category: CategoryCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateWithoutAuction_itemsInput = {
    id?: string
    name: string
    category_id: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    bills?: BillUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutAuction_itemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutAuction_itemsInput, ProductUncheckedCreateWithoutAuction_itemsInput>
  }

  export type AuctionSessionCreateWithoutAuction_itemsInput = {
    id?: string
    date?: Date | string
    status?: $Enums.SessionStatus
    payment_status?: $Enums.SessionPaymentStatus
    created_at?: Date | string
    updated_at?: Date | string
    commissioner: CommissionerCreateNestedOneWithoutAuction_sessionsInput
  }

  export type AuctionSessionUncheckedCreateWithoutAuction_itemsInput = {
    id?: string
    date?: Date | string
    commissioner_id: string
    status?: $Enums.SessionStatus
    payment_status?: $Enums.SessionPaymentStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AuctionSessionCreateOrConnectWithoutAuction_itemsInput = {
    where: AuctionSessionWhereUniqueInput
    create: XOR<AuctionSessionCreateWithoutAuction_itemsInput, AuctionSessionUncheckedCreateWithoutAuction_itemsInput>
  }

  export type BillUpsertWithoutAuction_itemsInput = {
    update: XOR<BillUpdateWithoutAuction_itemsInput, BillUncheckedUpdateWithoutAuction_itemsInput>
    create: XOR<BillCreateWithoutAuction_itemsInput, BillUncheckedCreateWithoutAuction_itemsInput>
    where?: BillWhereInput
  }

  export type BillUpdateToOneWithWhereWithoutAuction_itemsInput = {
    where?: BillWhereInput
    data: XOR<BillUpdateWithoutAuction_itemsInput, BillUncheckedUpdateWithoutAuction_itemsInput>
  }

  export type BillUpdateWithoutAuction_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    bill_number?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    total_quantity?: FloatFieldUpdateOperationsInput | number
    gross_amount?: FloatFieldUpdateOperationsInput | number
    commission_rate?: FloatFieldUpdateOperationsInput | number
    commission_amount?: FloatFieldUpdateOperationsInput | number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable?: FloatFieldUpdateOperationsInput | number
    payment_status?: EnumBillPaymentStatusFieldUpdateOperationsInput | $Enums.BillPaymentStatus
    payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    commissioner?: CommissionerUpdateOneRequiredWithoutBillsNestedInput
    farmer?: FarmerUpdateOneRequiredWithoutBillsNestedInput
    product?: ProductUpdateOneRequiredWithoutBillsNestedInput
  }

  export type BillUncheckedUpdateWithoutAuction_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    bill_number?: StringFieldUpdateOperationsInput | string
    farmer_id?: StringFieldUpdateOperationsInput | string
    commissioner_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    total_quantity?: FloatFieldUpdateOperationsInput | number
    gross_amount?: FloatFieldUpdateOperationsInput | number
    commission_rate?: FloatFieldUpdateOperationsInput | number
    commission_amount?: FloatFieldUpdateOperationsInput | number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable?: FloatFieldUpdateOperationsInput | number
    payment_status?: EnumBillPaymentStatusFieldUpdateOperationsInput | $Enums.BillPaymentStatus
    payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuyerUpsertWithoutAuction_itemsInput = {
    update: XOR<BuyerUpdateWithoutAuction_itemsInput, BuyerUncheckedUpdateWithoutAuction_itemsInput>
    create: XOR<BuyerCreateWithoutAuction_itemsInput, BuyerUncheckedCreateWithoutAuction_itemsInput>
    where?: BuyerWhereInput
  }

  export type BuyerUpdateToOneWithWhereWithoutAuction_itemsInput = {
    where?: BuyerWhereInput
    data: XOR<BuyerUpdateWithoutAuction_itemsInput, BuyerUncheckedUpdateWithoutAuction_itemsInput>
  }

  export type BuyerUpdateWithoutAuction_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    commissioner?: CommissionerUpdateOneRequiredWithoutBuyersNestedInput
  }

  export type BuyerUncheckedUpdateWithoutAuction_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    commissioner_id?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmerUpsertWithoutAuction_itemsInput = {
    update: XOR<FarmerUpdateWithoutAuction_itemsInput, FarmerUncheckedUpdateWithoutAuction_itemsInput>
    create: XOR<FarmerCreateWithoutAuction_itemsInput, FarmerUncheckedCreateWithoutAuction_itemsInput>
    where?: FarmerWhereInput
  }

  export type FarmerUpdateToOneWithWhereWithoutAuction_itemsInput = {
    where?: FarmerWhereInput
    data: XOR<FarmerUpdateWithoutAuction_itemsInput, FarmerUncheckedUpdateWithoutAuction_itemsInput>
  }

  export type FarmerUpdateWithoutAuction_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    village?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bills?: BillUpdateManyWithoutFarmerNestedInput
    commissioner?: CommissionerUpdateOneRequiredWithoutFarmersNestedInput
  }

  export type FarmerUncheckedUpdateWithoutAuction_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    village?: StringFieldUpdateOperationsInput | string
    commissioner_id?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bills?: BillUncheckedUpdateManyWithoutFarmerNestedInput
  }

  export type ProductUpsertWithoutAuction_itemsInput = {
    update: XOR<ProductUpdateWithoutAuction_itemsInput, ProductUncheckedUpdateWithoutAuction_itemsInput>
    create: XOR<ProductCreateWithoutAuction_itemsInput, ProductUncheckedCreateWithoutAuction_itemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutAuction_itemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutAuction_itemsInput, ProductUncheckedUpdateWithoutAuction_itemsInput>
  }

  export type ProductUpdateWithoutAuction_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bills?: BillUpdateManyWithoutProductNestedInput
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateWithoutAuction_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category_id?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bills?: BillUncheckedUpdateManyWithoutProductNestedInput
  }

  export type AuctionSessionUpsertWithoutAuction_itemsInput = {
    update: XOR<AuctionSessionUpdateWithoutAuction_itemsInput, AuctionSessionUncheckedUpdateWithoutAuction_itemsInput>
    create: XOR<AuctionSessionCreateWithoutAuction_itemsInput, AuctionSessionUncheckedCreateWithoutAuction_itemsInput>
    where?: AuctionSessionWhereInput
  }

  export type AuctionSessionUpdateToOneWithWhereWithoutAuction_itemsInput = {
    where?: AuctionSessionWhereInput
    data: XOR<AuctionSessionUpdateWithoutAuction_itemsInput, AuctionSessionUncheckedUpdateWithoutAuction_itemsInput>
  }

  export type AuctionSessionUpdateWithoutAuction_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    payment_status?: EnumSessionPaymentStatusFieldUpdateOperationsInput | $Enums.SessionPaymentStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    commissioner?: CommissionerUpdateOneRequiredWithoutAuction_sessionsNestedInput
  }

  export type AuctionSessionUncheckedUpdateWithoutAuction_itemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    commissioner_id?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    payment_status?: EnumSessionPaymentStatusFieldUpdateOperationsInput | $Enums.SessionPaymentStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuctionItemCreateWithoutBillInput = {
    id?: string
    unit: $Enums.Unit
    quantity: number
    created_at?: Date | string
    updated_at?: Date | string
    rate?: number | null
    buyer?: BuyerCreateNestedOneWithoutAuction_itemsInput
    farmer: FarmerCreateNestedOneWithoutAuction_itemsInput
    product: ProductCreateNestedOneWithoutAuction_itemsInput
    session: AuctionSessionCreateNestedOneWithoutAuction_itemsInput
  }

  export type AuctionItemUncheckedCreateWithoutBillInput = {
    id?: string
    session_id: string
    farmer_id: string
    product_id: string
    unit: $Enums.Unit
    quantity: number
    buyer_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    rate?: number | null
  }

  export type AuctionItemCreateOrConnectWithoutBillInput = {
    where: AuctionItemWhereUniqueInput
    create: XOR<AuctionItemCreateWithoutBillInput, AuctionItemUncheckedCreateWithoutBillInput>
  }

  export type AuctionItemCreateManyBillInputEnvelope = {
    data: AuctionItemCreateManyBillInput | AuctionItemCreateManyBillInput[]
    skipDuplicates?: boolean
  }

  export type CommissionerCreateWithoutBillsInput = {
    id?: string
    name: string
    location: string
    phone: string
    email: string
    password: string
    commission_rate?: number
    created_at?: Date | string
    updated_at?: Date | string
    auction_sessions?: AuctionSessionCreateNestedManyWithoutCommissionerInput
    buyers?: BuyerCreateNestedManyWithoutCommissionerInput
    farmers?: FarmerCreateNestedManyWithoutCommissionerInput
    password_resets?: PasswordResetCreateNestedManyWithoutCommissionerInput
  }

  export type CommissionerUncheckedCreateWithoutBillsInput = {
    id?: string
    name: string
    location: string
    phone: string
    email: string
    password: string
    commission_rate?: number
    created_at?: Date | string
    updated_at?: Date | string
    auction_sessions?: AuctionSessionUncheckedCreateNestedManyWithoutCommissionerInput
    buyers?: BuyerUncheckedCreateNestedManyWithoutCommissionerInput
    farmers?: FarmerUncheckedCreateNestedManyWithoutCommissionerInput
    password_resets?: PasswordResetUncheckedCreateNestedManyWithoutCommissionerInput
  }

  export type CommissionerCreateOrConnectWithoutBillsInput = {
    where: CommissionerWhereUniqueInput
    create: XOR<CommissionerCreateWithoutBillsInput, CommissionerUncheckedCreateWithoutBillsInput>
  }

  export type FarmerCreateWithoutBillsInput = {
    id?: string
    name: string
    phone: string
    village: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemCreateNestedManyWithoutFarmerInput
    commissioner: CommissionerCreateNestedOneWithoutFarmersInput
  }

  export type FarmerUncheckedCreateWithoutBillsInput = {
    id?: string
    name: string
    phone: string
    village: string
    commissioner_id: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemUncheckedCreateNestedManyWithoutFarmerInput
  }

  export type FarmerCreateOrConnectWithoutBillsInput = {
    where: FarmerWhereUniqueInput
    create: XOR<FarmerCreateWithoutBillsInput, FarmerUncheckedCreateWithoutBillsInput>
  }

  export type ProductCreateWithoutBillsInput = {
    id?: string
    name: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemCreateNestedManyWithoutProductInput
    category: CategoryCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateWithoutBillsInput = {
    id?: string
    name: string
    category_id: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    auction_items?: AuctionItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutBillsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutBillsInput, ProductUncheckedCreateWithoutBillsInput>
  }

  export type AuctionItemUpsertWithWhereUniqueWithoutBillInput = {
    where: AuctionItemWhereUniqueInput
    update: XOR<AuctionItemUpdateWithoutBillInput, AuctionItemUncheckedUpdateWithoutBillInput>
    create: XOR<AuctionItemCreateWithoutBillInput, AuctionItemUncheckedCreateWithoutBillInput>
  }

  export type AuctionItemUpdateWithWhereUniqueWithoutBillInput = {
    where: AuctionItemWhereUniqueInput
    data: XOR<AuctionItemUpdateWithoutBillInput, AuctionItemUncheckedUpdateWithoutBillInput>
  }

  export type AuctionItemUpdateManyWithWhereWithoutBillInput = {
    where: AuctionItemScalarWhereInput
    data: XOR<AuctionItemUpdateManyMutationInput, AuctionItemUncheckedUpdateManyWithoutBillInput>
  }

  export type CommissionerUpsertWithoutBillsInput = {
    update: XOR<CommissionerUpdateWithoutBillsInput, CommissionerUncheckedUpdateWithoutBillsInput>
    create: XOR<CommissionerCreateWithoutBillsInput, CommissionerUncheckedCreateWithoutBillsInput>
    where?: CommissionerWhereInput
  }

  export type CommissionerUpdateToOneWithWhereWithoutBillsInput = {
    where?: CommissionerWhereInput
    data: XOR<CommissionerUpdateWithoutBillsInput, CommissionerUncheckedUpdateWithoutBillsInput>
  }

  export type CommissionerUpdateWithoutBillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    commission_rate?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_sessions?: AuctionSessionUpdateManyWithoutCommissionerNestedInput
    buyers?: BuyerUpdateManyWithoutCommissionerNestedInput
    farmers?: FarmerUpdateManyWithoutCommissionerNestedInput
    password_resets?: PasswordResetUpdateManyWithoutCommissionerNestedInput
  }

  export type CommissionerUncheckedUpdateWithoutBillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    commission_rate?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_sessions?: AuctionSessionUncheckedUpdateManyWithoutCommissionerNestedInput
    buyers?: BuyerUncheckedUpdateManyWithoutCommissionerNestedInput
    farmers?: FarmerUncheckedUpdateManyWithoutCommissionerNestedInput
    password_resets?: PasswordResetUncheckedUpdateManyWithoutCommissionerNestedInput
  }

  export type FarmerUpsertWithoutBillsInput = {
    update: XOR<FarmerUpdateWithoutBillsInput, FarmerUncheckedUpdateWithoutBillsInput>
    create: XOR<FarmerCreateWithoutBillsInput, FarmerUncheckedCreateWithoutBillsInput>
    where?: FarmerWhereInput
  }

  export type FarmerUpdateToOneWithWhereWithoutBillsInput = {
    where?: FarmerWhereInput
    data: XOR<FarmerUpdateWithoutBillsInput, FarmerUncheckedUpdateWithoutBillsInput>
  }

  export type FarmerUpdateWithoutBillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    village?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUpdateManyWithoutFarmerNestedInput
    commissioner?: CommissionerUpdateOneRequiredWithoutFarmersNestedInput
  }

  export type FarmerUncheckedUpdateWithoutBillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    village?: StringFieldUpdateOperationsInput | string
    commissioner_id?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUncheckedUpdateManyWithoutFarmerNestedInput
  }

  export type ProductUpsertWithoutBillsInput = {
    update: XOR<ProductUpdateWithoutBillsInput, ProductUncheckedUpdateWithoutBillsInput>
    create: XOR<ProductCreateWithoutBillsInput, ProductUncheckedCreateWithoutBillsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutBillsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutBillsInput, ProductUncheckedUpdateWithoutBillsInput>
  }

  export type ProductUpdateWithoutBillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUpdateManyWithoutProductNestedInput
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateWithoutBillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category_id?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type AuctionSessionCreateManyCommissionerInput = {
    id?: string
    date?: Date | string
    status?: $Enums.SessionStatus
    payment_status?: $Enums.SessionPaymentStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BillCreateManyCommissionerInput = {
    id?: string
    bill_number: string
    farmer_id: string
    product_id: string
    session_id: string
    total_quantity: number
    gross_amount: number
    commission_rate: number
    commission_amount: number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable: number
    payment_status?: $Enums.BillPaymentStatus
    payment_method?: string | null
    payment_date?: Date | string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BuyerCreateManyCommissionerInput = {
    id?: string
    name: string
    phone: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FarmerCreateManyCommissionerInput = {
    id?: string
    name: string
    phone: string
    village: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PasswordResetCreateManyCommissionerInput = {
    id?: string
    token: string
    expires_at: Date | string
    used?: boolean
    created_at?: Date | string
    used_at?: Date | string | null
  }

  export type AuctionSessionUpdateWithoutCommissionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    payment_status?: EnumSessionPaymentStatusFieldUpdateOperationsInput | $Enums.SessionPaymentStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUpdateManyWithoutSessionNestedInput
  }

  export type AuctionSessionUncheckedUpdateWithoutCommissionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    payment_status?: EnumSessionPaymentStatusFieldUpdateOperationsInput | $Enums.SessionPaymentStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type AuctionSessionUncheckedUpdateManyWithoutCommissionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    payment_status?: EnumSessionPaymentStatusFieldUpdateOperationsInput | $Enums.SessionPaymentStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillUpdateWithoutCommissionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    bill_number?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    total_quantity?: FloatFieldUpdateOperationsInput | number
    gross_amount?: FloatFieldUpdateOperationsInput | number
    commission_rate?: FloatFieldUpdateOperationsInput | number
    commission_amount?: FloatFieldUpdateOperationsInput | number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable?: FloatFieldUpdateOperationsInput | number
    payment_status?: EnumBillPaymentStatusFieldUpdateOperationsInput | $Enums.BillPaymentStatus
    payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUpdateManyWithoutBillNestedInput
    farmer?: FarmerUpdateOneRequiredWithoutBillsNestedInput
    product?: ProductUpdateOneRequiredWithoutBillsNestedInput
  }

  export type BillUncheckedUpdateWithoutCommissionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    bill_number?: StringFieldUpdateOperationsInput | string
    farmer_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    total_quantity?: FloatFieldUpdateOperationsInput | number
    gross_amount?: FloatFieldUpdateOperationsInput | number
    commission_rate?: FloatFieldUpdateOperationsInput | number
    commission_amount?: FloatFieldUpdateOperationsInput | number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable?: FloatFieldUpdateOperationsInput | number
    payment_status?: EnumBillPaymentStatusFieldUpdateOperationsInput | $Enums.BillPaymentStatus
    payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUncheckedUpdateManyWithoutBillNestedInput
  }

  export type BillUncheckedUpdateManyWithoutCommissionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    bill_number?: StringFieldUpdateOperationsInput | string
    farmer_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    total_quantity?: FloatFieldUpdateOperationsInput | number
    gross_amount?: FloatFieldUpdateOperationsInput | number
    commission_rate?: FloatFieldUpdateOperationsInput | number
    commission_amount?: FloatFieldUpdateOperationsInput | number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable?: FloatFieldUpdateOperationsInput | number
    payment_status?: EnumBillPaymentStatusFieldUpdateOperationsInput | $Enums.BillPaymentStatus
    payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuyerUpdateWithoutCommissionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUpdateManyWithoutBuyerNestedInput
  }

  export type BuyerUncheckedUpdateWithoutCommissionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUncheckedUpdateManyWithoutBuyerNestedInput
  }

  export type BuyerUncheckedUpdateManyWithoutCommissionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmerUpdateWithoutCommissionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    village?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUpdateManyWithoutFarmerNestedInput
    bills?: BillUpdateManyWithoutFarmerNestedInput
  }

  export type FarmerUncheckedUpdateWithoutCommissionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    village?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUncheckedUpdateManyWithoutFarmerNestedInput
    bills?: BillUncheckedUpdateManyWithoutFarmerNestedInput
  }

  export type FarmerUncheckedUpdateManyWithoutCommissionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    village?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetUpdateWithoutCommissionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PasswordResetUncheckedUpdateWithoutCommissionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PasswordResetUncheckedUpdateManyWithoutCommissionerInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AuctionItemCreateManyFarmerInput = {
    id?: string
    session_id: string
    product_id: string
    unit: $Enums.Unit
    quantity: number
    buyer_id?: string | null
    bill_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    rate?: number | null
  }

  export type BillCreateManyFarmerInput = {
    id?: string
    bill_number: string
    commissioner_id: string
    product_id: string
    session_id: string
    total_quantity: number
    gross_amount: number
    commission_rate: number
    commission_amount: number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable: number
    payment_status?: $Enums.BillPaymentStatus
    payment_method?: string | null
    payment_date?: Date | string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AuctionItemUpdateWithoutFarmerInput = {
    id?: StringFieldUpdateOperationsInput | string
    unit?: EnumUnitFieldUpdateOperationsInput | $Enums.Unit
    quantity?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: NullableFloatFieldUpdateOperationsInput | number | null
    bill?: BillUpdateOneWithoutAuction_itemsNestedInput
    buyer?: BuyerUpdateOneWithoutAuction_itemsNestedInput
    product?: ProductUpdateOneRequiredWithoutAuction_itemsNestedInput
    session?: AuctionSessionUpdateOneRequiredWithoutAuction_itemsNestedInput
  }

  export type AuctionItemUncheckedUpdateWithoutFarmerInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    unit?: EnumUnitFieldUpdateOperationsInput | $Enums.Unit
    quantity?: FloatFieldUpdateOperationsInput | number
    buyer_id?: NullableStringFieldUpdateOperationsInput | string | null
    bill_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AuctionItemUncheckedUpdateManyWithoutFarmerInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    unit?: EnumUnitFieldUpdateOperationsInput | $Enums.Unit
    quantity?: FloatFieldUpdateOperationsInput | number
    buyer_id?: NullableStringFieldUpdateOperationsInput | string | null
    bill_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type BillUpdateWithoutFarmerInput = {
    id?: StringFieldUpdateOperationsInput | string
    bill_number?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    total_quantity?: FloatFieldUpdateOperationsInput | number
    gross_amount?: FloatFieldUpdateOperationsInput | number
    commission_rate?: FloatFieldUpdateOperationsInput | number
    commission_amount?: FloatFieldUpdateOperationsInput | number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable?: FloatFieldUpdateOperationsInput | number
    payment_status?: EnumBillPaymentStatusFieldUpdateOperationsInput | $Enums.BillPaymentStatus
    payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUpdateManyWithoutBillNestedInput
    commissioner?: CommissionerUpdateOneRequiredWithoutBillsNestedInput
    product?: ProductUpdateOneRequiredWithoutBillsNestedInput
  }

  export type BillUncheckedUpdateWithoutFarmerInput = {
    id?: StringFieldUpdateOperationsInput | string
    bill_number?: StringFieldUpdateOperationsInput | string
    commissioner_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    total_quantity?: FloatFieldUpdateOperationsInput | number
    gross_amount?: FloatFieldUpdateOperationsInput | number
    commission_rate?: FloatFieldUpdateOperationsInput | number
    commission_amount?: FloatFieldUpdateOperationsInput | number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable?: FloatFieldUpdateOperationsInput | number
    payment_status?: EnumBillPaymentStatusFieldUpdateOperationsInput | $Enums.BillPaymentStatus
    payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUncheckedUpdateManyWithoutBillNestedInput
  }

  export type BillUncheckedUpdateManyWithoutFarmerInput = {
    id?: StringFieldUpdateOperationsInput | string
    bill_number?: StringFieldUpdateOperationsInput | string
    commissioner_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    total_quantity?: FloatFieldUpdateOperationsInput | number
    gross_amount?: FloatFieldUpdateOperationsInput | number
    commission_rate?: FloatFieldUpdateOperationsInput | number
    commission_amount?: FloatFieldUpdateOperationsInput | number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable?: FloatFieldUpdateOperationsInput | number
    payment_status?: EnumBillPaymentStatusFieldUpdateOperationsInput | $Enums.BillPaymentStatus
    payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuctionItemCreateManyBuyerInput = {
    id?: string
    session_id: string
    farmer_id: string
    product_id: string
    unit: $Enums.Unit
    quantity: number
    bill_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    rate?: number | null
  }

  export type AuctionItemUpdateWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    unit?: EnumUnitFieldUpdateOperationsInput | $Enums.Unit
    quantity?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: NullableFloatFieldUpdateOperationsInput | number | null
    bill?: BillUpdateOneWithoutAuction_itemsNestedInput
    farmer?: FarmerUpdateOneRequiredWithoutAuction_itemsNestedInput
    product?: ProductUpdateOneRequiredWithoutAuction_itemsNestedInput
    session?: AuctionSessionUpdateOneRequiredWithoutAuction_itemsNestedInput
  }

  export type AuctionItemUncheckedUpdateWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    farmer_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    unit?: EnumUnitFieldUpdateOperationsInput | $Enums.Unit
    quantity?: FloatFieldUpdateOperationsInput | number
    bill_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AuctionItemUncheckedUpdateManyWithoutBuyerInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    farmer_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    unit?: EnumUnitFieldUpdateOperationsInput | $Enums.Unit
    quantity?: FloatFieldUpdateOperationsInput | number
    bill_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ProductCreateManyCategoryInput = {
    id?: string
    name: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProductUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUpdateManyWithoutProductNestedInput
    bills?: BillUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUncheckedUpdateManyWithoutProductNestedInput
    bills?: BillUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuctionItemCreateManyProductInput = {
    id?: string
    session_id: string
    farmer_id: string
    unit: $Enums.Unit
    quantity: number
    buyer_id?: string | null
    bill_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    rate?: number | null
  }

  export type BillCreateManyProductInput = {
    id?: string
    bill_number: string
    farmer_id: string
    commissioner_id: string
    session_id: string
    total_quantity: number
    gross_amount: number
    commission_rate: number
    commission_amount: number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable: number
    payment_status?: $Enums.BillPaymentStatus
    payment_method?: string | null
    payment_date?: Date | string | null
    notes?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AuctionItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    unit?: EnumUnitFieldUpdateOperationsInput | $Enums.Unit
    quantity?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: NullableFloatFieldUpdateOperationsInput | number | null
    bill?: BillUpdateOneWithoutAuction_itemsNestedInput
    buyer?: BuyerUpdateOneWithoutAuction_itemsNestedInput
    farmer?: FarmerUpdateOneRequiredWithoutAuction_itemsNestedInput
    session?: AuctionSessionUpdateOneRequiredWithoutAuction_itemsNestedInput
  }

  export type AuctionItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    farmer_id?: StringFieldUpdateOperationsInput | string
    unit?: EnumUnitFieldUpdateOperationsInput | $Enums.Unit
    quantity?: FloatFieldUpdateOperationsInput | number
    buyer_id?: NullableStringFieldUpdateOperationsInput | string | null
    bill_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AuctionItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    farmer_id?: StringFieldUpdateOperationsInput | string
    unit?: EnumUnitFieldUpdateOperationsInput | $Enums.Unit
    quantity?: FloatFieldUpdateOperationsInput | number
    buyer_id?: NullableStringFieldUpdateOperationsInput | string | null
    bill_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type BillUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    bill_number?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    total_quantity?: FloatFieldUpdateOperationsInput | number
    gross_amount?: FloatFieldUpdateOperationsInput | number
    commission_rate?: FloatFieldUpdateOperationsInput | number
    commission_amount?: FloatFieldUpdateOperationsInput | number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable?: FloatFieldUpdateOperationsInput | number
    payment_status?: EnumBillPaymentStatusFieldUpdateOperationsInput | $Enums.BillPaymentStatus
    payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUpdateManyWithoutBillNestedInput
    commissioner?: CommissionerUpdateOneRequiredWithoutBillsNestedInput
    farmer?: FarmerUpdateOneRequiredWithoutBillsNestedInput
  }

  export type BillUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    bill_number?: StringFieldUpdateOperationsInput | string
    farmer_id?: StringFieldUpdateOperationsInput | string
    commissioner_id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    total_quantity?: FloatFieldUpdateOperationsInput | number
    gross_amount?: FloatFieldUpdateOperationsInput | number
    commission_rate?: FloatFieldUpdateOperationsInput | number
    commission_amount?: FloatFieldUpdateOperationsInput | number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable?: FloatFieldUpdateOperationsInput | number
    payment_status?: EnumBillPaymentStatusFieldUpdateOperationsInput | $Enums.BillPaymentStatus
    payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auction_items?: AuctionItemUncheckedUpdateManyWithoutBillNestedInput
  }

  export type BillUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    bill_number?: StringFieldUpdateOperationsInput | string
    farmer_id?: StringFieldUpdateOperationsInput | string
    commissioner_id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    total_quantity?: FloatFieldUpdateOperationsInput | number
    gross_amount?: FloatFieldUpdateOperationsInput | number
    commission_rate?: FloatFieldUpdateOperationsInput | number
    commission_amount?: FloatFieldUpdateOperationsInput | number
    other_charges?: JsonNullValueInput | InputJsonValue
    net_payable?: FloatFieldUpdateOperationsInput | number
    payment_status?: EnumBillPaymentStatusFieldUpdateOperationsInput | $Enums.BillPaymentStatus
    payment_method?: NullableStringFieldUpdateOperationsInput | string | null
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuctionItemCreateManySessionInput = {
    id?: string
    farmer_id: string
    product_id: string
    unit: $Enums.Unit
    quantity: number
    buyer_id?: string | null
    bill_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    rate?: number | null
  }

  export type AuctionItemUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    unit?: EnumUnitFieldUpdateOperationsInput | $Enums.Unit
    quantity?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: NullableFloatFieldUpdateOperationsInput | number | null
    bill?: BillUpdateOneWithoutAuction_itemsNestedInput
    buyer?: BuyerUpdateOneWithoutAuction_itemsNestedInput
    farmer?: FarmerUpdateOneRequiredWithoutAuction_itemsNestedInput
    product?: ProductUpdateOneRequiredWithoutAuction_itemsNestedInput
  }

  export type AuctionItemUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    farmer_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    unit?: EnumUnitFieldUpdateOperationsInput | $Enums.Unit
    quantity?: FloatFieldUpdateOperationsInput | number
    buyer_id?: NullableStringFieldUpdateOperationsInput | string | null
    bill_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AuctionItemUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    farmer_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    unit?: EnumUnitFieldUpdateOperationsInput | $Enums.Unit
    quantity?: FloatFieldUpdateOperationsInput | number
    buyer_id?: NullableStringFieldUpdateOperationsInput | string | null
    bill_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AuctionItemCreateManyBillInput = {
    id?: string
    session_id: string
    farmer_id: string
    product_id: string
    unit: $Enums.Unit
    quantity: number
    buyer_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    rate?: number | null
  }

  export type AuctionItemUpdateWithoutBillInput = {
    id?: StringFieldUpdateOperationsInput | string
    unit?: EnumUnitFieldUpdateOperationsInput | $Enums.Unit
    quantity?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: NullableFloatFieldUpdateOperationsInput | number | null
    buyer?: BuyerUpdateOneWithoutAuction_itemsNestedInput
    farmer?: FarmerUpdateOneRequiredWithoutAuction_itemsNestedInput
    product?: ProductUpdateOneRequiredWithoutAuction_itemsNestedInput
    session?: AuctionSessionUpdateOneRequiredWithoutAuction_itemsNestedInput
  }

  export type AuctionItemUncheckedUpdateWithoutBillInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    farmer_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    unit?: EnumUnitFieldUpdateOperationsInput | $Enums.Unit
    quantity?: FloatFieldUpdateOperationsInput | number
    buyer_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AuctionItemUncheckedUpdateManyWithoutBillInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_id?: StringFieldUpdateOperationsInput | string
    farmer_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    unit?: EnumUnitFieldUpdateOperationsInput | $Enums.Unit
    quantity?: FloatFieldUpdateOperationsInput | number
    buyer_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: NullableFloatFieldUpdateOperationsInput | number | null
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