document.addEventListener("DOMContentLoaded", () => {
	const mouseData = document.getElementById("mouse-pos");

	window.addEventListener("touchstart", (e) => {
		mouseData.dataset.x = e.touches[0].clientX;
		mouseData.dataset.y = e.touches[0].clientY;

		// console.log(e);
		if (e.target.id == "cards-container") {
			console.log("card-container");
			const cards = document.querySelectorAll("#devil-card, #angel-card");

			cards.forEach((card) => {
				if (card.dataset.showing === "true") {
					card.click();
				}
			});
		}
	});

	window.addEventListener("touchend", (e) => {
		let deltaX;

		deltaX = e.changedTouches[0].clientX - mouseData.dataset.x;
		deltaY = e.changedTouches[0].clientY - mouseData.dataset.y;

		if (deltaX < -100) {
			const devilCard = document.getElementById("devil-card");
			devilCard.click();
		} else if (deltaX > 100) {
			const angelCard = document.getElementById("angel-card");
			angelCard.click();
		} else if (deltaY > 100) {
			console.log("swipe down");
			const newCard = document.getElementById("new-question-card");
			newCard.click();
		}
	});

	window;
});
