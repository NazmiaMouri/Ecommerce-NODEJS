import jwt from "jsonwebtoken";
import AppError from "./AppError.js";
import { JWT_SECRET } from "./environment_variables.js";

export const verifyToken = (token) => {
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        throw new AppError(err.message, 400);
    }
    return decodedToken;

}

const maxAge = 30 * 24 * 60 * 60;

export const createToken = (id) => {

console.log("JWT_SECRET in auth.util.js:", JWT_SECRET);
    try {
        return jwt.sign({ id }, JWT_SECRET, {
            expiresIn: maxAge
        });
    } catch (err) {
        throw new AppError(err.message, 400);
    }


}

