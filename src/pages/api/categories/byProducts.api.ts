import nc from "next-connect";
import onError from "../../../middleware/errors";
import { getProductsByCategory } from "../../../controllers/CategoriesControllers";

const handler = nc({ onError });

handler.post(getProductsByCategory)

export default handler;