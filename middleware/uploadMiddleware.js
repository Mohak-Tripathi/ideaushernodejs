// upload.middleware.js
// const multer = require('multer');
// // const aws = require('aws-sdk');
// // const multerS3 = require('multer-s3');
// const dotenv = require("dotenv");

// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");


// dotenv.config({ path: "./config/config.env" });

// // const storage = multer.memoryStorage()
// // const upload = multer({ storage: storage })


// console.log(process.env.AWS_ACCESS_KEY, process.env.AWS_SECRET_ACCESS_KEY, process.env.AWS_BUCKET_REGION)
// // aws.config.update({
// //   accessKeyId: process.env.AWS_ACCESS_KEY,
// //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// //   region: process.env.AWS_BUCKET_REGION,
// // });

// const s3 = new S3Client({
  
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secrestAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
 
//   region: process.env.AWS_BUCKET_REGION
// })


// const params = {
//   Bucket: process.env.AWS_BUCKET_NAME,
//   Key: req.file.originalName,
//   Body:req.file.buffer,
//   ContentType: req.file.mimetype
// }

// const command = new PutObjectCommand(params)
// s3.send(command)

// const s3 = new aws.S3();

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     acl: 'public-read',
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString() + '-' + file.originalname);
//     },
//   }),
// });

// module.exports = upload;
