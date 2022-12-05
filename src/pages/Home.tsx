// import {
// 	Button,
// 	Card,
// 	CardActions,
// 	CardContent,
// 	CardMedia,
// 	Divider,
// 	List,
// 	ListItem,
// 	ListItemText,
// 	Typography,
// } from "@mui/material";
// import Link from "@mui/material/Link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NewsItem from "../components/NewsItem";
import { getIdListTopStroies, getStory } from "../services/getStories";
import { store } from "../store";

const Home = () => {
	const [stories, setStories] = useState<any>([]);

	const reduxAction = (data: any) => ({
		type: "ADD",
		payload: data,
	});

	const reduxActionGet = (id: number) => ({
		type: "GET",
		payload: id,
	});

	useEffect(() => {
		const getListId = async () => {
			const listIds = await getIdListTopStroies();
			return listIds.slice(0, 100);
		};

		const getListStories = async () => {
			const listId = await getListId();
			let rawData = [];

			for await (const story of listId.map((e: any) => getStory(e))) {
				rawData.push(story);
			}
			rawData.sort(function (a: any, b: any) {
				return b.time - a.time;
			});
			store.dispatch(reduxAction(rawData));
			// store.dispatch(reduxActionGet(33827787));

			setStories(rawData);
		};

		// const storedData = useSelector()

		getListStories();
	}, []);

	return <>{stories.length ? stories.map((story: any) => <NewsItem key={story.id} story={story} />) : null}</>;
};

export default Home;
