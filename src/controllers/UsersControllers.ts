import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { prisma } from "../lib/prisma";

const UserSchema = z.object({
    name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string", }),
    cpf: z.number().min(11, { message: "CPF invalid" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    accountId: z.string({ required_error: "AccountId is required"})
})

const AllUsers = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const user = await prisma.user.findMany({
        select: {
            name: true,
            cpf: true,
            type: true,
        }
    })

    res.json(user)

});

const createUsers = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const avatar = req.file?.filename
    const { name, cpf, password, accountId } = UserSchema.parse(req.body)

    if (await prisma.user.findUnique({
        where: {
            cpf
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
            cpf,
            avatar,
            password: passwordHash,
            accountId
        }
    })

    res.status(204).end()

});

const authUser = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const Secret = process.env.SECRET
    const { cpf, password } = req.body

    const user = await prisma.user.findUnique({
        where: {
            cpf
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
            type: user.type,
            avatar: user.avatar
        }, Secret as string)

        res.status(200).json({
            token
        })

    } catch (e) {
        console.log(e)
    }
})

export const config = {
    api: {
        bodyParser: false,
    },
};

export { AllUsers, createUsers, authUser }