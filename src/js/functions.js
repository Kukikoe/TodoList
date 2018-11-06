let _id = 1;

function getId(arrayTodos) {
	if (arrayTodos && arrayTodos.length) {
		_id = +arrayTodos[arrayTodos.length-1].id;
	}
	return ++_id;
}

function addTodo(id, title, arrayTodos) {
	let todo = {
		id,
		title,
		checked: false
	};
	return arrayTodos.concat(todo);
}	

function toggleTodo(id, arrayTodos) {
	let obj;
	arrayTodos = arrayTodos.map((todo) => {
		if (+id == todo.id) {
			todo.checked = !todo.checked;
			obj = todo;
		}
		return todo;
	});
	return obj;
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