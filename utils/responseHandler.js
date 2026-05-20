import { constants } from "../constant.js";



export const sendSuccess = (res, { statusCode = 200, message = "Success", data = {} }) => {
  res.status(statusCode).json({
    status: "success",
    statusCode: statusCode,
    message,
    data,
  });
};




