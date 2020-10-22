import React, { Fragment} from 'react';
import {Route,Switch,HashRouter} from "react-router-dom";
import Login from "./modules/login"
import Home from "./modules/home"
import "./app.less"
function App() {
  // 判断 是否登录
  let needLogin =  !!window.localStorage.getItem("kiwiCert")
  console.log("needLogin",needLogin)
  return (
      <Switch>
        <Route exact path='/login' component={Login}/>
        { 
          needLogin ? <Route path="/" component={Home} />:<Route path="/" component={Login} /> 
        }
        <Route  component={Home}/>
      </Switch>
  );
}
export default App;
