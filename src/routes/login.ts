import express from 'express';
import { authenticate } from '../controllers/login';

const router = express.Router();

router.post('/', authenticate);

export { router };
