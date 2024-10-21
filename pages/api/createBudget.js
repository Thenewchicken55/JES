// pages/api/createBudget.js
import { connectToDatabase } from './db.js';
import Cookies from 'cookies';

export default async function createBudgetHandler(req, res) {
    if (req.method === 'POST') {
      const { monthly_limit, month } = req.body;
      const cookies = new Cookies(req, res);
      const userId = cookies.get('user_id');

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
  
      try {
        const connection = await connectToDatabase();
        const [results] = await connection.query(
          'INSERT INTO Budgets(user_id, monthly_limit, month) VALUES ?, ?, ?;',
          [userId, monthly_limit, month]
        );
  
        if (results.length > 0) {
          // If budget creation succeeds
          res.status(200).json({ message: 'Budget Creation Successful' });
        } else {
          // If budget creation fails
          res.status(401).json({ message: 'Failed to Create Budget' });
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