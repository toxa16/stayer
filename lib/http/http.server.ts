import * as http from 'http';
import {HttpError, NotFound} from './errors';
import {EndpointMethod} from '../types/endpoint-method';
import {APIDescriptor} from '../types/api-descriptor';
import {handlePost} from './handle-post';
import {ServerOptions} from '../bootstrap';


async function handleGet(url, descriptor: APIDescriptor) {
  const endpoints = descriptor.getEndpoints(EndpointMethod.Get);
  for (const endpoint of endpoints) {
    if (endpoint.route === url) {
      const serviceName = endpoint.serviceName;
      const endpointName = endpoint.name;
      const service = descriptor.getServiceInstance(serviceName);

      return JSON.stringify(await service[endpointName]());
    }
  }

  /*for (const key of getRegister.keys()) {
    if (url === key) {
      const value = getRegister.get(key);
      const serviceName = value.serviceName;
      const methodName = value.name;
      const service = descriptor.getServiceInstance(serviceName);

      return JSON.stringify(await service[methodName]());
    }
  }*/
  throw new NotFound();
}



function parseBody(request): Promise<Object> {

  // TODO: do with Buffer

  return new Promise((resolve, reject) => {
    let rawBody = '';
    request.on('data', (chunk) => {
      rawBody += chunk;
    });
    request.on('end', () => {
      (rawBody === '') ? resolve() : resolve(JSON.parse(rawBody))
    });
    request.on('error', (err) => {
      reject(err);
    })
  });
}


export function httpServer(descriptor: APIDescriptor, options: ServerOptions) {
  const server = http.createServer(async function (request, response) {

    //TODO: restrict CORS for production
    //TODO: check if it is possible to disable CORS for API usage on mobile
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    console.log(`${request.method} ${request.url}`);

    if (request.method === 'GET') {
      handleGet(request.url, descriptor)
        .then(output => {
          //console.log(output);
          response.end(output);
        })
        .catch(err => {
          if (err instanceof HttpError) {
            response.statusCode = err.statusCode;
            response.end();
          } else {
            throw err;
          }
        });
    }
    else if (request.method === 'POST') {

      try {
        const body = await parseBody(request);
        const output = await handlePost(request.url, body, descriptor);
        (!!output) ? response.end(output) : response.end();
      } catch (err) {
        if (err instanceof HttpError) {
          response.statusCode = err.statusCode;
          (!!err.message) ? response.end(err.message) : response.end();
        } else {
          throw err;
        }
      }


      /*let rawBody = '';
      request.on('data', function (data) {
        rawBody += data;
      });
      request.on('end', function () {
        const body = JSON.parse(rawBody);
        handlePost(request.url, body, descriptor)
          .then(output => {
            (!!output) ? response.end(output) : response.end();
          })
          .catch(err => {
            if (err instanceof HttpError) {
              response.statusCode = err.statusCode;
              (!!err.message) ? response.end(err.message) : response.end();
            } else {
              throw err;
            }
          });
      });*/
    }
    else if (request.method === 'OPTIONS') {
      // TODO: implement OPTIONS
      response.end();
    }
    else {
      response.statusCode = 501;
      response.end();
    }
  });

  server.listen(options.port, function () {
    options.onListen(server.address().port);
  });
}
