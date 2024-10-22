// pages/api/getCategory.js
import { connectToDatabase } from './db.js';
import Cookies from 'cookies';

export default async function getCategoryHandler(req, res) {
    if (req.method === 'POST') {
      // const { category } = req.body;
      const cookies = new Cookies(req, res);
      const userId = cookies.get('user_id');

      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
  
      try {
        const connection = await connectToDatabase();
        const [results] = await connection.query(
          'SELECT category, category_limit FROM Categories;'
          // 'SELECT category, category_limit FROM Categories WHERE category = ?;', [category]
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