const initialState: { stories: any[] } = {
    stories: []
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'ADD':
            return { ...state, stories: action.payload }

        case 'UPDATE':
            const index = state.stories.findIndex(item => {
                return item.id === action.payload.id
            });

            const newArray = [...state.stories];
            newArray[index].descendants = action.payload.descendants;
            newArray[index].kids = action.payload.kids;

            return { ...state, stories: newArray }


        default:
            return state
    }
}

export default reducer;