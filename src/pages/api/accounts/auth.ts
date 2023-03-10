import nc from "next-connect";
import onError from "../../../middleware/errors";
import { authAccount } from "../../../controllers/AccountsControllers";

const handler = nc({ onError });

handler.post(authAccount);

export default handler;