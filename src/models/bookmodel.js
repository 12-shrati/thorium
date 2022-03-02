const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name:String,
	author_id:String,
	author_id:{
		type:ObjectId,
		ref:"NewAuthor"
	},
	price:Number,
	ratings:Number,
	publisher_id:String,

	
	publisher_id:{
		type:ObjectId,
		ref:"newPublisher"
	}



}, { timestamps: true });


module.exports = mongoose.model('newLibraryBook', bookSchema)