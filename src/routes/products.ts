import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/products';
import { UserRole } from '../models/credentials';
import { authenticate, authorize } from '../middlewares/auth';
import { validateItemId } from '../middlewares/general';
import { validateProductExistance } from '../middlewares/products';

const router = express.Router();

router.use('/', authenticate());
router.use('/:id', [validateItemId, validateProductExistance]);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.delete('/:id', authorize(UserRole.Admin), deleteProduct);
router.post('/', authorize(UserRole.Admin), createProduct);
router.put('/:id', authorize(UserRole.Admin), updateProduct);

export { router };
