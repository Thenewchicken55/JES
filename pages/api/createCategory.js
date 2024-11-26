// pages/api/createCategory.js
import { stringify } from 'querystring';
import { connectToDatabase } from './db.js';
import Cookies from 'cookies';

export default async function createCategoryHandler(req, res) {
    if (req.method === 'POST') {
      const { category, category_limit, month } = req.body;
      const cookies = new Cookies(req, res);
      const userId = cookies.get('user_id');

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
  
      try {
        const connection = await connectToDatabase();
  
        // Log the userId and month to ensure they are correct
        console.log('userId:', userId);
        console.log('month:', month);
  
        // Get the budget_id for the given user_id and month
        const [budgetResults] = await connection.query(
          'SELECT budget_id FROM Budgets WHERE user_id = ? AND month = ?',
          [userId, month]
        );
  
        if (budgetResults.length === 0) {
          // If no budget exists for the given user_id and month, return an error
          return res.status(404).json({ message: 'No budget found for the given user and month' });
        }
  
        const budgetId = budgetResults[0].budget_id;
  
        // Log the category details before executing the query
        console.log('category:', category, 'budget_id:', budgetId, 'category_limit:', category_limit);
  
        // Insert a new category
        await connection.query(
          'INSERT INTO Categories (category, budget_id, category_limit) VALUES (?, ?, ?)',
          [category, budgetId, category_limit]
        );
  
        res.status(200).json({ message: 'Category Creation Successful' });
  
        await connection.end(); // Close the connection
      } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ error: 'Database connection error', details: error.message });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }