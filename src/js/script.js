const addBtn = document.getElementById("add-btn");
const addTask = document.getElementById("add-task");
const addTaskBtn = document.getElementById("add-task-btn");

//const deleteTodoBtn = document.querySelector("icon-delete");
let taskInput = document.querySelector(".add-task-input");


let newTodo;
let arr = [];
let boolValClick = false;

addBtn.addEventListener("click", getBlockAddTask);
addTaskBtn.addEventListener("click", function() {
	let arrayTodos = JSON.parse(localStorage.getItem("ArrayTodos"));
	console.log(arrayTodos.length)
	let shit = document.querySelector("#todo-template").children[0];
	let cln = shit.cloneNode(true);
	addTaskInList(cln);
});

/*deleteTodoBtn.addEventListener("click", deleteTodo);

function deleteTodo() {
	console.log("hef")
}
*/
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

function addTaskInList(cln) {
	cln.querySelector(".todo__title").innerHTML = taskInput.value;
	arr.push(cln.querySelector(".todo__title").innerHTML);
	document.getElementById("todo-list").appendChild(cln);
	localStorage.setItem("ArrayTodos",  JSON.stringify(arr));
}	
