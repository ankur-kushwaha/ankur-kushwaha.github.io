import React from "react";
import { render } from "react-dom";
import App from "components/app";

render(<App />, document.getElementById("app"));

fetch('https://api.desktoppr.co/1/users/keithpitt/wallpapers/random')
.then(res=>res.json())
.then((data)=>{
  document.body.background=data.response.image.url
})