const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema
({
    UserName: { type: String, required: true, min: 4, max: 26 },
    Email: {type: String, required: true, min: 4, max: 28 },
    Password: { type: String, required: true, min: 7, max: 16 }
});

const User = mongoose.model('Users', UserSchema);
module.exports = User;