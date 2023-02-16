import nc from "next-connect";
import onError from "../../../middleware/errors";
import { ProductsByCategory } from "../../../controllers/CategoriesControllers";

const handler = nc({ onError });

handler.post(ProductsByCategory)

export default handler;