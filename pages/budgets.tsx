import React, { useState } from 'react';
import { header, footer } from "../app/globals.tsx"
import { Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell, getKeyValue} from "@nextui-org/table";
import "../app/globals.css"

const pageTitle =(
    <>
        <title>Budgets</title>
    </>
)

// Static test data for table
const rows = [
    { key: "1", category: "Gas", currentAmount: "100", maxAmount: "200" },
    { key: "2", category: "Food", currentAmount: "200", maxAmount: "300"},
];

const columns = [
    { key: "category", label: "Category", },
    { key: "currentAmount", label: "Current Amount",},
    { key: "maxAmount", label: "Max Amount", },
];

const CategoryInput = () => {
    // State for amount and name
    const [categoryAmount, setCategoryAmount] = useState("");
    const [categoryName, setCategoryName] = useState("");
  
    // Event handlers
    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryAmount(event.target.value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryName(event.target.value);
    };
  
    // Log to web console
    const handleSubmit = () => {
      console.log("Category Amount:", categoryAmount);
      console.log("Category Name:", categoryName);
      
    // API calls to add category can be made here
    };
  
    return (
        <>
            <h2>Add Categories</h2>
            <div>
            <input
                className="inputBudget"
                name="categoryAmount"
                placeholder="Enter category amount"
                value={categoryAmount}
                onChange={handleAmountChange}
            />
            <input
                className="inputBudget"
                name="categoryName"
                placeholder="Enter category name"
                value={categoryName}
                onChange={handleNameChange}
                />
            <button type="button" onClick={handleSubmit}>Submit</button>
            </div>
        </>
    );
};

const renderTable = () => (
    <>
        <div>
            <Table>
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={rows}>
                    {(item) => (
                    <TableRow key={item.key}>
                        {(columnKey) => <TableCell className="table-cell-">{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    </>
);

export default function About() {
    const [showTable, setShowTable] = useState(false);

    const showTableHandler = () => {
      setShowTable(true);
    };

    return (
        <>
            {pageTitle}
            {header}

            <article id="main" className="content">
                <h2>Current month</h2>
                <button onClick={showTableHandler}>Show/Update</button>
                {showTable && renderTable()}

                <CategoryInput />
                
                <h2>Logged Budgets</h2>
                <div className = "button-container">
                    <button>Budget 2</button>
                    <button>Budget 3</button>
                </div>
            </article>

            {footer}
        </>
    );
}