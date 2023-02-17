import nc from "next-connect";
import onError from "../../../middleware/errors";
import { AllAccount, createAccount } from "../../../controllers/AccountsControllers";

const handler = nc({ onError });

handler.get(AllAccount);
handler.post(createAccount);

export default handler;