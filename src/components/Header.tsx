import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import "../styles/Header.css";

const Header = () => {
	return (
		<>
			<header className="header">
				<Container>
					<div className="title-wrap">
						<Link to={"/"}>
							<h1 className="title">Geek_news</h1>
						</Link>
					</div>
				</Container>
			</header>
		</>
	);
};

export default Header;
