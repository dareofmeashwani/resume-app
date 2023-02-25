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
						<span style={{ fontSize: "30px"}}>Hello World!</span>
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
							<div style={{ fontSize: "30px", textAlign: "center" }}>
								I have done B.Tech. from UPTU and M.Tech. from IIT Kharagpur in
								Computer Science
							</div>
						</Box>
						<Box>
							<div style={{ fontSize: "30px", textAlign: "center" }}>
								Since 2018, I am working with SAP
							</div>
						</Box>
					</Animator>
				</ScrollPage>
			</ScrollContainer>
		</>
	);
};

export default AboutMe;
