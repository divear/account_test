import React, { useState } from "react";

function singUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function submit() {
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
    }

    return (
        <div className="content">
            <h1>Sign up</h1>
            <form className="signUpForm" action="/">
                <label htmlFor="username">Username</label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    id="username"
                />

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

export default singUp;
