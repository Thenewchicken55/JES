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
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/budgets">Budgets</a>
                </li>
                <li>
                    <a href="/transactions">Transactions</a>
                </li>
                <li>
                    <a href="/AI">AI</a>
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