import nc from "next-connect";
import multer from 'multer';
import onError from "../../../middleware/errors";
import { AllUsers, createUsers } from "../../../controllers/UsersControllers";

const handler = nc({ onError });

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads/userAvatar',
        filename: (req, file, cb) => cb(null, file.originalname),
    })
})

handler.get(AllUsers);
handler.post(upload.single('avatar'), createUsers);

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;