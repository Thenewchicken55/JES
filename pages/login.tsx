import React, { useState } from "react";
import "../app/globals.css";
import { header, footer } from "../app/globals.tsx";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const pageTitle = (
  <>
    <title>Login</title>
  </>
);

export default function Login() {
  const router = useRouter();

  // State to handle email and password input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State to handle login result message
  const [loginMessage, setLoginMessage] = React.useState("");

  // Function to handle login
  const login = async () => {
    try {
      setLoginMessage("");
      // Make the API request to the login endpoint
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Send email and password as JSON
      });

      const data = await response.json();

      if (response.ok) {
        setLoginMessage("Login successful!");
        // Set the cookie using js-cookie
        Cookies.set('user_id', data.user_id, { expires: 7 }); // Set cookie to expire in 7 days

        setTimeout(() => {
          router.push('/transactions'); // Redirect to Transactions page after 1 second
        }, 1000);
      } else {
        setLoginMessage("Login failed: " + data.message);
      }
    } catch (error) {
      setLoginMessage("Error logging in: " + error);
    }
  };

  const signUp = async () => {
    try {
      setLoginMessage("");
      // Make API request to the sign up endpoint
      const response = await fetch("/api/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Send email and password as JSON
      });

      const data = await response.json();

      if (response.ok) {
        setLoginMessage("Sign up successful!");
      } else {
        setLoginMessage("Sign up failed: " + data.message);
      }
    } catch (error) {
      setLoginMessage("Error signing up: " + error);
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
          type="password"
          placeholder="Password:"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-container">
          <button onClick={login}>Login</button>
          <button onClick={signUp}>Sign Up</button>
        </div>
        <p>{loginMessage}</p>
      </article>
      {footer}
    </>
  );
}
