const mongoose = require('mongoose');
const Schema = mongoose.Schema;  

const ShoppingCartSchema = new Schema({
    userId: {
        type: mongoose.ObjectId,
        require:true,
        ref:"User"
    },
    productId: { 
        type: mongoose.ObjectId,
        require:true,
        ref:"productt"
    },
    amount:{
        type:Number,
        defaulte:1
    }
 
}, { timestamps: true })

ShoppingCartSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model("ShoppingCart", ShoppingCartSchema)


