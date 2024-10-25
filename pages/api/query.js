// pages/api/query.js
import { connectToDatabase } from './db.js';

export default async function handler(req, res) {
  try {
    const connection = await connectToDatabase();
    const [results] = await connection.query('SHOW tables;');
    res.status(200).json(results);
    await connection.end(); // Make sure to close the connection
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection error' });
  }
}