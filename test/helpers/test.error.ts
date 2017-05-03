export class TestError extends Error {
  readonly message: string;

  constructor(message?: string) {
    (!!message) ? super(message) : super();
    this.message = message;
    this.name = this.constructor.name;
  }
}
