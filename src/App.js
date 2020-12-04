import React, { Fragment} from 'react';
import {Route,Switch,HashRouter} from "react-router-dom";
import Login from "./modules/login"
import Home from "./modules/home"
import "./app.less"
function App() {
  // 判断 是否登录 isLogin 为true 表示已经登录
  
  // console.error("isLogin",isLogin);
  return (
      <Switch>
        <Route exact path='/login' component={Login}/>
        {/* { 
          isLogin ? <Route path="/" component={Home} />:<Route path="/" component={Login} /> 
        } */}
        <Route path="/" render={(props)=>{
          let isLogin = window.localStorage.getItem("kiwi") ? true : false;
          if(isLogin){
            return <Home {...props}/>
          }else{
            props.history.push("/login")
            return <Login {...props}/>
          }
        }} />
        <Route  component={Home}/>
      </Switch>
  );
}
export default App;
