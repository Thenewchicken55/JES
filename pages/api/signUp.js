// pages/api/signUp.js
import { connectToDatabase } from './db.js';
import Cookies from 'cookies';


export default async function loginHandler(req, res) {
    if (req.method === 'POST') {
      const { email, password } = req.body;
      const cookies = new Cookies(req, res);
  
      try {
        const connection = await connectToDatabase();
        
        // Check if a user with the given email already exists
        const [results] = await connection.query(
            'SELECT user_id FROM Users WHERE email = ?;',
            [email]
        );

        if (results.length === 0) {
            // If no user exists, insert the new user
            const [insertResults] = await connection.query(
              'CALL CreateUserAndBudget(?, ?);',
              [email, password]
            );

            if (insertResults.affectedRows > 0) {
              // If category creation succeeds
              res.status(200).json({ message: 'Sign up successful' });
            } else {
              // If category creation fails
              res.status(401).json({ message: 'Sign up failed' });
            }
        } else {
            res.status(401).json({ message: 'A user with this email already exists' });
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