import nc from "next-connect";
import onError from "../../../../middleware/errors";
import { changeOrder, cancelOrder } from "../../../../controllers/OrdersControllers";

const handler = nc({ onError });

handler.patch(changeOrder)
handler.delete(cancelOrder)

export default handler;