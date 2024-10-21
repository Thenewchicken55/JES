// pages/api/login.js
import { connectToDatabase } from './db.js';
import Cookies from 'cookies';

export default async function loginHandler(req, res) {
    if (req.method === 'POST') {
      const { email, password } = req.body;
      const cookies = new Cookies(req, res);
  
      try {
        const connection = await connectToDatabase();
        const [results] = await connection.query(
          'SELECT user_id FROM Users WHERE email = ? AND password = ?;',
          [email, password]
        );
  
        if (results.length > 0) {
          // If user exists
          const user_id = results[0].user_id;

          // Set the user_id in a cookie
          cookies.set('user_id', user_id, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // Cookie expiration: 1 day
          });

          res.status(200).json({ message: 'Login successful', user_id });
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