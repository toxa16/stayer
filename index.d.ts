import 'reflect-metadata';

// ===========================
// Stayer framework public API
// ===========================


// Interfaces
// ----------

export interface InjectionOptions {
  factory: Function;
}

export interface ServerOptions {
  port: number;
  onListen?: (port: number) => void;
}

export interface ServiceOptions {
  basePath: string;
  services?: any[];
}


// Parameter decorators
// --------------------

export declare function auth(target: any, propertyKey: any, parameterIndex: any): void;

export declare function email(target: any, propertyKey: any, parameterIndex: any): void;

export declare function minlength(minChars: number): (target: Object, methodName: string | symbol, parameterIndex: number) => void;

export declare function pattern(regexp: RegExp): (target: any, propertyKey: any, parameterIndex: any) => void;

export declare function required(target: any, propertyKey: any, parameterIndex: any): void;


// Method decorators
// -----------------

export declare function Get(route: string): (service: any, endpointName: string) => void;

export declare function Post(route: string): (service: any, endpointName: string) => void;


// Class decorators
// ----------------

export declare function Injection(options: InjectionOptions): (constructor: any) => void;

export declare function Service(options: ServiceOptions): (constructor: Function) => void;


// Functions
// ---------

export declare function bootstrap(rootService: any, options: ServerOptions): void;



// Errors
// ---------

export declare abstract class HttpError extends Error {
  readonly abstract statusCode: number;
  readonly message: string;
  constructor(message?: string);
}

export declare class BadRequest extends HttpError {
  statusCode: number;
}

export declare class Unauthorized extends HttpError {
  statusCode: number;
}

export declare class NotFound extends HttpError {
  statusCode: number;
}

export declare class Conflict extends HttpError {
  statusCode: number;
}

export declare class InternalServerError extends HttpError {
  statusCode: number;
}
