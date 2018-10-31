const addBtn = document.getElementById("add-btn");
const addTask = document.getElementById("add-task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.querySelector(".add-task-input");
const todoList = document.getElementById("todo-list");
const deleteBtn = document.querySelectorAll(".icon-delete");

let arrayTodos = JSON.parse(localStorage.getItem("ArrayTodos")) || [];
let _id = 0;

renderTodo(arrayTodos, todoList);

addBtn.addEventListener("click", () => addTask.classList.toggle("active"));
addTaskBtn.addEventListener("click", () => {
	let todo = addTodo(taskInput.value, arrayTodos);
	renderTodo([todo], todoList);
	taskInput.value = "";
});

todoList.addEventListener("click", (event) => {
	let target = event.target;
	let todo = target.closest('.todo');

	if (target.closest('.icon-delete')) {
		deleteTodo(todo);
	}
	if (target.closest('.todo__checkbox') && target.tagName !== "INPUT") {
		toggleTodo(todo);
	}
});

function toggleTodo(elem) {
	elem.classList.toggle("completed");
	arrayTodos = arrayTodos.map((todo) => {
		if (+elem.dataset.id == todo.id) {
			todo.checked = !todo.checked;
		}
		return todo;
	});
	localStorage.setItem("ArrayTodos", JSON.stringify(arrayTodos));
}

function deleteTodo(elem) {
	arrayTodos = arrayTodos.filter((todo) => todo.id !== parseInt(elem.dataset.id));
	localStorage.setItem("ArrayTodos", JSON.stringify(arrayTodos));
	todoList.removeChild(elem);	
}

function getId() {
	if (arrayTodos.length) {
		_id = +arrayTodos[arrayTodos.length-1].id;
	}
	return ++_id;
}

function addTodo(title, arrayTodos) {
	let todo = {
		title: title,
		checked: false,
		id: getId()
	};
	arrayTodos.push(todo);
	
	localStorage.setItem("ArrayTodos", JSON.stringify(arrayTodos));
	return todo;
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