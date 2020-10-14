import React from "react";
function Grandson(props){
  console.log(props)
  return (
    <div>我是孙子组件 {props.count} </div>
  )
}
export default Grandson;