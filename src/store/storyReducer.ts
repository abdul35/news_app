
const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'ADD':
            return { ...state, stories: action.payload }

        // case 'GET':
        //     console.log('state = ', state);

        // return { ...state, story:  state}


        default:
            return state
    }
}

export default reducer;