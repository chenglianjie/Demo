/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-10 13:47:23
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-10 13:55:31
 */
import React from 'react';
import {Row,Col} from "antd";
import "../style/title.less"

const Title = (props) =>{
  return(
    <div className="androidEncryptAdmin-title">
    <Row>
        <Col span={16} className="admin-common-title">
          <span>{props.title}<span className="min-title">{props.content}</span></span>
        </Col>
    </Row>
    <div className="myhr"></div>
  </div>
  )
}
export default Title;