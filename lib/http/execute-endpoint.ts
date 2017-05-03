import {Endpoint} from '../types/endpoint';
import {retrieveArguments} from './retrieve-arguments';
import {Parameter} from '../types/parameter';
import {HttpError, InternalServerError} from './errors';
import {RequestPayload} from '../types/request-payload';


/**
 * Executes the given service endpoint's function,
 * returns its value asynchronously.
 *
 * @param service endpoint's service instance
 * @param endpoint target endpoint
 * @param payload HTTP request payload (transitive parameter)
 * @param argumentRetriever argument retriever function; this
 * parameter implements dependency injection for test purposes
 *
 * @return {Promise} return value of endpoint's function
 *
 * @throws {InternalServerError} when the endpoint's function
 * encounters a general (non-HttpError) error
 * @throws {HttpError} when the endpoint's function or
 * argumentRetriever throws an HttpError instance, the HttpError
 * is rethrown
 */
export async function executeEndpoint(
  service: Object,
  endpoint: Endpoint,
  payload: RequestPayload,
  argumentRetriever: (p: Parameter[], q: any, b?: any) => any[]
    = retrieveArguments,
): Promise<any> {

  // retrieving arguments due to endpoint parameters
  const args = argumentRetriever(endpoint.parameters, payload);

  try {
    // executing endpoint function with retrieved arguments
    return await service[endpoint.name](...args);
  } catch (err) {
    if (err instanceof HttpError) {
      // rethrowing HttpError
      throw err;
    } else {
      // TODO: log internal error
      throw new InternalServerError();
    }
  }

}
