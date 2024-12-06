// pages/api/deleteCategory.js
import { connectToDatabase } from './db.js';
import Cookies from 'cookies';

export default async function deleteCategoryHandler(req, res) {
  if (req.method === 'POST') {
    // Category to deleted
    const { category } = req.body;
    const cookies = new Cookies(req, res);
    const userId = cookies.get('user_id');

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    try {
      const connection = await connectToDatabase();

      // Log the userId and category for debugging purposes
      console.log('userId:', userId);
      console.log('category:', category);

      // Get the budget_id for the given user_id
      const [budgetResults] = await connection.query(
        'SELECT budget_id FROM Budgets WHERE user_id = ?',
        [userId]
      );

      if (budgetResults.length === 0) {
        // If no budget exists for the given user_id, return an error
        return res.status(404).json({ message: 'No budget found for the given user' });
      }

      const budgetId = budgetResults[0].budget_id;

      // Delete the category for the given user and budget_id
      const [deleteResult] = await connection.query(
        'DELETE FROM Categories WHERE category = ? AND budget_id = ?',
        [category, budgetId]
      );

      if (deleteResult.affectedRows === 0) {
        // If no rows were affected, the category might not exist for the given user and budget_id
        return res.status(404).json({ message: 'Category not found' });
      }

      res.status(200).json({ message: 'Category deleted successfully' });

      await connection.end(); // Close the connection
    } catch (error) {
      console.error('Database connection error:', error);
      res.status(500).json({ error: 'Database connection error', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
