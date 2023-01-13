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
    const { orderId, productsId, quantity } = req.body

    const orderProducts = await prisma.orderProducts.create({
      data: {
        quantity,
        productsId,
        orderId
      },
    })

    res.json(orderProducts)
}