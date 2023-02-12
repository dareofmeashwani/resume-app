import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { getDownloadList } from "../../store/actions/downloadsActions";
import { useDispatch, useSelector } from "react-redux";
const Downloads = (props) => {
	const dispatch = useDispatch();
	const downloadsData = useSelector((state) => {
		return state.downloadsData.data;
	});
	React.useEffect(() => {
		if (!downloadsData) {
			dispatch(getDownloadList());
		}
	}, [dispatch, downloadsData]);
	const transformLink = (link, index) => {
		const lastIndex = link.lastIndexOf("/");
		const filename = decodeURI(link.slice(lastIndex + 1));
		return (
			<Box key={index + ""}>
				{index + 1 + ": "}
				<Link color="inherit" href={link} target="_blank" rel="noopener noreferrer">
					{filename}
				</Link>
			</Box>
		);
	};
	return (
		<Box
			sx={{
				marginLeft: "15%",
				marginRight: "15%",
				marginTop: "5%",
				marginBottom: "5%",
				alignContent: "left",
				textAlign: "left"
			}}
		>
			{downloadsData ? downloadsData.map(transformLink) : null}
		</Box>
	);
};

export default Downloads;
