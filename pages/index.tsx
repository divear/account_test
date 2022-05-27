import type { NextPage } from "next";
import { useEffect, useState } from "react";
import PostModal from "../components/PostModal";
import ReactPlayer from "react-player";

const Home: NextPage = () => {
	const [hasAccount, setHasAccount] = useState(false);
	const [data, setData] = useState([]);
	const [postModal, setPostModal] = useState(false);

	const serverDomain =
		process.env.NODE_ENV === "development"
			? "http://localhost:4000/"
			: process.env.NEXT_PUBLIC_SERVERDOMAIN;

	useEffect(() => {
		async function getBlogs() {
			try {
				const response = await fetch(serverDomain + "posts");
				const jsonData = await response.json();
				setData(jsonData.reverse());
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
				title="Post something"
				onClick={() => setPostModal(!postModal)}
				className={hasAccount ? "new floatRight" : "no"}
			>
				+
			</button>
			<div className="posts ">
				{data.map((d: any) => {
					return (
						<div key={d.id} className="post">
							<div className="user">
								{d.pfp && (
									<img
										src={
											d.pfp ||
											"https://firebasestorage.googleapis.com/v0/b/accounts-8a8bf.appspot.com/o/pfp%2Ftwitter-default-pfp.jpeg?alt=media"
										}
										className="pfp"
										alt=""
										width={50}
										height={50}
									/>
								)}
								<i className="username" title={d.email}>
									{d.username}
								</i>
								<h6 className="date">{d.posted_date}</h6>
								<span className="email">{d.email}</span>
							</div>
							<h2>{d.body}</h2>
							<div className="video">
								<ReactPlayer
									width={288}
									height={162}
									url={d.video_id}
									controls
								/>
							</div>
						</div>
					);
				})}
			</div>{" "}
			<h6>Lukáš Odehnal 2022</h6>
		</div>
	);
};

export default Home;
