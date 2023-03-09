import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import getText from "../../messages";
import NoRefLink from "./NoRefLink";
import HLine from "./HLine";

function stringToColor(string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
}

function stringAvatar(name) {
	name = (name||"").toUpperCase();
	return {
		sx: {
			bgcolor: stringToColor(name)
		},
		children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
	};
}

function ResponsiveAppBar(props) {
	const title = `<${props.title}/>`;
	const pages = (props.pages || []).filter((page) => !!page);
	const settings = props.settings;
	const clickHandler = props.click;
	const handleRegister = props.register;
	const handleLogin = props.login;
	const userInfo = props.userInfo || {};
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const HandleItemClick = (oEvent) => {
		if (clickHandler) {
			clickHandler(oEvent);
		}
	};
	return (
		<AppBar color="primary" position="sticky">
			<Container maxWidth="xxl">
				<Toolbar disableGutters sx={{ width: "100%" }}>
					<Typography
						variant="h6"
						noWrap
						component="a"
						onClick={HandleItemClick}
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none"
						}}
					>
						{title}
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left"
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left"
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" }
							}}
						>
							{pages.map((page) => (
								<MenuItem data-key={page.id} key={page.id} onClick={handleCloseNavMenu}>
									<Typography
										data-key={page.id}
										key={page.id}
										textAlign="center"
										onClick={HandleItemClick}
									>
										{page.text}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant="h5"
						noWrap
						component="a"
						onClick={HandleItemClick}
						href="#"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
							fontSize: "2.5vw",
						}}
					>
						{title}
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Button
								data-key={page.id}
								key={page.id}
								onClick={HandleItemClick}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								{page.text}
							</Button>
						))}
					</Box>
					{userInfo && Object.keys(userInfo).length ? (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar {...stringAvatar(userInfo.name)} />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right"
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right"
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) => (
									<MenuItem
										data-key={setting.id}
										key={setting.id}
										onClick={handleCloseUserMenu}
									>
										<Typography
											data-key={setting.id}
											key={setting.id}
											textAlign="center"
											onClick={HandleItemClick}
										>
											{setting.text}
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					) : (
						<>
							<Box mx=".5rem">
								<NoRefLink
									text={getText("signIn")}
									onClick={handleLogin}
									sx={{
										fontFamily: "Roboto",
										fontWeight: 500,
										fontSize: "large",
										color: "inherit"
									}}
								/>
							</Box>
							<Box mx=".5rem">
								<NoRefLink
									text={getText("signUp")}
									onClick={handleRegister}
									sx={{
										fontFamily: "Roboto",
										fontWeight: 500,
										fontSize: "large",
										color: "inherit"
									}}
								/>
							</Box>
						</>
					)}
				</Toolbar>
			</Container>
			<HLine/>
		</AppBar>
	);
}
export default ResponsiveAppBar;
