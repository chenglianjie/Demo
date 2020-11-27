import React from 'react';
import {Table,Modal,Badge, message} from "antd";
import {Link} from "react-router-dom"
import "./indextable.less"
const { confirm } = Modal;
class IndexTable extends React.Component{
  // 删除
  clickdel = (id) => {
    let that = this
    confirm({
      title: '你确定要删除这条数据吗？',
      async onOk() {
        that.props.del(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  // 更新
  clickupdata = (obj)=>{
    this.props.updataChangeState(obj);
  }
  // 审查
  clickchecked = (id) => {
    if(this.props.ispower){
      this.props.checked(id);
    }else{
      message.warning('你没有权限')
    }
  }
  //报告
  clickreport = (id) => {
    // alert("111")
    if(this.props.ispower){
      this.props.report(id)
    }else{
      message.warning('你没有权限')
    }
  }
  // 详情 
  clickdetils = (obj) => {
    this.props.clickdtail(obj)
  }
  render(){
    const {loading,paginations} = this.props;
    // let {TableListData=[]} = this.props;
    let TableListData = [
      {
        appName:'王者荣耀',
        reviewerState:2,
        taskReviewer:'张三',
        companyName:'几维安全',
        industry:'安全',
        updateDate:'2020-11-11',
        key:1,
      },
      {
        key:2,
        appName:'王者荣耀',
        reviewerState:2,
        taskReviewer:'张三',
        companyName:'几维安全',
        industry:'安全',
        updateDate:'2020-11-11'
      },
      {
        key:3,
        appName:'腾讯视频',
        reviewerState:3,
        taskReviewer:'李四',
        companyName:'腾讯科技',
        industry:'社交',
        updateDate:'2023-11-11'
      },
      {
        key:4,
        appName:'京东',
        reviewerState:1,
        taskReviewer:'刘伟',
        companyName:'京东数科',
        industry:'金融',
        updateDate:'2018-01-11'
      },
    ]
    // console.log("渲染的table数据",TableListData)
    if(!Array.isArray(TableListData)){
      TableListData = [];
    }
    const columns = [
      {
        title: "应用名称/版本",
        align:'left',
        dataIndex: "appName",
        key: "appName",
        render:(text,record)=>{
          return(
            <div>
              {/* <img src={record.icon} alt=""/> */}
              <span style={{marginRight:5}}>{text}</span>
              <span>v{record.appVersion}</span>
            </div>
          )
        }
      },
      {
        title: "审查状态",
        align:'left',
        dataIndex: "reviewerState",
        key: "reviewerState",
        render: (texts) => {
          let status = "default";
          let color = '';
          let text= '';
          switch (texts) {
            case 2:
              text = "未通过";
              color = "#F04134";
              break;
            case 0:
              text = "待审查";
              color = "#0084ff";
              break;
            case 3:
              text = "通过";
              color = "#00A854";
              break;
            default:
              text = "未知";
              color = "yellow";
          }
          return <Badge color={color} text={text} />;
        },
      },
      {
        title: "审查员",
        align:'left',
        dataIndex: "taskReviewer",
        key: "taskReviewer",
      },
      {
        title: "归属组织",
        align:'left',
        dataIndex: "companyName",
        key: "companyName",
      },
      {
        title: "应用类型",
        align:'left',
        dataIndex: "industry",
        key: "industry",
      },
      {
        title: "创建时间",
        align:'left',
        dataIndex: "updateDate",
        key: "updateDate",
        render:(text)=>{
          // let  time = text.substr(0,10);
          return <div>{text}</div>
        }
      },
      {
        title:"操作",
        align:'left',
        render:(text,record) => {
          return (
            <div>
                <Link to={{
                  pathname:'/Latout/andriodtest/about',
                  state:{id:record.key}
                }}><span className='action' 
               
              >详情</span></Link>
               {record.reviewerState === 2 || record.reviewerState === 3  ?<span className='action' onClick = {()=>{
                this.clickreport(record.id)
              }}>报告</span>
              :<span className='action' onClick = {()=>{
                this.clickchecked(record.id)
              }}>审查</span>}
              <span className='action' onClick = {()=>{
                this.clickdel(record.id)
              }}>删除</span>
            </div>
          )
        }
      }
    ];  
    return(
      <div className="IndexTable">
        <Table
        // bordered
          columns={columns}
          dataSource={TableListData}
          // pagination={paginations()}
          loading = {loading}
        >
        </Table>
      </div>
    )
  }
}
export default IndexTable;