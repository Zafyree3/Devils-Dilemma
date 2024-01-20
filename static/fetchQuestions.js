document.addEventListener("DOMContentLoaded", () => {
	const callback = (status, data) => {
		const angelText = document.getElementById("angel-text");
		const devilText = document.getElementById("devil-text");
		const questionText = document.getElementById("question-text");

		angelText.innerText = data[3];
		devilText.innerText = data[2];
		questionText.innerText = data[1];
	};

	const currentuuid = localStorage.getItem("current-uuid");

	fetchMethod(currentUrl + "/api/db/question/" + currentuuid, callback, "GET");
});

function loadQuestion() {
	const callback = (status, data) => {
		const angelText = document.getElementById("angel-text");
		const devilText = document.getElementById("devil-text");
		const questionText = document.getElementById("question-text");

		angelText.innerText = data[3];
		devilText.innerText = data[2];
		questionText.innerText = data[1];
	};

	const currentuuid = localStorage.getItem("current-uuid");

	fetchMethod(currentUrl + "/api/db/question/" + currentuuid, callback, "GET");
}
