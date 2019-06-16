import { Product } from '../models';
import { Request, Response, NextFunction } from 'express';
import { findProductById } from '../utils/products.utils';

export function validateProductExistance(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const productId = request.params.id;
  const maybeProduct = findProductById(productId);
  maybeProduct ? next() : response.sendStatus(404);
}
