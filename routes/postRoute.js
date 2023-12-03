// posts.routes.js
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postController');
const multer = require('multer');
// const uploadMiddleware = multer({ storage: multer.memoryStorage() });


  const uploadMiddleware = multer({
    storage: multer.memoryStorage(),
    limits: {
      fieldSize: 25 * 1024 * 1024, // Adjust as needed based on your requirements
    },
  });


router.get('/posts', postsController.getAllPosts);

router.get('/posts/search', postsController.searchPosts);
router.get('/posts/tags', postsController.filterPostsByTags);

router.post('/post', postsController.createPost);
 router.post('/upload-image/:postId',uploadMiddleware.single('ideausherimage'), postsController.uploadImage );


module.exports = router;
