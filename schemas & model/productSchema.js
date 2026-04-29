const { Schema, default: mongoose } = require("mongoose");


const dressSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image: { type: String, required: [true, 'Please enter the image URL'] },
  body: String,
  countInStock: {
    type: Number,
    required: [true, 'Please enter the count in stock']
  },
  favourite: Boolean,
  price: {
    type: String,
    required: [true, 'Please enter the price']
  },
  availableSize: {
    type: String,
    required: [true, 'Please enter the available size']
  },
  rating: Number,
  size: String,
  category: String,
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      comment: String
    }
  ]
})

exports.Dress = mongoose.model('Dress', dressSchema);

