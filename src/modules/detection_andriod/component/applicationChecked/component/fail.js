import React from "react";
import {Spin,Col,Button} from "antd";
import "./common.less"
class Queue extends React.Component{
  reloadDetection = () => {
    this.props.createDetection();
  }
  render(){
    return (
      <Col id="secret-error-dete" span={24}>
      <div className="error-msg">
        <div className="error-img" style={{marginBottom:20}}>
          <img src="/images/error.png" alt=''/>
          检测失败
        </div>
          {/* {errmsg}，请联系<a href="" className='qq-link'>技术人员</a> */}
          检测失败，请联系<a href="" className='qq-link'>&nbsp;&nbsp;技术人员</a> 
      </div>
      <div style={{ textAlign: "center", marginTop: "-30px" }}>
        <Button onClick={this.reloadDetection} style={{ marginTop: "0px", marginRight: "20px" }}>
          重新检测
        </Button>
      </div>
      </Col>
    )
  }
}
export default Queue;