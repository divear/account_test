import React, { NewLifecycle, useState } from "react";

function login() {
	const serverDomain = process.env.NEXT_PUBLIC_SERVERDOMAIN;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorCode, setErrorCode] = useState("");

	function submit(e: any) {
		localStorage.setItem("email", email);
		e.preventDefault();
		if (!email && !password) {
			setErrorCode("Email and password is mandatory");
			return;
		} else if (email.length >= 300) {
			setErrorCode("The email is too long");
			return;
		}

		(async function () {
			const Remail: any = { email };
			const Rpassword = { password };

			localStorage.setItem("email", email);

			const response = await fetch(
				`${serverDomain}users-login/${Remail.email}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify([Rpassword]),
				}
			);
			const jsonData = await response.json();
			console.log(jsonData);
			if (!jsonData.length) {
				setErrorCode("Wrong email and password");
				return;
			}
			const data = jsonData[0];
			console.log(data);

			localStorage.setItem("username", data.username);
			localStorage.setItem("email", data.email);
			localStorage.setItem("pfp", data.pfp);
			localStorage.setItem("id", jsonData[0].id);

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
					Log in
				</button>
			</form>
		</div>
	);
}

export default login;
