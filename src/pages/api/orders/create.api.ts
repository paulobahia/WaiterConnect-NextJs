import nc from "next-connect";
import onError from "../../../middleware/errors";
import { postOrderId } from "../../../controllers/OrdersControllers";

const handler = nc({ onError });

handler.post(postOrderId);

export default handler;