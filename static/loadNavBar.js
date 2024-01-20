document.addEventListener("DOMContentLoaded", () => {
	const questionList = document.getElementById("question-ul");

	const callback = (request, data) => {
		questionList.innerHTML = "";
		data.forEach((question) => {
			const li = document.createElement("li");
			li.classList.add("list-item");
			const button = document.createElement("button");
			button.classList.add("w-full", "block", "text-white");

			if (question[1] == localStorage.getItem("current-uuid")) {
				console.log("here");
				button.classList.add("active");
				5;
			}
			button.dataset.uuid = question[1];
			button.innerText = question[0];
			li.appendChild(button);
			questionList.appendChild(li);
		});
	};

	fetchMethod(currentUrl + "/api/db/question/question", callback, "GET");
});

function updateNavBar() {
	const questionList = document.getElementById("question-ul");

	const callback = (request, data) => {
		questionList.innerHTML = "";
		data.forEach((question) => {
			const li = document.createElement("li");
			li.classList.add("list-item");
			const button = document.createElement("button");
			button.classList.add("w-full", "block", "text-white");

			if (question[1] == localStorage.getItem("current-uuid")) {
				console.log("here");
				button.classList.add("active");
				5;
			}
			button.dataset.uuid = question[1];
			button.innerText = question[0];
			button.addEventListener("click", () => {
				console.log("clicked");
				clickNavButton(question[1]);
			});
			li.appendChild(button);
			questionList.appendChild(li);
		});
	};

	fetchMethod(currentUrl + "/api/db/question/question", callback, "GET");
}
