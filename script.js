let input = document.querySelector("input");
let addBtn = document.querySelector(".add-btn");
let todosContainer = document.querySelector(".todos");
let addContainer = document.querySelector(".add");

let todo = "";

// add todo
function addTodo() {
  let todo = input.value.trim();
  if (todo === "") {
    alert("Please enter a valid todo!");
    return;
  }

  let todos = JSON.parse(localStorage.getItem("todo")) || [];
  todos.push(todo);
  localStorage.setItem("todo", JSON.stringify(todos));
  input.value = "";
  displayTodos();
}

addBtn.addEventListener("click", addTodo);

// update todo
function updateTodo(index) {
  let todos = JSON.parse(localStorage.getItem("todo"));
  let updatedTodo = prompt("Enter to update todo", todos[index]);
  todos[index] = updatedTodo;
  if (updatedTodo !== null && updatedTodo.trim() !== "") {
    todos[index] = updatedTodo.trim();
    localStorage.setItem("todo", JSON.stringify(todos));
  }
  displayTodos();
}

// delete todo
function deleteTodo(index) {
  let todos = JSON.parse(localStorage.getItem("todo"));
  if (todos.length === 0) return;

  todos.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(todos));
  displayTodos();
}

// display all the todos

function displayTodos() {
  let todos = JSON.parse(localStorage.getItem("todo")) || [];
  todosContainer.innerHTML = "";

  if (todos.length === 0) {
    todosContainer.innerHTML = "<p>No todos yet. Add one!</p>";
  } else {
    todos.forEach((todo, index) => {
      const todoElement = document.createElement("div");
      todoElement.style.display = "flex";
      todoElement.innerHTML = `
        <h4>${todo}</h4>
        <div class="buttons">
          <button class="update-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
      todosContainer.appendChild(todoElement);

      todoElement.querySelector(".update-btn").addEventListener("click", () => {
        updateTodo(index);
      });

      todoElement.querySelector(".delete-btn").addEventListener("click", () => {
        deleteTodo(index);
      });
    });
  }
}

displayTodos();
