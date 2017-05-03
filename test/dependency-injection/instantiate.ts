import * as assert from 'assert';
import {ServiceRegister} from '../../lib/registers/service.register';
import {
  serviceInstancesFixture as testInstances,
  servicesFixture as testServices
} from '../fixtures/services.fixture';
import {instantiate} from '../../lib/dependency-injection/instantiate';
import {
  injectionInstancesFixture as testInjections
} from '../fixtures/injections.fixture';


describe('instantiate()', () => {
  // initializing
  const mockRegister = new ServiceRegister(testServices);
  const actualMap = instantiate(testInjections, mockRegister);
  const expectedMap = testInstances;

  it(`should return a map of service instances`, () => {
    const actual = actualMap.size;
    const expected = expectedMap.size;
    assert.equal(actual, expected,
      `returned map should contain ${expectedMap.size} ` +
      `service instances`);

    for (const [name, expectedInstance] of expectedMap) {
      const actualInstance = actualMap.get(name);
      assert.deepEqual(actualInstance, expectedInstance,
        `returned map should contain an instance of ${name}`);
    }
  });
});
