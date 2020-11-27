import React, { Component } from 'react';
import options from "./config"
import {get} from 'lodash'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import './pieAnBar.less';
const {pie} = options;
class Pie extends Component {
  //设置 echarts函数
  setEacharts = (pie,pie_data) => {
    var myChart = echarts.init(document.getElementById('pie'));
    pie.series[0].data = pie_data;
    myChart.setOption(pie);
    window.addEventListener("resize",function (){
      myChart.resize();
    });
  }
  componentWillReceiveProps(nextprops){
    const {pie_data} = nextprops;
    this.setEacharts(pie,pie_data) 
  }
  render() {
        return (
            <div id='pie'></div>
        );
    }
}

export default Pie;
