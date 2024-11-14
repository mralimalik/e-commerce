import { Order } from "../models/order.model";

const setOrder = async (req,res)=>{
    const {productId,quantity,purchasePrice} = req.body;
    const buyer = req.user?._id;

}