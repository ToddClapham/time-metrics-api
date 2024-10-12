import { Request, Response, NextFunction } from "express";
import ErrorMessage from "../util/ErrorMessage";
import { HttpCode } from "../util/HttpCodes";

async function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.headers.authorization) {
            throw new ErrorMessage(HttpCode.forbidden, 'Authorization header is missing');
        }
        if (!req.headers.authorization.startsWith('Bearer ')) {
            throw new ErrorMessage(HttpCode.forbidden, 'Authorization bearer token is malformed');
        }
        if (req.headers.authorization.split(' ')[1] !== 'mysecrettoken') {
            throw new ErrorMessage(HttpCode.forbidden, 'Invalid token');
        }
        next();
    } catch (error) {
        next(error);
    }
}

export default {
    authenticate
}