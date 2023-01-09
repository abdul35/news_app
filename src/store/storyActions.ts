import { StoryType } from "../types/story.type";

const reduxActionLoadStories = (data: Array<StoryType>) => ({
    type: "ADD",
    payload: data,
});

const reduxActionUpdateStoryComment = (story: StoryType) => ({
    type: "UPDATE",
    payload: story,
});

export { reduxActionLoadStories, reduxActionUpdateStoryComment };