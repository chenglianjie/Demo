/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-11 10:56:01
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-11 11:17:23
 */
import React, { useState } from 'react';
import { Table, Radio, Input, Badge } from 'antd';
import { get } from "lodash";
import "./style/table.less"
const { Search } = Input;
const Tables = () => {
  const [apkstate, setApkstate] = useState('all');
  const columns = [
    {
      title: "应用名称", dataIndex: "", key: "nameandversion",
      render: (text, record) => {
        // let name = record.app_name;
      },
    },
    { title: "安全得分", dataIndex: "newScore", key: "newScore" },
    { title: "评估时间", dataIndex: "add_dt", key: "StartTime", },
    {
      title: "状态",
      key: "state",
      dataIndex: "state",
      align: "center",
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (text, record) => {
        return (
          <div className="action">
            <span>查看详情</span>
            <span>删除</span>
          </div>
        )
      },
    },
  ]
  return (
    <div className='filter'>
      <Radio.Group value={apkstate} size="small" onChange={(value) => setApkstate(value)}>
        <Radio.Button value="all">全部</Radio.Button>
        <Radio.Button value="queue">队列中</Radio.Button>
        <Radio.Button value="encrypt">加固中</Radio.Button>
        <Radio.Button value="success">已完成</Radio.Button>
        <Radio.Button value="fail">失败</Radio.Button>
      </Radio.Group>
      <Search
        placeholder="请输入应用名称"
        // onSearch={this.appNameSearch}
        style={{ width: 200, marginLeft: 20, marginRight: 20 }}
        size="small"
      />
      {/* table数据 */}
      <Table
        className="detectionapk-table"
        columns={columns}
      />
    </div>
  )
}
export default Tables