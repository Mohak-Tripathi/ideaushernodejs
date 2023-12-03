// tags.routes.js
const express = require('express');
const router = express.Router();
const tagsController = require('../controllers/tagController');

router.post('/tags/new', tagsController.createTag);

module.exports = router;