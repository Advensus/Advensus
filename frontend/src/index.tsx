import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { blackAndWhiteTheme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import { loadTheme } from "@fluentui/react";
import { initializeIcons } from "@fluentui/font-icons-mdl2";

loadTheme(blackAndWhiteTheme);
initializeIcons();

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
