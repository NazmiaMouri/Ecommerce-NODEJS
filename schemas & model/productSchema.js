const { Schema, default: mongoose } = require("mongoose");


const dressSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  image: String,
  body: String,
  countInStock: {
    type: Number,
    required: true
  },
  favourite: Boolean,
  price: {
    type: String,
    required: true
  },
  availableSize:{
    type: String,
    required: true
  },
  rating:Number
})

exports.Dress = mongoose.model('Dress', dressSchema);

