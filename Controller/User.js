const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserCollection = require('../Model/User');
const BlogCollection = require('../Model/Blogs');
const { stat } = require('fs');

// Display
async function Validate(req, res) {


    res.render('Login');
};

async function Register(req, res) {
    res.render('SignUp');
};

async function Home(req, res) {
    res.render('Home');
};

async function AddBlog(req, res) {
    res.render('AddBlog');
};

async function Blogs(req, res) {
    const result = await BlogCollection.find();
    res.status(200).send(result);
    console.log(result);
    // res.render('Blogs');
};








// Action


// Login
async function ValidateUser(req, res) {
    if (req.body.email === '' || req.body.password === '') { res.send("Fields are empty"); }
    else {
        const user = await UserCollection.findOne({ email: req.body.email });
        if (!user) { res.send("No user exist"); }
        else {
            const passwordMatch = await bcrypt.compare(req.body.password, user.password)
            if (passwordMatch) {

                // generating token and sending cookie
                const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                res.cookie('token', token, { maxAge: 1000 * 60 * 60, httpOnly: true });

                // redirecting to the home page
                res.redirect('Home');

            }
            else { return res.send("Incorrect Password"); }
        }
    }

};


async function LogOut(req, res) {

}



// Register
async function RegisterUser(req, res) {
    const user = await UserCollection.findOne({ email: req.body.email });
    if (user) { res.send("user already exist with same email id"); }
    if (!validator.isEmail(req.body.email)) { res.send('Enter a valid email id'); }
    // else if (!validator.isStrongPassword(req.body.password)) { res.send('Weak Password'); }
    else if (req.body.password !== req.body.cpassword) { res.send('Password did not match'); }
    else {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        var UserData = await UserCollection({ first_name: req.body.fname, last_name: req.body.lname, email: req.body.email, password: hashedPassword });
        await UserData.save(console.log("User Registered"));

        // generating token and sending cookie
        const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { maxAge: 1000 * 60 * 60, httpOnly: true });

        //redirect to the home page
        res.redirect('Home');
    }

};




// Add Blog
async function BlogPost(req, res) {
    const { title, description, country, state, city, image } = req.body;
    if (title === '' || description === '' || country === '' || state === '' || city === '' || image === '') { res.send("Fields are empty"); }
    var BlogData = await BlogCollection({ title: title, description: description, country: country, state: state, city: city, image: image });
    await BlogData.save(console.log("Blog Added"));
    res.redirect('Home');
}



module.exports = { Validate, Register, Home, AddBlog, Blogs, ValidateUser, RegisterUser, BlogPost, LogOut };