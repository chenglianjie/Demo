import React, { Fragment } from "react";
// import axios from "axios";
import axios from '@/utils/request';
import In from "./component/searchInputDounce";
class Encryptios extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tip: null,
      trigerTimes: 1
    }
    this.isPhoneLegal = debounce(this.isPhoneLegal, 1000)
  }
  handleKeyUp = (e) => {
    this.isPhoneLegal(e.target.value) // 对用户输入进行判断
  }
  isPhoneLegal = (phone) => {
    const phoneRegexp = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
    const { trigerTimes } = this.state
    if(phoneRegexp.test(phone)) {
      this.setState({
        tip: `手机号符合规则!`,
        trigerTimes: 0
      })
    } else {
      this.setState({
        tip: `手机号有误, 触发了：${trigerTimes}次`,
        trigerTimes: trigerTimes + 1
      })
    }
  }
  getvalue = (value) => {
    // this.setState()
    console.log("value",value)
  }
  click = () => {
    axios.get("http://127.0.0.1:3030/kiwisec/test");
  }
  render(){
    console.log("我是父组件的timeview",this.state.timeview);
    return(  
      <Fragment>
        <In 
          title="用户名"
          style = {{width:200}}
          placeholder = "请输入手机号"
          getvalue = {this.getvalue}
        ></In>
        <div onClick={this.click}>点击</div>
        {/* <div>
        <input onChange={ this.handleKeyUp} placeholder="请输入手机号"/>
        <span>
          {this.state.tip}
        </span>
        </div> */}
       
      </Fragment> 
    )
  }
}
function debounce(fn, ms) {
  let timeoutId
  return function () {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn.apply(this, arguments)
    }, ms)
  }
}
export default Encryptios;
