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

	function timeAgo(time: any) {
		time = +new Date(time.toLocaleString());
		var time_formats = [
			[60, "seconds", 1], // 60
			[120, "1 minute ago", "1 minute from now"], // 60*2
			[3600, "minutes", 60], // 60*60, 60
			[7200, "1 hour ago", "1 hour from now"], // 60*60*2
			[86400, "hours", 3600], // 60*60*24, 60*60
			[172800, "Yesterday", "Tomorrow"], // 60*60*24*2
			[604800, "days", 86400], // 60*60*24*7, 60*60*24
			[1209600, "Last week", "Next week"], // 60*60*24*7*4*2
			[2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
			[4838400, "Last month", "Next month"], // 60*60*24*7*4*2
			[29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
			[58060800, "Last year", "Next year"], // 60*60*24*7*4*12*2
			[2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
			[5806080000, "Last century", "Next century"], // 60*60*24*7*4*12*100*2
			[58060800000, "centuries", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
		];
		var seconds = (+new Date() - time) / 1000,
			token = "ago",
			list_choice = 1;

		if (seconds == 0) {
			return "Just now";
		}
		if (seconds < 0) {
			seconds = Math.abs(seconds);
			token = "from now";
			list_choice = 2;
		}
		var i = 0,
			format;
		while ((format = time_formats[i++]))
			if (seconds < format[0]) {
				if (typeof format[2] == "string") return format[list_choice];
				else
					return (
						Math.floor(seconds / format[2]) +
						" " +
						format[1] +
						" " +
						token
					);
			}
		return time;
	}
	console.log(timeAgo("01/04/2022 15:20"));

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
								<h6 className="date">
									{timeAgo(d.posted_date)}
								</h6>
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
