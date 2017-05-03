import {Endpoint} from '../../lib/types/endpoint';
import {EndpointMethod} from '../../lib/types/endpoint-method';
import {TestService1, TestService2, TestService3} from './service-classes';
import {TestError} from '../helpers/test.error';
import {TestHttpError} from '../helpers/test.http.error';


// =======================
// ENDPOINTS FIXTURE.
// =======================


// * Test endpoint name symbols
// ----------------------------

export const nonParamAsyncSymbol =
  Symbol.for('nonParamAsyncEndpoint');
export const nonParamSyncSymbol =
  Symbol.for('nonParamSyncEndpoint');
export const oneParamAsyncSymbol =
  Symbol.for('oneParamAsyncEndpoint');
export const twoParamSyncSymbol =
  Symbol.for('twoParamSyncEndpoint');
export const throwTestErrorSymbol =
  Symbol.for('throwTestErrorEndpoint');
export const throwHttpErrorSymbol =
  Symbol.for('throwHttpErrorEndpoint');


// * Test endpoint return values
// -----------------------------

export const endpointReturnValues: {[key: string]: any} = {
  [nonParamAsyncSymbol]: 'responseString1',
  [nonParamSyncSymbol]: { name: 'responseObject2' },
  [oneParamAsyncSymbol]: function(param) {
    return param;
  },
  [twoParamSyncSymbol]: function(param1, param2) {
    return [param1, param2];
  },
};


// * Test endpoint functions
// -------------------------

export const testEndpointFunctions: { [key: string]: Function } = {

  [nonParamAsyncSymbol]: function() {
    return Promise.resolve(
      endpointReturnValues[nonParamAsyncSymbol]
    );
  },  // asynchronous, non-parametrized

  [nonParamSyncSymbol]: function() {
    return endpointReturnValues[nonParamSyncSymbol];
  },  // synchronous, non-parametrized

  [oneParamAsyncSymbol]: function(param) {
    const fn: Function = endpointReturnValues[oneParamAsyncSymbol];
    return Promise.resolve(fn(param));
  },  // asynchronous, one parameter

  [twoParamSyncSymbol]: function(param1, param2) {
    const fn: Function = endpointReturnValues[twoParamSyncSymbol];
    return fn(param1, param2);
  },  // synchronous, two parameters

  [throwTestErrorSymbol]: function() {
    throw new TestError();
  },  // synchronous, non-parametrized

  [throwHttpErrorSymbol]: function() {
    return Promise.reject(new TestHttpError());
  },  // asynchronous, non-parametrized
};


// * Endpoints fixture
// -------------------

export const endpointsFixture: Endpoint[] = [
  {
    name: Symbol.keyFor(nonParamAsyncSymbol),
    method: EndpointMethod.Post,
    path: '/test-path1',
    serviceName: TestService1.name,
    parameters: [],
  },  // 0
  {
    name: Symbol.keyFor(nonParamSyncSymbol),
    method: EndpointMethod.Post,
    path: '/test-path2',
    serviceName: TestService2.name,
    parameters: [],
  },  // 1
  {
    name: Symbol.keyFor(oneParamAsyncSymbol),
    method: EndpointMethod.Post,
    path: '/test-path3',
    serviceName: TestService3.name,
    parameters: [
      { name: 'param', constraints: [] }
    ],
  },  // 2
  {
    name: Symbol.keyFor(twoParamSyncSymbol),
    method: EndpointMethod.Post,
    path: '/test-path4',
    serviceName: TestService3.name,
    parameters: [
      { name: 'param1', constraints: [] },
      { name: 'param2', constraints: [] },
    ],
  },  // 3
  {
    name: Symbol.keyFor(throwTestErrorSymbol),
    method: EndpointMethod.Post,
    path: '/test-path5',
    serviceName: TestService2.name,
    parameters: [],
  },  // 4
  {
    name: Symbol.keyFor(throwHttpErrorSymbol),
    method: EndpointMethod.Post,
    path: '/test-path6',
    serviceName: TestService1.name,
    parameters: [],
  },  // 5
];
