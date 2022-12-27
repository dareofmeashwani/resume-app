import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HLine from "./HLine";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
	height: "100%",
	backgroundColor:
		theme.palette.mode === "light" ? grey[100] : theme.palette.background.default
}));

const StyledBox = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800]
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: "flex-start",
	color: "inherit"
}));

function SwipeableEdgeDrawer(props) {
	const { window } = props;
	const container =
		window !== undefined ? () => window().document.body : undefined;
	let [state, setState] = React.useState({
		open: false,
		Content: null,
		title: "",
		contentProps: {}
	});
	const toggleDrawer = () => () => {
		setState({
			open: false,
			Content: null,
			title: "",
			contentProps: {}
		});
	};
	React.useEffect(() => {
		setState({
			open: props.initial.open,
			Content: props.initial.content,
			title: props.initial.title,
			contentProps: props.initial.contentProps
		});
	}, [props.initial]);
	return (
		<Root>
			<CssBaseline />
			<Global
				styles={{
					".MuiDrawer-root > .MuiPaper-root": {
						width: `calc(50% - ${drawerBleeding}px)`,
						height: "100%",
						overflow: "visible"
					}
				}}
			/>
			<SwipeableDrawer
				container={container}
				anchor="right"
				open={state.open}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
				swipeAreaWidth={drawerBleeding}
				disableSwipeToOpen={true}
			>
				<DrawerHeader>
					<IconButton onClick={toggleDrawer(false)}>
						<ChevronRightIcon />
					</IconButton>
					{state.title ? (
						<Box display="flex" justifyContent="center" alignItems="center">
							{state.title}
						</Box>
					) : null}
				</DrawerHeader>
				<HLine />
				<StyledBox
					sx={{
						margin: 2,
						height: "100%",
						overflow: "auto"
					}}
				>
					{state.Content && <state.Content {...state.contentProps} />}
				</StyledBox>
			</SwipeableDrawer>
		</Root>
	);
}

SwipeableEdgeDrawer.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func
};

export default SwipeableEdgeDrawer;
