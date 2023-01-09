import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  const { name, email, password } = req.body

  if (!name) {
    return res.status(400).json({
      error: 'Name is required',
    });
  }

  if (password > 8) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters long',
    });
  }

  if (!email) {
    return res.status(400).json({
      error: 'Email is required',
    });
  }

  if (await prisma.user.findUnique({
    where: {
      email
    }
  })) {
    return res.status(400).json({
      error: 'The user already exists',
    });
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash
    }
  })

  res.json(user)
}