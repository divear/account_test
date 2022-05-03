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
	let link : String
	useEffect(() => {
		setId(Number(`${localStorage.getItem("id")}`));
	}, []);

	
	const storage = getStorage();

	
	function changeImg(e: any) {
		let tempVid = e.target.files[0];
		
		

		//make url friendly
		const friendlyUrlName = e.target.files[0].name
			.replace(/[^.,a-zA-Z1-9]/g, "")
			.toLowerCase();
		

		const tempVidLink =`https://firebasestorage.googleapis.com/v0/b/accounts-8a8bf.appspot.com/o/video%2F${friendlyUrlName}?alt=media` 
		setVideoLink(tempVidLink)
		link = tempVidLink  
		
		

		const spaceRef = ref(storage, `video/${tempVid && friendlyUrlName}`);




		
		setIsLoading(true)
		uploadBytes(spaceRef, tempVid).then(async (snapshot) => {
			submit(e)
		});
	}

	function submit(e: any) {
		e.preventDefault();
		if (!id && !body) {
			setErrorCode("Email and password are mandatory");
			return;
		}

		(async function () {
			console.log(link);
			const Rid = { id };
			const Rbody = { body };
			const Rvid = {link}
			

			const arr = [Rid, Rbody, Rvid];
			console.log(arr);
			
			const response = await fetch(`${serverDomain}posts`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(arr),
			});
			console.log("posted");
			
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
				<h3>{errorCode}</h3>
				<div className={isLoading ? "" : "no"}>
					<Image src={spinner} width={50} height={50}></Image>
					<h1>This may take few minutes, please wait.</h1>
				</div>
			</form>
		</div>
	);
}

export default PostModal;
