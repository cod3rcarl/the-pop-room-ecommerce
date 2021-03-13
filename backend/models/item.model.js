const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    series: {
      type: String,
    },
    image_front: {
      type: String,
      required: [true, 'Please add an image'],
    },
    image_back: {
      type: String,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    brand: {
      type: String,
      required: [true, 'Please add a brand'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: [true, 'Please add stock amount'],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
