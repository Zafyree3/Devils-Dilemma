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

	const questionCard = document.getElementById("question-card");

	cards.forEach((card) => {
		if (card.id === "devil-card") {
			const rot = card.dataset.rotate;

			const x = screen.width;
			const tx = (x * 0.8) / 16;

			card.dataset.translatex = tx;

			let h =
				card.getBoundingClientRect().width * Math.sin(rot * (Math.PI / 180));
			h = Math.abs(h / 32);

			card.dataset.translatey = -h;

			card.style.transform = `translateX(${tx}rem) translateY(${-h}rem) rotate(${rot}deg)`;
		}

		if (card.id === "angel-card") {
			const rot = card.dataset.rotate;

			const x = screen.width;
			const tx = (x * -0.8) / 16;

			card.dataset.translatex = tx;

			let h =
				card.getBoundingClientRect().width * Math.sin(rot * (Math.PI / 180));
			h = Math.abs(h / 32);

			card.dataset.translatey = -h;

			card.style.transform = `translateX(${tx}rem) translateY(${-h}rem) rotate(${rot}deg)`;
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
				if (card.classList.contains("animating")) {
					return;
				}
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
								duration: 850,
								easing: "easeOutElastic(1, .6)",
								begin: () => {
									console.log("show begin");
									card.classList.add("animating");
									card.removeEventListener("click", () => {});
									observer.disconnect();
								},
								complete: () => {
									console.log("show end");
									//card.style.filter = "brightness(0.5)";
									card.classList.remove("animating");
									setTimeout(() => {
										//card.style.filter = "none";

										observer.observe(card, { attributes: true });
										console.log("observer reconnected");
										card.addEventListener("click", () => {});
									}, 850);
								},
							});
						} else if (card.dataset.showing === "false") {
							anime({
								targets: card,
								translateX: card.dataset["translatex"],
								translateY: card.dataset["translatey"],
								rotate: card.dataset["rotate"],
								duration: 850,
								begin: () => {
									card.removeEventListener("click", () => {});
									observer.disconnect();
									card.classList.add("animating");
								},
								complete: () => {
									console.log("show end");
									//card.style.filter = "brightness(0.5)";
									card.classList.remove("animating");
									setTimeout(() => {
										//card.style.filter = "none";
										observer.observe(card, { attributes: true });
										card.addEventListener("click", () => {});
										console.log("observer reconnected");
									}, 850);
								},
							});
						} else {
							anime({
								targets: card,
								translateX: parseInt(card.dataset["translatex"]) * 1.2,
								translateY: card.dataset["translatey"],
								rotate: card.dataset["rotate"],
								duration: 850,
								begin: () => {
									observer.disconnect();
									card.removeEventListener("click", () => {});
									card.classList.add("animating");
								},
								complete: () => {
									console.log("show end");
									//card.style.filter = "brightness(0.5)";
									card.classList.remove("animating");
									setTimeout(() => {
										//card.style.filter = "none";
										observer.observe(card, { attributes: true });
										console.log("observer reconnected");

										card.addEventListener("click", () => {});
									}, 850);
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
