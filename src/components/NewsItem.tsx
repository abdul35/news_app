import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { StoryType } from "../types/story.type";

const NewsItem = ({ story }: { story: StoryType }) => {
	return (
		<>
			{story && (
				<Card
					sx={{
						maxWidth: 575,
						width: "100%",
						marginBottom: "2rem",
						marginRight: 0,
						padding: "1rem",
						backgroundColor: "#A7D9D9",
						display: "inline-block",
					}}
				>
					<Typography sx={{ mb: 1.5, textAlign: "start" }} color="text.secondary">
						author - {story.by}
					</Typography>
					<Link style={{ textDecoration: "none", color: "black" }} to={`/about/${story.id}`}>
						<Typography
							gutterBottom
							variant="h5"
							component="h5"
							sx={{ fontSize: 20, fontWeight: "bold", textAlign: "start" }}
						>
							{story.title}
						</Typography>
					</Link>
					<CardContent
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "end",
							marginLeft: "-1rem",
							marginRight: "-1rem",
							marginBottom: "-1rem",
						}}
					>
						<Typography>{story.score} - stocks</Typography>

						<Typography variant="body2">{new Date(story.time * 1000).toLocaleDateString()}</Typography>
					</CardContent>
				</Card>
			)}
		</>
	);
};

export default NewsItem;
