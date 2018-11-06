const addBtn = document.getElementById("add-btn");
const addTask = document.getElementById("add-task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.querySelector(".add-task-input");
const todoList = document.getElementById("todo-list");

function init(){
	let db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
	db.transaction(function (tx) {   
		//tx.executeSql('DROP TABLE Todos');
		tx.executeSql('CREATE TABLE IF NOT EXISTS Todos (id unique, title, checked)');   
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
				checked: JSON.parse(row['checked'])
			};
			arrayTodos.push(todo);
		}
		renderTodo(arrayTodos, todoList);
	});
});

addBtn.addEventListener("click", () => addTask.classList.toggle("active"));

//add todo
addTaskBtn.addEventListener("click", () => {
	if (taskInput.value === "") return;
	let id = getId(arrayTodos);
	let title = taskInput.value;
	arrayTodos = addTodo(id, title, arrayTodos);

	db.transaction(function(tx) {   
		tx.executeSql('INSERT INTO Todos (id, title, checked) VALUES (?, ?, ?)', [id, title, false]);
	});

	renderTodo([arrayTodos[arrayTodos.length - 1]], todoList);
	taskInput.value = "";
});

todoList.addEventListener("click", (event) => {
	let target = event.target;
	let todo = target.closest('.todo');

	//edit todo
	if (target.closest('.todo__button.update')) {
		todo.classList.toggle("editing");
	}

	if (target.closest('.btn-update')) {
		let title = todo.querySelector(".update-task").value;
		let id = todo.dataset.id;
		todo.classList.toggle("editing");
		todo.querySelector(".todo__title").innerHTML = title;

		db.transaction(function(tx) {   
			tx.executeSql('UPDATE Todos set title=? where id=?', [title, +id]);
		});
	}

	//delete todo
	if (target.closest('.delete')) {
		let arrayToDelete = deleteTodo(todo.dataset.id, arrayTodos);

		db.transaction(function(tx) {   
			tx.executeSql('DELETE FROM Todos where id=?', [arrayToDelete[0].id]);
		});

		todoList.removeChild(todo);	
	}

	//toggle todo
	if (target.closest('.todo__checkbox') && target.tagName !== "INPUT") {
		let todoObj = toggleTodo(todo.dataset.id, arrayTodos);

		db.transaction(function(tx) {   
			tx.executeSql('UPDATE Todos set checked=? where id=?', [todoObj.checked, todoObj.id]);
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

		cln.querySelector(".update-task").value = array[i].title;

		if (JSON.parse(array[i].checked)) {
			cln.classList.add("completed");
		}
		cln.setAttribute("id", "todo-" + array[i].id);
		cln.setAttribute("data-id", array[i].id);

		elem.appendChild(cln);
	}
}

