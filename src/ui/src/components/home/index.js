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
	MoveIn,
	MoveOut,
	Sticky,
	StickyIn,
	ZoomIn
} from "react-scroll-motion";
const AboutMe = () => {
	const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
	const FadeUp = batch(Fade(), Move(), Sticky());
	return (
		<ScrollContainer>
			<ScrollPage>
				<Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
					<span style={{ fontSize: "30px" }}>Hello World!</span>
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
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						margin: "4rem"
					}}
				>
					<span style={{ fontSize: "30px" }}>
						<Animator animation={MoveIn(-1000, -1000)}>Javascript</Animator>
						<Animator animation={MoveIn(1000, -1000)}>NodeJs</Animator>
						<Animator animation={MoveIn(-1000, 1000)}>Typescript</Animator>
						<Animator animation={MoveIn(1000, -1000)}>ReactJs</Animator>
						<Animator animation={MoveIn(-1000, -1000)}>Python</Animator>
						<Animator animation={MoveIn(1000, 1000)}>Docker</Animator>
						<Animator animation={MoveOut(1000, 1000)}>Kubernetes</Animator>
						<Animator animation={MoveOut(0, 1000)}>MySQL</Animator>
						<Animator animation={MoveOut(1000, 0)}>MongoDb</Animator>
						<Animator animation={MoveOut(-1000, -1000)}>Rest Api</Animator>
						<Animator animation={MoveOut(-1000, 0)}>Micro-Services</Animator>
						<Animator animation={MoveOut(-1000, 1000)}>Git</Animator>
					</span>
				</div>
			</ScrollPage>
			<ScrollPage>
				<Animator animation={batch(Fade(), Sticky())}>
					<Box>
						<span style={{ fontSize: "30px" }}>
							I have done a B.Tech. from UPTU and an M.Tech. from IIT Kharagpur in Computer
							Science
						</span>
					</Box>
					<Box>
						<span style={{ fontSize: "30px" }}>
							Since 2018, I am working with SAP
						</span>
					</Box>
				</Animator>
			</ScrollPage>
		</ScrollContainer>
	);
};

export default AboutMe;
