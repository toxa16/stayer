import {createServer} from 'http';
import {BootstrapOptions} from './interfaces/bootstrap.options';
import {onRequest} from './http/on-request';
import {instantiate} from './dependency-injection/instantiate';
import {serviceRegister} from './registers/service.register';
import {endpointRegister} from './registers/endpoint.register';
import {resolveInjections} from './dependency-injection/resolve-injectons';
import {injectionRegister} from './registers/injection.register';


/**
 * Launches the Stayer application server.
 * @param rootService the root service of the application
 * @param options BootstrapOptions bootstrapping options
 */
export function bootstrap(rootService: Object, options: BootstrapOptions) {

  // retrieving injection instances
  resolveInjections(injectionRegister)
    .then(injectionInstances => {

      // injecting dependencies and creating service instances
      const serviceInstances =
        instantiate(injectionInstances, serviceRegister);

      // getting registered endpoints
      const endpoints = endpointRegister.get();


      // creating an HTTP server
      const server = createServer();

      // handling requests
      server.on('request', function (request, response) {
        onRequest(request, response, serviceInstances, endpoints);
      });

      // launching server
      server.listen(options.port, function () {
        options.onListen(server.address().port);
      });
    })
    .catch(err => {
      // TODO: handle error correctly
      console.log(`bootstrap(): error caught`);
      console.log(err);
    });

}
