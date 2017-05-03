import {IncomingMessage, ServerResponse} from 'http';
import {Endpoint} from '../types/endpoint';
import {StringMap} from '../types/string-map';
import {routeRequest} from './route-request';
import {HttpError} from './errors';


export function onRequest(
  request: IncomingMessage,
  response: ServerResponse,
  serviceInstances: StringMap<any>,
  endpoints: Endpoint[],
): void {

  routeRequest(request, serviceInstances, endpoints)
    .then(output => {
      if (output) {
        response.end(JSON.stringify(output));
      } else {
        response.end();
      }
    })
    .catch((err: HttpError) => {
      response.statusCode = err.statusCode;
      const output = {
        code: response.statusCode,
        status: err.name,
        message: err.message,
      };
      response.end(JSON.stringify(output));
    });

}
