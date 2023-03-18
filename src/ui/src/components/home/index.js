import React from "react";
import Box from "@mui/material/Box";
import {
	Animator,
	ScrollContainer,
	ScrollPage,
	batch,
	Fade,
	FadeIn,
	Move,
	MoveOut,
	Sticky,
	StickyIn,
	ZoomIn
} from "react-scroll-motion";
import Header from "./Header";
const AboutMe = () => {
	const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
	const FadeUp = batch(Fade(), Move(), Sticky());
	return (
		<>
			<ScrollContainer>
				<ScrollPage>
					<Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
					<Header />
					<Box
							style={{
								display: "flex",
								fontSize: "30px",
								justifyContent: "center",
								alignItems: "center"
							}}
						>
						<span style={{ fontSize: "30px", whiteSpace: "break-spaces" }}>Hello World! </span>
						</Box>
					</Animator>
				</ScrollPage>
				<ScrollPage>
					<Animator animation={ZoomInScrollOut}>
						<span style={{ fontSize: "40px" }}> I am Ashwani 😀</span>
					</Animator>
				</ScrollPage>
				<ScrollPage>
					<Animator animation={FadeUp}>
						<span style={{ fontSize: "40px" }}>A Full Stack developer ✨</span>
					</Animator>
				</ScrollPage>
				<ScrollPage>
					<Animator animation={FadeUp}>
						<Box
							style={{
								display: "flex",
								fontSize: "40px",
								justifyContent: "center",
								alignItems: "center"
							}}
						>
							A Senior Software Engineer ✨
						</Box>
					</Animator>
				</ScrollPage>
				<ScrollPage>
					<Animator animation={batch(Fade(), Sticky())}>
						<Box>
							<div style={{ fontSize: "30px", textAlign: "center" }}>
								I have done B.Tech. from UPTU and M.Tech. from IIT Kharagpur in
								Computer Science
							</div>
						</Box>
						<Box>
							<div style={{ fontSize: "30px", textAlign: "center" }}>
								Since 2018, I am working with SAP Labs Bangalore
							</div>
						</Box>
					</Animator>
				</ScrollPage>
			</ScrollContainer>
		</>
	);
};

export default AboutMe;
