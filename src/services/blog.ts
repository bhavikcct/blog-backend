import blog, { IBlog } from "../models/blog";
import { CreateBlogDto } from "../validation/blog-schema";
import "../models/category";
import { cloudinary, extractPublicId } from "../config/cloudinary";

export class BlogService {
  async createBlog(data: CreateBlogDto): Promise<IBlog> {
    return await blog.create(data);
  }

  async getAllBlogs(
    page = 1,
    limit = 10
  ): Promise<{ blogs: IBlog[]; total: number }> {
    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      blog.find().populate("category").skip(skip).limit(limit),
      blog.countDocuments(),
    ]);

    return { blogs, total };
  }

  async getBlogById(id: string): Promise<IBlog | null> {
    return await blog.findById(id).populate("category");
  }

  async deleteBlog(id: string): Promise<IBlog | null> {
    const blogToDelete = await blog.findById(id);
    if (!blogToDelete) return null;

    if (blogToDelete.images && blogToDelete.images.length > 0) {
      for (const imageUrl of blogToDelete.images) {
        const publicId = extractPublicId(imageUrl);
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId);
          } catch (err) {
            console.error(
              `Failed to delete image from Cloudinary: ${publicId}`,
              err
            );
          }
        }
      }
    }

    return await blog.findByIdAndDelete(id);
  }

  async getBlogByTitle(title: string): Promise<IBlog | null> {
    return await blog.findOne({ title });
  }

  async updateBlog(
    id: string,
    data: Partial<CreateBlogDto>,
    oldImages: string[]
  ): Promise<IBlog | null> {
    if (data.images && data.images.length > 0 && oldImages?.length > 0) {
      for (const imageUrl of oldImages) {
        const publicId = extractPublicId(imageUrl);
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId);
          } catch (err) {
            console.error(`Failed to delete image: ${publicId}`, err);
          }
        }
      }
    }

    return await blog.findByIdAndUpdate(id, data, { new: true });
  }
}
