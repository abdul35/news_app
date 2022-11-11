import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
import "./App.css";
import About from './pages/About';
import Home from './pages/Home';

function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<h1>What's up Duuude</h1>
					<nav>
						<ul>
							<li>
								{/* <Link to="/">Home</Link> */}
								<a href="/">h</a>
							</li>
							<li>
								<a href="/about">a</a>
								{/* <Link to="/about">About</Link> */}
							</li>
						</ul>
					</nav>
				</header>
				<Switch>
					<Route path="/about" exact>
						<About />
					</Route>
					<Route path="/" exact>
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
	
}

export default App;
