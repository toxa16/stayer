import * as assert from 'assert';
import {ConstraintType} from '../lib/types/constraint-type';
import {ConstraintRegister} from '../lib/registers/constraint.register';

const constraintTypes = [
  ConstraintType.Auth,
  ConstraintType.Email,
  ConstraintType.MinLength,
  ConstraintType.Pattern,
  ConstraintType.Required,
];

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomConstraintType(): ConstraintType {
  const randomIndex = getRandomInt(0, constraintTypes.length - 1);
  return constraintTypes[randomIndex];
}

function getRandomConstraintTypeExcept(except: ConstraintType[]) {
  let constraintType: ConstraintType;
  do {
    constraintType = getRandomConstraintType();
  } while (except.indexOf(constraintType) !== -1);
  return constraintType;
}


describe('ConstraintRegister rules', () => {
  it('should not register duplicate constraints', () => {
    const type = getRandomConstraintType();
    const parameterIndex = getRandomInt(0, 10);
    const constraintRegister = new ConstraintRegister();

    // registering first time
    constraintRegister.register(type, parameterIndex);

    // registering second time the same constraint for the same parameter
    assert.throws(() => {
      constraintRegister.register(type, parameterIndex);
    }, SyntaxError);
  });

  it('should not register any constraints after registering @auth', () => {
    const constraintRegister = new ConstraintRegister();
    const parameterIndex = getRandomInt(0, 10);
    const type = getRandomConstraintTypeExcept([ConstraintType.Auth]);

    // registering @auth
    constraintRegister.register(ConstraintType.Auth, parameterIndex);

    // registering another constraint type for the same parameter
    assert.throws(() => {
      constraintRegister.register(type, parameterIndex);
    }, SyntaxError);
  });

  it('should not register @auth after registering another constraint', () => {
    const constraintRegister = new ConstraintRegister();
    const parameterIndex = getRandomInt(0, 10);
    const type = getRandomConstraintTypeExcept([ConstraintType.Auth]);

    // registering some constraint
    constraintRegister.register(type, parameterIndex);

    // registering @auth for the same parameter
    assert.throws(() => {
      constraintRegister.register(ConstraintType.Auth, parameterIndex);
    }, SyntaxError);
  });

  it('should not register @minlength nor @pattern after @email', () => {
    const constraintRegister = new ConstraintRegister();
    const parameterIndex = getRandomInt(0, 10);
    const type = getRandomConstraintTypeExcept([
      ConstraintType.Auth, ConstraintType.Email, ConstraintType.Required]);

    constraintRegister.register(ConstraintType.Email, parameterIndex);

    assert.throws(() => {
      constraintRegister.register(type, parameterIndex);
    }, SyntaxError);
  });

  it('should not register @minlength nor @pattern before @email', () => {
    const constraintRegister = new ConstraintRegister();
    const parameterIndex = getRandomInt(0, 10);
    const type = getRandomConstraintTypeExcept([
      ConstraintType.Auth, ConstraintType.Email, ConstraintType.Required]);

    constraintRegister.register(type, parameterIndex);

    assert.throws(() => {
      constraintRegister.register(ConstraintType.Email, parameterIndex);
    }, SyntaxError);
  });
});