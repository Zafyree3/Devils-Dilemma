var recognition = new webkitSpeechRecognition();

recognition.lang = "en-US";
recognition.continuous = false; // continous == true will turn off autostop
recognition.interimResults = true;

document.addEventListener("DOMContentLoaded", () => {
	const speechButton = document.getElementById("speech-button");

	speechButton.style.backgroundColor = "red";

	speechButton.addEventListener("click", () => {
		speechButton.dataset.listening =
			speechButton.dataset.listening === "true" ? "false" : "true";
		if (speechButton.dataset.listening === "true") {
			hideCard();
			startRecording();
		} else {
			recognition.abort();
			speechButton.style.backgroundColor = "red";
		}
	});

	recognition.addEventListener("end", () => {
		speechButton.dataset.listening = "false";
		speechButton.style.backgroundColor = "red";
		loadSpeechData();
	});

	function startRecording() {
		recognition.start();
		speechButton.style.backgroundColor = "green";

		const questionText = document.getElementById("question-text");
		questionText.innerText = "...";

		recognition.onresult = function (event) {
			var interim_transcript = "";
			var final_transcript = "";

			for (var i = event.resultIndex; i < event.results.length; ++i) {
				if (event.results[i].isFinal) {
					final_transcript += event.results[i][0].transcript;
				} else {
					interim_transcript += event.results[i][0].transcript;
				}
			}

			questionText.innerText = final_transcript + interim_transcript;
		};
	}
});

function loadSpeechData() {
	const questionText = document.getElementById("question-text");
	const question = questionText.innerText;
	const questionLoading = document.getElementById("question-loading");

	questionLoading.style.display = "flex";
	const angelText = document.getElementById("angel-text");
	const devilText = document.getElementById("devil-text");

	angelText.innerText = "";
	devilText.innerText = "";

	const angelCallback = (request, data) => {
		console.log(data);

		angelText.innerText = data["answer"];

		if (angelText.innerText !== "" && devilText.innerText !== "") {
			questionLoading.style.display = "none";

			peekCard();

			saveData();
		}
	};

	const devilCallback = (request, data) => {
		console.log(data);

		devilText.innerText = data["answer"];

		if (angelText.innerText !== "" && devilText.innerText !== "") {
			questionLoading.style.display = "none";

			peekCard();

			saveData();
		}
	};

	fetchMethod(currentUrl + "/api/llm/devil/question", devilCallback, "POST", {
		question: question,
	});

	fetchMethod(currentUrl + "/api/llm/angel/question", angelCallback, "POST", {
		question: question,
	});
}

function saveData() {
	const questionText = document.getElementById("question-text");
	const angelText = document.getElementById("angel-text");
	const devilText = document.getElementById("devil-text");

	const callback = (request, data) => {
		console.log(data);
		localStorage.setItem("current-uuid", data["uuid"]);
		updateNavBar();
	};

	fetchMethod(currentUrl + "/api/db/question", callback, "POST", {
		question: questionText.innerText,
		angelans: angelText.innerText,
		devilans: devilText.innerText,
	});
}
