import joi from 'joi';

export const productSchema = {
  id: joi.string(),
  name: joi
    .string()
    .required()
    .min(3),
  categoryId: joi.string(),
  itemsInStock: joi.number(),
};

export const categorySchema = {
  id: joi.string(),
  name: joi.string(),
};
