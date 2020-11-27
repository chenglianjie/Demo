import React, { Component,Fragment } from 'react';
import {Input} from "antd";
const {Search} = Input;
class Inputdounce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue:"",
      // tip: null,
      // trigerTimes: 1
    }
    // 防抖函数
    this.searchFunction = debounce(this.searchFunction, 800)
  }
  // 搜索框的onchange函数
  searchOnchange =(e) => {
    this.searchFunction(e.target.value) // 对用户输入进行判断
  }
  // 将搜索的值 保存在state里面 并且父组件可以拿到;
  searchFunction = (searchValue) =>{
    // const { trigerTimes } = this.state
    const { getvalue } = this.props;
    // this.setState({searchValue,
    //   tip: `触发了：${trigerTimes}次`,
    //   trigerTimes: trigerTimes + 1
    // });
    if(getvalue){
      getvalue(searchValue);
    }
  }
  render() { 
    // 可以传  title ，  placeholder ， styleObj 样式对象 进来
    const {title="",placeholder='',style={},titleStyle={}} = this.props;
    return ( 
      <Fragment>
        {title?<span style={titleStyle}>{title}：</span>:null}
        <Search 
          style={style}
          onChange={this.searchOnchange} 
          placeholder={placeholder}
          // value={searchValue}
        />
        {this.state.tip}
      </Fragment>
    );
  }
}
// 防抖函数 第一个参数为要执行的函数，
// 第二个参数为 停止抖动多少秒后 执行这个函数
function debounce(fn, ms) {
  let start
  return function () {
    clearTimeout(start)
    start = setTimeout(() => {
      fn.apply(this, arguments)
    }, ms)
  }
}
export default Inputdounce;