const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema(
    {
        title:
        {
            type: String,
            require: true
        },
        description:
        {
            type: String,
            require: true
        },
        country:
        {
            type: String,
            require: true
        },
        state:
        {
            type: String,
            require: true
        },
        city:
        {
            type: String,
            require: true
        },
        image:
        {
            type: String,
            require: true
        }
    }
)

const blogs = new mongoose.model('Blog', blogSchema);
module.exports = blogs;