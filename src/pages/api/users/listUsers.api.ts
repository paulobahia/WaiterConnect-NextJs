import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse, 
)   {

    if (req.method !== 'GET'){
      return res.status(405).end()
    }

    const user = await prisma.user.findMany({
      select: {
        name:true,
        email:true,
        type:true,
        password: false
      }
    })

    res.json(user)
    }
    
