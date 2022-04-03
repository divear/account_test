import React, { useEffect, useState } from "react";

function PostModal() {
	const serverDomain = process.env.NEXT_PUBLIC_SERVERDOMAIN;
	const [body, setBody] = useState("");
	const [id, setId] = useState(0);
	const [errorCode, setErrorCode] = useState("");
	useEffect(() => {
		setId(Number(`${localStorage.getItem("id")}`));
	}, []);

	function submit(e: any) {
		e.preventDefault();
		if (!id && !body) {
			setErrorCode("Email and password are mandatory");
			return;
		}

		(async function () {
			const Rid = { id };
			const Rbody = { body };
			console.log(Rid);

			console.log(`${serverDomain}posts`);

			const arr = [Rid, Rbody];
			const response = await fetch(`${serverDomain}posts`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(arr),
			});
			window.location.reload();
		})();
	}

	return (
		<div>
			<form onSubmit={(e) => submit(e)} action="">
				<div className="top">
					<h1
						className="cancel"
						onClick={() => {
							window.location.reload();
						}}
					>
						x
					</h1>
					<h1>New post</h1>
				</div>
				<input
					type="text"
					name=""
					id="usernameInput"
					value={body}
					onChange={(e) => setBody(e.target.value)}
				/>
				<br />
				<button type="submit" className="sendButton">
					send
				</button>
				<h3>{errorCode}</h3>
			</form>
		</div>
	);
}

export default PostModal;
