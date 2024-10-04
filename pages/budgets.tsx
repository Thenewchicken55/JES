import React, { useState } from 'react';
import "../app/globals.css"
import { header, footer } from "../app/globals.tsx"


const preface = (
  <>
    <title>Budgets</title>
    <link rel="stylesheet" href="globals.css" />
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