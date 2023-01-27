import nc from "next-connect";
import multer from 'multer';
import onError from "../../../middleware/errors";
import { AllProducts, createProducts } from "../../../controllers/ProductsControllers";

const handler = nc({ onError });

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => cb(null, file.originalname),
    })
})

handler.get(AllProducts);
handler.post(upload.single('file'), createProducts)

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;