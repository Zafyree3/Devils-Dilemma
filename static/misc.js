document.addEventListener("DOMContentLoaded", () => {
	const cardContainer = document.getElementById("cards-container");

	function resetHeight() {
		// reset the body height to that of the inner browser
		// document.body.style.height = window.innerHeight + "px";
		// document.body.style.marginTop = "auto";
	}
	// reset the height whenever the window's resized
	window.addEventListener("resize", resetHeight);
	// called to initially set the height.
	resetHeight();

	cardContainer.addEventListener("scroll", () => {});
});
