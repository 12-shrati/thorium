const mongoose = require('mongoose')
const validator = require('validator');
let moment = require("moment")


const booksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    excerpt: {
        type: String,
        required: true,
        trim: true
    },
    bookCover:{
        type:String,
        required:true,
        trim:true,
        match:/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    subcategory: {
        type: [String],
        required: true,
        trim: true
    },
    reviews: {
        type: Number,
        default: 0,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    },

    releasedAt: {
        type: String,
        required: true,
        trim: true
    }

}, { timestamps: true })

module.exports = mongoose.model('Books', booksSchema)


// {
//     "title":"mistakes",
//     "excerpt":"ghdf",
//     "bookCover":"",
//     "ISBN":"",
//     "category":"",
//     "subcategory":"",
//     "reviews":,
//     "releasedAt":
// }