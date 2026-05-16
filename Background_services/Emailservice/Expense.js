const dotenv = require("dotenv");
const sendMail = require("../helpers/sendMail");
const Expense = require("../models/Expense");
console.log("Expense model:", Expense); 

dotenv.config();

const expenseEmail = async () => {  // ✅ 1. Missing "async" keyword

    const expenses = await Expense.find();

    const totalExpense = expenses.reduce(
        (acc, expense) => acc + expense.value, 0  
    );

    if (totalExpense > 10000) {
        let messageOptions = {
            from: process.env.EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: "Warning",
            text: `Your total expense is ${totalExpense}. Please review your expenses`, // ✅ 2. Fixed template literal: $() → ${}
        };

        await sendMail(messageOptions);
    }    
};

module.exports = expenseEmail; // default export