import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AccountModal from "./AccountModal";
import logo from "./imgs/logo.png";

function Nav() {
	const [mainColor, setMainColor] = useState("#f7be89");
	const [hover, setHover] = useState(false);
	const [hasAccount, setHasAccount] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [modal, setModal] = useState(false);
	const [imgLink, setImgLink] = useState(
		"https://firebasestorage.googleapis.com/v0/b/accounts-8a8bf.appspot.com/o/pfp%2Ftwitter-default-pfp.jpeg?alt=media"
	);
	const [width, setWidth] = useState(0);

	useEffect(() => {
		setHasAccount(!!localStorage.getItem("id"));
		setUsername(`${localStorage.getItem("username")}`); //awful hack but kinda javascript's fault
		setEmail(`${localStorage.getItem("email")}`);
		setImgLink(
			`${
				!localStorage.getItem("pfp") ||
				localStorage.getItem("pfp") === "null"
					? "https://firebasestorage.googleapis.com/v0/b/accounts-8a8bf.appspot.com/o/pfp%2Ftwitter-default-pfp.jpeg?alt=media"
					: localStorage.getItem("pfp")
			}`
		);
		setWidth(window.innerWidth);
		if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			dark();
		}
	}, []);
	function dark() {
		console.log("dark");
		setMainColor("#f06543");
		document.documentElement.style.setProperty("--bg", "#313638");
		document.documentElement.style.setProperty("--fr", "#e8e9eb");
		document.documentElement.style.setProperty("--black", "white");
		document.documentElement.style.setProperty("--main", "#f06543");
		document.documentElement.style.setProperty("--sec", "#9e412a");
		document.documentElement.style.setProperty("--bgSec", "#7a531c");

		document.documentElement.style.setProperty("--bgDark", "#2e2321");
	}

	return (
		<div className="nav">
			<div className="wave">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path
						fill={mainColor}
						fillOpacity="1"
						d="M0,224L48,197.3C96,171,192,117,288,96C384,75,480,85,576,96C672,107,768,117,864,133.3C960,149,1056,171,1152,170.7C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
					></path>
				</svg>
			</div>

			<Link href="/">
				<h1 className="navText">
					<Image width={50} height={50} className="logo" src={logo} />
					Postine
				</h1>
			</Link>

			<div className={modal ? "um userModal" : "um hideUserModal"}>
				<AccountModal />
			</div>

			<div className={hover ? "usernameInfo" : "hide"}>
				<h1>{username}</h1>
			</div>

			<div
				className={hasAccount ? "accountMin navText floatRight" : "no"}
				onClick={() => setModal(!modal)}
			>
				<h1 className="imgDiv">
					{imgLink && (
						<Image
							width={50}
							height={50}
							className="pfp"
							src={
								imgLink ||
								"https://firebasestorage.googleapis.com/v0/b/accounts-8a8bf.appspot.com/o/pfp%2Ftwitter-default-pfp.jpeg?alt=media"
							}
							alt=""
							onMouseEnter={() => setHover(true)}
							onMouseLeave={() => setHover(false)}
						/>
					)}
				</h1>
			</div>
			<Link href={"/signup"}>
				<button
					className={!hasAccount ? "floatRight signInButton" : "no"}
				>
					Sign up
				</button>
			</Link>

			<Link href={"/login"}>
				<button
					className={!hasAccount ? "floatRight signInButton" : "no"}
				>
					Log in
				</button>
			</Link>
		</div>
	);
}

export default Nav;
