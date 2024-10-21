// pages/api/getBudget.js
import { connectToDatabase } from './db.js';
import Cookies from 'cookies';

export default async function getBudgetHandler(req, res) {
    if (req.method === 'POST') {
      const { month } = req.body;
      const cookies = new Cookies(req, res);
      const userId = cookies.get('user_id');

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
  
      try {
        const connection = await connectToDatabase();
        const [results] = await connection.query(
          'SELECT budget_id, monthly_limit, month FROM Budgets WHERE user_id = ? AND month = ?;',
          [userId, month]
        );
  
        if (results.length > 0) {
          // Return the budget details
          res.status(200).json({ message: 'Retrieval Successful', budgets: results });
        } else {
          // If no matching budget found
          res.status(401).json({ message: 'No budget found' });
        }
  
        await connection.end(); // Close the connection
      } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ error: 'Database connection error' });
      }
    } else {
      // Only allow POST method
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }