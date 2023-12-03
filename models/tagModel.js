// tag.model.js
const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter tag name'],
      trim: true, //to remove space from starting and ending.
  },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
