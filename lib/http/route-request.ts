import {StringMap} from '../types/string-map';
import {Endpoint} from '../types/endpoint';
import {InternalServerError, MethodNotAllowed, NotFound, NotImplemented} from './errors';
import {EndpointMethod, methodMap} from '../types/endpoint-method';
import {executeEndpoint} from './execute-endpoint';
import {RequestPayload} from '../types/request-payload';
import {parseBody} from './parse-body';
import {IncomingMessage} from 'http';
import {parse} from 'url';


/**
 * Performs HTTP routing towards endpoints via request method
 * and URL. If request HTTP method has body, calls bodyParser
 * to parse the body. If for given HTTP route an endpoint found,
 * invokes endpointExecutor to eventually execute the endpoint.
 * Returns asynchronously the endpoint return value.
 * Throws appropriate HTTP errors for encountered routing errors.
 *
 * @param request Node.js HTTP request object
 * @param serviceInstances a map of service instances
 * @param endpoints array of registered endpoints
 * @param bodyParser HTTP request body parser; this
 * parameter implements dependency injection for test purposes
 * @param endpointExecutor endpoint's function executor; this
 * parameter implements dependency injection for test purposes
 *
 * @return {Promise} endpoint's function return value
 *
 * @throws {InternalServerError} on bodyParser internal error
 * @throws {HttpError} when endpointExecutor throws an internal
 * HttpError instance, the HttpError is rethrown
 */
export async function routeRequest(
  request: IncomingMessage,
  serviceInstances: StringMap<any>,
  endpoints: Endpoint[],
  bodyParser: (r: IncomingMessage) => Promise<any> = parseBody,
  endpointExecutor: (s, e, pl) => Promise<any> = executeEndpoint
): Promise<any> {

  const method = request.method;
  if (!methodMap.has(method)) {
    throw new NotImplemented();
  }

  const url = parse(request.url, true);

  const foundEndpoints: Endpoint[] = [];
  for (const endpoint of endpoints) {
    if (endpoint.path === url.pathname) {
      if (endpoint.method === methodMap.get(method)) {

        const payload: RequestPayload = { query: url.query };
        if (endpoint.method === EndpointMethod.Post ||
          endpoint.method === EndpointMethod.Put
        ) {
          try {
            payload.body = await bodyParser(request);
          } catch (err) {
            // TODO: log bodyParser error
            throw new InternalServerError();
          }
        }
        const service = serviceInstances.get(endpoint.serviceName);
        return await endpointExecutor(service, endpoint, payload);

      } else {
        foundEndpoints.push(endpoint);
      }
    }
  }

  if (foundEndpoints.length === 0) {
    throw new NotFound();
  } else {
    // TODO: compose Allow header
    throw new MethodNotAllowed();
  }

}
