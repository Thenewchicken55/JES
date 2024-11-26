// pages/api/getCategory.js
import { connectToDatabase } from './db.js';
import Cookies from 'cookies';

export default async function getCategoryHandler(req, res) {
    if (req.method === 'POST') {
      // const { category } = req.body;
      const cookies = new Cookies(req, res);
      const userId = cookies.get('user_id');
      console.log('userId:', userId);
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
  
      try {
        const connection = await connectToDatabase();
        const [results] = await connection.query(
          `SELECT c.category, c.category_limit 
           FROM Categories c
           JOIN Budgets b ON c.budget_id = b.budget_id
           WHERE b.user_id = ?`, [userId]
        );
  
        if (results.length > 0) {
          // Return the category details
          res.status(200).json({ message: 'Retrieval Successful', category: results });
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