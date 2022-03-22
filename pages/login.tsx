import React, { useState } from "react";

function login() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function submit() {
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
    }

    return (
        <div className="content">
            <h1>Log in to your existing account</h1>
            <form className="signUpForm" action="/">
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    type="email"
                    id="email"
                />

                <label htmlFor="password">Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                />

                <button onClick={submit} className="smallButton">
                    Sign up
                </button>
            </form>
        </div>
    );
}

export default login;
