import nc from "next-connect";
import onError from "../../../middleware/errors";
import { waiterByAccount } from "../../../controllers/AccountsControllers";

const handler = nc({ onError });

handler.post(waiterByAccount);

export default handler;