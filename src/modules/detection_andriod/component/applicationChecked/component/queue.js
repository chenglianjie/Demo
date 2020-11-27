import React from "react";
import {Spin,Col} from "antd";
import "./common.less"
class Queue extends React.Component{
  render(){
    return (
      <Col span={24} className="secret-dete-loading">
					<div className="loading">
						<Spin size="large" />
					</div>
					<p>
						您的应用正在检测队列中，请等待 ...
					</p>
					<div style={{textAlign:'center',marginTop:20}}>
        	</div>
				</Col>
    )
  }
}
export default Queue;