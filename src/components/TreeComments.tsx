import { TreeItem } from "@mui/lab";
import { PropsWithChildren, useState } from "react";
import { getStory } from "../services/getStories";
import { CommentType } from "../types/comment.type";

type lol = CommentType | number;
interface t {
	node: CommentType | number;
}

const TreeComments = ({ commentId }: { commentId: CommentType | number }) => {
	// const TreeComments = (props: PropsWithChildren<t>) => {
	const [comment, setComment] = useState(commentId);
	comment as CommentType;
	if (typeof comment === "number") {
		getStory(comment).then(el => setComment(el));
	}

	return comment && (comment as CommentType).by ? (
		<TreeItem
			key={String((comment as CommentType).id)}
			nodeId={String((comment as CommentType).id)}
			label={(comment as CommentType).by}
			sx={{ padding: ".5rem", margin: ".5rem", backgroundColor: "lightgray" }}
			children={
				Array.isArray((comment as CommentType).kids) &&
				(comment as CommentType).kids.map((kid: number) => {
					return <TreeComments commentId={kid} key={kid} />;
				})
			}
		/>
	) : null;
};

export default TreeComments;
