import * as http from 'http';
import {InternalServerError, NotFound, Unauthorized} from './errors';
import {getRegister, postRegister} from './registers';


async function handleGet(url, register) {
  for (const key of getRegister.keys()) {
    if (url === key) {
      const value = getRegister.get(key);
      const serviceName = value.service;
      const methodName = value.name;
      const service = register.get(serviceName);

      return JSON.stringify(await service[methodName]());
    }
  }
  throw new NotFound();
}


async function handlePost(url, body, register) {
  for (const key of postRegister.keys()) {
    if (url === key) {

      // retrieving endpoint record from register
      const postRecord = postRegister.get(key);
      const serviceName = postRecord.service;
      const methodName = postRecord.name;
      const service = register.get(serviceName);

      // retrieving method arguments from body
      // according to method parameters
      const params = postRecord.parameters;
      const args = [];
      for (const parameter of params) {
        args.push(body[parameter.name]);
      }

      // executing method
      return JSON.stringify(await service[methodName](...args));
    }
  }
  throw new NotFound();
}



export function httpServer (serviceInstanceRegister) {
  const server = http.createServer(function (request, response) {

    //TODO: restrict CORS for production
    //TODO: check if it is possible to disable CORS for API usage on mobile
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    console.log(`${request.method} ${request.url}`);

    if (request.method === 'GET') {
      handleGet(request.url, serviceInstanceRegister)
        .then(output => {
          //console.log(output);
          response.end(output);
        })
        .catch(err => {
          if (err instanceof Unauthorized) {
            response.statusCode = 401;
          } else if (err instanceof NotFound) {
            response.statusCode = 404;
          } else if (err instanceof InternalServerError) {
            response.statusCode = 500;
          }
          response.end();
        });
    }
    else if (request.method === 'POST') {
      let rawBody = '';
      request.on('data', function (data) {
        rawBody += data;
      });
      request.on('end', function () {
        const body = JSON.parse(rawBody);
        handlePost(request.url, body, serviceInstanceRegister)
          .then(output => {
            if (output) {
              response.end(output);
            } else {
              response.end();
            }
          })
          .catch(err => {
            if (err instanceof Unauthorized) {
              response.statusCode = 401;
            } else if (err instanceof NotFound) {
              response.statusCode = 404;
            } else if (err instanceof InternalServerError) {
              response.statusCode = 500;
            }
            response.end();
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
