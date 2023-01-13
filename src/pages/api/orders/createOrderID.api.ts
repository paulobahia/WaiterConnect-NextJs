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
    const { table, status } = req.body

    const Order = await prisma.order.create({
      data: {
        table,
        status,
      },
    })

    res.json(Order)
}