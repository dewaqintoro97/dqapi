const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nama: String,
    email: String,
    no_tlp: String,
    alamat: String
}, { 
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
