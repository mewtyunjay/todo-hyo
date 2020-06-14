import React, { Component } from "react";
import axios from "axios";
import "./Todo.css";

import Input from "./AddTodo";
import ListTodo from "./ListTodo";

const API_URL = "http://localhost:3001/todos/";

class Todo extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    axios
      .get("http://localhost:3001/todos/")
      .then((res) => {
        if (res.data) {
          var newTodo = res.data;
          newTodo.sort(function (a, b) {
              return a.priority > b.priority
          });
          this.setState({ todos: newTodo });
        }
      })
      .catch((err) => console.log(err));
  };

  deleteTodo = (id) => {
    axios
      .delete(`http://localhost:3001/todos/${id}`)
      .then((res) => {
        if (res.data) {
          this.getTodos();
        }
      })
      .catch((err) => console.log(err));
  };

  updateTodo = (todo, id) => {
    const payload = {
      task: todo.task,
      completed: todo.completed,
      priority: todo.priority,
    };
    axios
      .put(`${API_URL}${id}`, payload)
      .then((res) => {
        this.getTodos();
      })
      .catch((err) => console.log(err));
  };


  render() {
    let { todos } = this.state;

    return (
      <div>
        <center>
          <h1>My Todo List</h1>
        </center>
        <Input getTodos={this.getTodos} />
        <ListTodo
          todos={todos}
          getTodos={this.getTodos}
          deleteTodo={this.deleteTodo}
          updateTodo={this.updateTodo}
        />
      </div>
    );
  }
}

export default Todo;
