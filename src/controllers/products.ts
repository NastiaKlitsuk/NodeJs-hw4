import { store } from '../store';
import { Product } from '../models';
import { Request, Response, NextFunction } from 'express';
import {
  deleteItem,
  updateItem,
  createItem,
  getItemById
} from '../services/restService';
import { wrapAsyncAndSend, wrapAsync } from '../utils/async';
import { createLogger } from '../utils/logger';
import { productSchema } from '../validations';

const { products, deletedProductsIds } = store;
const logger = createLogger('productsController');

export const getProducts = wrapAsyncAndSend(
  (request: Request, response: Response, next: NextFunction) =>
    Promise.resolve(products),
);

export function getProductsByCategory(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const categoryId = request.params.id;
  const productsByCategoryId = products.filter(
    product => product.categoryId === categoryId,
  );
  response.status(200).send(productsByCategoryId);
}

export const getProductById = wrapAsync(
  (request: Request, response: Response, next: NextFunction) => {
    logger.info(`Requested product by id - ${request.params.id}`);
    return Promise.resolve(getItemById(request, response, next, products));
  },
);

export function createProduct(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  createItem<Product>(
    request,
    response,
    next,
    products,
    deletedProductsIds,
    productSchema,
  );
}

export function updateProduct(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  updateItem<Product>(request, response, next, products, productSchema);
}

export function deleteProduct(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  deleteItem<Product>(request, response, next, products);
  deletedProductsIds.push(request.params.id);
}
