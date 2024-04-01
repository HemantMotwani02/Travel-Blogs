const express = require('express');
const app = express();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'test',
    'root',
    'pass#123',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

sequelize.authenticate()
    .then(
        () => {
            console.log('Connection has been established successfully');
        })
    .catch(
        (error) => {
            console.error('Unable to connect to the database: ', error);
        }
    )

app.listen(3000, console.log('Server'));

