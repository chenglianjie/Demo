/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-10-09 10:39:02
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-08 16:11:07
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./common/style/common.less";
import {BrowserRouter} from "react-router-dom";
// 解决antd 中文显示问题
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
