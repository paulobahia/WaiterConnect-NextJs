import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../lib/prisma";
import { z } from "zod";

const ProductsSchema = z.object({
    name: z.string(),
    description: z.string().max(59),
    price: z.number(),
    ingredients: z.union([z.string(), z.number(), z.boolean(), z.null()]).optional(), // Json Type
    categoryId: z.string()
})

const AllProducts = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const products = await prisma.products.findMany({
        include: {
            category: true
        },
    })

    res.json(products)

});

const createProducts = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const image = req.file?.filename
    const { name, description, price, ingredients, categoryId } = ProductsSchema.parse(req.body)
    const products = await prisma.products.create({
        data: {
            name,
            imagePath,
            description,
            price,
            ingredients,
            categoryId
        },
    })

    res.json(products)

});

export const config = {
    api: {
        bodyParser: false,
    },
};

export { AllProducts, createProducts }