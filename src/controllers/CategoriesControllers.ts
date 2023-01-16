import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../lib/prisma";

const getAllCategories = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const category = await prisma.category.findMany({})

    res.json(category)
});

const getProductsByCategory = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const { categoryId } = req.body

    const products = await prisma.products.findMany({
        where: {
            categoryId: categoryId
        },
    })

    res.json(products)

});

const postCategories = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const { name } = req.body

    const category = await prisma.category.create({
        data: {
            name,
        },
    })

    res.json(category)

});


export { getAllCategories, postCategories, getProductsByCategory }