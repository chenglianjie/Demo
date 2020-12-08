/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-08 09:55:42
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-08 09:59:27
 */
import React, { Component } from 'react';
import {Link} from "react-router-dom";
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
    <div>
      我是详情页面
      <Link to="/Latout/iostest">首页</Link>
    </div> );
  }
}
 
export default Details;