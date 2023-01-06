import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getStory, getTopStories } from "../services/getStories";
import { Button } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { TreeView, TreeItem } from "@mui/lab";
import { store } from "../store";

import "../styles/About.css";
import { reduxActionLoadStories, reduxActionUpdateStoryComment } from "../store/storyActions";

const RenderTree = ({ rawComments }: any) => {
	const [comment, setKid] = useState<any>(rawComments);

	if (typeof comment === "number") {
		getStory(comment).then(el => setKid(el));
	}

	return comment && comment.by ? (
		<>
			<TreeItem
				key={comment.id}
				nodeId={comment.id}
				label={comment.by}
				expandIcon={<ExpandMore />}
				collapseIcon={<ExpandLess />}
				sx={{ padding: ".5rem", margin: ".5rem", backgroundColor: "lightgray" }}
			>
				{Array.isArray(comment.kids) &&
					comment.kids.map((node: any) => {
						return <RenderTree kids={node} />;
					})}
			</TreeItem>
		</>
	) : null;
};

const About = (props: any) => {
	const { id } = props.match.params;
	const [date, setDate] = useState("");
	let data = useSelector((state: any) => state.stories.find((story: any) => story.id === +id));

	let dateInit;
	let [comments, setComments] = useState([]);
	const [totalComments, setTotalComments] = useState();

	const initStates = (data: any) => {
		dateInit = data.time && new Date(data.time * 1000);
		setDate(
			`${dateInit.getDate()} ${dateInit.toLocaleString("default", {
				month: "long",
			})} ${dateInit.getFullYear()}`,
		);
		setComments(data.kids);
		setTotalComments(data.descendants);
	};

	useEffect(() => {
		data && initStates(data);

		if (!data) {
			getTopStories().then(res => {
				store.dispatch(reduxActionLoadStories(res));
				const news = res.find((story: any) => story.id === +id);
				initStates(news);
				data = news;
			});

			return;
		}
	}, []);

	const refreshComments = async () => {
		const item = await getStory(id);

		setComments(item.kids);
		setTotalComments(item.descendants);

		store.dispatch(reduxActionUpdateStoryComment(item));
	};

	return (
		<>
			<section className="about">
				{data ? (
					<div className="news-link">
						<a href={data.url} target="_blank" rel="noreferrer">
							<h1 className="news-title">{data.title}</h1>
						</a>
					</div>
				) : null}

				{data ? (
					<>
						<div className="date-wrap">
							<span>{date}</span>
							<span>
								Author: <i>{data.by}</i>
							</span>
						</div>
					</>
				) : null}

				<article className="comments-container">
					<div className="comments-container-header">
						{totalComments ? (
							<div>
								<span className="comments-container-header__title">Comments</span>
								<span className="comments-container-header__count">{totalComments}</span>
							</div>
						) : null}

						<div>
							<Button onClick={refreshComments} variant="contained">
								<RefreshIcon />
							</Button>
						</div>
					</div>

					{comments && comments.length ? (
						<TreeView aria-label="comments" sx={{ height: 240, flexGrow: 1, maxWidth: 400 }}>
							{comments &&
								comments.map((el: any) => {
									return <RenderTree kids={el} />;
								})}
						</TreeView>
					) : null}
				</article>
			</section>
		</>
	);
};

export default About;
