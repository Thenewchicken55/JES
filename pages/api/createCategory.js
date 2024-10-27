// pages/api/createCategory.js
import { stringify } from 'querystring';
import { connectToDatabase } from './db.js';
import Cookies from 'cookies';

export default async function createCategoryHandler(req, res) {
    if (req.method === 'POST') {
      const { category, budget_id, category_limit } = req.body;
      const cookies = new Cookies(req, res);
      const userId = cookies.get('user_id');

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
  
      try {
        const connection = await connectToDatabase();
        const [results] = await connection.query(
          'INSERT INTO Categories(category, budget_id, category_limit) VALUES (?, ?, ?);',
          [category, budget_id, category_limit]
        );
  
        if (results.length > 0) {
          // If category creation succeeds
          res.status(200).json({ message: 'Category Creation Successful' });
        } else {
          // If category creation fails
          res.status(401).json({ message: 'Failed to Create Category' });
        }
  
        await connection.end(); // Close the connection
      } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ error: 'Database connection error' + error });
      }
    } else {
      // Only allow POST method
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }