## Test Injections Description


### Injection 1

Injection implements *asynchronous* factory.

```
@Injection({
  factory: function testFactory1() {
    return Promise.resolve(
      { property1: 1e11 }
    );
  }
})
export class TestInjection1 {
  property1: number;
}
```

### Injection 2

Injection implements *synchronous* factory.

```
@Injection({
  factory: function testFactory2() {
    return { property2: 'propertyTwo' };
  }
})
export class TestInjection2 {
  property2: string;
}
```