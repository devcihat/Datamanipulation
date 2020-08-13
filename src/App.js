import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Loading from "./components/loading";

class App extends Component {
  state = { todos: [] };
  async componentDidMount() {
    let result = await axios.get("https://jsonplaceholder.typicode.com/todos");
    await new Promise((x) => setTimeout(x, 1000));
    result.data.map((todo) => {
      if (typeof todo.title) {
        todo.title = todo.title[0].toUpperCase() + todo.title.slice(1);
      }
    });
    this.setState({ todos: result.data });
  }

  render() {
    return (
      <div className="container">
        {this.state.todos.length > 0 ? (
          <div>
            <ul className="list-group">
              {this.state.todos.map((todo, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {todo.title}
                  <span className="">
                    <input type="checkbox" checked={todo.completed} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default App;
