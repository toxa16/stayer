import * as assert from 'assert';
import {Parameter} from '../../lib/types/parameter';
import {ConstraintType} from '../../lib/types/constraint-type';
import {retrieveArguments} from '../../lib/http/retrieve-arguments';
import {BadRequest} from '../../lib/http/errors';
import {RequestPayload} from '../../lib/types/request-payload';


describe('retrieveArguments()', () => {

  it(
    'should return "undefined" argument for @auth parameter',
    () => {
      // initializing parameters (one @auth parameter)
      const params: Parameter[] = [
        {
          name: 'param',
          constraints: [
            { type: ConstraintType.Auth, parameterIndex: 0 }
          ]
        },
      ];

      // mocking argument validator
      const mockValidator = function (a, p) {};

      // executing retrieveArguments()
      const actual = retrieveArguments(
        params, { query: {} }, mockValidator);
      const expected = [ undefined ];

      // asserting
      assert.deepEqual(actual, expected);
    }
  );


  it(
    'should return arguments array for corresponding parameters',
    () => {
      // initializing
      const param1Name = 'param1';
      const param2Name = 'param2';
      const param3Name = 'param3';

      const argument1 = 'value1';
      const argument3 = 'value3';

      // endpoint parameters
      const params: Parameter[] = [
        {
          name: param1Name,
          constraints: [
            { type: ConstraintType.Query, parameterIndex: 0 }
          ]
        }, // @query parameter
        {
          name: param2Name,
          constraints: [],
        }, // body parameter
        {
          name: param3Name,
          constraints: [],
        }, // body parameter
      ];

      // URL query
      const query = {
        [param1Name]: argument1,
        anotherParam: 'anotherValueA',  // additional query element
      };

      // request body
      const body = {
        [param3Name]: argument3,
        anotherParam: 'anotherValueB',  // additional body element
        // body doesn't have [param2Name] element
      };

      // mocking argument validator
      const mockValidator = function (a, p) {};

      // executing retrieveArguments()
      const actual = retrieveArguments(
        params, { query, body }, mockValidator);
      const expected = [argument1, undefined, argument3];

      // asserting
      assert.deepEqual(actual, expected);
    }
  );


  it(
    `should rethrow ${BadRequest.name} from argument validator ` +
    `when an argument doesn't pass a validator constraint`,
    () => {
      // initializing
      const params: Parameter[] = [
        {
          name: 'param',
          constraints: [
            { type: ConstraintType.Required, parameterIndex: 0 },
            { type: ConstraintType.Query, parameterIndex: 0 }
          ]
        },
      ];

      // mock argument validator
      const mockValidator = function (a, p) {
        throw new BadRequest();
      };

      assert.throws(function () {
        retrieveArguments(params, { query: {} }, mockValidator);
      }, BadRequest);
    }
  )

});
