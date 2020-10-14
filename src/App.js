import React, { Fragment} from 'react';
import {Route,Switch,HashRouter} from "react-router-dom";
import Login from "./modules/login"
import Home from "./modules/home"
import "./app.less"
function App() {
  return (
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/' component={Home}/>
        <Route  component={Home}/>
      </Switch>
  );
}
export default App;
