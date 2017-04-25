export abstract class HttpError extends Error {
  abstract statusCode: number;
  readonly message: string;

  constructor(message?: string) {
    (!!message) ? super(message) : super();
    this.message = message;
  }
}

export class BadRequest extends HttpError {
  statusCode = 400;
}

export class Unauthorized extends HttpError {
  statusCode = 401;
}

export class NotFound extends HttpError {
  statusCode = 404;
}

export class Conflict extends HttpError {
  statusCode = 409;
}

export class InternalServerError extends HttpError {
  statusCode = 500;
}
