import nc from "next-connect";
import onError from "../../../middleware/errors";
import { AllOrders, createOrder } from "../../../controllers/OrdersControllers";

const handler = nc({ onError });

handler.get(AllOrders);
handler.post(createOrder);

export default handler;