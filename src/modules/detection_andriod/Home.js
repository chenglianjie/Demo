/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-11-12 14:45:53
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-09 11:25:11
 */
import React from "react";
import {Cascader,Icon,Table,Button,Modal} from "antd";
import { Link } from "react-router-dom";
import { pca, pcaa } from 'area-data';
import 'react-area-linkage/dist/index.css'; // v2 or higher
import { AreaSelect, AreaCascader } from 'react-area-linkage';
import "./home.less"
// import "./index.less"
// import Upload from "./upload"
class Home extends React.Component {

  render(){
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Age', dataIndex: 'age', key: 'age' },
      { title: 'Address', dataIndex: 'address', key: 'address' },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        className:'clj-td',
      render: (text,record,index) => {return <Link to={{
        pathname:"/Latout/andriodtest/about",
        // search:`?page=${index}`,
        // hash:`#name=${record.name}`,
        // state:{name:'clj',age:'22',sec:'nan'}
      }}>取证</Link>},
      },
    ];
    const data = [
      {
        key: 1,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
      },
      {
        key: 2,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
      },
      {
        key: 3,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        description: '',
      },
    ];
    const expandedRowRender = () =>{
      const columns = [
        {title:'性别',key:'哈哈',dataIndex:'a'},
        {title:'姓名',key:'哈哈2',dataIndex:'b'},
        {title:'年龄',key:'哈哈3',dataIndex:'c'},
      ]
      const data = [
        {a:'男',b:'张三',c:"20"},
        {a:'女',b:'小红',c:"22"},
    ];
     return <Table columns={columns} dataSource={data} pagination={false} />;
    }
    return(
      <div style={{height:200}}>
          <Table
           columns = {columns}
           dataSource={data}
           expandedRowRender={expandedRowRender}
           expandRowByClick={true}
            expandIconAsCell = {false}
            expandIconColumnIndex={3}
            expandIcon = {(record)=>{
            return record.expanded ? <Icon type="down"  onClick={record.onExpand}/>:<Icon type="right"  onClick={record.onExpand}/>
          }}
          >
          </Table>
      </div>    
    )
  }
}
export default Home;