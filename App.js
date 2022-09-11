import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
window.count = 0;

function App() {
  return (
    <div className='todo-app'>
      <TodoList />
    </div>
  );
}

export default App;

/*
import React, {Component} from "react";
import ReactDOM from "react-dom";
import './App.css';
import TodoList from './components/TodoList';
/*
class LifeCycle extends Component {
  componentDidMount(){
      console.log('Executed for last DOM.');
      console.log(ReactDOM.findDOMNode(this));
      const data = JSON.parse(localStorage.getItem("data")) || [];
  }
  render() {
      const data = JSON.parse(localStorage.getItem("data")) || [];
      return (
          <div className="App">
              <h1>React DOM</h1>
              <script>console.log('sesasasasasas');</script>
          </div>
      );
  }
} */


/*
class Lifes extends Component {
  componentDidMount() {
  }
    render() {
      console.log('arap');

  return (
    <div className='todo-app'>
      <TodoList />
    </div>
  );

    }
  }
  TodoList().addTodo({text:'test',id:25});

export default Lifes;
*/
