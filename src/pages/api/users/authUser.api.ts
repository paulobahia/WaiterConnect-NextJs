import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const Secret = process.env.SECRET

  if (req.method !== 'GET') {
    return res.status(405).end()
  }
  const { email, password } = req.body

  const user = await prisma.user.findUnique({
    where: {
      email
    },
  })

  if (!user) {
    return res.status(400).json({
      error: 'User not registered',
    });
  }

  const checkPassword = bcrypt.compareSync(password, user.password)

  if (!checkPassword) {
    return res.status(401).json({
      error: 'Email address or password not valid',
    });
  }

  try {

    const token = jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type
    }, Secret as string)

    res.status(200).json({
      token
    })

  } catch (e) {
    console.log(e)
  }


}

