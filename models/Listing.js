const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
    text: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    avatar: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    status: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        text: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    applied: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        name: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    lastDateApply:  {
        type: Date,
        required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  });

  module.exports = Post = mongoose.model('listing', ListingSchema);