const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema
({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    phoneNum: { type: String, required: true},
    email: {type: String, required: true},
    password: { type: String, required: true},
    allergies: { type: String, required: false},
    allergiesSelections: { type: Array, required: false},
    streetAddress: { type: String, required: false},
    city: { type: String, required: false},
    zipcode: { type: String, required: false},
    state: { type: String, required: false},
    bio: {type: String, required: false},
    profileImage: {type: Buffer, required: false},
    profileImageType: {type: String, required: false} 
});

userSchema.virtual('profileImagePath').get(function() {
    if (this.profileImage != null && this.profileImageType) {
        return `data:${this.profileImageType};charset=utf-8;base64,${this.profileImage.toString('base64')}`
    }
})


module.exports = mongoose.model('User', userSchema)