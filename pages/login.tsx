import React, { useState } from 'react';
import "../app/globals.css"
import { header, footer } from "../app/globals.tsx"

const pageTitle = (
    <>
        <title>Login</title>
    </>
);

export default function Login() {
    // State to handle email and password input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // State to handle login result message
    const [loginMessage, setLoginMessage] = React.useState('');

    // Function to handle login
    const login = async () => {
        try {
            setLoginMessage('');
            // Make the API request to the login endpoint
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Send email and password as JSON
            });

            const data = await response.json();
            
            if (response.ok) {
                setLoginMessage('Login successful!');
            } else {
                setLoginMessage('Login failed: ' + data.message);
            }
        } catch (error) {
            setLoginMessage('Error logging in: ' + error);
        }
    };

    return (
        <>
            {pageTitle}
            {header}
            <article id="main" className="content">
                <input 
                    className="inputBox" 
                    type="text" 
                    placeholder="Email:" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    className="inputBox" 
                    type="text"
                    placeholder="Password:" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="button-container">
                    <button onClick={login}>Login</button>
                </div>
                <p>{loginMessage}</p>
            </article>
            {footer}
        </>
    );
}
