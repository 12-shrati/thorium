const authormodel=require('../models/authorsmodel')

const createAuthors=async function(req, res) {
    let authors=req.body
    let savedAuthors=await authormodel.create(authors)
    res.send({msg:savedAuthors}) 
    }

    module.exports.createAuthors=createAuthors