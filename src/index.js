import Hapi from '@hapi/hapi';
import { loadModel } from './libs/ml.js';
import InputError from './errors/input-error.js';
import routes from './route.js';
import dotenv, { configDotenv } from 'dotenv';

(async () => {
  dotenv.config()
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });
  console.log(process.env.HOST)

  const model = await loadModel();
  server.app.model = model
  console.log('model loaded!');

  server.route(routes);

  server.ext('onPreResponse', function (request, h) {
    const response = request.response

    if(response instanceof InputError){
      const newResponse = h.response({
        status: 'fail',
        message: response.message
      })
      newResponse.code(response.statusCode)
      return newResponse
    }

    if(response.isBoom){
      const newResponse = h.response({
        status: 'fail',
        message: response.message
      })
      newResponse.code(response.output.statusCode)
      return newResponse
    }

    return h.continue
  })

  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
})();