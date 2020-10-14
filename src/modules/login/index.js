import React, { Fragment } from 'react';
import Login from "./login/login";
import Rigister from "./register/register";
import ForgetPassword from "./forgetPassword/forgetPsd";
import './login.less';
class Logins extends React.Component{
  state = {
    flag:1, // 1 表示 登录界面 2 注册 3 找回密码
  }
  changeFlag = (flag) => {
    this.setState({
      flag
    })
  }
  render(){
  const {flag} = this.state;
    return(
      <Fragment>
        <div className="container">
          <div className="loginBox">
            <div class="userImage">
              <img alt ="" src="/img/catFace.png"/>
            </div>
            {flag===1?<Login changeFlag = {this.changeFlag} />:null}
            {flag===2?<Rigister changeFlag = {this.changeFlag} />:null}
            {flag===3?<ForgetPassword changeFlag = {this.changeFlag} />:null}
          </div>
        </div>
      </Fragment>
    )
  }
}
export default Logins;