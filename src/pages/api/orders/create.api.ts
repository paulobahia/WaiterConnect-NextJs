import nc from "next-connect";
import onError from "../../../middleware/errors";
import { createOrderId } from "../../../controllers/OrdersControllers";

const handler = nc({ onError });

handler.post(createOrderId);

export default handler;