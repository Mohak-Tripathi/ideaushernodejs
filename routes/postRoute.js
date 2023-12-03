// posts.routes.js
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postController');
// const uploadMiddleware = require('../middleware/uploadMiddleware');
const multer = require('multer');
// const uploadMiddleware = multer({ storage: multer.memoryStorage() });


// const diskStorage = multer.diskStorage({
//     destination: 'uploads/',
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });
  
//   // Configure multer with both memory storage and disk storage
//   const uploadMiddleware = multer({
//     storage: diskStorage,
//     fileFilter: (req, file, cb) => {
//       // Implement any file filtering logic here if needed
//       cb(null, true);
//     },
//   });

// Configure multer with memory storage
// const uploadMiddleware = multer({
//     storage: multer.memoryStorage(),
//     fileFilter: (req, file, cb) => {
//       // Implement any file filtering logic here if needed
//       cb(null, true);
//     },
//   });

  const uploadMiddleware = multer({
    storage: multer.memoryStorage(),
    limits: {
      fieldSize: 25 * 1024 * 1024, // Adjust as needed based on your requirements
    },
  });

// Configure multer to handle file uploads
// const uploadMiddleware = multer({ dest: 'uploads/' });

router.get('/posts', postsController.getAllPosts);
// router.post('/post', uploadMiddleware.single('ideausherimage'), postsController.createPost);

router.get('/posts/search', postsController.searchPosts);
router.get('/posts/tags', postsController.filterPostsByTags);

router.post('/post', postsController.createPost);
 router.post('/upload-image/:postId',uploadMiddleware.single('ideausherimage'), postsController.uploadImage );

// router.post('/create-post', createPost);
// router.post('/upload-image/:postId', uploadImage);

module.exports = router;
