import * as assert from 'assert';
import {Endpoint} from '../../lib/types/endpoint';
import {EndpointRegister} from '../../lib/registers/endpoint.register';
import {endpointsFixture as testEndpoints} from '../fixtures/endpoints.fixture';



describe('EndpointRegister', () => {


  describe('register()', () => {
    // initializing
    const testStorage: Endpoint[] = [];
    const endpointRegister = new EndpointRegister(testStorage);

    // executing register()
    for (const endpoint of testEndpoints) {
      endpointRegister.register(endpoint);
    }

    it(`should register test endpoints`, () => {
      const actualLength = testStorage.length;
      const expectedLength = testEndpoints.length;
      assert.equal(actualLength, expectedLength,
        `test storage should contain ${expectedLength} endpoint records`);

      for (const endpoint of testEndpoints) {
        assert.ok(testStorage.indexOf(endpoint) !== -1,
          `test storage should contain ${endpoint.name}() endpoint record`);
      }
    });
  });


  describe('get()', () => {
    // initializing
    const testStorage = testEndpoints;
    const endpointRegister = new EndpointRegister(testStorage);

    it('should return test storage contents', () => {
      const actual = endpointRegister.get();
      assert.deepEqual(actual, testStorage);
    });
  });


});
