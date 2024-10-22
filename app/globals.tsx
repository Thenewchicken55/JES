import * as React from 'react';
import Link from 'next/link';

export const header = (
    <>
        <link rel="stylesheet" href="globals.css" />
        <header id="header" className="site-header">
            <h1 className="site-title">JES - Financial Budgeting Tool</h1>
            <nav className="site-navigation">
                <Link href="/" className="nav-button">Home</Link> {" "}
                <Link href="/budgets" className="nav-button">Budgets</Link> {" "}
                <Link href="/transactions" className="nav-button">Transactions</Link> {" "}
                <Link href="/AI" className="nav-button">AI</Link> {" "}
                <Link href="/login" className="nav-button">Login </Link>
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