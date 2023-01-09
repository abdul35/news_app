import { StoryType } from "../types/story.type";

const baseUrl = "https://hacker-news.firebaseio.com/v0/";

const topStoriesUrlName = "topstories.json/"
const topStoriesUrl = baseUrl + topStoriesUrlName;

const storyUrlName = "item/";

const getIdListTopStroies = async () => {
    try {
        const data = await fetch(topStoriesUrl);
        return data.json();
    } catch (e) {
        throw e;
    }
}

const getStory = async (id: number) => {
    try {
        const data = await fetch(`${baseUrl + storyUrlName + id}.json/`);
        return await data.json();
    } catch (e) {
        throw e;
    }
}


const getTopStories = async () => {
    const listId = await getIdListTopStroies();
    const slicedListId = listId.slice(0, 100);

    let rawData = [];

    for await (const story of slicedListId.map((e: number) => getStory(e))) {
        rawData.push(story);
    }
    rawData.sort(function (a: StoryType, b: StoryType) {
        return b.time - a.time;
    });
    return rawData;
};


export { getIdListTopStroies, getStory, getTopStories }