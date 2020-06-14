import React, { Component } from 'react';
import axios from 'axios';
import './AddTodo.css';

const API_URL = 'http://localhost:3001/todos/';

class Input extends Component {
  state = {
    task: '',
    completed: 'false',
  };

  addTodo = (event) => {
    event.preventDefault();
    const todo = { task: this.state.task };
    if (todo.task && todo.task.length > 0) {
      axios
        .post(API_URL, todo)
        .then((res) => {
          if (res.data) {
            this.props.getTodos();
            this.setState({ task: '' });
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert('Please enter a task first!');
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
      <form id='todo-form' onSubmit={this.addTodo}>
        <input
          type='text'
          className='text-field'
          placeholder='Add a Todo'
          onChange={this.handleChange}
          value={task}
        />
        <button type='submit' className='btn btn-warning mb-2'>
          Add
        </button>
        <br />
        <br />
      </form>
    );
  }
}

export default Input;
