import React from "react";

import {
	Animator,
	ScrollContainer,
	ScrollPage,
	batch,
	Fade,
	FadeIn,
	FadeOut,
	Move,
	MoveIn,
	MoveOut,
	Sticky,
	StickyIn,
	ZoomIn,
} from "react-scroll-motion";
const AboutMe = (props) => {
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
				<Animator animation={FadeOut}>
					<span style={{ fontSize: "40px", justifyContent: "center" }}>
						A Senior Software Engineer ✨
					</span>
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
						<Animator animation={MoveOut(-1000, -1000)}>Javascript</Animator>
						<Animator animation={MoveOut(1000, -1000)}>Rest Api</Animator>
						<Animator animation={MoveIn(-1000, 1000)}>Python</Animator>
						<Animator animation={MoveIn(1000, -1000)}>NodeJs</Animator>
						<Animator animation={MoveIn(-1000, -1000)}>Docker</Animator>
						<Animator animation={MoveIn(1000, 1000)}>Micro Services</Animator>
						<Animator animation={MoveOut(1000, 1000)}>Typescript</Animator>
						<Animator animation={MoveOut(-1000, 1000)}>Kubernetes</Animator>
						<Animator animation={MoveOut(0, 1000)}>MySQL</Animator>
						<Animator animation={MoveOut(1000, 0)}>MongoDb</Animator>
						<Animator animation={MoveIn(-1000, 0)}>ReactJs</Animator>
						<Animator animation={MoveIn(0, -1000)}>Git</Animator>
					</span>
				</div>
			</ScrollPage>
			<ScrollPage>
				<Animator animation={batch(Fade(), Sticky())}>
					<span style={{ fontSize: "30px" }}>
						I have done B.Tech from UPTU & M.Tech from IIT Kharagpur in Computer
						Science.
					</span>
				</Animator>
			</ScrollPage>
		</ScrollContainer>
	);
};

export default AboutMe;
