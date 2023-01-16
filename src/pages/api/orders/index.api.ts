import nc from "next-connect";
import onError from "../../../middleware/errors";
import { getAllOrders, postOrder } from "../../../controllers/OrdersControllers";

const handler = nc({ onError });

handler.get(getAllOrders);
handler.post(postOrder);

export default handler;