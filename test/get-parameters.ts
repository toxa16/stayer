import * as assert from 'assert';
import {Constraint} from '../lib/types/constraint';
import {ConstraintType} from '../lib/types/constraint-type';
import {getParameters} from '../lib/decorators/helpers/get-parameters';
import {ConstraintRegister} from '../lib/registers/constraint.register';
import {Parameter} from '../lib/types/parameter';


describe('getParameters()', () => {

  // initializing test parameters and constraints
  const paramNames = ['param1', 'param2', 'param3'];
  const testConstraints: Constraint[] = [
    { type: ConstraintType.Email, parameterIndex: 2 },
    { type: ConstraintType.Query, parameterIndex: 2 },
    { type: ConstraintType.MinLength, parameterIndex: 1,
      options: { minChars: 4 } },
    { type: ConstraintType.Required, parameterIndex: 1 },
    { type: ConstraintType.Auth, parameterIndex: 0 },
  ];



  it(
    'should return an array of parameters for endpoint of ' +
    'bodied HTTP method',
    () => {
      // initializing test register
      const register = new ConstraintRegister(
        Array.from(testConstraints));

      const expected: Parameter[] = [
        { name: 'param1', constraints: [
          testConstraints[4],
        ] },
        { name: 'param2', constraints: [
          testConstraints[2],
          testConstraints[3],
        ] },
        { name: 'param3', constraints: [
          testConstraints[0],
          testConstraints[1],
        ] },
      ];

      // executing getParameters()
      const actual = getParameters(paramNames, register, true);
      assert.deepEqual(actual, expected);
    }
  );

  it(
    'should return an array of parameters for endpoint of ' +
    'non-bodied HTTP method',
    () => {
      // initializing test register
      const testStorage = Array.from(testConstraints);
      const queryConstraint: Constraint =
        { type: ConstraintType.Query, parameterIndex: 1 };
      testStorage.push(queryConstraint);
      const register = new ConstraintRegister(testStorage);

      const expected: Parameter[] = [
        { name: 'param1', constraints: [
          testConstraints[4],
        ] },
        { name: 'param2', constraints: [
          testConstraints[2],
          testConstraints[3],
          queryConstraint,
        ] },
        { name: 'param3', constraints: [
          testConstraints[0],
          testConstraints[1],
        ] },
      ];

      // executing getParameters()
      const actual = getParameters(paramNames, register, false);
      assert.deepEqual(actual, expected);
    }
  );

  it(
    'should throw SyntaxError on parameter without @auth or @query ' +
    'for endpoints of non-bodied HTTP method',
    () => {
      // initializing test register
      const register = new ConstraintRegister(
        Array.from(testConstraints));

      assert.throws(function () {
        getParameters(paramNames, register, false);
      }, SyntaxError);
    }
  )
});
