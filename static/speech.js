var recognition = new webkitSpeechRecognition();

recognition.lang = "en-US";
recognition.continuous = false;
recognition.interimResults = true;

var listening = false;

function startClicked() {
    if (listening == false) {
        listening = true;
        recognition.start();
        document.getElementById("startstop").innerText = "Stop";

        document.getElementById("response").innerHTML = "";
        document.getElementById("status").innerHTML = "Listening...";

        recognition.onresult = function (event) {
            var interim_transcript = "";
            var final_transcript = "";

            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                    listening = false;
                    document.getElementById("startstop").innerText = "Start";
                    document.getElementById("status").innerHTML = "Stopped";
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }

            document.getElementById("response").innerHTML =
                final_transcript + interim_transcript;
            console.log(final_transcript + interim_transcript);
        };
    } else {
        listening = false;
        document.getElementById("startstop").innerText = "Start";
        recognition.abort();
        document.getElementById("status").innerHTML = "Stopped";
    }
}
