import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../lib/prisma";

const getAllOrders = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const order = await prisma.order.findMany({
        include: {
            orderProducts: {
                include: {
                    products: true
                }
            }
        },
    })

    res.json(order)

});

const postOrderId = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const { table, status } = req.body

    const Order = await prisma.order.create({
        data: {
            table,
            status,
        },
    })

    res.json(Order)

});

const postOrder = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {

    const { orderId, productsId, quantity } = req.body

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


export { getAllOrders, postOrderId, postOrder, changeOrder, cancelOrder }