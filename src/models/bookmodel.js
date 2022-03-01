const mongoose = require( "mongoose" );

const bookSchema = new mongoose.Schema({
    
    bookName:String,
   author_id:String,
    price:Number,
    ratings:Number, 
} ,{timestamps:true})

module.exports=mongoose.model('bookcollection',bookSchema)