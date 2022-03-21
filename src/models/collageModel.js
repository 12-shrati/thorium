const mongoose = require('mongoose')



const collageSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,"name required"],
        unique: true,
        lowercase: true,
        trim:true
    },
    fullName: {
        type: String,
        required: [true,"fullname required"],
        trim:true
    },// example `Indian Institute of Technology, Hyderabad`},
    logoLink: {
        type: String,
        required:[ true,"logolink required"],
        lowercase: true,
        match:[ /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/, "enter valid logo link"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model('Collage', collageSchema)