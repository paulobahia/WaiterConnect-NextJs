import nc from "next-connect";
import onError from "../../../middleware/errors";
import { AllCategoriesandProducts } from "../../../controllers/CategoriesControllers";

const handler = nc({ onError });

handler.get(AllCategoriesandProducts);

export default handler;