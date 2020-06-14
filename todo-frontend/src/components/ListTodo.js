import React from "react";
import "./ListTodo.css";

const ListTodo = ({ todos, getTodos, deleteTodo, updateTodo}) => {
  return (
    <div>
      <ul>
        {todos && todos.length > 0 ? (
          todos.map((todo) => {
            return (
              <div>
                <input
                  className="toggle-all"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => {
                    e.completed = e.target.checked;
                    if (e.target.checked) e.priority = -1;
                    updateTodo(e, todo._id);
                  }}
                />
                <span class="spacing"></span>
                <input
                  className={
                    todo.completed ? "completed" : "task-list" + todo.priority
                  }
                  id={todo._id}
                  type="text"
                  value={todo.task}
                  onChange={(e) => {
                    todo.task = e.target.value;
                    updateTodo(todo, todo._id);
                  }}
                />
                <span class="spacing"></span>
                <span
                  onClick={(e) => {
                    if (todo.priority > 0) todo.priority--;
                    updateTodo(todo, todo._id);
                  }}
                >
                  <i
                  class="fas fa-angle-double-up" title="Increase Priority" aria-hidden="true"></i>
                </span>
                <span class="spacing"></span>
                <span
                  onClick={(e) => {
                    if (todo.priority < 0) todo.priority = 1;
                    if (todo.priority < 2) todo.priority++;
                    updateTodo(todo, todo._id);
                  }}
                >
                  <i class="fas fa-angle-double-down" title="Decrease Priority" aria-hidden="true"></i>
                </span>
                <span onClick={() => deleteTodo(todo._id)}>
                  <i class="fas fa-trash left-pad" title="Delete Task" aria-hidden="true"></i>
                </span>
              </div>
            );
          })
        ) : (
          <h5> No Todos </h5>
        )}
      </ul>
    </div>
  );
};

export default ListTodo;
