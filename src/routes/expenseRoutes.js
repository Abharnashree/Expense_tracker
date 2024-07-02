const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/expenses', expenseController.addExpense);
router.put('/expenses/:id', expenseController.editExpense);
router.delete('/expenses/:id', expenseController.removeExpense);
router.get('/expenses/all', expenseController.getExpenses);
router.get('/expenses/category/:category', expenseController.getExpensesByCategory);
router.get('/expenses/:month/:year', async (req, res) => {
    const { month, year } = req.params;
    try {
      const expenses = await expenseController.getExpensesByMonthYear(parseInt(month), parseInt(year));
      res.json(expenses);
    } catch (error) {
      console.error('Error retrieving expenses:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
module.exports = router;



