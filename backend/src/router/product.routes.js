import { Router } from "express";
import { getAllProducts , getProductByName,listProduct} from "../controllers/product.controller.js";
import { upload } from "../middleware/image_upload.js";
import authenticateToken from "../middleware/auth_token.js"

const productRouter = Router();

productRouter.route('/').get(getAllProducts);
productRouter.route('/:name').get(getProductByName);
productRouter.route('/listProduct').post(authenticateToken,upload.single('productImage'),listProduct);






export default productRouter;