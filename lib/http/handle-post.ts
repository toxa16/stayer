import {APIDescriptor} from '../types/api-descriptor';
import {EndpointMethod} from '../types/endpoint-method';
import {BadRequest, NotFound} from './errors';
import {ConstraintType} from '../types/constraint-type';
import {Parameter} from '../types/parameter';


function processParameters(parameters: Parameter[], body: Object): any[] {
  const args = [];
  for (const parameter of parameters) {
    const bodyArgument = body[parameter.name];

    const constraints = parameter.constraints;
    if (constraints.has(ConstraintType.Required) && !bodyArgument) {
      throw new BadRequest(`'${parameter.name}' is required.`);
    }
    if (constraints.has(ConstraintType.Email)) {
      if (!/.+@.+\..+/.test(bodyArgument)) {
        throw new BadRequest(
          `'${parameter.name}' is not a valid email address.`);
      }
    }
    if (constraints.has(ConstraintType.MinLength)) {
      const minChars = constraints.get(ConstraintType.MinLength).minChars;
      if (bodyArgument.length < minChars) {
        throw new BadRequest(
          `'${parameter.name}' must be at least ${minChars} characters long.`);
      }
    }

    args.push(bodyArgument);
  }
  return args;
}


export async function handlePost(
  url,
  body: Object,
  descriptor: APIDescriptor
): Promise<string> {
  const endpoints = descriptor.getEndpoints(EndpointMethod.Post);
  for (const endpoint of endpoints) {
    if (endpoint.route === url) {
      const serviceName = endpoint.serviceName;
      const endpointName = endpoint.name;
      const service = descriptor.getServiceInstance(serviceName);

      // processing endpoint parameters
      /*const parameters = endpoint.parameters;
       const args = [];
       for (const parameter of parameters) {
       args.push(body[parameter.name]);
       }*/
      const args = processParameters(endpoint.parameters, body);

      // executing endpoint
      return JSON.stringify(await service[endpointName](...args));
    }
  }
  throw new NotFound();
}
