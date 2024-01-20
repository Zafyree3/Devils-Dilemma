/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./templates/*"],
	theme: {
		extend: {
			colors: {
				text: "#ffffff",
				background: "#2E2836",
				angel: "#77A3CF",
				devil: "E06767",
				human: "C9E949",
			},
		},
	},
	plugins: [require("daisyui")],
};
