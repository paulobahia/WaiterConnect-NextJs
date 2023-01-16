import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../lib/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const getAllUsers = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const user = await prisma.user.findMany({
        select: {
            name: true,
            email: true,
            type: true,
            password: false
        }
    })

    res.json(user)

});

const postUsers = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, email, password } = req.body

    if (!name) {
        return res.status(400).json({
            error: 'Name is required',
        });
    }

    if (password < 8) {
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
            password
        }
    })

    res.json(user)

});

const authUser = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const Secret = process.env.SECRET
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
})


export { getAllUsers, postUsers, authUser }