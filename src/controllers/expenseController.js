const { Op } = require('sequelize');
const Expense = require('../models/expenseModel');


// Add an expense
exports.addExpense = async (req, res) => {
    try {
        const expense = await Expense.create(req.body);
        res.status(201).json(expense);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to add expense' });
    }
};

// Edit an expense
exports.editExpense = async (req, res) => {
    try {
        const [updated] = await Expense.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedExpense = await Expense.findByPk(req.params.id);
            res.json(updatedExpense);
        } else {
            throw new Error('Expense not found');
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to edit expense' });
    }
};

// Remove an expense
exports.removeExpense = async (req, res) => {
    try {
        const deleted = await Expense.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Expense deleted' });
        } else {
            throw new Error('Expense not found');
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to delete expense' });
    }
};

// Display all expenses
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
};

// Display expenses of specific category
exports.getExpensesByCategory = async (req, res) => {
    try {
        const expenses = await Expense.findAll({
            where: { category: req.params.category }
        });
        res.json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
};

exports.getExpensesByMonthYear = async (month, year) => {
    try {
      const expenses = await Expense.findAll({
        attributes: ['id', 'description', 'amount', 'category', 'date', 'createdAt', 'updatedAt'],
      });
  
      // Filter expenses based on month and year
      const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() + 1 === month && expenseDate.getFullYear() === year;
      });
  
      return filteredExpenses;
    } catch (error) {
      throw error;
    }
  };