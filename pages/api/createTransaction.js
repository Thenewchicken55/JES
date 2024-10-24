// pages/api/createTransaction.js
import { connectToDatabase } from './db.js';
import Cookies from 'cookies';

export default async function createCategoryHandler(req, res) {
    if (req.method === 'POST') {
      const { category, amount, description } = req.body;
      const cookies = new Cookies(req, res);
      const userId = cookies.get('user_id');
      // Get the current date and time in MySQL-compatible format for DATETIME
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
  
      try {
        const connection = await connectToDatabase();
        const [results] = await connection.query(
          'INSERT INTO Transactions(user_id, category, amount, description, date) VALUES (?, ?, ?, ?, ?);',
          [userId, category, amount, description, currentDate]
        );
  
        if (results.affectedRows > 0) {
          // If category creation succeeds
          res.status(200).json({ message: 'Transaction Posted Successful' });
        } else {
          // If category creation fails
          res.status(401).json({ message: 'Failed to Post Transaction' });
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