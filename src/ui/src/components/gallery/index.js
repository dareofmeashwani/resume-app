import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
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
								maxWidth: "calc(100vh - 64px)",
								maxHeight: "calc(100vh - 64px)",
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
					<ImageList
						sx={{
							flexWrap: "nowrap",
							// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
							transform: "translateZ(0)",

							// Hide Scrollbar
							"-ms-overflow-style": "none" /* IE and Edge */,
							"scrollbar-width": "none" /* Firefox */,
							"&::-webkit-scrollbar": {
								/* Chrome */ display: "none"
							}
						}}
						rowHeight={200}
						gap={5}
						cols={5}
					>
						{imagesData.map((item, index) => (
							<ImageListItem
								key={index}
								style={{ cursor: "pointer" }}
								onClick={onImageOpen}
								data-key={item.img}
							>
								<img
									src={item.thumbnail}
									alt={item.img}
									loading="lazy"
									data-key={item.img}
								/>
							</ImageListItem>
						))}
					</ImageList>
				) : null}
			</Box>
		</>
	);
};

export default Gallery;
