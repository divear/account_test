import React, { NewLifecycle, useState } from "react";

function login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorCode, setErrorCode] = useState("");

    function submit(e: any) {
        localStorage.setItem("email", email);
        e.preventDefault();
        if (!email && !password) {
            setErrorCode("Email and password is mandatory");
            return;
        } else if (email.length >= 3000) {
            setErrorCode("Zpráva je moc dlouhá");
            return;
        }

        (async function () {
            const Rbody = { body };
            const Rusername = { username };
            const Rgenre = { genre };

            localStorage.setItem("username", username);

            const arr = [Rbody, Rusername, Rgenre];
            const response = await fetch(`${serverDomain}drby`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(arr),
            });
            window.location.href = "/";
        })();
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

                <h1 className="error">{errorCode}</h1>

                <button onClick={submit} className="smallButton">
                    Sign up
                </button>
            </form>
        </div>
    );
}

export default login;
