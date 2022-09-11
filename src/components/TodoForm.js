import React, { useState, useEffect, useRef } from 'react';


function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit({
      id: (JSON.parse(localStorage.getItem("data")) || []).length +1 || 1,
      text: input
    });
    setInput('');
  };

  const handleGet = e => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("data")) || [];
    let findIndex = -1;
    const rowLength = document.querySelectorAll(".todo-row").length;
    if (data.length > 0 && rowLength < data.length) {
      if (!!document.querySelector(".todo-row")) {
        data.forEach(function (dot) {
          document.querySelectorAll(".todo-row").forEach(function (node, index) {
            if (dot.text === node.textContent) {
              findIndex = index;
            }
          });
        });
        if (findIndex === -1 || findIndex <= window.count) {
          props.onSubmit({
            id: document.querySelectorAll(".todo-row").length +1,
            text: data[window.count].text,
          });
          window.count++;
        }
      } else {
          window.count = 0;
          props.onSubmit({
            id: 1,
            text: data[window.count].text,
          });
        window.count++;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update a reminder'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            PATCH
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a reminder'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} id='postButton' className='todo-button'>
            POST
          </button>
          <button onClick={handleGet} id='getButton' className='todo-button-get'>
            GET
          </button>
          <hr className='sepLine'></hr>
        </>
      )}
    </form>
  );
}

export default TodoForm;
