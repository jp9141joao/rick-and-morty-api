"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_result_1 = require("../models/http-result");
dotenv_1.default.config();
const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
    throw new Error("SECRET_KEY não está definido no arquivo .env!");
}
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        throw new Error("Acesso negado, token não fornecido!");
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new Error("Acesso negado, token não fornecido!");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(400).json(http_result_1.HttpResult.Fail("Ocorreu um erro inesperado no authMiddleware"));
    }
};
exports.authMiddleware = authMiddleware;
