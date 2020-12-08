/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-10-14 10:50:24
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-08 10:09:44
 */
import React from "react";
import { BrowserRouter as Router, Switch,Route,Link} from "react-router-dom";
import { Cascader,DatePicker,Input,Button,Form,Modal,Radio,Avatar,Upload,message,Select,Table, Spin} from 'antd';
import Home from "./Home"
import About from "./about"

import "./index.less"

class DetectionAndriod extends React.Component {
  state= {
    flag:false,
    flag2:false,
  }
  render(){
    return(
      <Switch>
          {/* 子级路由 */}
          <Route   path="/Latout/andriodtest/about">
            <About {...this.props}/>
          </Route>
          <Route exact  path="/Latout/andriodtest">
            <Home />
          </Route>
          
      </Switch>    
    )
  }
}
export default DetectionAndriod;