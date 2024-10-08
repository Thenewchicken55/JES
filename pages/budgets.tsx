import React from 'react';
import "../app/globals.css"
import { header, footer } from "../app/globals.tsx"
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell, getKeyValue} from "@nextui-org/table";
import { useState } from 'react';

const pageTitle =(
    <>
        <title>Budgets</title>
    </>
)

const rows = [
    { key: "1", category: "Gas", currentAmount: "100", maxAmount: "200" },
    { key: "2", category: "Food", currentAmount: "200", maxAmount: "300"},
];

const columns = [
    { key: "category", label: "Category", },
    { key: "currentAmount", label: "Current Amount",},
    { key: "maxAmount", label: "Max Amount", },
];

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

const category = (
    <> 
        <article id="main" className="content">
            <h2>Add Categories</h2>
            <div>
                <title></title>
                <input className="inputBox" name="input" placeholder="Enter category amount in Doll-hairs"/>
                <input className="inputBox" name="input" placeholder="Enter category name" />
                <button type="button">Submit</button>
            </div>
        </article>
    </>
);

const input = (
    <> 
        <article id="main" className="content">
            {/* <input className="inputBox" name="input" placeholder="Enter category name" />
            <button type="button">Submit</button> */}
        </article>
    </>
)

export default function About() {
    const [showTable, setShowTable] = useState(false);

    const handleButtonClick = () => {
      setShowTable(true);
    };

    return (
        <>
            {pageTitle}
            {header}

            <article id="main" className="content">
                <h2>Current month</h2>
                <button onClick={handleButtonClick}>Show/Update</button>
                {showTable && renderTable()}

                <h2>Logged Budgets</h2>
                <div className = "button-container">
                    <button>Budget 2</button>
                </div>
                <div className = "button-container">
                    <button>Budget 3</button>
                </div>
            </article>

            {category}
            {input}
            {footer}
        </>
    );
}