import products from './products.json';
import categories from './categories.json';
import { credentials } from './credentials.js';
import { Product, Category } from '../models/index.js';
import { UserCredential } from '../models/credentials.js';

interface Store {
  products: Product[];
  categories: Category[];
  deletedProductsIds: string[];
  deletedCategoriesIds: string[];
  credentials: UserCredential[];
}

export const store: Store = {
  products,
  categories,
  credentials,
  deletedProductsIds: [],
  deletedCategoriesIds: [],
};
