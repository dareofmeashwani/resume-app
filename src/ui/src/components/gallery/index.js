import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Unstable_Grid2";
import CloseIcon from "@mui/icons-material/Close";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getImageList } from "../../store/actions/imagesActions";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

const Gallery = (props) => {
	const dispatch = useDispatch();
	const imagesData = useSelector((state) => {
		return state.imagesData.data;
	});

	React.useEffect(() => {
		if (!imagesData) {
			dispatch(getImageList());
		}
	});
	const [open, setOpen] = React.useState(false);
	const [src, setSrc] = React.useState("");
	const onCloseDialog = () => {
		setOpen(false);
	};
	const onImageOpen = (event) => {
		setSrc(event.target.getAttribute("data-key"));
		setOpen(true);
	};

	return (
		<>
			{open ? (
				<Dialog
					open={open}
					onClose={onCloseDialog}
					PaperProps={{
						style: {
							backgroundColor: "transparent",
							boxShadow: "none"
						}
					}}
				>
					<DialogTitle>
						<Box alignItems="end">
							<IconButton onClick={onCloseDialog}>
								<CloseIcon />
							</IconButton>
						</Box>
					</DialogTitle>
					<DialogContent onClick={onCloseDialog}>
						<img
							style={{
								width: "100%",
								height: "100%"
							}}
							src={src}
							alt={src}
						/>
					</DialogContent>
				</Dialog>
			) : null}

			<Box
				sx={{
					marginLeft: "20%",
					marginRight: "20%",
					marginTop: "5%",
					marginBottom: "5%",
					alignContent: "left",
					textAlign: "left"
				}}
			>
				{imagesData ? (
					<Grid
						container
					>
						{imagesData.map((item, index) => (
							<img
								key={index}
								style={{ cursor: "pointer", padding:".25rem" }}
								onClick={onImageOpen}
								src={item.thumbnail}
								alt={item.img}
								loading="lazy"
								data-key={item.img}
								height="200px"
								width="200px"
							/>
						))}
					</Grid>
				) : null}
			</Box>
		</>
	);
};

export default Gallery;
