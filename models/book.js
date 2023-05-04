const mongoose = require("mongoose");

const coverImageBasePath = "uploads/bookCovers" //this is the path to the folder where we will store the images

const bookSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    }, 
    description: {
        type: String
    }, 
    publishDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }, 
    coverImageName: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, //this is a reference to the author model
        required: true,
        ref: "Author" //this is the model we are referencing
    }

});

module.exports = mongoose.model("Book", bookSchema); //export the model
module.exports.coverImageBasePath = coverImageBasePath; //export the path to the folder where we will store the images