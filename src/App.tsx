import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import { Container } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store";

const App = (): React.ReactElement => {
	store.subscribe(() => console.log(store.getState()));
	return (
		<Provider store={store}>
			<div className="App">
				<header>
					<Container>
						<h1>Hacker news app</h1>
					</Container>
				</header>
				<Container>
					<Switch>
						<Route path={"/about/:id"} component={About} />
						<Route path="/" exact component={Home} />
					</Switch>
				</Container>
			</div>
		</Provider>
	);
};

export default App;
