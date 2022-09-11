import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    const sliceRate = !!isMobile ? 25 : 48;
    todo.text = todo.text.slice(0, sliceRate).toLowerCase();
    const newTodos = [todo, ...todos];
    let checkSet = true;
    if (!!document.querySelector(".todo-row")) {
        document.querySelectorAll(".todo-row").forEach(function (node, index) {
          if (node.textContent === todo.text) {
            checkSet = false;
          }
        });
      };

    if (checkSet) {
      setTodos(newTodos);
    }
    /* */
    const data = JSON.parse(localStorage.getItem("data")) || [];
    let tempIndex = -1;
    data.forEach(function (dot, index) {
      if (dot.id !== index +1) {
        dot.id = index +1;
      }
      if (dot.text === todo.text) {
        tempIndex = index;
        dot.id = todo.id;
      }
    });
    if (tempIndex === -1) {
      data.push({
        text: todo.text,
        id: todo.id,
        complete: false
      });
      console.log(todo);
    }
    localStorage.setItem("data", JSON.stringify(data));

    /* */
    console.log('Insert successful -> ' + todo.id);
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    newValue.id = todoId;
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    /* */
    let data = JSON.parse(localStorage.getItem("data")) || [];
    let success = false;
    data.forEach(function (node){
      if (node.id === todoId) {
        console.log('New value text -> ' + newValue.text);
        console.log('Old value text -> ' + node.text);
        node.id = newValue.id;
        node.text = newValue.text;
        node.complete = false;
        success = true;
      }
    });
    if (success) {
      localStorage.setItem("data", JSON.stringify(data));
    };
    /* */
    console.log('New value id -> ' + newValue.id);
    console.log('Old value id -> ' + todoId);
    console.log('Update successful.');
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);
    /* */
    let data = JSON.parse(localStorage.getItem("data")) || [];
    let indexArr = -1;
    data.forEach(function (node, index){
      if(node.id === id)
          indexArr = index;
    });
    console.log('remove index = ' + indexArr);
    if(indexArr !== -1) {
      data.splice(indexArr,1);
      localStorage.setItem("data", JSON.stringify(data));
    }
    /* */
    setTodos(removedArr);

    console.log('Delete successful.');
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    /* */
    let data = JSON.parse(localStorage.getItem("data")) || [];
    let indexArr = -1;
    data.forEach(function (node, index){
      if(node.id === id)
          indexArr = index;
    });
    if(indexArr !== -1) {
      data[indexArr].complete = !data[indexArr].complete;
      localStorage.setItem("data", JSON.stringify(data));
    }
    /* */
    setTodos(updatedTodos);
    console.log('Complete button triggered.');
  };

  return (
    <>
      <h1>Reminder Book</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;

