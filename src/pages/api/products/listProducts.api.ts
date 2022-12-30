import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse, 
)   {

    if (req.method !== 'GET'){
      return res.status(405).end()
    }

    const products = await prisma.products.findMany({
      include: {
        category: true
      },
    })

    res.json(products)
    }