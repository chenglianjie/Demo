/*
 * @Author: kiliaosi
 * @Date: 2020-06-15 14:47:55
 * @LastEditors: kiliaosi
 * @LastEditTime: 2020-06-15 16:13:02
 * @Description: 
 */ 
import React from "react";
import { Row, Col, Icon, Tooltip } from "antd";

import "./header.less";
class PanelHeader extends React.Component {
  render() {
    let isPrive = false;
    try {
      isPrive = window.jsonData ? window.jsonData.htmlObj.isPrivateServer : false;
    } catch (err) {}

    return (
      <Row>
        <Col span={16} className="common-panel-title">
          <span className="clj-indextitle" style={{fontSize:'18px'}}>
            {this.props.title}
            <span className="min-title" style={{fontSize:'12px'}}>{this.props.content}</span>
          </span>
        </Col>
        {this.props.isIcon && !isPrive ? (
          <Col className="documention" span={8}>
            <span>
              {/* 文档还没有 暂时先屏蔽a标签 */}
              {/* <a style={{color:"#333"}} target="_blank" href={this.props.link}>  */}
              <Tooltip placement="top" title={this.props.toolTipText}>
                {/* <Icon type="question-circle-o"/> */}
              </Tooltip>
              {/* {this.props.txt} */}
              {/* </a> */}
            </span>
          </Col>
        ) : null}
      </Row>
    );
  }
}
export default PanelHeader;
