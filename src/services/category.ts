import category, { ICategory } from '../models/category';

export class CategoryService {
  async getAll(): Promise<ICategory[]> {
    return await category.find();
  }
}
