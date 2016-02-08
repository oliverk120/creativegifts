var mongoose = require('mongoose');

var GiftSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  img_src: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  amazonid: {
    type: String,
    required: false,
  },
  source_url: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  //this shows the relationship to the giftee, 1 is a meaningful type of gift, 2 is a romantic gift, 0 or nothing is a generic gift
  relationship: {
    type: Number,
    required: false,
  },
  nsfw: {
    type: Boolean,
    required: false,
  },
  booze: {
    type: Boolean,
    required: false,
  },
  geek: {
    type: Boolean,
    required: false,
  },
  joke: {
    type: Boolean,
    required: false,
  }
});

exports.Gift = mongoose.model('Gift', GiftSchema);