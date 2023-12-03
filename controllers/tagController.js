// tags.controller.js
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Tag = require('../models/tagModel');
const ErrorHandler = require("../utils/errorHandler")

//POST request
// api - api/v1/tags/new
exports.createTag = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new ErrorHandler('Please choose a Tag. Tag not found', 400));
}
 
    // Check if the tag with the same name already exists
    const existingTag = await Tag.findOne({ name });

    if (existingTag) {
      return res.status(400).json({ error: 'Tag with the same name already exists' });
    }
    const newTag = await Tag.create({ name });
    res.status(201).json(newTag);

});
