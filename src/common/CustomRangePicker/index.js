import React, { Component } from 'react';
import { DatePicker } from "antd";
import moment from "moment";  
import "./index.less";
const { RangePicker } = DatePicker;
class CustomeRangePicker extends Component {
  state = {
    timeView:[
      moment(moment().subtract(1, "months"), "YYYY/MM/DD"),
      moment(new Date(), "YYYY/MM/DD")
    ],                      // 默认是一个月的时间   
  } 
  // 时间变化函数
  dateChange = async (data) => {
    // console.log("组件data",data)
    let startTime = moment(data[0]).format("YYYY-MM-DD");
    let endTime = moment(data[1]).format("YYYY-MM-DD");
    let obj = {startTime,endTime};
    this.setState({timeView: [data[0], data[1]]},()=>{
      // 传一个getRangePickerData函数 让父组件得到选择的时间
      this.props.getStartAndEndTime(obj,this.state.timeView)
    })
  };
  componentDidMount(){
    // 可以自定义 默认时间
    const { actionAble,timeView } = this.props;
    if(actionAble){
      this.setState({
        timeView : [
          moment(moment("2020-11-05"), "YYYY/MM/DD"),
          moment(moment().subtract(1, "days"), "YYYY/MM/DD")
        ]
      })
    }
    if(timeView){
      this.setState({timeView})
    }
  }
  // 可以传 两个参数  以及一个 actionAble = true 增加或者修改一些其他的需求
  // getStartAndEndTime(必传)  父组件传一个函数 可以得到说选择的时间对象
  // styleObj(可选) 控制时间选择框的样式 如大小等
  render() { 
    const {size="default"} = this.props;
    let {timeView} = this.state;
    const {styleObj={},actionAble} = this.props; // props传样式 默认是{}；
    let rangesObj = {
      所有: [moment().subtract(120, 'month'), moment()],
      今天: [moment().startOf('day'), moment()],
      近7天: [moment().subtract(1, 'week'), moment()],
      近14天: [moment().subtract(2, 'week'), moment()],
      近30天: [moment().subtract(1, 'month'), moment()],
    }
    // kiwiguard的默认时间
    if(actionAble){
      rangesObj = {
        所有: [moment("2020-11-05"), moment().subtract(1, 'days')],
        昨天: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        近7天: [moment().subtract(8, 'days'), moment().subtract(1, 'days')],
        近14天: [moment().subtract(15, 'days'), moment().subtract(1, 'days')],
        // 近30天: [moment().subtract(1, 'month'), moment()],
      }
    }
    return (
      <RangePicker
        disabledDate = {this.props.disabledDate}  // 不可选择的时间 不需要则不用传
        allowClear={false} // 不显示清除按钮
        style={styleObj} 
        format="YYYY-MM-DD"
        value={timeView}
        onChange={this.dateChange}
        ranges={rangesObj}  // 页脚的时间区间选择
        size={size}
      />
    );
  }
}
 
export default CustomeRangePicker;