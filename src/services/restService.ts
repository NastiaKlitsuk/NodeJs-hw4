import joi from 'joi';
import { getOrThrow } from '../validations';
import { Identity } from '../models/general';
import { Request, Response, NextFunction } from 'express';
import { findItemIndex, findItemById, getNewId } from '../utils/general';

export function deleteItem<T extends Identity>(
  request: Request,
  response: Response,
  next: NextFunction,
  items: T[],
) {
  const id = request.params.id;
  const itemToDeleteIndex = findItemIndex(id, items);

  if (itemToDeleteIndex === -1) {
    return response.sendStatus(404);
  }

  items.splice(itemToDeleteIndex, 1);
  response.sendStatus(204);
}

export function updateItem<T extends Identity>(
  request: Request,
  response: Response,
  next: NextFunction,
  items: T[],
  schema: joi.SchemaLike,
) {
  const id = request.params.id;
  const maybeItem = findItemById(id, items);

  if (!maybeItem) {
    return response.sendStatus(404);
  }

  const item = getOrThrow<T>(request.body, schema);

  Object.assign(maybeItem, item);
  response.status(200).send(item);
}

export function createItem<T extends Identity>(
  request: Request,
  response: Response,
  next: NextFunction,
  items: T[],
  deletedItemsIds: string[],
  schema: joi.SchemaLike,
) {
  const item = getOrThrow<T>(request.body, schema);
  item.id = getNewId(items.length, deletedItemsIds) || '';
  items.push(item);
  response.status(201).send(item);
}

export function getItemById<T extends Identity>(
  request: Request,
  response: Response,
  next: NextFunction,
  items: T[],
) {
  const id = request.params.id;
  const item = findItemById(id, items);

  if (!item) {
    return response.sendStatus(404);
  }

  response.send(item);
}
