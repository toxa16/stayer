import {StringMap} from './string-map';


export enum EndpointMethod {
  Get,
  Post,
  Put,
  Delete,
}


export const methodMap = new StringMap<EndpointMethod>();
methodMap.set('GET', EndpointMethod.Get);
methodMap.set('POST', EndpointMethod.Post);
methodMap.set('PUT', EndpointMethod.Put);
methodMap.set('DELETE', EndpointMethod.Delete);
