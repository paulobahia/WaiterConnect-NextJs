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
    const { categoryId } = req.body
    const products = await prisma.products.findMany({
      where: {
        categoryId: categoryId
      },
    })

    res.json(products)
}