import React from "react";
import "./ListTodo.css";

const ListTodo = ({ todos, deleteTodo, updateTodo }) => {
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
                    updateTodo(e, todo._id);
                  }}
                />
                <input
                  className={todo.completed ? "completed" : ""}
                  id={todo._id}
                  type="text"
                  value={todo.task}
                  onChange={(e) => {
                    todo.task = e.target.value;
                    updateTodo(todo, todo._id);
                  }}
                />

                <span onClick={() => deleteTodo(todo._id)}>
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </span>
              </div>
            );
          })
        ) : (
          <p> No todos left</p>
        )}
      </ul>
    </div>
  );
};

export default ListTodo;
