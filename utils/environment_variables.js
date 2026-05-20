import dotenv from "dotenv";
dotenv.config();
export const port = process.env.PORT || 5000;
export const api = process.env.ENV_DEV ? process.env.DEV_URL : process.env.PROD_URL;

export const JWT_SECRET = process.env.JWT_SECRET;