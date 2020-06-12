import React, { useState, useEffect } from "react"
//import "./App.css"
import APIHelper from "./APIHelper.js"
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")


  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await APIHelper.getAllTodos()
      setTodos(todos)
    }
    fetchTodoAndSetTodos()
  }, [])

  const createTodo = async e => {
    e.preventDefault()
    if (!todo) {
      alert("please enter something")
      return
    }
    if (todos.some(({ task }) => task === todo)) {
      alert(`Task: ${todo} already exists`)
      return
    }
    const newTodo = await APIHelper.createTodo(todo)
    setTodos([...todos, newTodo])
  }

  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation()
      await APIHelper.deleteTodo(id)
      setTodos(todos.filter(({ _id: i }) => id !== i))
    } catch (err) { }
  }


  const updateTodo = async (e, id) => {
    e.stopPropagation()
    const payload = {
      completed: !todos.find(todo => todo._id === id).completed,
    }
    const updatedTodo = await APIHelper.updateTodo(id, payload)
    setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)))
  }

  return (
    <div className="App container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
            
           
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <a href="/" className="nav-link"><b><h4>Todos App</h4></b></a>
                </li>
                
              </ul>
            </div>
          </nav>
          <br/>

      <div className="row">
      <div className="col-sm-2"></div>

      <div style={{marginTop: 20}} className="col-sm-8">
      <form>
      
        <input
          id="todo-input"
          type="text"
          value={todo}
          className="form-control"
          placeholder="Add a Todo"
          onChange={({ target }) => setTodo(target.value)}
        />
        
        <button type="button" onClick={createTodo} style={{ marginTop: 20, marginLeft: 320 }} className="btn btn-warning mb-2">
          Add
        </button>
       
        
        </form>
      </div>


      <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                          {todos.map(({ _id, task, completed }, i) => (
                            <tr>
                            <td
                              key={i}
                              onClick={e => updateTodo(e, _id)}
                              className={completed ? "completed" : ""}
                            >
                              {task}</td>
                            
                            <td><span onClick={e => deleteTodo(e, _id)}><i class="fa fa-trash" aria-hidden="true"></i>
</span></td>
                            </tr>
                          ))}
                        
                    </tbody>
      </table>
      
      <div className="col-sm-2"></div>
      </div>
    </div>
  )
}

export default App
