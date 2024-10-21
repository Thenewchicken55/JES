// pages/api/login.js
import { connectToDatabase } from './db.js';

export default async function loginHandler(req, res) {
    if (req.method === 'POST') {
      const { email, password } = req.body;
  
      try {
        const connection = await connectToDatabase();
        const [results] = await connection.query(
          'SELECT * FROM Users WHERE email = ? AND password = ?;',
          [email, password]
        );
  
        if (results.length > 0) {
          // If user exists
          res.status(200).json({ message: 'Login successful', user: results[0] });
        } else {
          // If no matching user found
          res.status(401).json({ message: 'Invalid email or password' });
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