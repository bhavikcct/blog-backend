import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db';
import { errorHandler } from './middlewares/errorhandler';

import blogRoute from './routes/blog';
import categoryRoute from './routes/category';
dotenv.config();

connectDB()


const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/v1/blog',blogRoute)
app.use('/api/v1/category',categoryRoute)

app.use(errorHandler);

const PORT = process.env.PORT ?? 9002;


app.get('/', (req, res) => {
    res.json({
        message: "server is running"
    })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
