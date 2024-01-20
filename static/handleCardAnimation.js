// import anime from "animejs/lib/anime.es.js";

function generateRandomNumber(min, max) {
	const int = Math.floor(Math.random() * (max - min) + min);

	const num = int + Math.random();
	return num;
}

document.addEventListener("DOMContentLoaded", () => {
	const cards = document.querySelectorAll(
		"#angel-card, #devil-card, #new-question-card"
	);

	cards.forEach((card) => {
		if (card.id === "devil-card") {
			const tx = card.dataset.translatex;
			const ty = card.dataset.translatey;
			const rot = card.dataset.rotate;
			card.style.transform = `translateX(${tx}rem) translateY(${ty}rem) rotate(${rot}deg)`;
		}

		if (card.id === "angel-card") {
			const tx = card.dataset.translatex;
			const ty = card.dataset.translatey;
			const rot = card.dataset.rotate;
			card.style.transform = `translateX(${tx}rem) translateY(${ty}rem) rotate(${rot}deg)`;
		}

		if (card.id === "new-question-card") {
			const ty = card.dataset.translatey;
			card.style.transform = `translateY(${ty}rem)`;
		}

		card.dataset.startx = card.getBoundingClientRect().x;
		card.dataset.starty = card.getBoundingClientRect().y;
		// card.dataset.startrot = card.getBoundingClientRect().rot;

		if (card.id === "angel-card" || card.id === "devil-card") {
			card.addEventListener("click", () => {
				card.dataset.showing =
					card.dataset.showing === "true" ? "false" : "true";

				const otherCards = document.querySelectorAll(
					".card:not(#" + card.id + ")"
				);
				otherCards.forEach((otherCard) => {
					otherCard.dataset.showing =
						card.dataset.showing === "true" ? "hide" : "false";
				});
			});

			var observer = new MutationObserver(function (mutations) {
				mutations.forEach(function (mutation) {
					if (mutation.type == "attributes") {
						if (card.dataset.showing === "true") {
							// reveal card
							anime({
								targets: card,
								translateX: generateRandomNumber(-1, 1),
								translateY: generateRandomNumber(-1, 1),
								rotate: generateRandomNumber(-1, 1),
								duration: 1000,
								easing: "easeOutElastic(1, .6)",
								begin: () => {
									console.log("show begin");
									card.removeEventListener("click", () => {});
									observer.disconnect();
								},
								complete: () => {
									console.log("show end");
									//card.style.filter = "brightness(0.5)";
									setTimeout(() => {
										//card.style.filter = "none";
										observer.observe(card, { attributes: true });
										console.log("observer reconnected");
										card.addEventListener("click", () => {});
									}, 1000);
								},
							});
						} else if (card.dataset.showing === "false") {
							anime({
								targets: card,
								translateX: card.dataset["translatex"],
								translateY: card.dataset["translatey"],
								rotate: card.dataset["rotate"],
								duration: 1000,
								begin: () => {
									card.removeEventListener("click", () => {});
									observer.disconnect();
								},
								complete: () => {
									console.log("show end");
									//card.style.filter = "brightness(0.5)";
									setTimeout(() => {
										//card.style.filter = "none";
										observer.observe(card, { attributes: true });
										card.addEventListener("click", () => {});
										console.log("observer reconnected");
									}, 1000);
								},
							});
						} else {
							anime({
								targets: card,
								translateX: parseInt(card.dataset["translatex"]) * 1.2,
								translateY: card.dataset["translatey"],
								rotate: card.dataset["rotate"],
								duration: 1000,
								begin: () => {
									observer.disconnect();
								},
								complete: () => {
									console.log("show end");
									card.style.filter = "brightness(0.5)";
									setTimeout(() => {
										card.style.filter = "none";
										observer.observe(card, { attributes: true });
										console.log("observer reconnected");
									}, 1000);
								},
							});
						}
					}
				});
			});

			observer.observe(card, { attributes: true });
		}
	});
});

function hideCard() {
	const cards = document.querySelectorAll("#angel-card, #devil-card");
	cards.forEach((card) => {
		card.dataset.showing = "hide";
	});
}

function peekCard() {
	const cards = document.querySelectorAll("#angel-card, #devil-card");
	cards.forEach((card) => {
		card.dataset.showing = "false";
	});
}
