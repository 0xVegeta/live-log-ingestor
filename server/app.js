const express = require("express");
const http = require("http");
const fs = require("fs");
const tail = require("tail");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

const io = require("socket.io")(server, {
	pingTimeout: 60000,
	cors: {
		origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
	},
});

const logFilePath = "./server/logs/website.log";

io.on("connection", (socket) => {
	console.log("connected to socket.io");
	socket.on("setup", () => {
		socket.emit("connected");
	});

	const tailStream = new tail.Tail(logFilePath, {
		fromBeginning: false,
		nLines: 10,
	});

	tailStream.on("error", console.error);
	tailStream.on("line", (data) => {
		socket.emit("log", data);
	});
});
