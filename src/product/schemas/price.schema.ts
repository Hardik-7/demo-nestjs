import * as mongoose from 'mongoose';

export const ProductPriceSchema = new mongoose.Schema({
    sku: { 
        type : String,
        required: true,
        index:true
    },
    price: { 
        type : Number,
        required: true,
    },

},{
    timestamps:true,
})