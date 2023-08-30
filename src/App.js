import "./App.css";
import TaskForm from "./TaskForm";
import Task from "./Task";
import { useEffect, useState } from "react";

function App() {
	const [tasks, setTasks] = useState([]);
	useEffect(() => {
		if (tasks.length === 0) return;
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);
	useEffect(() => {
		const tasks = JSON.parse(localStorage.getItem("tasks"));
		if (tasks) setTasks(tasks);
	}, []);
	function addTask(name) {
		setTasks((prev) => {
			return [...prev, { name: name, done: false }];
		});
	}
	function updateComplete(index, done) {
		const copyTasks = [...tasks];
		copyTasks[index].done = done;
		setTasks(copyTasks);
	}
	function removeTask(index) {
		const copyTasks = (tasks) => {
			return tasks.filter((_, taskindex) => index !== taskindex);
		};
		setTasks(copyTasks);
	}
	function renameTask(name, index) {
		const copyTasks = [...tasks];
		copyTasks[index].name = name;
		setTasks(copyTasks);
	}
	return (
		<main>
			<TaskForm onAdd={addTask} />
			{tasks.map((task, index) => (
				<Task
					{...task}
					onToggle={(done) => updateComplete(index, done)}
					onTrash={() => removeTask(index)}
					onRename={(name) => renameTask(name, index)}
				/>
			))}
		</main>
	);
}

export default App;
