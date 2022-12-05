import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getStory } from "../services/getStories";
import { store } from "../store";

const About = (props: any) => {
	const [news, setNews] = useState<any>();
	const { id } = props.match.params;
	useEffect(() => {
		// getStory(props.match.params.id as number)
		// 	.then(data => data.json())
		// 	.then(oneNews => setNews(oneNews));
		// console.log(id);
	}, []);
	const data = useSelector((state: any) => state);
	console.log(data);

	return (
		<>
			{/* {data} */}
			<h1></h1>
		</>
	);
};

export default About;
