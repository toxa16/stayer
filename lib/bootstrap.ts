import {injectionRegister} from './registers/injection.register';
import {httpServer} from './http/http.server';
import {APIDescriptor} from './types/api-descriptor';
import {initializeInjections} from './initialize-injections';
import {endpointRegister} from './registers/endpoint.register';
import {serviceRegister} from './registers/service.register';
import {inject} from './inject';


export interface ServerOptions {
  port: number;
  onListen?: (port: number) => void;
}

export function bootstrap(rootService: Object, options: ServerOptions) {

  // decorators have ended their execution until here

  initializeInjections(injectionRegister)
    .then(injections => {
      const serviceInstances = inject(injections, serviceRegister);
      return new APIDescriptor(
        endpointRegister.getEndpoints(), serviceInstances);
    })
    .then(descriptor => {
      httpServer(descriptor, options)
    })
    .catch(err => {
      // TODO: implement CATCH correctly
      console.log('bootstrap() function: error caught');
      throw err;
    });

  /*initializeAPI(rootService, injectionRegister)
    .then((descriptor: APIDescriptor) => {
      httpServer(descriptor, options);
    })
    .catch(err => {
      console.log('bootstrap() function: error caught');
      throw err;
    });*/
}
