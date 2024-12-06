import React, { useState, useEffect } from "react";
import "../app/globals.css";
import { header, footer } from "../app/globals.tsx";
import "@/pages/table.css";
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';

const pageTitle = (
  <>
    <title>Transactions</title>
  </>
);

const TransactionInput = () => {
  // State for amount and name
  const [amount, setTransactionAmount] = useState("");
  const [transactionName, setTransactionName] = useState("");
  const [category, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  // Event handlers
  const handleTransactionAmount = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransactionAmount(event.target.value);
  };
  const handleTransactionName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransactionName(event.target.value);
  };
  const handleCategoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };
  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    setSubmitMessage("");
    // Log to web console
    console.log("Transaction Amount:", amount);
    console.log("Transaction Name:", transactionName);
    console.log("Category Name:", category);
    console.log("Description:", description);

    try {
      // Make the API request to the createTransaction endpoint
      const response = await fetch("/api/createTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, amount, description }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage("Post Successful!");
      } else {
        setSubmitMessage("Post Failed: " + data.message);
      }
    } catch (error) {
      setSubmitMessage("Error logging in: " + error);
    }
  };

  return (
    <>
      <h2>Transactions</h2>
      <div>
        <input
          className="inputBudget"
          name="categoryName"
          placeholder="Enter category name"
          value={category}
          onChange={handleCategoryName}
        />
        <input
          className="inputBudget"
          name="transactionAmount"
          placeholder="Enter transaction amount"
          value={amount}
          onChange={handleTransactionAmount}
        />
        <input
          className="inputBudget"
          name="description"
          placeholder="Enter description"
          value={description}
          onChange={handleDescription}
        />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <p>{submitMessage}</p>
    </>
  );
};

const TransactionTable = () => {
  interface Transaction {
    id: string;
    category: string;
    amount: number;
    description: string;
    date: string;
  }

  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);

  useEffect(() => {
    const userId = Cookies.get('user_id');
    if (!userId) {
      router.push('/login');
      return;
    }
    
  const fetchTransactions = async () => {
    // Fetch transactions logic
    try {
      const response = await fetch("/api/getTransactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setTransactions(data.transactions);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      setError("Failed to fetch transactions");
    }
  };

    fetchTransactions();
    const intervalId = setInterval(fetchTransactions, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1>Transaction Table</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {transactions.length > 0 ? (
        <>
          <table className="table-container">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.category}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.description}</td>
                  <td>{new Date(transaction.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>{` Page ${currentPage} of ${totalPages} `}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};


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
