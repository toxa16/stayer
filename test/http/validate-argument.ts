import * as assert from 'assert';
import {BadRequest} from '../../lib/http/errors';
import {validateArgument} from '../../lib/http/validate-argument';
import {Parameter} from '../../lib/types/parameter';
import {ConstraintType} from '../../lib/types/constraint-type';


describe('validateArgument()', () => {

  // generating random parameter index
  // (parameter index does not play role in this test suite)
  const parameterIndex = Math.floor(Math.random()) * 10;


  describe('on @required', () => {
    // initializing parameter
    const parameter: Parameter = {
      name: 'param',
      constraints: [
        { type: ConstraintType.Required, parameterIndex }
      ],
    };

    it('should validate if the argument is truthy', () => {
      const argument = 'truthy';
      assert.doesNotThrow(function () {
        validateArgument(argument, parameter);
      }, BadRequest);
    });

    it('should validate if the argument is "0"', () => {
      const argument = 0;
      assert.doesNotThrow(function () {
        validateArgument(argument, parameter);
      }, BadRequest);
    });

    it('should validate if the argument is "false"', () => {
      const argument = false;
      assert.doesNotThrow(function () {
        validateArgument(argument, parameter);
      }, BadRequest);
    });

    it (
      `should throw ${BadRequest.name} if the argument ` +
      `is "undefined"`,
      () => {
        const argument = undefined;
        assert.throws(function () {
          validateArgument(argument, parameter);
        }, BadRequest);
      }
    );

    it (
      `should throw ${BadRequest.name} if the argument is "null"`,
      () => {
        const argument = null;
        assert.throws(function () {
          validateArgument(argument, parameter);
        }, BadRequest);
      }
    );
  });


  describe('on @email', () => {
    // initializing parameter
    const parameter: Parameter = {
      name: 'param',
      constraints: [
        // required validator should be passed
        { type: ConstraintType.Required, parameterIndex },
        { type: ConstraintType.Email, parameterIndex }
      ],
    };

    it(
      'should validate if the argument is a valid email address',
      () => {
        const argument = 'uno@email.com';
        assert.doesNotThrow(function () {
          validateArgument(argument, parameter);
        }, BadRequest);
      }
    );

    it(
      `should throw ${BadRequest.name} if the argument ` +
      `is a not valid email address`,
      () => {
        const argument = 'invalid@email';
        assert.throws(function () {
          validateArgument(argument, parameter);
        }, BadRequest);
      }
    );
  });


  describe('on @pattern', () => {
    // initializing parameter
    const parameter: Parameter = {
      name: 'param',
      constraints: [
        { type: ConstraintType.Pattern, parameterIndex,
          options: { regexp: /^[a-zA-Z]+$/ } }
      ],
    };

    it(
      'should validate if the argument matches the pattern regexp',
      () => {
        const argument = 'onlyBigOrSmallLetters';
        assert.doesNotThrow(function () {
          validateArgument(argument, parameter);
        }, BadRequest);
      }
    );

    it(
      `should throw ${BadRequest.name} if the argument ` +
      `does not match the pattern regexp`,
      () => {
        const argument = 'digits123';
        assert.throws(function () {
          validateArgument(argument, parameter);
        }, BadRequest);
      }
    );
  });


  describe('on @minlength', () => {
    // initializing parameter
    const minChars = 4;
    const parameter: Parameter = {
      name: 'param',
      constraints: [
        { type: ConstraintType.MinLength, parameterIndex,
          options: { minChars } }
      ],
    };

    it(
      `should validate if the argument longer than ` +
      `[minChars] characters`,
      () => {
        const argument = '12345';
        assert.doesNotThrow(function () {
          validateArgument(argument, parameter);
        }, BadRequest);
      }
    );

    it(
      `should validate if the argument is exactly ` +
      `[minChars] characters long`,
      () => {
        const argument = '1234';
        assert.doesNotThrow(function () {
          validateArgument(argument, parameter);
        }, BadRequest);
      }
    );

    it(
      `should throw ${BadRequest.name} if the argument ` +
      `is less than [minChars] characters long`,
      () => {
        const argument = '123';
        assert.throws(function () {
          validateArgument(argument, parameter);
        }, BadRequest);
      }
    );
  });


  describe('on @maxlength', () => {
    // initializing parameter
    const maxChars = 10;
    const parameter: Parameter = {
      name: 'param',
      constraints: [
        { type: ConstraintType.MaxLength, parameterIndex,
          options: { maxChars } }
      ],
    };

    it(
      `should validate if the argument is shorter than ` +
      `[maxChars] characters`,
      () => {
        const argument = 'shortStr';  // 8 chars
        assert.doesNotThrow(function () {
          validateArgument(argument, parameter);
        }, BadRequest);
      }
    );

    it(
      `should validate if the argument is exactly ` +
      `[maxChars] characters long`,
      () => {
        const argument = 'normString';  // 10 chars
        assert.doesNotThrow(function () {
          validateArgument(argument, parameter);
        }, BadRequest);
      }
    );

    it(
      `should throw ${BadRequest.name} if the argument ` +
      `is longer than [maxChars] characters`,
      () => {
        const argument = 'aLongString'; // 11 chars
        assert.throws(function () {
          validateArgument(argument, parameter);
        }, BadRequest);
      }
    );
  });

});
