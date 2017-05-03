import {TestInjection1, TestInjection2} from './injections.fixture';


// ========================
// TEST SERVICE CLASSES.
// ========================


// * Test service 1
// ----------------

export class TestService1 {
  constructor(
    private dependency1: TestInjection2,
    private dependency2: TestInjection1
  ) {}
}


// * Test service 2
// ----------------

export class TestService2 {
  constructor(private dependency: TestInjection1) {}
}


// * Test service 3
// ----------------

export class TestService3 {
  constructor(private dependency: TestInjection2) {}
}
