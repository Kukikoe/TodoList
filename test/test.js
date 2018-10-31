const assert = require('assert');
const functions = require('../src/js/functions.js');
const { addTodo, toggleTodo, deleteTodo, getId } = functions;

describe("getId", function() { 
	
	it("if passed empty array, id = 1", function() { 
		let id = getId([]);
		assert.equal(id, 1);
	});

	it("if passed array with elements, id = array[array.length - 1].id++", function() { 
		let initialArray = [{
			title: "Learn JS",
			checked: false,
			id: 3
		}];
		let id = getId(initialArray);
		assert.equal(id, 4);
	});
});

describe("addTodo", function() { 

	it("add todo to empty array", function() {
		let arrayTodos = addTodo(1, "Learn JS", []);
		let expected = [{
			title: "Learn JS",
			checked: false,
			id: 1
		}];
		assert.deepEqual(arrayTodos, expected);
	});

	it("add todo to array with element", function() {
		let initialArray = [{
			title: "Learn JS",
			checked: false,
			id: 1
		}];
		let arrayTodos = addTodo(2, "Learn C#", initialArray);
		let expected = [
			...initialArray,
			{
				title: "Learn C#",
				checked: false,
				id: 2
			}
		];
		assert.deepEqual(arrayTodos, expected);
	});

	it("function without arguments throws an error", function() {
		assert.throws(addTodo, Error);
	});
});

describe("deleteTodo", function() { 
	
	it("delete object with given id from array", function() { 
		let initialArray = [{
			title: "Learn JS",
			checked: false,
			id: 1
		}];
		let arrayTodos = deleteTodo(1, initialArray);
		assert.deepEqual(arrayTodos, []);
	});

	it("if the passed array is empty returns empty array", function() { 
		let arrayTodos = deleteTodo(1, []);
		assert.deepEqual(arrayTodos, []);
	});

	it("if the passed id is not found in the array returns initial array", function() { 
		let initialArray = [{
			title: "Learn JS",
			checked: false,
			id: 1
		}];
		let arrayTodos = deleteTodo(3, initialArray);
		assert.deepEqual(arrayTodos, initialArray);
	});

	it("function without arguments throws an error", function() {
		assert.throws(deleteTodo, Error);
	});
});

describe("toggleTodo", function() { 
	
	it("changes 'checked' property in object with given id", function() { 
		let initialArray = [{
			title: "Learn JS",
			checked: false,
			id: 1
		}];
		let arrayTodos = toggleTodo(1, initialArray);
		assert.deepEqual(arrayTodos[0].checked, true);
	});

	it("if the passed id is not found in the array returns initial array", function() { 
		let initialArray = [{
			title: "Learn JS",
			checked: false,
			id: 1
		}];
		let arrayTodos = toggleTodo(3, initialArray);
		assert.deepEqual(arrayTodos, initialArray);
	});
	
	it("if the passed array is empty returns empty array", function() { 
		let arrayTodos = toggleTodo(1, []);
		assert.deepEqual(arrayTodos, []);
	});

	it("function without arguments throws an error", function() {
		assert.throws(toggleTodo, Error);
	});
});