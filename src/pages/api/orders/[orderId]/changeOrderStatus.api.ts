import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse, 
)   

{
    if (req.method !== 'PATCH'){
      return res.status(405).end()
    }
    const { orderId }  = req.query
    const { status } = req.body

    if (!['WAITING', 'CONFIRMED', 'IN_PRODUCTION', 'DONE'].includes(status)){
        return res.status(400).json({
          error: 'Status should be one of these: WAITING, CONFIRMED, IN_PRODUCTION or DONE'
        });
      }

    const order = await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            status: status 
        }
    })

    res.status(204).end()
}