import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5500/todos'); 
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      const newTodo = {
        title: title,
        description: description,
        completed: false
      };

      const response = await axios.post('http://localhost:5500/todos', newTodo); 
      setTodos([...todos, response.data]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (todo) => {
    try {
      const updatedTodo = {
        ...todo,
        completed: !todo.completed
      };

      await axios.put(`http://localhost:5500/todos/${todo.id}`, updatedTodo); 
      const updatedTodos = todos.map((t) => (t.id === todo.id ? updatedTodo : t));
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (todo) => {
    try {
      await axios.delete(`http://localhost:5500/todos/${todo.id}`);
      const updatedTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
      <h1 >ToDo List</h1></div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary mb-3" onClick={addTodo}>
          Add Todo
        </button>
      </div>
      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={todo.completed}
              onChange={() => updateTodo(todo)}
            />
            <span>{todo.title} : {todo.description}</span>
            <button className="btn btn-danger ms-auto" onClick={() => deleteTodo(todo)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
