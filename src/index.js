import React from "react";
import ReactDOM from "react-dom";
// import { whyDidYouUpdate } from "why-did-you-update";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// if (process.env.NODE_ENV !== "production") {
//   whyDidYouUpdate(React);
// }

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
