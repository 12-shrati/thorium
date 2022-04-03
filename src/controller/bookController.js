const bookModel = require("../model/booksModel")




const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if (typeof value === 'number' && value.trim().length === 0) return false
    return true
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}


const createBook = async function (req, res) {

    try {
        let requestBody = req.body

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters. Please provide User details" })
        }

        const { title, excerpt, bookCover, ISBN, category, reviews, subcategory, releasedAt } = requestBody

        if (!isValid(title)) { return res.status(400).send({ status: false, message: "Title is required" }) }

        let dupTitle = await bookModel.findOne({ title })
        if (dupTitle) {
            return res.status(400).send({ status: false, message: "Title already exist" })
        }

        if (!isValid(excerpt)) { return res.status(400).send({ status: false, message: "Excerpt is required" }) }

        if (!isValid(bookCover)) { return res.status(400).send({ status: false, message: "bookCover link is required" }) }
        
        if(!(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(bookCover))){
            { return res.status(400).send({ status: false, message: "Enter valid Image Link" }) } 
        }
        if (!isValid(ISBN)) { return res.status(400).send({ status: false, message: "ISBN is required" }) }
        let dupIsbn = await bookModel.findOne({ ISBN })
        if (dupIsbn) {
            return res.status(400).send({ status: false, message: "ISBN already exist" })
        }
        if (!isValid(category)) { return res.status(400).send({ status: false, message: "Category is required" }) }

        if (!isValid(subcategory)) { return res.status(400).send({ status: false, message: "SubCategory is required" }) }

        if (!isValid(releasedAt)) { return res.status(400).send({ status: false, message: "ReleasedAt is required" }) }

        let date = /^\d{4}-\d{2}-\d{2}$/
        if (!date.test(releasedAt)) { return res.status(400).send({ status: false, message: "not valid date format" }) }
        const createBook = await bookModel.create({ title, excerpt, bookCover, ISBN, category, subcategory, reviews, releasedAt })

        res.status(201).send({ status: true, message: 'Success', data: createBook })

    }
    catch (error) {
        return res.status(500).send({ ERROR: error.message })
    }
}



module.exports.createBook = createBook















