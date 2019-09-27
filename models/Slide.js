const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlideSchema = new Schema({
  text: {
    type: String,
    required: true
  }
});

module.exports = Slide = mongoose.model("slide", SlideSchema);
