/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-10-14 10:50:24
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-11 10:25:57
 */
import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./component/home/home"
import Details from "./component/details/details"
import "./index.less"
const DetectionAndriod = (props) => {
  return (
    <Switch>
      {/* 子页面 */}
      <Route path="/Latout/andriodtest/about">
        <Details {...props} />
      </Route>
      {/* 首页 */}
      <Route exact path="/Latout/andriodtest">
        <Home />
      </Route>
    </Switch>
  )
}
export default DetectionAndriod;