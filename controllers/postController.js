// posts.controller.js
const Post = require('../models/postModel');
const Tag = require('../models/tagModel');
const dotenv = require("dotenv");
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

dotenv.config({ path: "./config/config.env" });

const APIFeatures = require('../utils/apiFeatures')
const AWS = require('aws-sdk');



AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey:  process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION
});

const s3 = new AWS.S3();


//GET request
//api/v1/posts
exports.getAllPosts = catchAsyncErrors( async (req, res, next) => {
  // Implement filter, sort, and pagination logic
  
  const resPerPage = 4;

      const apiFeatures = new APIFeatures(Post.find(), req.query)
      .search()
      .sort()
      .filterByDate()
      .pagination(resPerPage) 
  
      // console.log(apiFeatures)
  
      const posts = await apiFeatures.query; // why query?
  
      res.status(200).json({
          success: true,
          count: posts.length, 
          posts,
          resPerPage
      })

});


//POST request
//api/v1/post
// exports.createPost = catchAsyncErrors(async (req, res, next) => {
//   // Use req.file.location for the image URL if using AWS S3
//   const { title, description, tags } = req.body;
//   console.log(req.body)
// //   const image = req.file.location;
// console.log(req.file)
// // console.log(title, description, tags, "iamge344")

//   if (!title || !description || !tags) {
//     return next(new ErrorHandler('title, description or tags cannot be empty', 400));
// }

//   console.log('req.file.buffer:', req.file.buffer);

//     // S3 configuration
//     const params = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: `uploads/${req.file.originalname}`, // Change the key as needed
//         Body: req.file.buffer,
//       };
  
//   try {
//       // Upload the image to S3
//       const data = await s3.upload(params).promise();
//       const s3Url = data.Location;

//        // Save the post in your database with the S3 URL
//     const post = await Post.create({ title, description, image: s3Url, tags });

//     res.status(201).json(post);
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });





exports.createPost = catchAsyncErrors(async (req, res, next) => {
  const { title, description, tags } = req.body;

  // Validate the request
  if (!title || !description || !tags) {
    return next(new ErrorHandler('Title, description, or tags cannot be empty', 400));
  }

  // Create post without image for now
  const post = await Post.create({ title, description, tags });

  res.status(201).json(post);
});



exports.uploadImage = catchAsyncErrors(async (req, res, next) => {
  // Use req.file.location for the image URL if using AWS S3
  const { originalname, buffer } = req.file;

  // S3 configuration
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${originalname}`, // Change the key as needed
    Body: buffer,
  };

  try {
    // Upload the image to S3
    const data = await s3.upload(params).promise();
    const s3Url = data.Location;

    // Update the post with the S3 URL
    const postId = req.params.postId; // Assuming you have a postId parameter in the URL
    const post = await Post.findByIdAndUpdate(postId, { image: s3Url }, { new: true });

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//GET request
//api/v1/posts/search
exports.searchPosts = catchAsyncErrors(async (req, res, next) => {
  // Implemented keyword search logic in title and description
  // Used req.query to get the search keywords
  // Sent the response with the matching posts

        const apiFeatures = new APIFeatures(Post.find(), req.query)
        .search()
        
    
        const posts = await apiFeatures.query; // why query?
    
        res.status(200).json({
            success: true,
            count: posts.length, 
            posts
        })
  
});




 // Implement filtering logic based on tags
  // Use req.query to get the tags
  // Send the response with the filtered posts

  //GET request
//api/v1/posts/tags
exports.filterPostsByTags = catchAsyncErrors( async (req, res, next) => {
    try {
      // Retrieve tags from the request query parameters
      const { tags } = req.query;
  
      console.log(tags, "tags")
      // Check if tags parameter is provided
      if (!tags) {
        // return res.status(400).json({ error: 'Tags parameter is required' });
        return next(new ErrorHandler('Tags parameter is required', 400));
      }
  
      // Convert the comma-separated string of tag IDs to an array
      const tagIds = tags.split(',');

      console.log(tagIds, "tagsid")
  
      // Use $all to find posts that have all specified tags
      const filteredPosts = await Post.find({ tags: { $all: tagIds } }).populate("tags");
  
      res.status(200).json(filteredPosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });