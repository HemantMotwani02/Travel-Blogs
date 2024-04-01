const express = require('express');
const { Validate, Register, Home, AddBlog, Blogs, ValidateUser, RegisterUser, BlogPost,LogOut } = require('../Controller/User');
const router = express.Router();

// Display
router.get('/Login', Validate);
router.get('/SignUp', Register);
router.get('/Home', Home);
router.get('/AddBlog', AddBlog);
router.get('/AllBlogs', Blogs);


// Action
router.post('/ValidateUser', ValidateUser);
router.post('/logout', LogOut);
router.post('/SubmitData', RegisterUser);
router.post('/PostBlog', BlogPost);
// router.get('/Home', Home);

module.exports = router;