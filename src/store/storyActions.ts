const reduxActionLoadStories = (data: any) => ({
    type: "ADD",
    payload: data,
});

const reduxActionUpdateStoryComment = (comment: any) => ({
    type: "UPDATE",
    payload: comment,
});

export { reduxActionLoadStories, reduxActionUpdateStoryComment };