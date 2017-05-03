## Test Services Description

### Service 1

```
@Service({
  basePath: '/',
})
export class TestService1 {
  constructor(
    private dependency1: TestInjection2,
    private dependency2: TestInjection1,
  ) {}
  
  @Post('/test-path1')
  nonParamAsyncEndpoint() {
    return Promise.resolve('responseString1');
  }
  
  @Post('/test-path6')
  throwHttpErrorEndpoint() {
    return Promise.reject(new TestHttpError());
  }
}
```

### Service 2
```
@Service({
  basePath: '/',
})
export class TestService2 {
  constructor(private dependency: TestInjection1) {}
  
  @Post('/test-path2')
  nonParamSyncEndpoint() {
    return { name: 'responseObject2' };
  }
  
  @Post('/test-path5')
  throwTestErrorEndpoint() {
    throw new TestError();
  }
}
```

### Service 3
```
@Service({
  basePath: '/',
})
export class TestService3 {
  constructor(private dependency: TestInjection2) {}
  
  @Post('/test-path3')
  oneParamAsyncEndpoint(param) {
    return Promise.resolve(param);
  }
  
  @Post('/test-path4')
  testEndpoint4() {
    return undefined;
  }
}
```