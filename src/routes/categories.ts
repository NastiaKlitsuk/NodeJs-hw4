import { store } from '../store';
import { Response, Request, NextFunction } from 'express';
import {
  deleteItem,
  updateItem,
  createItem,
  getItemById
} from './crudHandlers';
import { wrapAsyncAndSend, wrapAsync } from '../utils/async';
import { createLogger } from '../utils/logger';
import { categorySchema } from '../validations';

const categories = store.categories;
const deletedCategoriesIds = store.deletedCategoriesIds;
const logger = createLogger('categoriesController');

export const getCategories = wrapAsyncAndSend(
  (request: Request, response: Response, next: NextFunction) =>
    Promise.resolve(categories),
);

export const getCategoryById = wrapAsync(
  (request: Request, response: Response, next: NextFunction) => {
    logger.info(`Requested category by id - ${request.params.id}`);
    return Promise.resolve(getItemById(request, response, next, categories));
  },
);

export function createCategory(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  createItem(
    request,
    response,
    next,
    categories,
    deletedCategoriesIds,
    categorySchema,
  );
}

export function updateCategory(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  updateItem(request, response, next, categories, categorySchema);
}

export function deleteCategory(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  deleteItem(request, response, next, categories);
  deletedCategoriesIds.push(request.params.id);
}
