import 'reflect-metadata';


// ==============================
// Stayer framework public API.
// ==============================



// Interfaces
// ----------

export interface BootstrapOptions {
  port: number;
  onListen?: (port: number) => void;
}

export interface InjectionOptions {
  factory: Function;
}

export interface ServiceOptions {
  basePath: string;
  services?: any[];
}



// Functions
// ---------

/**
 * Launches the Stayer application server.
 * @param rootService the root service of the application
 * @param options BootstrapOptions bootstrapping options
 */
export declare function bootstrap(rootService: Object, options: BootstrapOptions): void;



// Class decorators
// ----------------

export declare function Injection(options: InjectionOptions): (constructor: Function) => void;

export declare function Service(options: ServiceOptions);



// Method decorators
// -----------------

export declare function Post(path: string): (target: any, methodName: string) => void;

export declare function Post(path: string): (target: any, methodName: string) => void;



// Parameter decorators
// --------------------

export declare function auth(target: any, propertyKey: any, parameterIndex: any): void;

export declare function email(target: any, propertyKey: any, parameterIndex: any): void;

export declare function maxlength(maxChars: number): (target: any, propertyKey: any, parameterIndex: any) => void;

export declare function minlength(minChars: number): (target: any, propertyKey: any, parameterIndex: any) => void;

export declare function pattern(regexp: RegExp): (target: any, propertyKey: any, parameterIndex: any) => void;

export declare function query(target: any, propertyKey: any, parameterIndex: any): void;

export declare function required(target: any, propertyKey: any, parameterIndex: any): void;



// Errors
// ------

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
export declare class MethodNotAllowed extends HttpError {
  statusCode: number;
}
export declare class Conflict extends HttpError {
  statusCode: number;
}
export declare class InternalServerError extends HttpError {
  statusCode: number;
}
export declare class NotImplemented extends HttpError {
  statusCode: number;
}
