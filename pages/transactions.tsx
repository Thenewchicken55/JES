import React, { useState } from 'react';
import "../app/globals.css"
import { header, footer } from "../app/globals.tsx"

const pageTitle =(
    <>
        <title>Transactions</title>
    </>
)

const TransactionInput = () => {
    // State for amount and name
    const [transactionAmount, setTransactionAmount] = useState("");
    const [transactionName, setTransactionName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
  
    // Event handlers
    const handleTransactionAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTransactionAmount(event.target.value);
    };
    const handleTransactionName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTransactionName(event.target.value);
    };
    const handleCateogryName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(event.target.value);
    };
    const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    // Log to web console
    const handleSubmit = () => {
        console.log("Transaction Amount:", transactionAmount);
        console.log("Transaction Name:", transactionName);
        console.log("Category Name:", categoryName);
        console.log("Description:", description);
      
    // API calls to add category can be made here
    };
  
    return (
        <>
            <h2>Add Categories</h2>
            <div>
            <input
                className="inputBudget"
                name="transactionAmount"
                placeholder="Enter transaction amount"
                value={transactionAmount}
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
                value={categoryName}
                onChange={handleCateogryName}
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
        </>
    );
};

const transactionHistory = (
    <>

    </>
)

export default function Transactions() {
    return (
        <>
            {pageTitle}
            {header}
            <article id="main" className="content">
                <TransactionInput />
                {transactionHistory}
            </article>
            {footer}
        </>
    );
}