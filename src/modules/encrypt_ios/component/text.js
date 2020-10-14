import React,{ useState, useEffect, Fragment } from "react";
import Grandson from "./grandson"
function Text() {
  const [count,setCount] =useState(0);
  // const [friut,setFriut] =useState("banner");
  useEffect(()=>{
    console.log("11")
    // let timeer=setInterval(() => {
    //   console.log("111")
    // }, 1000);
    // return function clear(){
      // clearInterval(timeer)
    // }
  },[])
  return(
    <Fragment>
      <div>
       我是son text组件
       <Grandson count={count}></Grandson>
      </div>
      <p>你点击了{count}次</p>
      <button onClick={ ()=> setCount(count+1)}>点我</button>
      {/* // <div>
        
      //   <p>你选择了{friut}</p>
    
      //   <button onClick={ ()=> setFriut("香蕉") }>
      //     点我
      //   </button>
      // </div> */}
    </Fragment>
    
  )
}
export default Text;