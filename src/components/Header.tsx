import { Link } from "react-router-dom";
import { CardHeader } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const Header = () => {
	return (
		<>
			<CardHeader component={h} classes={blueGrey[300]} color="blue"></CardHeader>
		</>
	);
};

function h() {
	return (
		<>
			<nav>
				<ul>
					<li>
						<Link to="/about">About</Link>
					</li>
					<li>
						<Link to="/">Home</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}
export default Header;
