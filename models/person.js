const {Schema, model} = require('mongoose')

const person = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

module.exports = model('Person',person); 