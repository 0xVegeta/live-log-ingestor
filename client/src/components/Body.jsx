import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Body() {
	const [logs, setLogs] = useState([]);
	console.log("check1======", logs);
	let socket;

	useEffect(() => {
		socket = io("http://localhost:5000");
		socket.emit("setup");
		socket.on("log", (data) => {
			setLogs((prevLogs) => [...prevLogs, data]);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	const handleClearLogs = () => {
		setLogs([]);
	};

	return (
		<div className="max-w-3xl mx-auto text-gray-700 py-6 ">
			<h1 className="text-center font-bold text-2xl pb-3 uppercase">
				Yenmo Live Logs
			</h1>
			<div className="leading-8 font-semibold text-lg p-6  bg-gray-800 text-green-500 rounded-xs">
				{logs.map((log, index) => (
					<p key={index}>{log}</p>
				))}
			</div>
			<button
				className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={handleClearLogs}
			>
				Clear Logs
			</button>
		</div>
	);
}

export default Body;
