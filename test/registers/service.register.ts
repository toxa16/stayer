import 'reflect-metadata';
import * as assert from 'assert';
import {ServiceRegister} from '../../lib/registers/service.register';
import {Constructable} from '../../lib/types/constructable';
import {servicesFixture as testServices} from '../fixtures/services.fixture';



describe('ServiceRegister', () => {


  describe('register()', () => {
    // initializing
    const testStorage: Map<Constructable, string[]> = new Map();
    const serviceRegister = new ServiceRegister(testStorage);

    // executing register()
    for (const [service, dependencies] of testServices) {
      serviceRegister.register(service, dependencies);
    }

    it('should register test services', () => {
      const actualMap = testStorage;
      const expectedMap = testServices;

      assert.equal(actualMap.size, expectedMap.size,
        `test storage should contain ${expectedMap.size} records`);

      for (const [service, expected] of expectedMap) {
        const actual = actualMap.get(service);
        assert.deepEqual(actual, expected,
          `test storage should contain ${service.name} service`);
      }
    });
  });


  describe('get()', () => {
    // initializing
    const testStorage = testServices;
    const serviceRegister = new ServiceRegister(testStorage);

    it('should return test storage contents', () => {
      // executing get()
      const actualMap = serviceRegister.get();
      const expectedMap = testStorage;

      assert.equal(actualMap.size, expectedMap.size,
        `returned map should contain ${expectedMap.size} records`);

      for (const [name, expected] of expectedMap) {
        const actual = actualMap.get(name);
        assert.deepEqual(actual, expected,
          `returned map should contain ${name} factory`);
      }
    });
  });


});
