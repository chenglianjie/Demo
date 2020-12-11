/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-10 13:47:52
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-10 14:44:45
 */
import React,{useEffect,useState} from "react";
import { Table, Badge, Select, Input, Divider, message, Radio, Tooltip,Button } from "antd";
import moment from "moment";
import axios from "@/utils/request";
import {filter, get} from "lodash";
import "../style/head.less"
const { Option } = Select;
const Search = Input.Search;

const Head = () =>{
  const del = (id) =>{
    alert(`删除了 ${id}`)
  }
  // 归属组织数组
  const [agentArr,setAgentArr] = useState([]);
  // 筛选字段的对象
  const [filterObj,setFilterObj] = useState({agent:'all',type:'all',user:'',appName:'',edition:'',startTime:'',endTime:'',page:1});
  useEffect(()=>{
    async function agentData() {
      try {
        const {data} = await axios.get("/list");
        setAgentArr(data)
      } catch (error) {
        console.log('获取组织数组错误',error);
      }
    }
    agentData();
  },[])
  useEffect(()=>{
    // 上传的参数
    console.log("上传的参数",filterObj) 
  })
  // console.log("筛选对象",filterObj)
  return (
    <div>
      <div className="androidEncryptAdmin-header">
        <div className="header-box-item">
          <span>归属组织：</span>
          <Select defaultValue="" style={{ width: 220 }} onChange={(value)=>{setFilterObj({...filterObj,agent:value,page:1})}}>
            <Option value="">全部组织</Option>
              {agentArr.map((item,index)=>{
                return  <Option key= {index} value={item.value}>{item.name}</Option>
              })}
          </Select>
        </div>
        <div className='header-box-item'>
          <span>选择日期：</span>
          {/* <CustomRangePicker getStartAndEndTime={this.getStartAndEndTime} styleObj={{width:220}} ></CustomRangePicker> */}
        </div>
        <div className="header-box-item">
          <span>版本类型：</span>
          <Radio.Group defaultValue="" onChange={(e)=>{setFilterObj({...filterObj,type:e.target.value,page:1})}} >
            <Radio.Button style={{width:73,textAlign:'center'}} value="">全部</Radio.Button>
            <Radio.Button style={{width:73,textAlign:'center'}} value="premium-user">付费</Radio.Button>
            <Radio.Button  style={{width:73,textAlign:'center'}}value="free-user">免费</Radio.Button>
          </Radio.Group>
        </div>
        <div className="header-box-item">
          <span>用户账号：</span>
          <Search
            placeholder="请输入用户账号"
            onChange={e => {setFilterObj({...filterObj,user:e.target.value,page:1})}}
            style={{ width: 220 }}
          />
        </div>
        <div className="header-box-item">
          <span>应用名称：</span>
          <Search
            placeholder="请输入用户名称"
            onChange={e => {setFilterObj({...filterObj,appName:e.target.value,page:1})}}
            style={{ width: 220 }}
          />
        </div>
        <div className="header-box-item">
          <span>加固版本：</span>
          <Search
            placeholder="请输入加固版本"
            onChange={e => {setFilterObj({...filterObj,edition:e.target.value,page:1})}}
            style={{ width: 220 }}
          />
        </div>
        <Button onClick = {()=>del(1002)}>删除</Button>
      </div>
    </div>
  );
}
export default Head;
