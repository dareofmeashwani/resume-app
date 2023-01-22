const particlesOptions = {
	particles: {
		number: { value: 200, density: { enable: true, value_area: 800 } },
		color: { value: "#ffffff", opacity: 0.15 },
		shape: {
			type: "circle",
			stroke: { width: 0, color: "#000000" },
		},
		opacity: {
			value: 0.1,
			random: true,
			anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
		},
		size: {
			value: 3,
			random: true,
			anim: { enable: false, speed: 30, size_min: 0.1, sync: false }
		},
		line_linked: {
			enable: true,
			distance: 100,
			color: "#ffffff",
			opacity: 0.14,
			width: 1
		},
		move: {
			enable: true,
			speed: .5,
			direction: "none",
			random: true,
			straight: false,
			out_mode: "out",
			bounce: false,
			attract: { enable: false, rotateX: 600, rotateY: 1200 }
		}
	},
	retina_detect: true
};

export default particlesOptions;
