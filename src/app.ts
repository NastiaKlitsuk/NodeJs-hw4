import cors from 'cors';
import winston from 'winston';
import express from 'express';
import { config } from './controllers';
import { log } from './middlewares/log';
import { logError } from './middlewares/logError';
import expressWinston from 'express-winston';
import { alignedWithColorsAndTime } from './consts/winston.consts';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(log);
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: alignedWithColorsAndTime,
  }),
);

Object.keys(config).forEach(routeName => {
  const routeConfig = config[routeName];
  app.use(routeConfig.prefix, routeConfig.router);
});

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: alignedWithColorsAndTime,
  }),
);

export { app };
