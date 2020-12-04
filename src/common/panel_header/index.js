/*
 * @Author: kiliaosi
 * @Date: 2020-06-15 14:47:55
 * @LastEditors: kiliaosi
 * @LastEditTime: 2020-06-15 16:13:02
 * @Description: 
 */ 
import React from "react";
import { Row, Col, Tooltip } from "antd";

import "./header.less";
class PanelHeader extends React.Component {
  render() {
    return (
      <Row className="panel-common-title2">
        <Col span={16} className="common-panel-title">
          <span className="clj-indextitle" style={{fontSize:'18px'}}>
            {this.props.title}
            <span className="min-title" style={{fontSize:'12px'}}>{this.props.content}</span>
          </span>
        </Col>
      </Row>
    );
  }
}
export default PanelHeader;
