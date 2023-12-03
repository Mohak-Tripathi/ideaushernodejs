// post.model.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter title'],
      maxLength: [100, 'title cannot exceed 100 characters']
  },
    description: {
      type: String,
      required: [true, 'Please enter description'],
      trim: true, //to remove space from starting and ending.
  },
    image: String, // store image URL or S3 bucket key
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  { versionKey: false }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
