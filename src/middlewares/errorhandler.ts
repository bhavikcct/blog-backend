import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  if (err instanceof multer.MulterError) {
    let message = 'File upload error';
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'File is too large. Max size is 5MB.';
    }
    return res.status(400).json({ error: message });
  }

  if (err.message?.includes('Only image files')) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: err.message || 'Something went wrong' });
};
