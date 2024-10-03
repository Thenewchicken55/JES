import React, { useState } from 'react';
import "../app/globals.css"


const preface = (
  <>
    <title>Budgets</title>
    <link rel="stylesheet" href="globals.css" />
  </>
);

const header = (
  <>
    <header id="header" className="site-header">
      <h1 className="site-title">JES - Financial Budgeting Tool</h1>
      <nav className="site-navigation">
        <ul className="nav-menu">
          <li>
            <a href="home.html">Home</a>
          </li>
          <li>
            <a href="AI.html">AI</a>
          </li>
          <li>
            <a href="Budgets.html">Budgets</a>
          </li>
        </ul>
      </nav>
    </header>
  </>
);

const body = (
  <>
    <article>
      <h2>Budgets</h2>

      <div>
        <button>Budget 1</button>
      </div>
      <div>
        <button>Budget 2</button>
      </div>
      <div>
        <button>Budget 3</button>
      </div>
    </article>
  </>
);

const footer = (
  <>
    <footer>
      <p>
        © 2024 University of Akron. All Rights Reserved -- The Kernels (Javan
        Miller, Elia Albaba, and Spencer Simms)
      </p>
    </footer>
  </>
);

  export default function About() {
    return (
      <>
        {preface}
        {header}
        {body}
        {footer}
      </>
    );
  }