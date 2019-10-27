import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todos'
import Header from './components/layout/Header'
import AddTodo from './components/AddTodo'
import About from './pages/About'
import axios from 'axios'

import './App.css'
class App extends React.Component {
  state = {
    todos: [
    ]
  }

  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    })
  }

  delTodo = (id) => {

    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({
        todos: [...this.state.todos.filter(todo => todo.id
          !== id)]
      }))
      .catch(error => console.log(error))
   
  }

  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos',
    {
      title: title,
      completed: false

    })
      .then(response => this.setState({ todos: [...this.state.todos, response.data] }))
      .catch(error => console.log(error))
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(response => this.setState({todos: response.data }))
    .catch(error => console.log(error))
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )}
            />
            <Route path="/about" component = {About}
            />

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
