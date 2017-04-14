import {inject} from './inject';
import {httpServer} from './http.server';


export function bootstrap(rootService) {
  inject(rootService)
    .then((serviceInstanceRegister) => {
      httpServer(serviceInstanceRegister);
    });
}
