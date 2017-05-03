import * as assert from 'assert';
import {injectionsFixture} from '../fixtures/injections.fixture';
import {InjectionRegister} from '../../lib/registers/injection.register';
import {StringMap} from '../../lib/types/string-map';



describe('InjectionRegister', () => {


  describe('register()', () => {
    // initializing
    const testStorage: StringMap<Function> = new StringMap<Function>();
    const injectionRegister = new InjectionRegister(testStorage);

    // executing register()
    for (const [name, factory] of injectionsFixture) {
      injectionRegister.register(name, factory);
    }

    it(`should register test injections`, () => {
      const actualMap = testStorage;
      const expectedMap = injectionsFixture;

      assert.equal(actualMap.size, expectedMap.size,
        `test storage should contain ${expectedMap.size} records`);

      for (const [name, expected] of expectedMap) {
        const actual = actualMap.get(name);
        assert.deepEqual(actual, expected,
          `test storage should contain ${name} factory`);
      }

    });
  });


  describe('get()', () => {
    // initializing
    const testStorage = injectionsFixture;
    const injectionRegister = new InjectionRegister(testStorage);

    it('should return test storage contents', () => {
      // executing get()
      const actualMap = injectionRegister.get();
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
