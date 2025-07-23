import { Request, Response, NextFunction } from 'express';
 
interface ValidationSchema {
    parse: (data: { body: any }) => void;
}
export const validateRequest = (schema: ValidationSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (err: any) {
        return res.status(400).json({ message: err.errors });
    }
};
 