import nc from "next-connect";
import onError from "../../../middleware/errors";
import { getAllProducts, postProducts } from "../../../controllers/ProductsControllers";

const handler = nc({ onError });

handler.get(getAllProducts);
handler.post(postProducts)

export default handler;