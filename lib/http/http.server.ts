import * as http from 'http';
import {HttpError, NotFound} from './errors';
import {EndpointMethod} from '../types/endpoint-method';
import {Descriptor} from '../types/descriptor';
import {handlePost} from './handle-post';


async function handleGet(url, descriptor: Descriptor) {
  const endpoints = descriptor.getEndpoints(EndpointMethod.Get);
  for (const endpoint of endpoints) {
    if (endpoint.route === url) {
      const serviceName = endpoint.serviceName;
      const endpointName = endpoint.name;
      const service = descriptor.getService(serviceName);

      return JSON.stringify(await service[endpointName]());
    }
  }

  /*for (const key of getRegister.keys()) {
    if (url === key) {
      const value = getRegister.get(key);
      const serviceName = value.serviceName;
      const methodName = value.name;
      const service = descriptor.getService(serviceName);

      return JSON.stringify(await service[methodName]());
    }
  }*/
  throw new NotFound();
}



export function httpServer(descriptor: Descriptor) {
  const server = http.createServer(function (request, response) {

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
      let rawBody = '';
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
      });
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

  server.listen(8080, function () {
    console.log(`Stayer server listening on port ${server.address().port}...`);
  });
}
