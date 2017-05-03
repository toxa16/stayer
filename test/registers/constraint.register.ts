import * as assert from 'assert';
import {Constraint} from '../../lib/types/constraint';
import {ConstraintType} from '../../lib/types/constraint-type';
import {ConstraintRegister} from '../../lib/registers/constraint.register';


// test constraints
const testConstraints: Constraint[] = [
  { type: ConstraintType.Pattern, parameterIndex: 2,
    options: { regexp: /.+@.+\..+/} },
  { type: ConstraintType.Required, parameterIndex: 2 },
  { type: ConstraintType.MaxLength, parameterIndex: 1,
    options: { maxChars: 20 } },
  { type: ConstraintType.MinLength, parameterIndex: 1,
    options: { minChars: 4 } },
  { type: ConstraintType.Required, parameterIndex: 1 },
  { type: ConstraintType.Auth, parameterIndex: 0 },
];


describe('ConstraintRegister', () => {


  describe('register()', () => {

    it('should register test constraints', () => {
      // initializing storage & register
      const testStorage: Constraint[] = [];
      const register = new ConstraintRegister(testStorage);

      //executing register()
      testConstraints.map(constraint => register.register(constraint));

      // asserting
      assert.deepEqual(testStorage, testConstraints);
    });

    it(
      'should not register duplicate constraints on the same parameter',
      () => {
        // initializing
        const parameterIndex = 3;  // randomly chosen
        const type = ConstraintType.MinLength;  // randomly chosen
        const testStorage: Constraint[] = [
          { type, parameterIndex, options: { minChars: 5 } },
        ];
        const register = new ConstraintRegister(testStorage);

        // new constraint
        const newConstraint: Constraint = {
          type, parameterIndex, options: { minChars: 4 }
        };

        // executing & asserting
        assert.throws(function () {
          register.register(newConstraint);
        }, SyntaxError);
      }
    );

    it(
      'should not register @auth along with any constraints ' +
      'on the same parameter',
      () => {
        // initializing
        const parameterIndex = 1;  // randomly chosen
        const type = ConstraintType.MaxLength;  // randomly chosen
        const testStorage: Constraint[] = [
          { type, parameterIndex, options: { maxChars: 10 } },
        ];
        const register = new ConstraintRegister(testStorage);

        // new constraint
        const newConstraint: Constraint = {
          type: ConstraintType.Auth, parameterIndex
        };

        // executing & asserting
        assert.throws(function () {
          register.register(newConstraint);
        }, SyntaxError);
      }
    );

    it(
      'should not register any constraints along with @auth ' +
      'on the same parameter',
      () => {
        // initializing
        const parameterIndex = 0;  // randomly chosen
        const testStorage: Constraint[] = [
          { type: ConstraintType.Auth, parameterIndex }
        ];
        const register = new ConstraintRegister(testStorage);

        // new constraint
        const type = ConstraintType.Required;  // randomly chosen
        const newConstraint: Constraint = { type, parameterIndex };

        // executing & asserting
        assert.throws(function () {
          register.register(newConstraint);
        }, SyntaxError);
      }
    );

    it(
      'should not register @pattern along with @email ' +
      'on the same parameter',
      () => {
        // initializing
        const parameterIndex = 2;  // randomly chosen
        const testStorage: Constraint[] = [
          { type: ConstraintType.Email, parameterIndex }
        ];
        const register = new ConstraintRegister(testStorage);

        // new constraint
        const newConstraint: Constraint = {
          type: ConstraintType.Pattern,
          parameterIndex,
          options: { regexp: /a-z/ },
        };

        // executing & asserting
        assert.throws(function () {
          register.register(newConstraint);
        }, SyntaxError);
      }
    );

    it(
      'should not register @email along with @pattern ' +
      'on the same parameter',
      () => {
        // initializing
        const parameterIndex = 2;  // randomly chosen
        const testStorage: Constraint[] = [
          { type: ConstraintType.Pattern, parameterIndex,
            options: { regexp: /a-zA-Z/ }, }
        ];
        const register = new ConstraintRegister(testStorage);

        // new constraint
        const newConstraint: Constraint = {
          type: ConstraintType.Email, parameterIndex
        };

        // executing & asserting
        assert.throws(function () {
          register.register(newConstraint);
        }, SyntaxError);
      }
    );

    it(
      'should not register @maxlength nor @minlength ' +
      'along with @email or @pattern on the same parameter',
      () => {
        // initializing
        const parameterIndex = 4;  // randomly chosen

        // minlength or maxlength
        const maxL: Constraint = {
          type: ConstraintType.MaxLength,
          parameterIndex,
          options: { maxChars: 14 },
        };
        const minL: Constraint = {
          type: ConstraintType.MinLength,
          parameterIndex,
          options: { minChars: 4 },
        };

        const constraintA = Math.round(Math.random()) ? maxL : minL;
        /*let constraintA;
        if (Math.round(Math.random())) {
          constraintA = maxL;
          console.log('A = maxlength');
        } else {
          constraintA = minL;
          console.log('A = minlength');
        }*/

        // email or pattern
        const email: Constraint = {
          type: ConstraintType.Email,
          parameterIndex,
        };
        const pattern: Constraint = {
          type: ConstraintType.Pattern,
          parameterIndex,
          options: { regexp: /0-9/ },
        };

        const constraintB = Math.round(Math.random()) ? email : pattern;
        /*let constraintB;
        if (Math.round(Math.random())) {
          constraintB = email;
          console.log('B = email');
        } else {
          constraintB = pattern;
          console.log('B = pattern');
        }*/

        let constraint1: Constraint;
        let constraint2: Constraint;
        if (Math.round(Math.random())) {
          constraint1 = constraintA;
          constraint2 = constraintB;
          //console.log('A vs B');
        } else {
          constraint1 = constraintB;
          constraint2 = constraintA;
          //console.log('B vs A');
        }

        // initializing storage & register
        const testStorage: Constraint[] = [ constraint1 ];
        const register = new ConstraintRegister(testStorage);

        // new constraint
        const newConstraint = constraint2;

        // executing & asserting
        assert.throws(function () {
          register.register(newConstraint);
        }, SyntaxError);
      }
    )
  });


  describe('get()', () => {
    // initializing
    const testStorage: Constraint[] = Array.from(testConstraints);
    const register = new ConstraintRegister(testStorage);

    // executing get()
    const actualConstraints = register.get();

    it('should return constraint storage contents', () => {
      assert.deepEqual(actualConstraints, testConstraints);
    });

    it('should clear constraint storage', () => {
      assert.equal(testStorage.length, 0);
    });
  });


});