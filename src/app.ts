import cors from 'cors';
import express from 'express';
import { log } from './middlewares/log';
import expressWinston from 'express-winston';
import error from './middlewares/error';
import { initPassport } from './utils/passport';
import { createExpressWinstonOptions } from './utils/logger';
import { config } from './configurations/routes-config';

initPassport();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(log);
app.use(expressWinston.logger(createExpressWinstonOptions()));

Object.keys(config).forEach(routeName => {
  const routeConfig = config[routeName];
  app.use(routeConfig.prefix, routeConfig.router);
});

app.use(expressWinston.errorLogger(createExpressWinstonOptions()));
app.use(error);

export { app };
