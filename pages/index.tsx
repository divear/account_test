import type { NextPage } from "next";
import { useEffect, useState } from "react";
import PostModal from "../components/PostModal";
import ReactPlayer from "react-player";
import Image from "next/image";
import trash from "../components/imgs/trash.png";

const Home: NextPage = () => {
	const [hasAccount, setHasAccount] = useState(false);
	const [data, setData] = useState([]);
	const [postModal, setPostModal] = useState(false);
	const [userEmail, setUserEmail] = useState("");
	const [bigVid, setBigVid] = useState(false);

	function deletePost(id: Number) {}

	const serverDomain =
		process.env.NODE_ENV === "development"
			? "http://localhost:4000/"
			: process.env.NEXT_PUBLIC_SERVERDOMAIN;

	useEffect(() => {
		setUserEmail(`${localStorage.getItem("email")}`);
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

	function timeAgo(time: any) {
		// in miliseconds
		var units: any = {
			year: 24 * 60 * 60 * 1000 * 365,
			month: (24 * 60 * 60 * 1000 * 365) / 12,
			day: 24 * 60 * 60 * 1000,
			hour: 60 * 60 * 1000,
			minute: 60 * 1000,
			second: 1000,
		};

		var rtf: any = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

		var getRelativeTime = (d1: any, d2: any = new Date()) => {
			var elapsed = d1 - d2;

			// "Math.abs" accounts for both "past" & "future" scenarios
			for (let u in units)
				if (Math.abs(elapsed) > units[u] || u == "second")
					return rtf.format(Math.round(elapsed / units[u]), u);
		};

		// test-list of dates to compare with current date

		return getRelativeTime(+new Date(time));
	}

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
								<h6 className="date">{timeAgo(d.datum)}</h6>
								<span className="email">{d.email}</span>
							</div>
							<h2 className="videoTitle">{d.body}</h2>
							<div className="video">
								<ReactPlayer
									onClick={() => setBigVid(d.video_id)}
									width={288}
									height={162}
									url={d.video_id}
								/>
							</div>

							{bigVid === d.video_id && (
								<div
									onMouseOver={() => setBigVid(d.video_id)}
									onMouseLeave={() => setBigVid(false)}
									className="bigVid"
								>
									<ReactPlayer
										onEnded={() => setBigVid(false)}
										width={864}
										height={486}
										url={d.video_id}
										controls
									/>
								</div>
							)}
							{d.email === userEmail && (
								<Image
									onClick={() => deletePost(d.id)}
									className="trash"
									width={30}
									height={30}
									src={trash}
								></Image>
							)}
						</div>
					);
				})}
			</div>
			<h6>Lukáš Odehnal 2022</h6>
		</div>
	);
};

export default Home;
