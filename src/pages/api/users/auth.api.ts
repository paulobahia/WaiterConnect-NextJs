import nc from "next-connect";
import onError from "../../../middleware/errors";
import { authUser } from "../../../controllers/UsersControllers";

const handler = nc({ onError });

handler.get(authUser);

export default handler;