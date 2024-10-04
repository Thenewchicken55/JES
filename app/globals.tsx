import * as React from 'react';

export const header = (
    <>
        <title>Home</title>
        <link rel="stylesheet" href="globals.css" />
        <header id="header" className="site-header">
            <h1 className="site-title">JES - Financial Budgeting Tool</h1>
            <nav className="site-navigation">
                <ul className="nav-menu">
                <li>
                    <a href="/" className="nav-button">Home</a>
                </li>
                <li>
                    <a href="/budgets" className="nav-button">Budgets</a>
                </li>
                <li>
                    <a href="/transactions" className="nav-button">Transactions</a>
                </li>
                <li>
                    <a href="/AI" className="nav-button">AI</a>
                </li>
                </ul>
            </nav>
        </header>
    </>
);

export const footer = (
    <>
        <footer>
            <p>
            © 2024 University of Akron. All Rights Reserved -- The Kernels (Javan
            Miller, Elia Albaba, and Spencer Simms)
            </p>
        </footer>
    </>
);