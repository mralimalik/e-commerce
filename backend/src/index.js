import express from 'express';
import connectDatabase from './database.js';
import userRouter from './router/user.routes.js';
import cors from 'cors'
import productRouter from './router/product.routes.js';
import categoryRouter from './router/category.routes.js';
import dotenv from 'dotenv';

const app = express();
const port = 3000;
app.use(cors())
app.use(express.json());
dotenv.config();


app.use('/users',userRouter)
app.use('/product',productRouter)
app.use('/category',categoryRouter)








// Start server and connect to MongoDB
app.listen(port, async () => {
  await connectDatabase();
  console.log(`Server is running on  http://localhost:${port}`);
});




