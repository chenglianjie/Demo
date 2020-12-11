/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-11-12 14:45:53
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-11 11:07:24
 */
import React from "react";
import HeaderTitle from "@/common/panel_header";
import Upload from "./component/upload";
import Tables from "./component/table"
import {Cascader,Icon,Table,Button,Modal} from "antd";

import "./home.less"

const Home = () => {
  return(
    <div className="apk-detection">
      {/* 头部标题 */}
      <HeaderTitle
        title="Android检测"
        content="( 对安卓应用包进行多维度的安全评估，及时发现潜在的安全隐患 )"
      />
      {/* 上传组件 */}
      <Upload></Upload>
      {/* 表格 */}
      <Tables/>
    </div>
  )
}
export default Home;