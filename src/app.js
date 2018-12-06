import AppBar from "material-ui/AppBar";
import ContentAdd from 'material-ui/svg-icons/content/add';
import ExitToApp from "material-ui//svg-icons/action/exit-to-app";
import InstallInstructions from "components/install-instructions";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Paper from "material-ui/Paper";
import React, { Component } from "react";
import db from "./db";
import reducer from "reducer";
import thunk from "redux-thunk";
import { Game } from "components/game";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

export class App extends Component {
  configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

    if (module.hot) {
      module.hot.accept("reducer", () => {
        const nextRootReducer = require("reducer").default;
        store.replaceReducer(nextRootReducer);
      });
    }

    return store;
  }

  render() {
    const gameOn = navigator.standalone || process.env.LAUNCHED_FROM_HOMESCREEN === "true";

    return(
      <Provider store={this.configureStore()}>
        <MuiThemeProvider>
          {gameOn
            ? <Game width={this.props.width} height={this.props.height} ratio={this.props.ratio} />
            : <InstallInstructions />
          }
        </MuiThemeProvider>
      </Provider>
    );
  }
}

const rowStyle = {
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
}
