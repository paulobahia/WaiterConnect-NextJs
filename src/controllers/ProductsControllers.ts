import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../lib/prisma";

const getAllProducts = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const products = await prisma.products.findMany({
        include: {
            category: true
        },
    })

    res.json(products)

});

const postProducts = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const { name, description, price, ingredients, categoryId } = req.body
    const products = await prisma.products.create({
        data: {
            name,
            description,
            price,
            ingredients,
            categoryId
        },
    })

    res.json(products)

});

export { getAllProducts, postProducts }