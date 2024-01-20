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
		peekCard();
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
