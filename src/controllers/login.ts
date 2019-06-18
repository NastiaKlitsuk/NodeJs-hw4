import express from 'express';
import { authenticate } from '../routes/login';

const router = express.Router();

router.post('/', authenticate);

export { router };
