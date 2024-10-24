// pages/api/getTransactions.js
import { connectToDatabase } from './db.js';
import Cookies from 'cookies';

export default async function getTransactionHandler(req, res) {
    if (req.method === 'POST') {
      const cookies = new Cookies(req, res);
      const userId = cookies.get('user_id');

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
  
      try {
        const connection = await connectToDatabase();
        const [results] = await connection.query(
          'SELECT * FROM Transactions WHERE user_id = ? ORDER BY date DESC;',
          [userId]
        );
  
        if (results.length > 0) {
          // Return the category details
          res.status(200).json({ message: 'Retrieval Successful', transactions: results });
        } else {
          // If no matching category found
          res.status(401).json({ message: 'No category found' });
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