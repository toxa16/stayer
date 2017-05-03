import * as assert from 'assert';
import {HttpError, InternalServerError, MethodNotAllowed, NotFound, NotImplemented} from '../../lib/http/errors';
import {serviceInstancesFixture as serviceInstances} from '../fixtures/services.fixture';
import {
  endpointReturnValues,
  endpointsFixture as endpoints,
  testEndpointFunctions
} from '../fixtures/endpoints.fixture';
import {routeRequest} from '../../lib/http/route-request';
import {IncomingMessage} from 'http';
import {AssertionError} from 'assert';
import {TestError} from '../helpers/test.error';
import {TestHttpError} from '../helpers/test.http.error';


describe('routeRequest()', () => {

  it(
    `should throw ${NotImplemented.name} on unsupported HTTP method`,
    (done) => {
      // method TRACE will not be supported to prevent XST
      const method = 'TRACE';

      // mock request
      const mockRequest = { method };

      // mock body parser
      const mockBodyParser = function (r) {
        return undefined;
      };

      // mock endpointExecutor
      const mockExecutor = function (s, e, pl) {
        return undefined;
      };

      // executing routeRequest()
      routeRequest(
        mockRequest as IncomingMessage, serviceInstances,
        endpoints, mockBodyParser, mockExecutor
      ).then(() => {
        assert.fail(undefined, undefined,
          `${NotImplemented.name} error should be thrown`, undefined);
      }).catch(err => {
        if (err instanceof AssertionError) {
          throw err;
        }
        assert.equal(err.name, NotImplemented.name);
        done();
      }).catch(done);
    }
  );

  it(
    `should throw ${NotFound.name} on unregistered URL path`,
    (done) => {
      // mock request
      const mockRequest = {
        method: 'GET',
        url: '/unregistered-path'
      };

      // mock body parser
      const mockBodyParser = function (r) {
        return undefined;
      };

      // mock endpointExecutor
      const mockExecutor = function (s, e, pl) {
        return undefined;
      };

      // executing routeRequest()
      routeRequest(
        mockRequest as IncomingMessage, serviceInstances,
        endpoints, mockBodyParser, mockExecutor
      ).then(() => {
        assert.fail(undefined, undefined,
          `${NotFound.name} error should be thrown`, undefined);
      }).catch(err => {
        if (err instanceof AssertionError) {
          throw err;
        }
        assert.equal(err.name, NotFound.name);
        done();
      }).catch(done);
    }
  );

  it(
    `should throw ${MethodNotAllowed.name} when there is/are ` +
    `registered endpoint/-s with given URL but with different ` +
    `HTTP method/-s`,
    (done) => {
      // initializing endpoint
      const endpoint = endpoints[0];

      // mock request
      const mockRequest = {
        method: 'GET',
        url: endpoint.path
      };

      // mock body parser
      const mockBodyParser = function (r) {
        return undefined;
      };

      // mock endpointExecutor
      const mockExecutor = function (s, e, pl) {
        return undefined;
      };

      // executing routeRequest()
      routeRequest(
        mockRequest as IncomingMessage, serviceInstances,
        endpoints, mockBodyParser, mockExecutor
      ).then(() => {
        assert.fail(undefined, undefined,
          `${MethodNotAllowed.name} error should be thrown`, undefined);
      }).catch(err => {
        if (err instanceof AssertionError) {
          throw err;
        }
        assert.equal(err.name, MethodNotAllowed.name);
        done();
      }).catch(done);
    }
  );

  it(
    `should throw ${InternalServerError.name} ` +
    `on bodyParser internal error`,
    (done) => {
      // initializing endpoint
      const endpoint = endpoints[0];

      // mock request
      const mockRequest = {
        method: 'POST',
        url: endpoint.path
      };

      // mock body parser
      const mockBodyParser = function (r) {
        return Promise.reject(new TestError());
      };

      // mock endpointExecutor
      const mockExecutor = function (s, e, pl) {
        return undefined;
      };

      // executing routeRequest()
      routeRequest(
        mockRequest as IncomingMessage, serviceInstances,
        endpoints, mockBodyParser, mockExecutor
      ).then(() => {
        assert.fail(undefined, undefined,
          `${InternalServerError.name} error should be thrown`,
          undefined);
      }).catch(err => {
        if (err instanceof AssertionError) {
          throw err;
        }
        assert.equal(err.name, InternalServerError.name);
        done();
      }).catch(done);
    }
  );

  it(
    `should rethrow ${HttpError.name} thrown by endpointExecutor`,
    (done) => {
      // initializing endpoint
      const endpoint = endpoints[0];

      // mock request
      const mockRequest = {
        method: 'POST',
        url: endpoint.path
      };

      // mock body parser
      const mockBodyParser = function (r) {
        return undefined;
      };

      // mock endpointExecutor
      const mockExecutor = function (s, e, pl) {
        return Promise.reject(new TestHttpError());
      };

      // executing routeRequest()
      routeRequest(
        mockRequest as IncomingMessage, serviceInstances,
        endpoints, mockBodyParser, mockExecutor
      ).then(() => {
        assert.fail(undefined, undefined,
          `${TestHttpError.name} error should be thrown`,
          undefined);
      }).catch(err => {
        if (err instanceof AssertionError) {
          throw err;
        }
        assert.equal(err.name, TestHttpError.name);
        done();
      }).catch(done);
    }
  );

  it(
    `should return endpoint return value for registered endpoint ` +
    `(asynchronous non-parametrized endpoint)`,
    (done) => {
      // initializing endpoint
      const endpoint = endpoints[0];
      const expected = endpointReturnValues[Symbol.for(endpoint.name)];

      // mock request
      const mockRequest = {
        method: 'POST',
        url: endpoint.path
      };

      // mock body parser
      const mockBodyParser = function (r) {
        return Promise.resolve({});
      };

      // mock endpointExecutor
      const mockExecutor = function (s, e, pl) {
        return testEndpointFunctions[Symbol.for(endpoint.name)]();
      };

      // executing routeRequest()
      routeRequest(
        mockRequest as IncomingMessage, serviceInstances,
        endpoints, mockBodyParser, mockExecutor
      ).then(actual => {
        assert.deepEqual(actual, expected);
        done();
      }).catch(done);
    }
  );

  it(
    `should return endpoint return value for registered endpoint ` +
    `(synchronous two-parameter endpoint)`,
    (done) => {
      // initializing endpoint
      const endpoint = endpoints[3];
      const arg1 = 1e11;
      const arg2 = false;
      const expected =
        endpointReturnValues[Symbol.for(endpoint.name)](arg1, arg2);

      // mock request
      const mockRequest = {
        method: 'POST',
        url: endpoint.path
      };

      // mock body parser
      const mockBodyParser = function (r) {
        return Promise.resolve({
          'param1': arg1,
          'param2': arg2,
          'paramN': true,
        });
      };

      // mock endpointExecutor
      const mockExecutor = function (s, e, pl) {
        const body = pl.body;
        return testEndpointFunctions
          [Symbol.for(endpoint.name)](body['param1'], body['param2']);
      };

      // executing routeRequest()
      routeRequest(
        mockRequest as IncomingMessage, serviceInstances,
        endpoints, mockBodyParser, mockExecutor
      ).then(actual => {
        assert.deepEqual(actual, expected);
        done();
      }).catch(done);
    }
  );

});
