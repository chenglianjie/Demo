/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-10-14 10:50:24
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-08 10:06:56
 */
import React from "react"
import Home from "./component/index"
import Details  from "./component/details";
import  {Route,Switch} from "react-router-dom"

class PicturesWall extends React.Component{
  render() {
    return (
      <Switch>
        <Route exact path="/Latout/iostest/details">
        <Details></Details>
        </Route>
        <Route exact path="/Latout/iostest">
          <Home></Home>
        </Route>
      </Switch>
    )
  }
}
export default PicturesWall;