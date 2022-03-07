const { query } = require('express')

const orderModel=require('../models/orderModel')
const productModel=require('../models/productModel')
const userModel=require('../models/userModel')



const createOrders= async function(req, res) {
let orders=req.body
let userId=orders.userId
let productId=orders.productId
let FreeUser=req.header.isFreeAppUser
FreeUser=orders.isFreeAppUser
if(!FreeUser){
return res.send("This field is mandatory")
}

 if(!userId) {
    return res.send("required user field")
}
let user=await userModel.findById(userId)
 if(!user) {
    return res.send("Invalid user")
}

if(!productId) {
    return res.send("required product field")
}
let product=await productModel.findById(productId)
 if(!product) {
    return res.send("Invalid product")
}


 
let productList=await productModel.findById(productId)
let productPrice=productList.price
console.log(productPrice)
let userList=await userModel.findById(userId)
let userBalance=userList.balance
console.log(userBalance)

if(FreeUser=="false"){

  if(userBalance > productPrice){
    let updatedOrders=await userModel.findByIdAndUpdate(
        {_id:userId},
        {$inc:{balance: -productPrice}},
        {new:true})
     console.log(updatedOrders)     
    }

 else if(orders.amount==productPrice){
  let create=await orderModel.create(orders)
  res.send({data:create})
}
else{
    res.send("Insufficient balance")
}
}
}
    module.exports.createOrders=createOrders
   