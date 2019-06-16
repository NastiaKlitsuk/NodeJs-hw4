import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../routes/products';
import { validateItemId } from '../middlewares/general.middleware';
import { validateProductExistance } from '../middlewares/products.middleware';

const router = express.Router();

router.use('/:id', [validateItemId, validateProductExistance]);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);

export { router };
