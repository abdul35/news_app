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
// https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty
const getStory = async (id: number) => {
    // console.log(id);

    try {
        const data = await fetch(`${baseUrl + storyUrlName + id}.json/`);
        return data.json();
    } catch (e) {
        throw e;
    }
}

export { getIdListTopStroies, getStory }