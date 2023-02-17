import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../lib/prisma";
import { z } from "zod";

const VALUES = ['WAITING', 'CONFIRMED', 'IN_PRODUCTION', 'DONE'] as const;
const OrderSchema = z.object({
    tableId: z.string(),
    userId: z.string(),
    status: z.enum(VALUES).optional()
})

const OrderProductsSchema = z.object({
    quantity: z.number(),
    productsId: z.string(),
    orderId: z.string()
})

const AllOrders = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const order = await prisma.order.findMany({
        orderBy: {
            createdAt: "asc"
        },
        include: {
            table: {
                select:{
                    status:true,
                    number:true
                }
            },
            user: {
                select:{
                    name: true,
                    type: true,
                }
            },
            orderProducts: {
                include: {
                    products: true
                }
            },
        },
    })

    res.json(order)

});

const createOrderId = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const { userId, tableId } = OrderSchema.parse(req.body)

    const Order = await prisma.order.create({
        data: {
            userId,
            tableId
        },
    })

    res.json(Order)

});

const createOrder = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const { orderId, productsId, quantity } = OrderProductsSchema.parse(req.body)

    const orderProducts = await prisma.orderProducts.create({
        data: {
            quantity,
            productsId,
            orderId
        },
    })

    res.json(orderProducts)

});

const changeOrder = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const { orderId } = req.query
    const { status } = req.body

    if (!['WAITING', 'CONFIRMED', 'IN_PRODUCTION', 'DONE'].includes(status)) {
        return res.status(400).json({
            error: 'Status should be one of these: WAITING, CONFIRMED, IN_PRODUCTION or DONE'
        });
    }

    const order = await prisma.order.update({
        where: {
            id: orderId?.toString()
        },
        data: {
            status: status
        }
    })

    res.status(204).end()

});

const cancelOrder = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const { orderId } = req.query

    const order = await prisma.order.delete({
        where: {
            id: orderId?.toString()
        },
    })

    res.status(204).end()

});

export { AllOrders, createOrderId, createOrder, changeOrder, cancelOrder }