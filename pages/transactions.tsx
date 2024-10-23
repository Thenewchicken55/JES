import React, { useState, useEffect } from 'react';
import "../app/globals.css"
import { header, footer } from "../app/globals.tsx"

const pageTitle =(
    <>
        <title>Transactions</title>
    </>
)

const TransactionInput = () => {
    // State for amount and name
    const [amount, setTransactionAmount] = useState("");
    const [transactionName, setTransactionName] = useState("");
    const [category, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [submitMessage, setSubmitMessage] = useState("");
  
    // Event handlers
    const handleTransactionAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTransactionAmount(event.target.value);
    };
    const handleTransactionName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTransactionName(event.target.value);
    };
    const handleCategoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(event.target.value);
    };
    const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async () => {
        setSubmitMessage('');
        // Log to web console
        console.log("Transaction Amount:", amount);
        console.log("Transaction Name:", transactionName);
        console.log("Category Name:", category);
        console.log("Description:", description);

        try {
            // Make the API request to the createTransaction endpoint
            const response = await fetch('/api/createTransaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category, amount, description }),
            });

            const data = await response.json();
            
            if (response.ok) {
                setSubmitMessage('Post Successful!');
            } else {
                setSubmitMessage('Post Failed: ' + data.message);
            }
        } catch (error) {
            setSubmitMessage('Error logging in: ' + error);
        }
    };
  
    return (
        <>
            <h2>Add Categories</h2>
            <div>
            <input
                className="inputBudget"
                name="transactionAmount"
                placeholder="Enter transaction amount"
                value={amount}
                onChange={handleTransactionAmount}
            />
            <input
                className="inputBudget"
                name="categoryName"
                placeholder="Enter transaction name"
                value={transactionName}
                onChange={handleTransactionName}
            />
            <input
                className="inputBudget"
                name="categoryName"
                placeholder="Enter category name"
                value={category}
                onChange={handleCategoryName}
            />
            <input
                className="inputBudget"
                name="description"
                placeholder="Enter description"
                value={description}
                onChange={handleDescription}
            />
            <button type="button" onClick={handleSubmit}>Submit</button>
            </div>
            <p>{submitMessage}</p>
        </>
    );
};

const TransactionTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchTransactions = async () => {
        try {
          const response = await fetch('/api/getTransactions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          const data = await response.json();
  
          if (response.ok) {
            setTransactions(data.transactions);
          } else {
            setError(data.message);
          }
        } catch (err) {
          console.error('Failed to fetch transactions:', err);
          setError('Failed to fetch transactions');
        }
      };
  
      fetchTransactions();
    }, []);
  
    return (
      <div>
        <h1>Transaction Table</h1>
  
        {error && <p style={{ color: 'red' }}>{error}</p>}
  
        {transactions.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.category}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.description}</td>
                  <td>{new Date(transaction.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    );
  }

export default function Transactions() {
    return (
        <>
            {pageTitle}
            {header}
            <article id="main" className="content">
                <TransactionInput />
                <TransactionTable />
            </article>
            {footer}
        </>
    );
}