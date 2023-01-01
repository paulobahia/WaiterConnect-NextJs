import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse, 
)   
{
    if (req.method !== 'DELETE'){
      return res.status(405).end()
    }
    const { orderId }  = req.query

    const order = await prisma.order.delete({
        where: {
            id: orderId
        },
    })

    res.status(204).end()
}