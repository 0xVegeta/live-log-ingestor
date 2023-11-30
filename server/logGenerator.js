const fs = require("fs");

const logFilePath = "./logs/website.log";

function getRandomNumber() {
	return Math.floor(Math.random() * 1000);
}

function appendRandomNumberToLog() {
	const randomNumber = getRandomNumber();
	const logMessage = `Log entry: ${randomNumber}\n`;

	fs.appendFile(logFilePath, logMessage, (err) => {
		if (err) {
			console.error("Error appending to log file:", err);
		} else {
			console.log("Random number appended to log file:", randomNumber);
		}
	});
}

// Run the log generation
appendRandomNumberToLog();
