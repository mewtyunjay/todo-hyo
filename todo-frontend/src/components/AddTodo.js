import React, { Component } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/todos/";

class Input extends Component {
  state = {
    task: "",
    completed: "false",
  };

  addTodo = () => {
    const todo = { task: this.state.task };
    if (todo.task && todo.task.length > 0) {
      axios
        .post(API_URL, todo)
        .then((res) => {
          if (res.data) {
            this.props.getTodos();
            this.setState({ task: "" });
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("input field required");
    }
  };
  handleChange = (e) => {
    this.setState({
      task: e.target.value,
    });
  };

  render() {
    let { task } = this.state;
    return (
      <div>
        <input
          type="text"
          className="form-control"
          placeholder="Add a Todo"
          onChange={this.handleChange}
          value={task}
        />
        <button
          type="button"
          onClick={this.addTodo}
          style={{marginLeft: 320 }}
          className="btn btn-warning mb-2"
        >
          Add
        </button>
      </div>
    );
  }
}

export default Input;
