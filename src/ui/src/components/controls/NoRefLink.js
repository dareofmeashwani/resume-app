import React from "react";
import Link from "@mui/material/Link";

const NoRefLink = (props) => {
	const clickHandler = props.onClick;
	const text = props.text;
	return (
		<Link
			component="button"
			underline="none"
			onClick={clickHandler}
			{...props}
		>
			{text}
		</Link>
	);
};

export default NoRefLink;
