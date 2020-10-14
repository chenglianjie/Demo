import React, { Fragment} from 'react';
import {Route,Switch,HashRouter} from "react-router-dom";
import Login from "./modules/login"
import Home from "./modules/home"
import "./app.less"
function App() {
  let needLogin =  window.localStorage.getItem("kiwiCert")
  return (
      <Switch>
        <Route exact path='/login' component={Login}/>
        { 
          needLogin ? <Route path="/" component={Login} /> : <Route path="/" component={Home} />
        }
        <Route  component={Home}/>
      </Switch>
  );
}
export default App;
