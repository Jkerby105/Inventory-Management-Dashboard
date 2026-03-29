"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getProducts = void 0;
const prisma_1 = __importDefault(require("../prisma/prisma"));
const getProducts = async (req, res) => {
    try {
        const search = req.query.search?.toString();
        const products = await prisma_1.default.products.findMany({
            where: {
                name: {
                    contains: search
                }
            }
        });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving products" });
    }
};
exports.getProducts = getProducts;
const createProduct = async (req, res) => {
    try {
        const { productId, name, price, rating, stockQuantity } = req.body;
        const product = await prisma_1.default.products.create({
            data: {
                productId,
                name,
                price,
                rating,
                stockQuantity
            }
        });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating products" });
    }
};
exports.createProduct = createProduct;
