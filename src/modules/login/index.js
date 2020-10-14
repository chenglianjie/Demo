import React from 'react';
import {Button,Input, message} from "antd";
import "./index.less"
class Login extends React.Component {
  login = () => {
    message.success("登录成功");
    window.location.pathname ='/home'; 
  }
  render () {
    
    return (
      <div className="login">
        账号：<Input type="text" style={{width:200,marginBottom:20}}/><br/>
        密码：<Input type="text" style={{width:200,marginBottom:20}}/><br/>
        <Button type="primary" onClick={this.login}>登录</Button>
      </div>

    )
  }
}

export default Login
