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
  dateChange =async (data) => {
    let start_time = moment(data[0]).format("YYYY-MM-DD");
    let end_time = moment(data[1]).format("YYYY-MM-DD");
    let obj = {start_time,end_time}
    this.setState({timeView: [data[0], data[1]]})
    // 传一个getRangePickerData函数 得到时间对象
    this.props.getStartAndEndTime(obj)
  };
  // 可以传 两个参数 
  // getStartAndEndTime(必传)  父组件传一个函数 可以得到说选择的时间对象
  // styleObj(可选) 控制时间选择框的样式 如大小等
  render() { 
    const {timeView} = this.state;
    const {styleObj={}} = this.props; // props传样式 默认是{}；
    return (
      <RangePicker
        allowClear={false} // 不显示清除按钮
        style={styleObj} 
        format="YYYY-MM-DD"
        value={timeView}
        onChange={this.dateChange}
        ranges={{
          所有: [moment().subtract(120, 'month'), moment()],
          今天: [moment().startOf('day'), moment()],
          近7天: [moment().subtract(1, 'week'), moment()],
          近14天: [moment().subtract(2, 'week'), moment()],
          近30天: [moment().subtract(1, 'month'), moment()],
        }}
      />
    );
  }
}
 
export default CustomeRangePicker;