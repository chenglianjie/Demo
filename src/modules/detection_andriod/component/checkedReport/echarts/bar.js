import React, { Component } from 'react';
import options from "./config"
import {get} from 'lodash'
//按需导入 echarts
import echarts from 'echarts/lib/echarts';
//导入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/dataZoom'

import './pieAnBar.less';
const {bar} = options;
class Bar extends Component {
  //设置 echarts函数
  setEacharts = (pie) => {
    var myChart = echarts.init(document.getElementById('bar'));
    myChart.setOption(bar);
    window.addEventListener("resize",function (){
      myChart.resize();
    });
  }
  componentWillReceiveProps(nextprops){
    this.setEacharts(bar) 
  }
  render() {
        return (
            <div id='bar'></div>
        );
    }
}

export default Bar;
