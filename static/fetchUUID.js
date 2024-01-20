document.addEventListener("DOMContentLoaded", () => {
	const callback = (status, data) => {
		localStorage.setItem("uuid", data);
		if (localStorage.getItem("current-uuid") === null) {
			localStorage.setItem("current-uuid", data[data.length - 1]);
		}
	};
	fetchMethod(currentUrl + "/api/db/question", callback, "GET");
});
