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
  //what is the relationship to the giftee i.e. 
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

mongoose.model('Gift', GiftSchema);