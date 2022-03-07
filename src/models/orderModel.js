const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema( {
    userId:ObjectId,
	productId:ObjectId,
	amount:Number,	
	isFreeAppUser:String,
	date:String,
	
}, { timestamps: true });


module.exports = mongoose.model('Order', orderSchema)