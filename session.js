const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();



// Session setup
app.use(session(
    {
        secret: 'jhsjdhfjs',
        resave: true,
        cookie: { maxAge: 1000 * 60 * 60 },
        saveUninitialized: true
    }
));

app.use(cookieParser());



app.get('/', (req, res) => {
    // req.session.key = value
    req.session.user = {
        name: 'A',
        email: 'test@gmail.com'
    };
    res.status(200).send('Thanks for visiting');
});


app.get('/login', (req, res) => {
    var name = req.session.user.name;
    var email = req.session.user.email;
    res.status(200).send('Welcome ' + name + ' ' + email);
});
app.listen(9001, console.log('Server Started'));