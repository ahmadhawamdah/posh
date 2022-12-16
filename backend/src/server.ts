import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Loggin';
import eventRoutes from  './routes/Event';
const router = express();

mongoose
  .connect(config.mongo.uri, { retryWrites: true, w: 'majority' })
  .then(() => {
    Logging.info('Connected to mongoDB');
    StartServer();
  })
  .catch((e) => {
    Logging.error(e);
  });

/* only starts the server */
const StartServer = () => {
  // log request and response
  // use is the middleware

  router.use((req, res, next) => {
    // check method and where the req is going (API endpoint is) & the IP of whomever is calling this
    Logging.info(
      `Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on('finish', () => {
      Logging.info(
        `Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });

    // pass thru the middleware instead of ending it
    next();
  });
  // basic housekeeping:
  // settings we only want JSON request, & it's ok if nested
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /** Rules of our API */
  router.use((req, res, next) => {
    // requests can come from anywhere
    res.header('Access-Control-Allow-Origin', '*');
    //  headers we're allowed to use inside the project
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    // passes in all the options we can use inside the API
    if (req.method == 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET '
      );
      return res.status(200).json({});
    }
    next();
  });

  // health check
  router.get('/ping', (req, res, next) =>
    res.status(200).json({ message: 'pong' })
  );

  // error handling
  router.use('/ping', (req, res, next) => {
    const error = new Error('not found');
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}`)
    );
};


router.use('/', eventRoutes);