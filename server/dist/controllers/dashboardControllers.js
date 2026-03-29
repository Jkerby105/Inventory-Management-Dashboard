"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = void 0;
const prisma_1 = __importDefault(require("../prisma/prisma"));
const getDashboardData = async (req, res) => {
    try {
        // Fetch all dashboard data
        const popularProducts = await prisma_1.default.products.findMany({
            take: 15,
            orderBy: {
                stockQuantity: 'desc'
            }
        });
        const salesSummary = await prisma_1.default.salesSummary.findMany({
            take: 5,
            orderBy: {
                date: 'desc'
            }
        });
        const purchaseSummary = await prisma_1.default.purchaseSummary.findMany({
            take: 5,
            orderBy: {
                date: 'desc'
            }
        });
        const expenseSummary = await prisma_1.default.expenseSummary.findMany({
            take: 5,
            orderBy: {
                date: 'desc'
            }
        });
        const expenseByCategorySummaryRaw = await prisma_1.default.expenseByCategory
            .findMany({
            take: 5,
            orderBy: {
                date: 'desc'
            }
        });
        const expenseByCategory = expenseByCategorySummaryRaw.map((item) => ({
            ...item,
            amount: item.amount.toString()
        }));
        res.json({
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategory
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
};
exports.getDashboardData = getDashboardData;
