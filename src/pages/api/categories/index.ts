import nc from "next-connect";
import onError from "../../../middleware/errors";
import { AllCategories, createCategories } from "../../../controllers/CategoriesControllers";

const handler = nc({ onError });

handler.get(AllCategories);
handler.post(createCategories)

export default handler;