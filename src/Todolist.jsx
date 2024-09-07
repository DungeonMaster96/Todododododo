import React, { useState } from "react";
import "./todolist.css";

const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editMode, setEditmode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [editValue, setEditValue] = useState("");

  const addtodo = () => {
    if (inputValue !== "") {
      const newtodo = {
        id: new Date().getTime(),
        text: inputValue,
      };

      setTodos([...todos, newtodo]);
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    const updateTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updateTodos);
  };

  const entereditMode = (id, text) => {
    setEditmode(true);
    setEditId(id);
    setEditValue(text);
  };

  const updateTodos = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editId) {
        return { ...todo, text: editValue };
      }

      return todo;
    });
    setTodos(updatedTodos);
    setEditmode(false);
    setEditId(null);
    setEditValue("");
  };

  return (
    <div className="todo-container">
      <h2> Todo List</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {editMode ? (
        <div>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button onClick={updateTodos}>Update</button>
        </div>
      ) : (
        <button onClick={addtodo}>Add</button>
      )}

      {/* <button onClick={addtodo}>Add</button> */}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button
              onClick={() => {
                deleteTodo(todo.id);
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                entereditMode(todo.id, todo.text);
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
