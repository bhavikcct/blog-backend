import blog, { IBlog }  from '../models/blog';
import { CreateBlogDto } from '../validation/blog-schema';



export class BlogService {
  async createBlog(data: CreateBlogDto): Promise<IBlog> {
    return await blog.create(data);
  }

  async getAllBlogs(page = 1, limit = 10): Promise<{ blogs: IBlog[]; total: number }> {
    const skip = (page - 1) * limit;
  
    const [blogs, total] = await Promise.all([
      blog.find().populate('category').skip(skip).limit(limit),
      blog.countDocuments(),
    ]);
  
    return { blogs, total };
  }
  
  async getBlogById(id: string): Promise<IBlog | null> {
    return await blog.findById(id).populate('category');
  }

  async deleteBlog(id: string): Promise<IBlog | null> {
    return await blog.findByIdAndDelete(id);
  }

  async updateBlog(id: string, data: Partial<CreateBlogDto>): Promise<IBlog | null> {
    return await blog.findByIdAndUpdate(id, data, { new: true });
  }
}
