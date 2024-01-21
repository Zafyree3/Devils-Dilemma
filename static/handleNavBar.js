function openNav() {
	// document.getElementById("mySidenav").style.width = "250px";
	// document.getElementById("mySidenav").classList.add("p-3");
	const sideBar = document.getElementById("mySidenav");
	sideBar.style.transform = "translateX(0%)";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
	// document.getElementById("mySidenav").style.width = "0";
	// document.getElementById("mySidenav").classList.remove("p-3");
	const sideBar = document.getElementById("mySidenav");
	sideBar.style.transform = "translateX(-100%)";
}

function clickNavButton(uuid) {
	if (uuid === localStorage.getItem("current-uuid")) {
		return;
	}

	const callback = (status, data) => {
		closeNav();

		const angelText = document.getElementById("angel-text");
		const devilText = document.getElementById("devil-text");
		const newText = document.getElementById("new-question-text");

		angelText.innerText = data[3];
		devilText.innerText = data[2];
		newText.innerText = data[1];

		var timeline = anime.timeline({
			easing: "easeOutExpo",
			duration: 1000,
		});

		const questionCard = document.getElementById("question-card");
		const newCard = document.getElementById("new-question-card");

		const qoffset = questionCard.getBoundingClientRect().y;
		const noffset = newCard.getBoundingClientRect().y;

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

					localStorage.setItem("current-uuid", uuid);

					loadQuestion();
					loadNewQuestion();
					updateNavBar();
				}, 300);
			},
		});
	};

	hideCard();
	const newCard = document.getElementById("new-question-card");
	newCard.dataset.uuid = uuid;
	fetchMethod(currentUrl + "/api/db/question/" + uuid, callback, "GET");
}
