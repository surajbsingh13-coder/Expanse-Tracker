const express = require('express');
const cron = require('node-cron');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './.env' });

const app = express();

console.log(process.env.PORT);
console.log(process.env.DB_CONNECTION);

mongoose.connect(process.env.DB_CONNECTION)
.then(() => { 
    console.log('DB connection is successful');
})
.catch((error) => {
    console.log(error);
});

const run = () => {
    cron.schedule('* * * * * *', () => {
        console.log('running a task after every second');
    });
};

run();
app.listen(process.env.PORT, () => {
    console.log(`server is running on Port ${process.env.PORT}`);
});