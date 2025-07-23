import { Router } from 'express';
import { CategoryController } from '../controller/category';

const router = Router();
const categoryController = new CategoryController();

router.get('/', categoryController.getAllCategories);

export default router;
