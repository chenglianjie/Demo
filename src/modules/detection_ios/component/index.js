/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-08 09:55:35
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-08 09:57:12
 */
import React, { Component } from 'react';
import {Link} from "react-router-dom";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
    <div>
      我是home页面
      <Link to="/Latout/iostest/details">详情页</Link>
    </div> );
  }
}
 
export default Home;