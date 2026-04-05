const express = require('express');
const router = express.Router();

// Mock database for expenses
let expenses = [];

// GET all expenses
router.get('/', (req, res) => {
    res.json(expenses);
});

// POST a new expense
router.post('/', (req, res) => {
    const expense = req.body;
    expense.id = expenses.length + 1; // Simple ID assignment
    expenses.push(expense);
    res.status(201).json(expense);
});

// PUT (update) an expense by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const index = expenses.findIndex(exp => exp.id == id);
    if (index !== -1) {
        expenses[index] = { id: parseInt(id), ...req.body };
        res.json(expenses[index]);
    } else {
        res.status(404).send('Expense not found');
    }
});

// DELETE an expense by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    expenses = expenses.filter(exp => exp.id != id);
    res.status(204).send();
});

module.exports = router;