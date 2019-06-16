import joi from 'joi';

export * from './common';
export * from './models';

export function getOrThrow<T>(valueToValidate: any, schema: joi.SchemaLike): T {
  const {error, value} = joi.validate(valueToValidate, schema);
  if (error) throw error;

  return value;
}
