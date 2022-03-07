const mongoose = require('mongoose');

const productSchema = new mongoose.Schema( {
    productName:String,
    catogory:String,
    price:{
        type:Number,
        default:70,
        required:true
    }

    }, { timestamps: true });

module.exports = mongoose.model('Product',productSchema)