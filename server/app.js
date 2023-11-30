const express = require("express");
const http = require("http");
const fs = require("fs");
const tail = require("tail");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const logFilePath = "./logs/website.log";

io.on("connection", (socket) => {
	const tailStream = new tail.Tail(logFilePath, {
		fromBeginning: false,
		nLines: 10,
	});

	tailStream.on("line", (data) => {
		socket.emit("log", data);
	});

	tailStream.on("error", console.error);
	tailStream.on("line", (data) => {
		socket.emit("log", data);
	});
});

// app.use(express.static("../client/build"));

// app.get("/", (req, res) => {
// 	res.sendFile("index.html", { root: "../client/build" });
// });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
