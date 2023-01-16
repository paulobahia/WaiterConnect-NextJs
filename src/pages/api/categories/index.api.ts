import nc from "next-connect";
import onError from "../../../middleware/errors";
import { getAllCategories, getProductsByCategory, postCategories } from "../../../controllers/CategoriesControllers";

const handler = nc({ onError });

handler.get(getAllCategories);
handler.post(postCategories)
handler.post(getProductsByCategory)

export default handler;