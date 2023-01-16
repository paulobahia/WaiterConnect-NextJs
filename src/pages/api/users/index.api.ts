import nc from "next-connect";
import onError from "../../../middleware/errors";
import { getAllUsers, postUsers } from "../../../controllers/UsersControllers";

const handler = nc({ onError });

handler.get(getAllUsers);
handler.post(postUsers);

export default handler;