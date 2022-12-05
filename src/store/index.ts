import { createStore } from "redux";
import storyReducer from "./storyReducer";

export const store = createStore(storyReducer)