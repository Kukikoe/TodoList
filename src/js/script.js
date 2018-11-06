const addBtn = document.getElementById("add-btn");
const addTask = document.getElementById("add-task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.querySelector(".add-task-input");
const todoList = document.getElementById("todo-list");
const deleteBtn = document.querySelectorAll(".icon-delete");

function init(){
	let db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
	db.transaction(function (tx) {   
		//tx.executeSql('DROP TABLE Todos');
		tx.executeSql('CREATE TABLE IF NOT EXISTS Todos (id unique, title, checked)');   
		//
	});
	return db;
}

let db = init();
let arrayTodos = [];
db.transaction(function (tx) {   
	tx.executeSql('SELECT * FROM Todos', [], function(sqlTransaction, sqlResultSet) {
		let todo;
		for(var i = 0; i < sqlResultSet.rows.length; i++) {
			var row = sqlResultSet.rows.item(i);
			todo = {
				id: row['id'],
				title: row['title'],
				checked: row['checked']
			};
			arrayTodos = arrayTodos.concat(todo);
		}
		renderTodo(arrayTodos, todoList);
	});
});

addBtn.addEventListener("click", () => addTask.classList.toggle("active"));
addTaskBtn.addEventListener("click", () => {
	if (taskInput.value === "") return;

	arrayTodos = addTodo(getId(arrayTodos), taskInput.value, arrayTodos);
	let title = taskInput.value;

	db.transaction(function(tx) {   
		tx.executeSql('INSERT INTO Todos (id, title, checked) VALUES (?, ?, ?)', [getId(arrayTodos), title, false]);
	});

	renderTodo([arrayTodos[arrayTodos.length - 1]], todoList);
	taskInput.value = "";
});

todoList.addEventListener("click", (event) => {
	let target = event.target;
	let todo = target.closest('.todo');

	if (target.closest('.delete')) {
		let arrayToDelete = deleteTodo(todo.dataset.id, arrayTodos);

		db.transaction(function(tx) {   
			tx.executeSql('DELETE FROM Todos where id=?', [arrayToDelete[0].id]);
		});

		todoList.removeChild(todo);	
	}
	if (target.closest('.todo__checkbox') && target.tagName !== "INPUT") {
		let array = toggleTodo(todo.dataset.id, arrayTodos);

		db.transaction(function(tx) {   
			tx.executeSql('UPDATE Todos set checked=? where id=?', [array[0].checked, array[0].id]);
		});

		todo.classList.toggle("completed");
	}
});

function renderTodo(array, elem) {
	let template = document.querySelector("#todo-template").children[0];

	for (let i = 0; i < array.length; i++) {
		let cln = template.cloneNode(true);
		cln.querySelector(".todo__title").innerHTML = array[i].title;
		cln.querySelector(".todo__checkbox-input").checked = JSON.parse(array[i].checked);

		if (JSON.parse(array[i].checked)) {
			cln.classList.add("completed");
		}
		cln.setAttribute("id", "todo-" + array[i].id);
		cln.setAttribute("data-id", array[i].id);
		elem.appendChild(cln);
	}
}

