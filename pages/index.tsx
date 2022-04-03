import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import PostModal from "../components/PostModal";

const Home: NextPage = () => {
	const [hasAccount, setHasAccount] = useState(false);
	const [data, setData] = useState([]);
	const [postModal, setPostModal] = useState(false);
	const dev = process.env.NODE_ENV !== "production";

	const serverDomain = dev ? "http://localhost:4000/" : "";

	useEffect(() => {
		async function getBlogs() {
			try {
				const response = await fetch(serverDomain + "posts");
				const jsonData = await response.json();
				setData(jsonData.reverse());
				console.log(jsonData);
			} catch (error) {
				console.log(error);
			}
		}
		getBlogs();
		setHasAccount(!!localStorage.getItem("id"));
	}, []);

	return (
		<div className="content ">
			<div className={postModal ? "postModal" : "hidePostModal"}>
				<PostModal />
			</div>
			<button
				onClick={() => setPostModal(!postModal)}
				className={hasAccount ? "new floatRight" : "no"}
			>
				New post
			</button>
			<div className="posts ">
				{data.map((d: any) => {
					return (
						<div className="post">
							<div className="user">
								{d.pfp && (
									<Image
										src={
											d.pfp ||
											"https://firebasestorage.googleapis.com/v0/b/accounts-8a8bf.appspot.com/o/pfp%2Ftwitter-default-pfp.jpeg?alt=media"
										}
										id="pfp"
										className="pfp"
										alt="pfp"
										onError={() =>
											console.error("error in image")
										}
										width={50}
										height={50}
									/>
								)}
								<h6 className="floatRight date">
									{d.posted_date}
								</h6>
								<i className="username" title={d.email}>
									{d.username}
								</i>
							</div>
							<h2>{d.body}</h2>
						</div>
					);
				})}
			</div>{" "}
			<h6>Lukáš Odehnal 2022</h6>
		</div>
	);
};

export default Home;
