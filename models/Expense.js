const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    id: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
    user: { type: String, required: true }
});

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;