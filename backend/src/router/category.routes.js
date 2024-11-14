import { Router } from "express";
import { getCategories } from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.route('/').get(getCategories);





export default categoryRouter;