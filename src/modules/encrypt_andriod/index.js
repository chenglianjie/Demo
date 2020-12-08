/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-08 11:12:56
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-08 11:19:32
 */
import React, { Component } from 'react';
import {Switch,Route} from "react-router-dom";
import Home from "./home"
import Details from "./details"
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
    <Switch>
      <Route exact path="/Latout/andriodencrypt/details" component={Details} >
      </Route>
      <Route exact path="/Latout/andriodencrypt" component={Home}></Route>
    </Switch> );
  }
}
 
export default Index;