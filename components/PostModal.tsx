import React, { useState } from "react";

function PostModal() {
	const [body, setBody] = useState("");

	function submit() {}

	return (
		<div className="postModal">
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
			<button onClick={submit} className="sendButton">
				send
			</button>
		</div>
	);
}

export default PostModal;
