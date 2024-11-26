// pages/api/getTransactionsFromCategory.js
import { connectToDatabase } from './db.js';
import Cookies from 'cookies';

export default async function getTransactionHandler(req, res) {
    if (req.method === 'POST') {
        const cookies = new Cookies(req, res);
        const userId = cookies.get('user_id');
        const { category } = req.body; // Get category_id from the request body

        if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
        }

        if (!category) {
        return res.status(400).json({ message: 'Category ID is required' });
        }

        try {
        const connection = await connectToDatabase();
        const [results] = await connection.query(
            'SELECT * FROM Transactions WHERE user_id = ? AND category = ? ORDER BY date DESC;',
            [userId, category]
        );

        if (results.length > 0) {
            // Return the transactions
            res.status(200).json({ message: 'Retrieval Successful', transactions: results });
        } else {
            // If no matching transactions found
            res.status(404).json({ message: 'No transactions found for this category' });
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
