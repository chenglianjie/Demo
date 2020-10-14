import React, { Fragment } from "react";
// import { connect } from 'react-redux';
// import Head from "./component/head"
// import Text from "./component/text"
// import { operation , encryptIosSelectors } from "../../store/sonStore/encrypt_ios"
// import "./style/encryptIos.less"
// import TextContext from "../../context"
// const { textContext }=context
// console.log("我是context",this.textContext)
// const {state1Selector,filterSelector}=encryptIosSelectors;

class Encryptios extends React.Component {
  // state = {state1:"我是初始化state"}
  // static contextType = TextContext;
  render(){
    // console.log(this.state)
    // console.log(this.context)
    // console.log("this props",this.props)
    return(  
      <Fragment>
        <div>ios加固</div>
        {/* <TextContext.Provider value="改变了context数据">
     
          <Text/>
          < Head/>
        </TextContext.Provider>  */}
      </Fragment> 
    )
  }
}

// const HomeC = connect(
//   (state) => ({
//     stat1:state1Selector(state),
//     filter:filterSelector(state)
//   }),
//   operation,
// )(Encryptios);
export default Encryptios;
