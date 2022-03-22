const mongoose = require('mongoose')



const collageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        required: [true, "fullname required"],
        trim: true
    },
    logoLink: {
        type: String,
        required: [true, "logolink required"],
        lowercase: true

    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model('Collage', collageSchema)