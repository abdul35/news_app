import { CommentType } from "../types/comment.type";
import { StoryType } from "../types/story.type";

const initialState: { stories: StoryType[] } = {
    stories: []
}

const reducer = (
    state = initialState,
    action: { type: string; payload: any }

) => {
    switch (action.type) {
        case 'ADD':
            return { ...state, stories: action.payload }

        case 'UPDATE':
            const story = action.payload as StoryType;
            const index = state.stories.findIndex(item => {
                return item.id === story.id
            });

            const newArray = [...state.stories];
            newArray[index].descendants = story.descendants;
            newArray[index].kids = story.kids;

            return { ...state, stories: newArray }


        default:
            return state
    }
}

export default reducer;