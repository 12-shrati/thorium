const mongoose=require("mongoose")


const bookschema=new mongoose.Schema({
    bookName:{
        type:String,
        unique:true,
        required:true
    },
    authrName:String,
    catogory:String,
    year:Number
    

},{timestamps:true} )

module.exports=mongoose.model('book',bookschema)