const mongoose = require('mongoose')
let objectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"name required"],
        trim: true
    },
    email: {
        type: String,
        required:[true, "Email required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "enter valid email"],
        unique: true,
        lowercase: true,
        trim: true
    },
    mobile: {
        type: String,
        required: [true,"mobile number required"],
        match:/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        unique: true

    },
    collegeId: {
        type: objectId,
        required:[true,"collageId required"],
        ref: 'Collage'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model('Intern', internSchema)
