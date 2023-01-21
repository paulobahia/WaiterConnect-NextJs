import nc from "next-connect";
import onError from "../../../middleware/errors";
import { AllProducts, createProducts } from "../../../controllers/ProductsControllers";

const handler = nc({ onError });

handler.get(AllProducts);
handler.post(createProducts)

export default handler;