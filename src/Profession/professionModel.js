const mongoose = require('mongoose');

const professionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Profession', professionSchema);
