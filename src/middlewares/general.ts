import { Request, Response, NextFunction } from 'express';
import { getOrThrow, idSchema } from '../validations';

export function validateItemId(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const id = getOrThrow<number>(request.params.id, idSchema);

  if (!id) return;
  next();
}
