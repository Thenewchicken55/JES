import React from 'react';
import "../app/globals.css"
import { header, footer } from "../app/globals.tsx"

const pageTitle =(
    <>
        <title>Budgets</title>
    </>
)

const body = (
    <>
        <article id="main" className="content">
            <h2>Current month</h2>

            <div>
                <button>Budget 1</button>
            </div>

            <h2>Logged Budgets</h2>
            <div>
                <button>Budget 2</button>
            </div>
            <div>
                <button>Budget 3</button>
            </div>
        </article>
    </>
);

export default function About() {
    return (
        <>
            {pageTitle}
            {header}
            {body}
            {footer}
        </>
    );
}