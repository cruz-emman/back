import Product from "../model/Product.js";
import User from "../model/User.js";

export const addProduct = async (req,res,next) =>{
    const userId = req.params.userId
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save()

        try {
            await User.findByIdAndUpdate(userId, {$push: {products: savedProduct._id }})
        } catch (error) {
        }
        res.status(200).json(savedProduct)
        
    } catch (error) {
        next(error)
    }
}

export const getProduct = async (req,res,next) => {
    let {searchQuery} = req.query

    try {
        let products;
        if(searchQuery){
            const title = new RegExp(searchQuery, 'i')
            products = await Product.find({$or: [{title}]})
        }else{
            products = await Product.find()
        }

        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
}