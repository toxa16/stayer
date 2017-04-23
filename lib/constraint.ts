export enum ConstraintType {
  MinLength,
  Pattern,
  Required,
}

export interface Constraint {
  type: ConstraintType,
  options?: Object,
}
