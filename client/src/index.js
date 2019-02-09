import React, { Component } from "react";
import ReactDOM from "react-dom";
import Routes from "./routes/index";
import { Provider } from "react-redux";
import configureStore from "./store";
import "./assets/css/fonts/fontawesome/css/all.css";
import "./assets/css/index.scss";

class App extends Component {
  render() {
    return <Routes />;
  }
}

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);
