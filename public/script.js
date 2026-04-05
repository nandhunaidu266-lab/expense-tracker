// Public script for expense tracking

// Fetch expenses from server
async function fetchExpenses() {
    try {
        const response = await fetch('/api/expenses');
        const expenses = await response.json();
        displayExpenses(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
}

// Display expenses dynamically
function displayExpenses(expenses) {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.textContent = `${expense.name}: $${expense.amount} (ID: ${expense.id})`;
        listItem.appendChild(createEditButton(expense.id));
        listItem.appendChild(createDeleteButton(expense.id));
        expenseList.appendChild(listItem);
    });
}

// Create Edit Button
function createEditButton(id) {
    const button = document.createElement('button');
    button.textContent = 'Edit';
    button.onclick = () => editExpense(id);
    return button;
}

// Create Delete Button
function createDeleteButton(id) {
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.onclick = () => deleteExpense(id);
    return button;
}

// Add a new expense
async function addExpense(name, amount) {
    const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, amount })
    });
    return response.json();
}

// Edit an existing expense
async function editExpense(id) {
    const newName = prompt('Enter new name:');
    const newAmount = prompt('Enter new amount:');
    await fetch(`/api/expenses/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name: newName, amount: newAmount })
    });
    fetchExpenses(); // Refresh the list
}

// Delete an expense
async function deleteExpense(id) {
    await fetch(`/api/expenses/${id}`, {
        method: 'DELETE'
    });
    fetchExpenses(); // Refresh the list
}

// Initiate fetch on load
window.onload = fetchExpenses;