import winston from 'winston';
import { alignedWithColorsAndTime } from '../consts/winston.consts';

export const createLogger = (name: string) => {
  return winston.createLogger({
    transports: [new winston.transports.Console()],
    format: alignedWithColorsAndTime,
    defaultMeta: {
      name,
    },
  });
};

export const createExpressWinstonOptions = () => ({
  transports: [new winston.transports.Console()],
  format: alignedWithColorsAndTime,
});
