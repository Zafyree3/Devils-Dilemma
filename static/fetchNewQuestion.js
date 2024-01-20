document.addEventListener("DOMContentLoaded", () => {
	const callback = (response, data) => {
		const newQuestionText = document.getElementById("new-question-text");

		let currentUUID = localStorage.getItem("current-uuid");

		let currIndex = data.findIndex((element) => {
			console.log(element[1]);
			console.log(currentUUID);
			return element[1] === currentUUID;
		});

		let newIndex = (currIndex + data.length - 1) % data.length;

		console.log(currIndex);
		console.log(newIndex);

		let newQuestion = data[newIndex][0];

		console.log(newQuestion);

		newQuestionText.dataset.uuid = data[newIndex][1];

		newQuestionText.innerHTML = newQuestion;
	};

	fetchMethod(currentUrl + "/api/db/question/question", callback, "GET", null);
});

function loadNewQuestion() {
	const callback = (response, data) => {
		const newQuestionText = document.getElementById("new-question-text");

		let currentUUID = localStorage.getItem("current-uuid");

		let currIndex = data.findIndex((element) => {
			console.log(element[1]);
			console.log(currentUUID);
			return element[1] === currentUUID;
		});

		let newIndex = (currIndex + data.length - 1) % data.length;

		console.log(currIndex);
		console.log(newIndex);

		let newQuestion = data[newIndex][0];

		console.log(newQuestion);

		newQuestionText.dataset.uuid = data[newIndex][1];

		newQuestionText.innerHTML = newQuestion;
	};

	fetchMethod(currentUrl + "/api/db/question/question", callback, "GET", null);
}
