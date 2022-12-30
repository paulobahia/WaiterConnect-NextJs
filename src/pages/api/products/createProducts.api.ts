import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse, 
)   

{
    if (req.method !== 'POST'){
      return res.status(405).end()
    }
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
}