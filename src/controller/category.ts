import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/category';

const categoryService = new CategoryService();

export class CategoryController {
  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryService.getAll();
      res.status(200).json({
        message: 'Categories fetched successfully',
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }
}
