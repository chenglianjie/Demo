import React from 'react';
import Pie  from "./echarts/pie";
import Bar  from "./echarts/bar";
// import Bar  from "./echarts/bar";
import {Modal,Button,Table,Select, Spin,Row,Col,Divider,message,Tooltip,Icon} from "antd";
import "./index.less";
import axios from "@/utils/request";
import {get, stubFalse} from "lodash";
import moment from "moment";
import SeeImgandremarks from "./seeAndUpdateImgandremarks"
const { Option } = Select;
class ApplicationChecked extends React.Component{
  state={
    pagecode:1,
    pagecode2:1,
    pagecode3:1,
    loading:false,
    reportData:{},
    flag:false,   // 控制视频弹出
    Bigremark:'',
    dataid:'',
    arr:[],
    tableselect:true,
    flagss:true,
  }
  // 申请权限 审查操作
  handleChange(value) {
    console.log(`selected ${value}`);
  }
  // App违法违规收集使用个人信息行为认定 审查操作
  handleChange2(value) {
    console.log(`selected ${value}`);
  }
  returnHome = ()=>{
    this.props.changeShowchecked()
  }
  componentDidMount = async()=>{
  //  window.flagss = true
   const {hash} = window.location;
   let id = hash.replace('#report=','')
   try {
    axios.get('/appguard/privacy/application/report/detail',{params:{app_id:id}}).then((res)=>{
        console.log("报告",res.data)
        let code = get(res.data,'code','');
        if(code === 1){
          this.setState({
            reportData:res.data.data
          })
        }
    }).catch((error)=>{
      if(error.response){
        let msg = get(error.response,'data.msg','数据获取失败')
        message.error(msg);
      }else{
        message.error('报告生成失败!');
      }
    })
  } catch (error) {
    console.log(error)
  }
  }
  // 申请权限 分页函数
  paginations = () => {
    let {reportData={}} = this.state;
    if(!reportData){
      reportData ={}
    }
    let {app_permission_list=[]} = reportData
    if(!Array.isArray(app_permission_list)){
      app_permission_list = [];
    }
    try {
      return {
        size:'small',
        pageSize: 10, //每页长度
        current: this.state.pagecode, //当前页码
        total: app_permission_list.length, //数据总条数
        onChange: this.codeChnage //页码改变时候回调
      };
    } catch (error) {
      console.error(error)
    }
  };
  // 分页页数改变函数  current表示当前页码
  codeChnage = (current) => {this.setState({pagecode: current});console.log("this.state",this.state)};
  // 违规收集个人信息 分页函数
  paginations2 = () => {
    let {reportData={}} = this.state;
    if(!reportData){
      reportData ={}
    }
    let {app_Violationsmessage_list=[]} = reportData
    // console.log("我是分页里面的checkedData",reportData)
    if(!Array.isArray(app_Violationsmessage_list)){
      app_Violationsmessage_list = [];
    }
    try {
      return {
        size:'small',
        pageSize: 10, //每页长度
        current: this.state.pagecode2, //当前页码
        total:app_Violationsmessage_list.length, //数据总条数
        onChange: this.codeChnage2 //页码改变时候回调
      };
    } catch (error) {
      console.error(error)
    }
  };
  // 分页页数改变函数  current表示当前页码
  codeChnage2 = (current) => {this.setState({pagecode2: current})};
    // 隐私行为说明 分页函数
  paginations3 = () => {
    let {reportData={}} = this.state;
    if(!reportData){
      reportData ={}
    }
    let {app_privacy_behavior_list=[]} = reportData
    if(!Array.isArray(app_privacy_behavior_list)){
      app_privacy_behavior_list = [];
    }
    try {
      return {
        size:'small',
        pageSize: 10, //每页长度
        current: this.state.pagecode3, //当前页码
        total:app_privacy_behavior_list.length, //数据总条数
        onChange: this.codeChnage3 //页码改变时候回调
      };
    } catch (error) {
      console.error(error)
    }
  };
  // 分页页数改变函数  current表示当前页码
  codeChnage3 = (current) => {this.setState({pagecode3: current})};
  // 下载word模板
  downloadWord = () => { 
    let {hash} = window.location;
    let id = hash.replace('#report=','');
    axios.get(`/appguard/privacy/application/report/download?app_id=${id}`,{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', //请求的数据类型为form data格式
      },
      'responseType': 'blob'  //设置响应的数据类型为一个包含二进制数据的 Blob 对象，必须设置！！！
      }).then((res)=>{
        let name2 = res.headers['content-disposition'].split(';')[1];
        let number = name2.indexOf('=') + 1;
        const blob = new Blob([res.data]);
        const linkNode = document.createElement('a');
        let fileNames = name2.substr(number).replace(/\"/g, '');
        let fileName = decodeURIComponent(fileNames)
        console.log("fileName",fileName)
        linkNode.download = fileName; //a标签的download属性规定下载文件的名称
        linkNode.style.display = 'none';
        linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
        document.body.appendChild(linkNode);
        linkNode.click();  //模拟在按钮上的一次鼠标单击
        URL.revokeObjectURL(linkNode.href); // 释放URL 对象
        document.body.removeChild(linkNode);
    }).catch((error)=>{
      if(error.response){
        console.log(error.response)
        let msg = get(error.response,'data.msg','报告正在生成中，请稍后');
        message.error(msg);
      }else{
        message.error('报告正在生成中，请稍后!');
      }
    })
  }
  //重新审查
  chechkAgain =async () => {
    let {hash} = window.location;
    let id = hash.replace('#report=','');
    try {
      const {data} =   await axios.post('/appguard/privacy/application/review/again',{app_id:id});
      let code = get(data,'code','');
      if(code === 1){
        message.success('操作成功，可以重新审查！')
        this.props.checked(id);
        // window.location.reload()
      }
    } catch (error) {
      if(error.response){
        let msg = get(error.response,'data.msg','重新审查失败');
        message.error(msg);
      }else{
        message.error('重新审查失败!');
      }
    } 
  }
  // 控制视频是否弹出
  cancel = (flag=false,hasvideo)=> {
    if(!hasvideo){
      message.warning("视频还未生成，请稍后");
    }else{
      this.setState({flag})
    }
  }
  // 点击集体时间 播放视频
  playVideo = (startTime) => {
    this.setState({flag:true},()=>{
      let newStartTime = startTime - 4;
      if(newStartTime < 0) {
        newStartTime = 0
      }
      setTimeout(()=>{
        let myVid=document.getElementById("myvideo");
        myVid.currentTime = newStartTime;
        myVid.play();
        setTimeout(()=>{
          myVid.pause();
        },4000)
      },500)
  });
 }
 // 点击查看
 clicksee = (e,flag,id,remarks) => {
   if(flag){
     e.stopPropagation();
   }
  this.setState({
    showSeeModal:flag,
    dataid:id,
    Bigremark:remarks
  })
}
  // 点击展开行
  open = (record) => {
    return (e) => {
      const {arr} = this.state;
      const {reportData={}} = this.state;
      let { app_Violationsmessage_list=[] } = reportData;
      let list = app_Violationsmessage_list;
      let index = list.findIndex( item => item.id === record.id);
      let id = record.id
      if (id > 0) {
        arr.push(record.key);//点击的每一行的key的值保存下来。
        this.setState({
          arr: arr
        })
        list[index].id  = list[index].id - 10000;
        reportData.app_Violationsmessage_list = list;
        this.setState({
          reportData
        })
      } 
      else if (id < 0) {
        arr.splice(arr.indexOf(record.key), 1);//再次点击的时候从数组删除上次存入的key值。
        this.setState({
          arr: arr
        })
        list[index].id  = list[index].id + 10000;
        reportData.app_Violationsmessage_list = list;
        this.setState({
          reportData
        })
      }
      console.log("reportData",reportData)
      console.log("展开的数组",arr);
    }
  }
  render(){
    const {loading,reportData={},flag,dataid,Bigremark} = this.state;
    // 扇形图数据
    let pie_data = get(reportData,'pie_data',[]); 
    let appName = get(reportData,'appName',"");
    let appType = get(reportData,'appType',"");
    let state = get(reportData,'state',"");
    let violate_rule_count = get(reportData,'violate_rule_count',"");
    let successCount= 31-violate_rule_count
    let appVersion = get(reportData,'appVersion',"");
    // 对版本号 进行处理
    if(appVersion.indexOf('v') === -1){
      appVersion = "v" + appVersion;
    }
    if(appVersion.indexOf('(') !== -1){
      let num = appVersion.indexOf('(');
      appVersion = appVersion.substr(0,num)
      console.log("88888888888",num,appVersion);
    }
    let area_name = get(reportData,'area_name',"");
    let splicearea_name = area_name;
    if(area_name.length>14){
      splicearea_name = area_name.slice(0,12) + "..."
    }
    let company_name = get(reportData,'company_name',"");
    let contactName = get(reportData,'contactName',"");
    let icon = get(reportData,'icon',"");
    let video_url = get(reportData,'video_url',"");  // 视频链接
    // 判断有无视频
    let hasvideo = true;
    if(!video_url){
      hasvideo= false
    }
    let industry = get(reportData,'industry',"");
    let contactPhone = get(reportData,'contactPhone',"");
    let app_Violationsmessage_list = get(reportData,'app_Violationsmessage_list',[]);
    let app_permission_list = get(reportData,'app_permission_list',[]);
    let app_privacy_behavior_list = get(reportData,'app_privacy_behavior_list',[]);
    // 重新排序
    let commonpower = app_permission_list.filter((item)=>{return item.level ===1})
    let commonpower2 = app_permission_list.filter((item)=>{return item.level ===2})
    let commonpower3 = app_permission_list.filter((item)=>{return item.level ===3})
    let commonpower4 = app_permission_list.filter((item)=>{return item.level ===4})
    let commonpower5 = app_permission_list.filter((item)=>{return item.level ===5})
    app_permission_list =commonpower3.concat(commonpower2).concat(commonpower).concat(commonpower4).concat(commonpower5)
    let behavier = app_privacy_behavior_list.filter((item)=>{return item.level ===1})
    let behavier2 = app_privacy_behavior_list.filter((item)=>{return item.level ===2})
    let behavier3 = app_privacy_behavior_list.filter((item)=>{return item.level ===3})
    let behavier4= app_privacy_behavior_list.filter((item)=>{return item.level ===4})
    app_privacy_behavior_list = behavier3.concat(behavier2).concat(behavier).concat(behavier4);
    // 重新排序结束
    let color = {color:'red',fontSize:'30px'}
    if(state === "通过"){
     color = {color:'green',fontSize:'30px'}
    }
    if(!Array.isArray(app_permission_list)){
      app_permission_list = [];
    }
    if(!Array.isArray(pie_data)){
      pie_data = [];
    }
    let applypowerStyleobj = {marginTop:-20}
    if(!Array.isArray(app_Violationsmessage_list)){
      app_Violationsmessage_list = [];
    }
    // 如果没有数据 marginTop为20 不然会覆盖标题
    if(app_Violationsmessage_list.length === 0){
      applypowerStyleobj = {marginTop:20}
    }
    if(!Array.isArray(app_privacy_behavior_list)){
      app_privacy_behavior_list = [];
    }
    // 申请权限说明
    const columns = [
      // {title:'序号',dataIndex:'key',key:'index',align:'center',width:100},
      {
        title:'序号',
        key:'num',
        align:'center',
        width:100,
        render:(text,record,index)=>{
          return <span  >
            {index+1+(this.state.pagecode-1)*10}
          </span>
        }
      },
      {title:'权限描述',dataIndex:'txt',key:'txt',align:'left',render:(text)=>{
        let msg = text; 
        if(/未知权限/.test(text)){
           msg = "未知权限"
         }
        return <span>{msg}</span>
      }},
      {title:'权限名称',dataIndex:'permission_key',key:'permission_key',align:'left'},
      {title:'风险等级',dataIndex:'level',key:'level',align:'center',render:(text)=>{
         let level = '无法识别'
         if(text ===1){
          level = '普通权限'
         }
         if(text ===2){
          level = '危险权限'
         }
         if(text ===3){
          level = '禁止权限'
         }
         if(text ===4){
          level = '未分配权限'
         }
         if(text ===5){
          level = '未知权限'
         }
         return (
          <div>{level}</div>
         )
      }},
    ]
    // 31项
    const columns2 = [
      {title:'序号',dataIndex:'key',key:'a',align:'center',width:100},
      {title:'问题描述',dataIndex:'question_desc',key:'question_desc',align:'center'},
      {title:'审查结果',dataIndex:'option',key:'option',align:'center',width:150,render:(text,record)=>{
        let level = '未知'
        let color ={}
        if(text ===2){
         level = '通过'
         color ={color:'green'}
        }
        if(text ===1){
         level = '未通过'
         color ={color:'red'}
        }
        if(record.out){
          return null;
        }
        return (
         <div style={color}>{level}</div>
        )
     }},
      {title:'操作',dataIndex:'',key:'remarks',align:'center',width:120,render:(text,record)=>{
        if(record.out){
          return null
        }
        return  <span 
        style={{color:'#0084ff',marginRight:10,cursor:'pointer'}}
        onClick={(e)=>this.clicksee(e,true,record.key,record.remark)}
      >
        查看
      </span>
      }},
      {title:'',key:'nulls',align:'center',render:(text,record)=>{
        // console.log("我要的record参数",record.id)
        if(record.out){
          return null
        }
        // return <Icon className={`rotate-${record.key}`} type="right" style={{color:"e6e6e6"}}/>
        return record.id > 0 ? <Icon type="right" style={{color:"e6e6e6"}}/>:<Icon type="down" style={{color:"e6e6e6"}}/>
      }}
    ]
    // 隐私行为说明
    const column =[
      // {title:'序号',dataIndex:'key',key:'key',align:'center',width:100},
      {
        title:'序号',
        key:'num',
        dataIndex:'key',
        align:'center',
        width:100,
        render:(text,record,index)=>{
          return <span  >
            {index+1+(this.state.pagecode3-1)*10}
          </span>
        }
      },
      {title:'行为描述',dataIndex:'txt',key:'txt',align:'left'},
      // {title:'行为名称',dataIndex:'privacy_behavior_key',key:'txt2',align:'center'},
      // {title:'调用次数',dataIndex:'call_count',key:'call_count',align:'center'},
     
    {title:'风险等级',dataIndex:'level',key:'level',align:'center',render:(text)=>{
      let level = '无法识别'
      if(text ===1){
       level = '普通行为'
      }
      if(text ===2){
       level = '危险行为'
      }
      if(text ===3){
       level = '禁止行为'
      }
      if(text ===4){
       level = '未分配行为'
      }
      return (
       <div>{level}</div>
      )
   }},
{title:'调用函数',dataIndex:'call_function_info',width:550,key:'call_function',align:'center',render:(text)=>{
  if(Array.isArray(text)){
    let texts = text
    // 处理不同情况的样式 一个时 没有sdk时
    let call_function_info = text.slice(0,2);
    // 两条数据中 没有sdk数据的条数
    let leng = call_function_info.filter((item)=>{return item.SDK === "暂未匹配SDK"}).length;
    // console.log("call_function_info66",call_function_info,leng)
    let obj = {textAlign:'left',marginBottom:0,paddingTop:5}
    let overflowObj = {}
    // 当只有一个调用函数时
    if(texts.length < 2){
      // 没有sdk时的样式
      obj = {textAlign:'left',marginBottom:0,marginTop:4}
      overflowObj = {height:52}
      // 这一个调用函数 有sdk时的样式
      if(leng===0){
        overflowObj={height:72,position:'relative',top:3}
      }
    }else{
      // 全部没有sdk时的样式
      if(leng===2){
        overflowObj = {height:104}
      }
      // 一个有sdk 一个没有sdk的样式
      if(leng===1){
        overflowObj = {height:126}
      }
      // 两个都要sdk的样式
      if(leng===0){
        overflowObj = {height:142}
      }
    }
    return (
      <div className="overflow-y" style={overflowObj}>
        {
           texts.map((item,index) => {
            let indexs = index + 1;
            let path = item.path;
            let flag = true;
            if(item.SDK === "暂未匹配SDK"){
              flag =false;
            }
            let yearTime = moment(item.call_time).format("YYYY-MM-DD");
            let dayTime = moment(item.call_time).format("HH:mm:ss:SSS");
            let obj2 ={}
            if(!flag){
              obj2 = {paddingLeft:0}
            }
            return (
              <div style={obj} key={index}>
                {flag?<div className="sdk">[{indexs}] SDK：{item.SDK}</div>:null}
                <div className="functionTime" style={obj2} onClick={()=>this.playVideo(item.start_seconds)} >
                  {
                    flag 
                    ? 
                    null
                    :
                    <span style={{color:'#666',marginRight:5}}>[{indexs}]</span>
                  }
                  时间：{dayTime}<Icon  style={{marginLeft:10}} type="play-circle" theme="twoTone" />
                  <br/>
                </div>
                <Tooltip 
                  title={<div><span>完整路径：{item.path}</span></div>}
                  overlayStyle={{width:400,color:'red',maxWidth:400}}
                >
                  <span className="route" style={{paddingLeft:20}}>路径：{path}</span>
                </Tooltip>
              </div>
              )
         })
        }
      </div>
    )
  }
}},
    ]
    return(
      <Spin spinning={loading}>
        <div className="checkedReport">
          <div className='headbox' style={{marginBottom:4}}>
            <div className='flex1'>
              <span>审查报告</span>
            </div>
          </div>
          <div className='returnbutton'>
            <div>
              <Button icon='rollback' onClick={this.returnHome}>返回列表</Button>     
            </div>
             <div>{ this.props.powerTitle}</div> 
          </div>
          <Divider style={{position:'relative',top:'-8px'}} />
          {/* apk基础信息 */}
          <div className='headmessage' style={{marginBottom:15}} >
            <div className='row'>
              <div className='col' style={{marginTop:20}}>
                <div className='leftbox'>
                  <div className='imgdiv'><img src={icon} alt=""/></div>
                  <div className='contentbox'>
                    <div className='box'>
                      <div>
                        <span className='boldword'>应用名称：</span> 
                        <Tooltip title={appName}><span className='appname'>{appName}</span></Tooltip> 
                        &nbsp;&nbsp;{appVersion}
                      </div>
                      <div style={{position:'relative',top:5}} ><span className='boldword'>归属组织：</span>{company_name}</div>
                    </div>
                    <div className='box'>
                      <div><span className='boldword'>系统类型：</span>{appType}</div >
                      <div><span className='boldword'>归属地区：</span><Tooltip title={area_name}>{splicearea_name}</Tooltip></div>
                    </div>
                    <div className='box'>
                      <div><span className='boldword'>应用类型：</span>{industry}</div>
                      <div ><span className='boldword'>负责人员：</span>{contactName}/{contactPhone}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col col2'>
                <div className='rightbox'>
                    <div className='vi-line'></div>
                    <p className="reslut">审核结果：<span style={color}>{state}</span></p>
                    <p className='ppp'>发现该应用违反{violate_rule_count}项隐私信息收集认定条例</p>
                    <p>  <Button type='primary' icon='download' onClick={this.downloadWord}
                    >下载Word报告</Button>  <Button icon="reload" style={{width:121,marginLeft:24}} onClick={this.chechkAgain}>重新审查</Button></p>
                </div>
                <div className="downloadButton">
                  {/* <Button type='primary'>下载Word报告</Button> */}
                </div>
              </div>
            </div>
          </div>
          <div className='action action2'>
          <div className='titles'>App违法违规收集使用个人信息行为认定（共计31项，其中未通过<span >{violate_rule_count}</span>项，通过<span >{successCount}</span>项）</div>
            <div className='echarts' style={{marginBottom:24}}>
              <Row type="flex" justify="center" >
                  <Col span={12}>
                    {/* 饼图 */}
                    <Pie pie_data = {pie_data}></Pie>
                  </Col>
                  {/* <Col span={12}>
                    <Bar></Bar>
                  </Col> */}
              </Row>
            </div>
            <Table
              onRow={record => {
                return {
                  onClick: this.open(record)
                };
              }}
              expandedRowKeys = {this.state.arr}
              columns={columns2}
              dataSource={app_Violationsmessage_list}
              pagination={this.paginations2()}
              rowClassName = {(record,index)=>{
                return record.out===true?'tableRowTitle':''
               }}
              //  expandRowByClick={this.state.tableselect}
              // 点击小图标 出现下拉内容
              expandedRowRender={(record, index, indent, expanded) =>{
                  // const dom = document.querySelector(`.rotate-${record.key}`);
                  // if(dom) {
                  //   const classList = dom.classList;
                  //   if(classList.contains("rotate")){
                  //     dom.classList.remove("rotate");
                  //   }else{
                  //     dom.classList.add("rotate");
                  //   }
                  // }
                  let gists = get(record,'gists',[]);
                  if(gists.length === 0){
                    return null;
                  }
                  return(
                    <div style={{ margin: 0 }} className="tableselce">
                      <div className="firstdiv" style={{width:77,paddingLeft:11}}>审查依据</div>
                      <div className="secoddiv">
                        {
                          gists.map((item,index)=>{
                            let obj = {marginBottom:15}
                            if(record.gists.length === index+1){
                              obj ={}
                            }
                            return <div style={obj} key={index}>({index+1}) {item}</div>
                          })
                        }
                      </div>
                    </div>
                  )
                }
              }
              expandIcon={(record)=>{
                return null;
                if(record.record.out){
                  return null
                }
               return record.expanded ? <Icon type="down"  onClick={record.onExpand}/>:<Icon type="right"  onClick={record.onExpand}/>
             }}
            />
          </div>
          {/* 附：申请权限说明*/}
          <div className='applypower' style={applypowerStyleobj}>
            <div className='titles'>附：申请权限说明</div>
            <Table
              //  bordered
              key="222g"
              columns={columns}
              tableLayout='fixed'
              dataSource={app_permission_list}
              pagination={this.paginations()}
            >
            </Table>
            <p className='' style={{position:'relative',top:-35,width:800}}>（说明：通过解析APK包中AndroidManifest.xml文件，提取APP所申请的权限信息，并根据权限规则自动判断风险级别）</p>
          </div>
          {/* 附：隐私行为说明 */}
          <div className='privacyBehavior' style={{marginTop:-20}}>
            
            <div className="privacyBehaviorbox">
              <div className='titles'>附：隐私行为说明</div>
              <div className="palyVideo" 
                onClick={()=>{this.cancel(true,hasvideo)}}
              >
                  播放完整录屏 <Icon type="play-circle" theme="twoTone" />
              </div>
            </div>
            <Table
            // bordered
            key="333d"
            pagination={this.paginations3()}
            dataSource={app_privacy_behavior_list}
            columns={column}
            // tableLayout="fixed"
            >
            </Table>
          </div>
          <p className='' style={{position:'relative',top:-53,width:800}}>（说明：通过特定手机对系统敏感API接口进行监控，当APP应用运行时，对其隐私行为进行实时监控并记录存证）</p>
        </div>
        {/* 播放完整视频 */}
        {flag?<div>
            <Modal
             wrapClassName="playVideo"
             width={337}
             footer={null}
             title=""
             visible={true}
             centered={true}
             onCancel = {()=>{this.cancel(false,true)}}
            >
              <video id="myvideo" src={video_url} controls={true}  height='600' width='337'
                // poster
                preload="metadata"
              >

              </video>
            </Modal>
          </div>:null}
        {/* 查看存证 和编辑的弹框*/}
        {this.state.showSeeModal ?
        <SeeImgandremarks 
          clickUpdata={()=>this.clicksee(false)} 
          dataid={dataid}
          Bigremark={Bigremark}
          />
          :
          null
        }
      </Spin>
    )
  }
}
export default ApplicationChecked;