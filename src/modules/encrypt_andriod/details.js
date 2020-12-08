/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-08 11:16:10
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-08 18:25:37
 */
import React, { Component } from 'react';
import { Result, Button } from 'antd';
import {Link} from "react-router-dom"
import "./style/details.less"
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div  className="encrypt-success">
        <Result
          status="success"
          title="加固功能敬请期待"
          subTitle="加固功能，需要调用底层加固程序，暂自动实现！"
          extra={[
            <Button type="primary" key="console">
              <Link to="/Latout/andriodencrypt">返回首页</Link>
            </Button>,
            // <Button key="buy">返回首页</Button>,
          ]}
        />
      </div>)
  }
}

export default Details;