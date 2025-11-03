const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const productschema = new Schema({
    name:{
        type:String,
        require:true,
        key:true
    }, 
    category:{
        type:String,        
        default:"baby",
        enum:["boy", "girl", "baby"]
    },
    images:{  
        type:[String],
    },
    minSize:{
        type:Number, 
    }, 
    maxSize:{
        type:Number,
    },
    price:{
        type:Number,
        require:true
    }
},{timeseries:true})

module.exports = mongoose.model("productt",productschema)
