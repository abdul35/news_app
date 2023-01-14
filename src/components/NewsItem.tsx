import { Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { StoryType } from "../types/story.type";

const NewsItem = ({ story }: { story: StoryType }) => {
	return (
		<>
			{story ? (
				<Card className="card">
					<Typography sx={{ mb: 1.5, textAlign: "start" }} color="text.secondary">
						author - {story.by}
					</Typography>
					<Link style={{ textDecoration: "none", color: "black" }} to={`/about/${story.id}`}>
						<h5 className="card__title">{story.title}</h5>
					</Link>
					<div className="card__content">
						<Typography>{story.score} - stocks</Typography>
						<Typography variant="body2">{new Date(story.time * 1000).toLocaleDateString()}</Typography>
					</div>
				</Card>
			) : null}
		</>
	);
};

export default NewsItem;
