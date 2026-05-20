
import errorHandler from "./middleware/errorMiddleware.js";
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import authRoutes from './routes/auth.api.js';
import productRoutes from './routes/product.api.js';
import orderRoutes from './routes/order.api.js';
import cartRoutes from './routes/cart.api.js';
import userRoutes from './routes/user.api.js';
import { logger } from "./utils/logger.js";

const app = express();

app.use((req, res, next) => {
    console.log("REQUEST:", req.method, req.url);
    next();
});
app.use(express.static('public'));
app.use(morgan('dev'));


app.use(express.json());


process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION 💥:", err);
});

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION 💥:", err);
});

app.use('/', authRoutes);
app.use('/', productRoutes);
app.use('/', orderRoutes);
app.use('/', cartRoutes);
app.use('/', userRoutes);

app.use(errorHandler);



export default app;




