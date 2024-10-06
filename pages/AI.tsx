import React, { useState } from 'react';
import "../app/globals.css"
import { header, footer } from "../app/globals.tsx"

const pageTitle =(
    <>
        <title>AI</title>
    </>
)

const body = (
    <>

    </>
)

export default function Transactions() {
    const [userInput, setUserInput] = useState('');
    const [output, setOutput] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
      };

      const processInput = () => {
        setOutput(userInput);
      };

    return (
        <>
            {pageTitle}
            {header}
            {body}
            <article id="main" className="content">
                <h2>Whisper!</h2>

                <input type="text" id="userInput" placeholder="Enter your text here" value={userInput} onChange={handleInputChange}></input>
                <button onClick={processInput}>Submit</button>
                <div id="output" className="output">
                {output}
                </div>
            </article>
            {footer}
        </>
    );
}