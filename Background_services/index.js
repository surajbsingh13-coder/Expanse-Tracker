const express = require('express');
const cron = require('node-cron');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const  expenseEmail = require('./Emailservice/Expense'); // ✅ Add this

dotenv.config({ path: './.env' });

const app = express();

mongoose.connect(process.env.DB_CONNECTION)
.then(() => { 
    console.log('DB connection is successful');
})
.catch((error) => {
    console.log(error);
});

const run = () => {
    cron.schedule('* * * * * *', async () => {  // ✅ make async if expenseEmail is async
        try {
            await expenseEmail();
        } catch (err) {
            console.error('Error running expenseEmail:', err);
        }
    });
};

run();

app.listen(process.env.PORT, () => {
    console.log(`Background services are running on Port ${process.env.PORT}`);
});