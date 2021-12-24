import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/store/index";
import { SpeechProvider } from "@speechly/react-client";

ReactDOM.render(
  <BrowserRouter>
    <SpeechProvider
      appId="ccef1a7e-14f3-496b-92cf-4af83cf446dc"
      language="en-US"
    >
      <Provider store={store}>
        <App />
      </Provider>
    </SpeechProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
