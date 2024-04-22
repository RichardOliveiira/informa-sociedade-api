var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
  titulo: {
        type: String,
        required: true,
        trim: true
    },
  descricao: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('avisos', UserSchema);