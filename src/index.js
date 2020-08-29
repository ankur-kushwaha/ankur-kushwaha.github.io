import React from "react";
import { render } from "react-dom";
import App from "./components/app";

render(<App />, document.getElementById("app"));

fetch('http://www.splashbase.co/api/v1/images/1')
.then(res=>res.json())
.then((data)=>{
  // document.body.background=data.url
})