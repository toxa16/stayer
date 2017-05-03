export function parseBody(request): Promise<any> {

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
