import {Constructable} from '../../lib/types/constructable';
import {
  factoryValues, testFactory1Symbol, testFactory2Symbol, TestInjection1,
  TestInjection2
} from './injections.fixture';
import {TestService1, TestService2, TestService3} from './service-classes';
import {StringMap} from '../../lib/types/string-map';
import {
  nonParamAsyncSymbol, nonParamSyncSymbol, oneParamAsyncSymbol, twoParamSyncSymbol,
  testEndpointFunctions, throwTestErrorSymbol, throwHttpErrorSymbol
} from './endpoints.fixture';



// ====================
// SERVICES FIXTURE.
// ====================



// * Service endpoints
// -------------------

TestService1.prototype[Symbol.keyFor(nonParamAsyncSymbol)] =
  testEndpointFunctions[nonParamAsyncSymbol];

TestService2.prototype[Symbol.keyFor(nonParamSyncSymbol)] =
  testEndpointFunctions[nonParamSyncSymbol];

TestService3.prototype[Symbol.keyFor(oneParamAsyncSymbol)] =
  testEndpointFunctions[oneParamAsyncSymbol];

TestService3.prototype[Symbol.keyFor(twoParamSyncSymbol)] =
  testEndpointFunctions[twoParamSyncSymbol];

TestService2.prototype[Symbol.keyFor(throwTestErrorSymbol)] =
  testEndpointFunctions[throwTestErrorSymbol];

TestService1.prototype[Symbol.keyFor(throwHttpErrorSymbol)] =
  testEndpointFunctions[throwHttpErrorSymbol];


// * Services fixture
// ------------------

export const servicesFixture: Map<Constructable, string[]> = new Map();
servicesFixture.set(TestService1,
  [TestInjection2.name, TestInjection1.name]);
servicesFixture.set(TestService2, [TestInjection1.name]);
servicesFixture.set(TestService3, [TestInjection2.name]);


// * Service instances fixture
// ---------------------------

export const serviceInstancesFixture: StringMap<any> = new StringMap();
serviceInstancesFixture.set(TestService1.name,
  new TestService1(
    factoryValues[testFactory2Symbol] as TestInjection2,
    factoryValues[testFactory1Symbol] as TestInjection1
  ));
serviceInstancesFixture.set(TestService2.name,
  new TestService2(
    factoryValues[testFactory1Symbol] as TestInjection1
  ));
serviceInstancesFixture.set(TestService3.name,
  new TestService3(
    factoryValues[testFactory2Symbol] as TestInjection2
  ));
