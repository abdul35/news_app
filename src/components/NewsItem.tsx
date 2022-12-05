import { Card, CardContent, Divider, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { useEffect, useState } from "react";
import { getStory } from "../services/getStories";
import { Link } from "react-router-dom";

// by: "kiyanwang"
// descendants:1
// id:33585932
// kids:[33587071]
// score:3
// time:1668364569
// title:"Traits You Can Change, and Traits You Can’t"
// type:"story"
// url:"https://staysaasy.com/leadership/2022/11/06/traits-you-can-change-and-traits-you-cant.html"

const NewsItem = ({ story }: any) => {
	// console.log(story);
	useEffect(() => {}, []);

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
			{/* <Divider /> */}
		</>
	);
	// function displayCorrectTime(): ReactNode {
	// 	return new Date(story.time * 1000).getDay() as ReactNode;
	// }
};

export default NewsItem;
