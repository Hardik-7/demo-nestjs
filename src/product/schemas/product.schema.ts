import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    sku: { 
        type : String,
        required: true,
        index:true
    },
    productName: { 
        type : String,
        required: true,
    },
    category: { 
        type:Number,
        required: true,
        index:true,
    },
},{
    timestamps:true,
})