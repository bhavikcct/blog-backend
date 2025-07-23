import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  author: z.string().min(1, 'Author is required'),
  category: z.string().min(1, 'Category is required'),
  images: z
    .array(z.string().min(1))
    .min(1, 'At least one image is required')
});

export type CreateBlogDto = z.infer<typeof createBlogSchema>;
