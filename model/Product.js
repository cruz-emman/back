import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema({
   title: {type: String, required: [true, 'Please enter a title for this product']},
   description: {type: String, required: [true, 'Please enter a description for this product']},
   quantity: { type: Number,default: 0},
   category: [{ type: String }],
   price: {type: Number, default: 0 },
   img: [{type: String}]
},{timestamps: true})


export default mongoose.model('Product', ProductSchema)
