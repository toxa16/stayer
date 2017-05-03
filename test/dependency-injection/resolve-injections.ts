import * as assert from 'assert';
import {injectionsFixture} from '../fixtures/injections.fixture';
import {InjectionRegister} from '../../lib/registers/injection.register';
import {resolveInjections} from '../../lib/dependency-injection/resolve-injectons';
import {StringMap} from '../../lib/types/string-map';



// creating mock register
const mockRegister = new InjectionRegister(injectionsFixture);

// test factories array
const factories: Function[] = [];
for (const [name, factory] of injectionsFixture) {
  factories.push(factory());
}

// resolving test instances from factories
Promise.all(factories)
  .then(testInstances => {

    // executing resolveInjections()
    resolveInjections(mockRegister)
      .then((actualMap: StringMap<any>) => {

        describe('resolveInjections()', () => {
          // initializing expected map
          const expectedMap: StringMap<any> = new StringMap();

          for (const [name] of injectionsFixture) {
            expectedMap.set(name, testInstances.shift());
          }

          it(`should return a map of injection instances`, () => {
            assert.deepEqual(actualMap.size, expectedMap.size,
              `returned map should contain ${expectedMap.size} injection instances`);

            for (const [name, expectedInstance] of expectedMap) {
              const actualInstance = actualMap.get(name);
              assert.deepEqual(actualInstance, expectedInstance,
                `returned map should contain ${name} injection instance`);
            }
          });



          it('should catch injection factories errors');
        });

        run();
      });

  });