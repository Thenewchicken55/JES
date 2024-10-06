import React, { useState, useEffect } from 'react';
import Groq from "groq-sdk";
import { header, footer } from "../app/globals.tsx";

import "../app/globals.css";

const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY, dangerouslyAllowBrowser: true});


export const GroqChat = () => {
    const [chatCompletion, setChatCompletion] = useState("");

    useEffect(() => {
        const fetchChatCompletion = async () => {
            const completion = await getGroqChatCompletion();
            setChatCompletion(completion.choices[0]?.message?.content || "");
        };

        fetchChatCompletion();
    }, []);

    const getGroqChatCompletion = async () => {
        return groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: "Explain the importance of fast language models",
                },
            ],
            model: "llama3-8b-8192",
        });
    };

    console.log(chatCompletion);
    return <p>{chatCompletion}</p>;
};


const pageTitle =(
    <>
        <title>AI</title>
    </>
);

const body = (
    <>

    </>
);

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
                <GroqChat />
            </article>
            {footer}
        </>
    );
}
