import { groupBy } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse, 
)   {

    if (req.method !== 'GET'){
      return res.status(405).end()
    }

    const order = await prisma.order.findMany({
      include:{
        orderProducts:{
          include:{
            products: true
          }
        }
      },
    })

    res.json(order)
    }