import { useEffect, useState, PropsWithChildren, useCallback } from "react";
import { useSelector } from "react-redux";
import { getStory, getTopStories } from "../services/getStories";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { LoadingButton, TreeView } from "@mui/lab";
import { RouteComponentProps } from "react-router";

import "../styles/About.css";

import { store } from "../store";
import { reduxActionLoadStories, reduxActionUpdateStoryComment } from "../store/storyActions";

import TreeComments from "../components/TreeComments";
import { StoryType } from "../types/story.type";

const About = (props: PropsWithChildren<RouteComponentProps<{ id: string }>>) => {
	const { id } = props.match.params;
	const [date, setDate] = useState<string>("");
	let data = useSelector((state: { stories: StoryType[] }) =>
		state.stories.find((story: StoryType) => story.id === +id),
	);

	let dateInit;
	let [comments, setComments] = useState<number[]>([]);
	const [totalComments, setTotalComments] = useState<number>();
	const [loading, setLoading] = useState<boolean>(true);

	const initStates = useCallback((data: StoryType) => {
		dateInit = new Date(data.time * 1000);
		setDate(
			`${dateInit.getDate()} ${dateInit.toLocaleString("default", {
				month: "long",
			})} ${dateInit.getFullYear()}`,
		);
		setComments(data.kids);
		setTotalComments(data.descendants);
	}, []);

	useEffect(() => {
		data && initStates(data);
		setLoading(false);

		if (!data) {
			getTopStories().then(res => {
				store.dispatch(reduxActionLoadStories(res));
				res && initStates(res.find((story: StoryType) => story.id === +id));
			});

			return;
		}
	}, [data, id, initStates]);

	const refreshComments = () => {
		setLoading(true);
		getStory(Number(id)).then(story => {
			setComments(story.kids);
			setTotalComments(story.descendants);
			setLoading(false);

			store.dispatch(reduxActionUpdateStoryComment(story));
		});
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
							<>
								<div>
									<span className="comments-container-header__title">Comments</span>
									<span className="comments-container-header__count">{totalComments}</span>
								</div>
								<div>
									<LoadingButton
										onClick={refreshComments}
										variant="contained"
										loading={loading}
										disabled={loading}
									>
										<RefreshIcon />
									</LoadingButton>
								</div>
							</>
						) : null}
					</div>

					{comments && comments.length ? (
						<TreeView
							aria-label="comments"
							sx={{ height: 240, flexGrow: 1 }}
							defaultExpandIcon={<ExpandMore />}
							defaultCollapseIcon={<ExpandLess />}
						>
							{comments.map((commentId: number) => {
								return <TreeComments commentId={commentId} key={commentId} />;
							})}
						</TreeView>
					) : null}
				</article>
			</section>
		</>
	);
};

export default About;
