import {inject} from './inject';
import {httpServer} from './http/http.server';
import {Descriptor} from './types/descriptor';
import {register} from './registers';


export function bootstrap(rootService) {
  inject(rootService, register)
    .then((descriptor: Descriptor) => {
      httpServer(descriptor);
    });
    // TODO: implement CATCH
}
