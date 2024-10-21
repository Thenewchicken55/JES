import React, { useState, useEffect } from 'react';
import Groq from "groq-sdk";
import { header, footer } from "../app/globals.tsx";

import "../app/globals.css";

// Check if the environment variable is set
const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

if (!apiKey) {
    alert("The GROQ_API_KEY environment variable is missing or empty. Please create a .env.local file and set the NEXT_PUBLIC_GROQ_API_KEY variable.");
    throw new Error("The GROQ_API_KEY environment variable is missing or empty.");
}

const groq = new Groq({ apiKey: apiKey, dangerouslyAllowBrowser: true});


interface GroqChatProps {
    content: string;
}

export const GroqChat: React.FC<GroqChatProps> = ({ content }) => {
    const [chatCompletion, setChatCompletion] = useState("");

    useEffect(() => {
        const fetchChatCompletion = async () => {
            const completion = await getGroqChatCompletion(content);
            setChatCompletion(completion.choices[0]?.message?.content || "");
        };

        fetchChatCompletion();
    }, [content]);

    const getGroqChatCompletion = async (content: string) => {
        return groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: "Don't use markdown syntax:\n" + content,
                },
            ],
            model: "llama-3.1-70b-versatile",
        });
    };

    return <p>{chatCompletion}</p>;
};

const pageTitle =(
    <>
        <title>AI</title>
    </>
);

export default function AI() {
    const [userInput, setUserInput] = useState('');
    const [output, setOutput] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    };

    const processInput = () => {
        setOutput("Loading...");
        setTimeout(() => {
            setOutput("Loading...");
            setOutput(userInput);
        }, 1000); // Adjust the delay as needed
    };

    const isEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          processInput();
        }
      };

    return (
        <>
            {pageTitle}
            {header}
            <article id="main" className="content">

                <input className="inputBox" type="text" id="userInput" placeholder="Enter your text here" value={userInput} onChange={handleInputChange} onSubmit={processInput} onKeyDown={isEnter}></input>
                <button onClick={processInput} style={{ marginLeft: '10px'}}>Submit</button>
                <GroqChat content={output}/>
            </article>
            {footer}
        </>
    );
}
