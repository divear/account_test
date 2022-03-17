import React, { useState } from "react";

function singUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="content">
            <h1>Sign up</h1>
            <form className="signUpForm" action="">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" />

                <label htmlFor="email">Email</label>
                <input placeholder="your@email.com" type="email" id="email" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" />

                <button className="smallButton">Sign up</button>
            </form>
        </div>
    );
}

export default singUp;
