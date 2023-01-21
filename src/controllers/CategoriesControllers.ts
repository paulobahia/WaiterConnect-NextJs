import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../lib/prisma";
import { z } from "zod";

const CategoiesSchema = z.object({
    name: z.string()
})

const AllCategories = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const category = await prisma.category.findMany({})

    res.json(category)
});

const ProductsByCategory = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const { categoryId } = req.body

    const products = await prisma.products.findMany({
        where: {
            categoryId: categoryId
        },
    })

    res.json(products)

});

const createCategories = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const { name } = CategoiesSchema.parse(req.body)

    const category = await prisma.category.create({
        data: {
            name,
        },
    })

    res.json(category)

});

export { AllCategories, createCategories, ProductsByCategory }