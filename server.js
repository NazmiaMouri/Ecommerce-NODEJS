
import mongoose from "mongoose";
import express from "express";
import app from "./app.js";
import { logger } from "./utils/logger.js";
import { port } from "./utils/environment_variables.js";


const PORT = port;

console.log(`I am under server ${process.env.DEV_URL}`);


process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection', reason);
    process.exit(1);
});

mongoose.connect('mongodb://127.0.0.1:27017/al-maequl').then((result)=> console.log('connected to db'));
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT} `)
});


