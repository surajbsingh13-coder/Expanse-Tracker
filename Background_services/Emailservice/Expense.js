const dotenv = require("dotenv");
const sendMail = require("../helpers/sendMail");
const Expense = require("../models/Expense");
console.log("Expense model:", Expense); 

dotenv.config();

let emailSent = false;

const expenseEmail = async () => {  

    const expenses = await Expense.find();

    const totalExpense = expenses.reduce(
        (acc, expense) => acc + expense.value, 0  
    );

    if (totalExpense > 10000 && !emailSent) {
        let messageOptions = {
            from: process.env.EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: "Warning",
            text: `Your total expense is ${totalExpense}. Please review your expenses`, // ✅ 2. Fixed template literal: $() → ${}
        };

        await sendMail(messageOptions);
        emailSent = true; 
        console.log("Warning email sent!");
    }    
    if (totalExpense <= 10000) {
        emailSent = false;
    }
};

module.exports = expenseEmail; // default export