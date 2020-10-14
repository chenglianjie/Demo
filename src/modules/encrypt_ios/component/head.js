import React from "react";
import PropTypes from 'prop-types';
// import http from "../../../server/http"


class Head extends React.Component{

  render(){
    return (
      <div>
        我是son head组件
        {/* {this.props.stat1}
         <div>{this.props.message}</div> */}
      </div>
    )
  }
}
// 类型检查与限定

Head.defaultProps = {
  stat1: '我是默认的数据哦',
  message:"我是默认数据"
};
Head.propTypes = {
  stat1: PropTypes.string
};

export default Head;

