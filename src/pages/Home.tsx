import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { LoadingButton } from "@mui/lab";
import RefreshIcon from "@mui/icons-material/Refresh";

import { getTopStories } from "../services/getStories";

import NewsItem from "../components/NewsItem";

import { reduxActionLoadStories } from "../store/storyActions";
import { store } from "../store";

const Home = () => {
	const [stories, setStories] = useState<any>([]);
	const [loading, setLoading] = useState(true);

	const dataFromStore = useSelector((state: any) => state.stories);

	const refreshStories = async () => {
		setLoading(true);
		getTopStories().then(res => {
			store.dispatch(reduxActionLoadStories(res));
			setLoading(false);
			setStories(res);
		});
	};

	useEffect(() => {
		setLoading(false);
		if (!dataFromStore || !dataFromStore.length) {
			getTopStories().then(res => {
				store.dispatch(reduxActionLoadStories(res));
				setLoading(false);
				setStories(res);
			});
			return;
		}

		setStories(dataFromStore);
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
					? stories.map((story: any) => <NewsItem key={story.id} story={story} />)
					: null}
			</main>
		</>
	);
};

export default Home;
