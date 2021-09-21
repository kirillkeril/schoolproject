const {Schema, model, Types} = require('mongoose')

const Book = new Schema({
    owner: {type: Types.ObjectId, required: true, ref: 'User'},
    title: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    time: {type: String, required: true},
    genre: {type: String, required: true},
    direction: {type: String, required: true},
})

module.exports = model('Book', Book)