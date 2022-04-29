import React, { useEffect, useState } from "react";
import { ref, getStorage, uploadBytes } from "./firebase.js";
import spinner from "./imgs/spinner.gif"
import Image from "next/image";

const isWeb = typeof window !== "undefined";

function PostModal() {
	const [videoLink, setVideoLink] = useState("")
	const serverDomain = process.env.NEXT_PUBLIC_SERVERDOMAIN;
	const [body, setBody] = useState("");
	const [id, setId] = useState(0);
	const [errorCode, setErrorCode] = useState("");
	const [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		setId(Number(`${localStorage.getItem("id")}`));
	}, []);

	
	const storage = getStorage();

	
	function changeImg(e: any) {
		let tempVid = e.target.files[0];
		console.log(tempVid);
		
		console.log("change vid");
		

		//make url friendly
		const friendlyUrlName = e.target.files[0].name
			.replace(/[^.,a-zA-Z]/g, "")
			.toLowerCase();
		console.log(friendlyUrlName);
		

		setVideoLink(
			`https://firebasestorage.googleapis.com/v0/b/accounts-8a8bf.appspot.com/o/video%2F${friendlyUrlName}?alt=media`
		);
		const tempVidLink =`https://firebasestorage.googleapis.com/v0/b/accounts-8a8bf.appspot.com/o/video%2F${friendlyUrlName}?alt=media` 

		console.log(tempVidLink);
		

		const spaceRef = ref(storage, `video/${tempVid && friendlyUrlName}`);

		console.log(spaceRef);
		console.log(tempVid);



		
		setIsLoading(true)
		uploadBytes(spaceRef, tempVid).then(async (snapshot) => {
			console.log(spaceRef);
			console.log("HEFHSDFJKDJSLKFJKADLSFKJL");
			
			console.log(snapshot);
			
			
			submit(e);
		});
	}

	function submit(e: any) {
		e.preventDefault();
		if (!id && !body) {
			setErrorCode("Email and password are mandatory");
			return;
		}

		(async function () {
			const Rid = { id };
			const Rbody = { body };
			const Rvid = {videoLink}

			console.log(`${serverDomain}posts`);

			const arr = [Rid, Rbody, Rvid];
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
					autoFocus
				/>
				<br />
				<label htmlFor="video">Video:</label>
				<br />
				<input
					type="file"
					onChange={(e) => changeImg(e)}
					accept="video/*" />
				<br />
				<button type="submit" className="sendButton">
					send
				</button>
				<h3>{errorCode}</h3>
				<Image src={spinner} width={50} height={50} className={isLoading ? "" : "no"}></Image>
			</form>
		</div>
	);
}

export default PostModal;
