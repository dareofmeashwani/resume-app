import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import particlesConfig from "./particlesConfig";

const Particle = () => {
	const particlesInit = useCallback(async (engine) => {
		await loadFull(engine);
	}, []);
	return (
		<Particles id="tsparticles" init={particlesInit} options={particlesConfig} />
	);
};

export default Particle;
