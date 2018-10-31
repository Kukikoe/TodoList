const addBtn = document.getElementById("add-btn");
const addTask = document.getElementById("add-task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.querySelector(".add-task-input");
const todoList = document.getElementById("todo-list");
const deleteBtn = document.querySelectorAll(".icon-delete");

let arrayTodos = JSON.parse(localStorage.getItem("ArrayTodos")) || [];


renderTodo(arrayTodos, todoList);

addBtn.addEventListener("click", () => addTask.classList.toggle("active"));
addTaskBtn.addEventListener("click", () => {
	if (taskInput.value === "") return;
	arrayTodos = addTodo(getId(arrayTodos), taskInput.value, arrayTodos);
	saveTodosInLS(arrayTodos);
	renderTodo([arrayTodos[arrayTodos.length - 1]], todoList);
	taskInput.value = "";
});

todoList.addEventListener("click", (event) => {
	let target = event.target;
	let todo = target.closest('.todo');

	if (target.closest('.icon-delete')) {
		arrayTodos = deleteTodo(todo.dataset.id, arrayTodos);
		saveTodosInLS(arrayTodos);
		todoList.removeChild(todo);	
	}
	if (target.closest('.todo__checkbox') && target.tagName !== "INPUT") {
		arrayTodos = toggleTodo(todo.dataset.id, arrayTodos);
		saveTodosInLS(arrayTodos);
		todo.classList.toggle("completed");
	}
});

function saveTodosInLS(arrayTodos) {
	localStorage.setItem("ArrayTodos", JSON.stringify(arrayTodos));
}

function renderTodo(array, elem) {
	let template = document.querySelector("#todo-template").children[0];

	for (let i = 0; i < array.length; i++) {
		let cln = template.cloneNode(true);
		cln.querySelector(".todo__title").innerHTML = array[i].title;
		cln.querySelector(".todo__checkbox-input").checked = array[i].checked;
		if (array[i].checked) {
			cln.classList.add("completed");
		}
		cln.setAttribute("id", "todo-" + array[i].id);
		cln.setAttribute("data-id", array[i].id);
		elem.appendChild(cln);
	}
}

