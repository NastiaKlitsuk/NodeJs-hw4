import { Router } from 'express';
import { router as products } from './products';
import { router as categories } from './categories';
import { router as login } from './login';

interface RouteConfig {
  prefix: string;
  router: Router;
}

const config: { [routeName: string]: RouteConfig } = {
  products: {
    prefix: '/api/products',
    router: products,
  },
  categories: {
    prefix: '/api/categories',
    router: categories,
  },
  login: {
    prefix: '/api/login',
    router: login,
  },
};

export { config };
