import pkg from 'mongoose';
const {Schema, model} = pkg;
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

export default model('Person',person); 