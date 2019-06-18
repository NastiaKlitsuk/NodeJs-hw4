import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../routes/categories';
import { authorize, authenticate } from '../middlewares/auth';
import { UserRole } from '../models/credentials';
import { getProductsByCategory } from '../routes/products';
import { validateItemId } from '../middlewares/general.middleware';
import { validateCategoryExistance } from '../middlewares/categories.middleware';

const router = express.Router();

router.post('/', authenticate(), authorize(UserRole.Admin), createCategory);
router.get('/', getCategories);
router.use('/:id', [validateItemId, validateCategoryExistance]);
router.get('/:id', getCategoryById);
router.get('/:id/products', getProductsByCategory);
router.delete('/:id', authorize(UserRole.Admin), deleteCategory);
router.put('/:id', authorize(UserRole.Admin), updateCategory);

export { router };
