import nc from "next-connect";
import onError from "../../../middleware/errors";
import { AllUsers, createUsers } from "../../../controllers/UsersControllers";

const handler = nc({ onError });

handler.get(AllUsers);
handler.post(createUsers);

export default handler;