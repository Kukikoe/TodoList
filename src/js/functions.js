let _id = 1;

function getId(arrayTodos) {
	if (arrayTodos && arrayTodos.length) {
		_id = +arrayTodos[arrayTodos.length-1].id;
	}
	return ++_id;
}

function addTodo(id, title, arrayTodos) {
	let todo = {
		title,
		checked: false,
		id
	};
	return arrayTodos.concat(todo);
}	

function toggleTodo(id, arrayTodos) {
	arrayTodos = arrayTodos.map((todo) => {
		if (+id == todo.id) {
			todo.checked = !todo.checked;
		}
		return todo;
	});
	return arrayTodos.filter((todo) => todo.id === parseInt(id));
}

function deleteTodo(id, arrayTodos) {
	return arrayTodos.filter((todo) => todo.id === parseInt(id));
}

module.exports = {
	addTodo,
	getId,
	deleteTodo,
	toggleTodo
}