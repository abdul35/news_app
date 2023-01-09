import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { LoadingButton } from "@mui/lab";
import RefreshIcon from "@mui/icons-material/Refresh";

import { getTopStories } from "../services/getStories";

import NewsItem from "../components/NewsItem";

import { reduxActionLoadStories } from "../store/storyActions";
import { store } from "../store";
import { StoryType } from "../types/story.type";

const Home = () => {
	const [stories, setStories] = useState<StoryType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const dataFromStore = useSelector((state: { stories: StoryType[] }) => state.stories);

	const refreshStories = async () => {
		setLoading(true);
		getTopStories().then(res => {
			store.dispatch(reduxActionLoadStories(res));
			setLoading(false);
			setStories(res);
		});
	};

	useEffect(() => {
		if (!dataFromStore || !dataFromStore.length) {
			setLoading(true);
			getTopStories().then(res => {
				store.dispatch(reduxActionLoadStories(res));
				setStories(res);
				setLoading(false);
			});
			return;
		}

		setStories(dataFromStore);
		setLoading(false);
	}, []);

	return (
		<>
			<div className="refresh-btn-block">
				<LoadingButton
					variant="contained"
					onClick={refreshStories}
					loading={loading}
					sx={{ marginBottom: "1rem" }}
					disabled={loading}
				>
					<RefreshIcon></RefreshIcon>
				</LoadingButton>
			</div>

			<main>
				{stories && stories.length
					? stories.map((story: StoryType) => <NewsItem key={story.id} story={story} />)
					: null}
			</main>
		</>
	);
};

export default Home;
