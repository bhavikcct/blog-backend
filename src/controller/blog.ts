import { Request, Response, NextFunction } from "express";
import { BlogService } from "../services/blog";
import { CreateBlogDto, createBlogSchema } from "../validation/blog-schema";

const blogService = new BlogService();

export class BlogController {
  createBlogHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const parsed = createBlogSchema.parse(req.body);
      const files = req.files as Express.Multer.File[];
      const imagePaths = files?.map((file) => file.path) || [];

      const input: CreateBlogDto = {
        ...parsed,
        images: imagePaths,
      };

      const blog = await blogService.createBlog(input);
      res.status(201).json({
        message: "Blog created",
        data: blog,
      });
    } catch (error) {
      next(error);
    }
  };

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) ?? 1;
      const limit = parseInt(req.query.limit as string) ?? 10;
  
      const { blogs, total } = await blogService.getAllBlogs(page, limit);
      res.status(200).json({
        message: "Blogs fetched",
        data: blogs,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  }
  

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const blog = await blogService.getBlogById(req.params.id);
      if (!blog) return res.status(404).json({ message: "Blog not found" });
      res.status(200).json(blog);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const blog = await blogService.deleteBlog(req.params.id);
      if (!blog) return res.status(404).json({ message: "Blog not found" });
      res.status(200).json({ message: "Blog deleted" });
    } catch (error) {
      next(error);
    }
  }

  async updateBlogHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const blogId = req.params.id;
      const parsed = createBlogSchema.partial().parse(req.body); 
      const files = req.files as Express.Multer.File[];
      const imagePaths = files?.map((file) => file.path) || [];
  
      const input: Partial<CreateBlogDto> = {
        ...parsed,
        ...(imagePaths.length ? { images: imagePaths } : {}),
      };
  
      const updatedBlog = await blogService.updateBlog(blogId, input);
  
      if (!updatedBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      res.status(200).json({
        message:"Blog updated successfully",
        data: updatedBlog
      });
    } catch (error) {
      next(error);
    }
  }
  
}
