/*
 * @Author: kiliaosi
 * @Date: 2020-06-15 14:47:55
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-11 10:18:39
 * @Description: 
 */ 
import React from "react";
import { Row, Col} from "antd";
import "./header.less";

const PanelHeader = (props) =>{
  return (
    <Row className="panel-common-title2">
      <Col span={16} className="common-panel-title">
        <span className="clj-indextitle" style={{fontSize:'18px'}}>
          {props.title}
          <span className="min-title" style={{fontSize:'12px'}}>{props.content}</span>
        </span>
      </Col>
    </Row>
  );
}
export default PanelHeader;
