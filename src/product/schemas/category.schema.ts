import * as mongoose from 'mongoose';

export const ProductCategorySchema = new mongoose.Schema({
    CatgoryId: { 
        type : Number,
        required: true,
    },  
    name: { 
        type : String,
        required: true,
    },  
},{
    timestamps:true,
})