/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./templates/*"],
	theme: {
		extend: {
			colors: {
				background: "#FFD7D7",
				angel: "#9FC5FF",
				devil: "#FF8A8A",
			},
		},
	},
	plugins: [require("daisyui")],
};
