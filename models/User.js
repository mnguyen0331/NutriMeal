const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema
({
    firstName: { type: String, required: true, min: 4, max: 26 },
    lastName: { type: String, required: true, min: 4, max: 26 },
    phoneNum: { type: String, required: false, min: 10, max: 10},
    streetAddress: { type: String, required: false},
    city: { type: String, required: false},
    zipcode: { type: String, required: false, min: 5, max: 5},
    state: { type: String, required: false},
    email: {type: String, required: true, min: 4, max: 26 },
    password: { type: String, required: true, min: 9, max: 26 },
    allergies: { type: Boolean, required: true},
    allergiesSelections: { type: Array, required: true}
});


module.exports = mongoose.model('User', userSchema)