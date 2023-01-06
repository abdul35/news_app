import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import { Container } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./styles/App.css";

const App = (): React.ReactElement => {
	return (
		<Provider store={store}>
			<div className="App">
				<Header />
				<Container>
					<Switch>
						<Route path={"/about/:id"} component={About} />
						<Route path="/" exact component={Home} />
					</Switch>
				</Container>
				<Footer />
			</div>
		</Provider>
	);
};

export default App;
