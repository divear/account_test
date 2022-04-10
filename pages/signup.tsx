import React, { useEffect, useState } from "react";

function SingUp() {
	const serverDomain = process.env.NEXT_PUBLIC_SERVERDOMAIN;
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorCode, setErrorCode] = useState("");

	useEffect(() => {
		username ? (window.location.href = "/") : null;
	}, []);

	function submit(e: any) {
		e.preventDefault();
		if (!email && !password) {
			setErrorCode("Email and password are mandatory");
			return;
		}

		(async function () {
			const Remail = { email };
			const Rusername = { username };
			const Rpassword = { password };

			localStorage.setItem("email", email);
			localStorage.setItem("username", username);

			console.log(`${serverDomain}users`);

			const arr = [Remail, Rusername, Rpassword];
			const response = await fetch(`${serverDomain}users`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(arr),
			});

			const id: any = await fetch(`${serverDomain}users-number`);
			const jsonData = await id.json();

			localStorage.setItem("id", jsonData[0].id);

			window.location.href = "/";
		})();
	}

	return (
		<div className="content">
			<h1>Create a new account</h1>
			<form onSubmit={(e) => submit(e)} className="signUpForm" action="/">
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

				<h5 className="error">{errorCode}</h5>

				<button className="smallButton">Sign up</button>
			</form>
		</div>
	);
}

export default SingUp;
