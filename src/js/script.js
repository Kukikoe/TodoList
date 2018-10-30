let addBtn = document.getElementById("add-btn");
let addTask = document.getElementById("add-task");
let boolValClick = false;
addBtn.addEventListener("click", getBlockAddTask);

function getBlockAddTask() {
	if (boolValClick) {
		addTask.classList.remove("active");
		boolValClick = false;
	}
	else {
		addTask.classList.add("active");
		boolValClick = true;
	}
}
