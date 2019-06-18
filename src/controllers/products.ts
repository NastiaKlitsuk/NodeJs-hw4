import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../routes/products';
import { UserRole } from '../models/credentials';
import { authenticate, authorize } from '../middlewares/auth';
import { validateItemId } from '../middlewares/general.middleware';
import { validateProductExistance } from '../middlewares/products.middleware';

const router = express.Router();

router.use('/:id', [authenticate(), validateItemId, validateProductExistance]);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct);
router.post('/', authorize(UserRole.Admin), createProduct);
router.put('/:id', authorize(UserRole.Admin), updateProduct);

export { router };
