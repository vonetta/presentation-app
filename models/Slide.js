const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("slide", slideSchema);
