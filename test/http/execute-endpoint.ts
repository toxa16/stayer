import * as assert from 'assert';
import {executeEndpoint} from '../../lib/http/execute-endpoint';
import {serviceInstancesFixture as istances} from '../fixtures/services.fixture';
import {endpointReturnValues, endpointsFixture} from '../fixtures/endpoints.fixture';
import {HttpError, InternalServerError} from '../../lib/http/errors';
import {TestHttpError} from '../helpers/test.http.error';


describe('executeEndpoint()', () => {

  it(
    'should return non-parametrized asynchronous endpoint return value',
    (done) => {
      // initializing
      const endpoint = endpointsFixture[0];
      const service = istances.get(endpoint.serviceName);
      const expected = endpointReturnValues[Symbol.for(endpoint.name)];

      // mocking argument retriever
      const mockRetriever = function (p, q, b?) {
        return [];
      };

      // executing executeEndpoint()
      executeEndpoint(service, endpoint, { query: {} }, mockRetriever)
        .then(actual => {
          // asserting
          assert.deepEqual(actual, expected);
          done();
        })
        .catch(done);
    }
  );

  it(
    'should return non-parametrized synchronous endpoint return value',
    (done) => {
      // initializing
      const endpoint = endpointsFixture[1];
      const service = istances.get(endpoint.serviceName);
      const expected = endpointReturnValues[Symbol.for(endpoint.name)];

      // mocking argument retriever
      const mockRetriever = function (p, q, b?) {
        return [];
      };

      // executing executeEndpoint()
      executeEndpoint(service, endpoint, { query: {} }, mockRetriever)
        .then(actual => {
          // asserting
          assert.deepEqual(actual, expected);
          done();
        })
        .catch(done);
    }
  );

  it(
    'should return one-parameter (asynchronous) endpoint return value',
    (done) => {
      // initializing
      const endpoint = endpointsFixture[2];
      const service = istances.get(endpoint.serviceName);
      const argument = { name: 'testArgument' };
      const expected =
        endpointReturnValues[Symbol.for(endpoint.name)](argument);

      // mocking argument retriever
      const mockRetriever = (p, q, b?) => {
        return [argument];
      };

      // executing executeEndpoint()
      executeEndpoint(service, endpoint, { query: {} }, mockRetriever)
        .then(actual => {
          // asserting
          assert.deepEqual(actual, expected);
          done();
        })
        .catch(done);
    }
  );

  it(
    'should return two-parameter (synchronous) endpoint return value',
    (done) => {
      // initializing
      const endpoint = endpointsFixture[3];
      const service = istances.get(endpoint.serviceName);
      const argument1 = 'testStringArgument';
      const argument2 = 3e5;
      const expected =
        endpointReturnValues[Symbol.for(endpoint.name)]
        (argument1, argument2);

      // mocking argument retriever
      const mockRetriever = (p, q, b?) => {
        return [argument1, argument2];
      };

      // executing executeEndpoint()
      executeEndpoint(service, endpoint, { query: {} }, mockRetriever)
        .then(actual => {
          // asserting
          assert.deepEqual(actual, expected);
          done();
        })
        .catch(done);
    }
  );

  it(
    `should throw ${InternalServerError.name} ` +
    `on endpoint internal error`,
    (done) => {
      // initializing
      const endpoint = endpointsFixture[4];
      const service = istances.get(endpoint.serviceName);

      // mocking argument retriever
      const mockRetriever = (p, q, b?) => {
        return [];
      };

      // executing executeEndpoint()
      executeEndpoint(service, endpoint, { query: {} }, mockRetriever)
        .catch(err => {
          // asserting
          assert.equal(err.name, InternalServerError.name);
          done();
        })
        .catch(done);
    }
  );

  it(
    `should rethrow the ${HttpError.name} ` +
    `on endpoint internal ${HttpError.name}`,
    (done) => {
      // initializing
      const endpoint = endpointsFixture[5];
      const service = istances.get(endpoint.serviceName);

      // mocking argument retriever
      const mockRetriever = (p, q, b?) => {
        return [];
      };

      // executing executeEndpoint()
      executeEndpoint(service, endpoint, { query: {} }, mockRetriever)
        .catch(err => {
          // asserting
          assert.equal(err.name, TestHttpError.name);
          done();
        })
        .catch(done);
    }
  );


  it(
    `should rethrow the ${HttpError.name} ` +
    `on argument retriever internal ${HttpError.name}`,
    (done) => {
      // initializing
      const endpoint = endpointsFixture[0];

      // mocking argument retriever
      const mockRetriever = (p, q, b?) => {
        throw new TestHttpError();
      };

      // executing executeEndpoint()
      executeEndpoint(undefined, endpoint, { query: {} }, mockRetriever)
        .catch(err => {
          // asserting
          assert.equal(err.name, TestHttpError.name);
          done();
        })
        .catch(done);
    }
  );

});
