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
    const { name } = req.body
    const category = await prisma.category.create({
      data: {
         name,
      },
    })

    res.json(category)
}