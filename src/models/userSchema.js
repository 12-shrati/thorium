const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    mobile:Number,
    emaiId:String,
    password:String,
    gender:{
        type:String,
        enum:["male","female","others"]       
    },
    isDeleted:{type:Boolean,default:false},
    age:Number
    

},{timestamps:true} )

module.exports=mongoose.model('userCollection',userSchema)