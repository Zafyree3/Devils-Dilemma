document.addEventListener("DOMContentLoaded", () => {
	const newCard = document.getElementById("new-question-card");

	newCard.addEventListener("click", () => {
		// hide the response cards
		// bring down the questions card
		// update the question card with a new question
		// bring back the position
		// show the response cards

		hideCard();

		const questionCard = document.getElementById("question-card");

		var timeline = anime.timeline({
			easing: "easeOutExpo",
			duration: 1000,
		});

		const qoffset = questionCard.getBoundingClientRect().y;
		const qh = questionCard.getBoundingClientRect().height;
		const noffset = newCard.getBoundingClientRect().y;

		console.log(noffset);

		const diff = (qoffset - noffset) / 16;

		timeline.add({
			targets: questionCard,
			translateY: +window.innerHeight,
			complete: () => {
				console.log("question card down");
			},
		});

		timeline.add({
			targets: newCard,
			translateY: [
				newCard.dataset.translatey,
				parseInt(newCard.dataset.translatey) + diff,
			],
			complete: () => {
				console.log(newCard.getBoundingClientRect().y);

				const questionCardText = document.getElementById("question-text");
				const newCardText = document.getElementById("new-question-text");

				questionCardText.innerText = newCardText.innerText;

				questionCard.style.transform = `translateY(${0}px)`;

				anime({
					targets: newCard,
					translateY: [
						parseInt(newCard.dataset.translatey) - 1,
						parseInt(newCard.dataset.translatey),
					],
					duration: 1000,
				});

				setTimeout(() => {
					peekCard();

					localStorage.setItem("current-uuid", newCardText.dataset.uuid);

					loadQuestion();
					loadNewQuestion();
					updateNavBar();
				}, 300);
			},
		});
	});
});
