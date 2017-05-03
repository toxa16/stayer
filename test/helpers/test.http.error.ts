import {HttpError} from '../../lib/http/errors';


export class TestHttpError extends HttpError {
  statusCode = 0;
}
