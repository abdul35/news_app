import { TreeItem } from "@mui/lab";
import { Box } from "@mui/material";
import { useState } from "react";
import { getStory } from "../services/getStories";
import { CommentType } from "../types/comment.type";

const TreeComments = ({ commentId }: { commentId: CommentType | number }) => {
	const [comment, setComment] = useState(commentId);
	comment as CommentType;
	if (typeof comment === "number") {
		getStory(comment).then(el => setComment(el));
	}

	let i = 0;
	return comment && (comment as CommentType).by ? (
		<TreeItem
			nodeId={String((comment as CommentType).id)}
			label={
				<>
					<Box
						sx={{
							padding: 1,
							paddingBottom: 2,
							paddingTop: 1.5,
							color: "rgba(0, 0, 0, 0.5);",
							fontSize: "15px",
							textAlign: "left",
						}}
					>
						{(comment as CommentType).by && (comment as CommentType).by}
					</Box>
					<Box
						sx={{
							padding: 1,
							textAlign: "left",
							wordWrap: "break-word",
						}}
					>
						{(comment as CommentType).text && (comment as CommentType).text}
					</Box>
				</>
			}
			sx={{
				borderRadius: "4px",
				marginLeft: 5,
				borderLeft: Array.isArray((comment as CommentType).kids) ? "2px solid rgb(102, 255, 102);" : "",
			}}
		>
			{Array.isArray((comment as CommentType).kids) &&
				(comment as CommentType).kids.map((kid: number) => {
					return <TreeComments commentId={kid} key={kid} />;
				})}
		</TreeItem>
	) : null;
};

export default TreeComments;
