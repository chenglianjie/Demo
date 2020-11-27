import React from 'react';
import {Button,Table,Select, Spin,message,Modal,Divider, Input,Tooltip,Radio,Icon} from "antd";
import Fail from "./component/fail";
import Detectioning from "./component/detectining";
import AddImgandremarks from "./component/addImgandremarks";
import SeeImgandremarks from "./component/seeAndUpdateImgandremarks";
import "./index.less"
import {get} from "lodash";
import axios from "@/utils/request";
import moment from 'moment';
const { Option } = Select;
const { confirm } = Modal;
class ApplicationChecked extends React.Component{
  state={
    pagecode:1,
    pagecode2:1,
    pagecode3:1,
    loading:false,       
    startDetection:false,     // 是否显示 开始检测后的内容
    isdetectionSuccess:false, // 是否检测成功
    app_id:'',                // 获取数据的id
    detectionState:1,          // 默认是在检测中
    task_state:'',
    current_task_id:'',
    checkedData:{},   // 审查数据
    color:'black', // 审查操作的颜色
    applyPowerValue:'all',  // 申请权限筛选
    applyPowerValue2:'all', // 隐私行为筛选
    new_task_state:1,  // 检测的状态  用于显示的状态
    remarksValue:'',
    sort:'',//行为 时间排序
    flag:false, // 控制视频 弹出
    obtainEvidence:false, // 控制 存证的弹出
    dataid:'', // 31项规则 单条数据的id
    showSeeModal:false, // 查看弹窗
    Bigremark:'', //弹窗里面 最后一个大的备注
    sdkValue:'allSdk', // sdk 筛选默认值
    arr:[],
  }
  // App违法违规收集使用个人信息行为认定 审查操作
  handleChange2 = async(value,key,type) => {
    let obj ={};
    const {hash} = window.location;
    let id = hash.replace('#check=','')
    obj.app_id = id;
    obj.option = value;
    obj.key = key
    obj.type = type;
     await this.props.CheckedAction(obj);
     let detectionData = await this.props.CheckedData({app_id:id});
      this.setState({
        checkedData:detectionData
      })
  }
  // 返回列表和保存退出
  returnHome = (flag=false)=>{
    // 点击保存退出按钮
    if(flag){
      message.success('保存成功')
    }
    // 点击返回列表
    this.props.changeShowchecked()
  }
  async componentDidMount() {
  // 在hash里面获取 id
   const {hash} = window.location;
   let id = hash.replace('#check=','');
   this.setState({
    loading:true,
    app_id:id,
   })
   // 根据id 获取审查的数据
   let detectionData =  await this.props.CheckedData({app_id:id});
   this.setState({
    checkedData:detectionData
   })
   this.setState({loading:false}) // loading状态结束
  //  获取现在手机的检测状态
  let {data:{data}} =  await axios.get('/appguard/privacy/application/state',{params:{app_id:id}});
  // 成功的时候
  if(data.task_state === 3){
    try {
      this.setState({
        detectionState:true,
        new_task_state:3 
      })
      clearInterval(this.timer);
    } catch (error) {
      console.log(error);
    }
  }else{
    this.getDetectionState();
  }
   this.setState({
    loading:false,
    detectionState:data.start
   })
  }
  // 清除定时器
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  // 申请权限 分页函数
  paginations = (tablelength) => {
    const {checkedData={}} = this.state;
    try {
      return {
        size:'small',
        pageSize: 10, //每页长度
        current: this.state.pagecode, //当前页码
        total: tablelength,
        onChange: this.codeChnage //页码改变时候回调
      };
    } catch (error) {
      console.error(error)
    }
  };
  // 分页页数改变函数  current表示当前页码
  codeChnage = (current) => {this.setState({pagecode: current})};
  // 违规收集个人信息 分页函数
  paginations2 = () => {
    const {checkedData={}} = this.state;
    let app_Violationsmessage_list = get(checkedData,"app_Violationsmessage_list",{})
    try {
      return {
        size:'small',
        pageSize: 10, //每页长度
        current: this.state.pagecode2, //当前页码
        total: app_Violationsmessage_list.length, //数据总条数
        onChange: this.codeChnage2 //页码改变时候回调
      };
    } catch (error) {
      console.error(error)
    }
  };
  // 分页页数改变函数  current表示当前页码
  codeChnage2 = (current) => {this.setState({pagecode2: current})};
  // 点击创建 创建检测任务
  // 隐私行为 分页函数
  paginations3 = (tablelength) => {
    const {checkedData={}} = this.state;
    try {
      return {
        size:'small',
        pageSize: 10, //每页长度
        current: this.state.pagecode3, //当前页码
        // total: checkedData.app_privacy_behavior_list.length, //数据总条数
        total: tablelength,
        onChange: this.codeChnage3 //页码改变时候回调
      };
    } catch (error) {
      console.error(error)
    }
  };
  // 分页页数改变函数  current表示当前页码
  codeChnage3 = (current) => {this.setState({pagecode3: current})};
  // 点击创建 创建检测任务
  createDetection =async (id) => {
    this.setState({
      startDetection:true,
    })
    const {hash} = window.location;
    let ids = hash.replace('#check=','')
   await this.props.detectionApk(ids);
   this.setState({
    current_task_id:this.props.detectionApkTaskId,
    detectionState:1,
   },()=>{
     this.getDetectionState();
   })
  }
  // 定时器 每隔3秒获取 检测的状态 老流程 待废弃
  getDetectionState = () => {
    const {hash} = window.location;
    let id = hash.replace('#check=','');
    this.timer = setInterval(async ()=>{
      try {
        let {data:{data}} =  await axios.get('/appguard/privacy/application/state',{params:{app_id:id}});
        // console.log("获取状态的data",data)
        let detectionState = data.start;
        this.setState({
         detectionState
        })
        if(data.start){
          this.setState({
            new_task_state:data.task_state
          })
        }
        if(data.task_state === 3){
          let detectionData =  await this.props.CheckedData({app_id:id});
          this.setState({
           checkedData:detectionData
          })
        }
      } catch (error) {
        if(error.response){
          let msg = get(error.response,'data.msg','数据获取失败');
          message.error(msg);
        }else{
          message.error('数据获取失败!');
        }
      }  
    },5000)
  }
  // 提交报告
  submitReport =async () => {
    try {
      const {data} =  await axios.post('/appguard/privacy/application/form/submit',{app_id:this.state.app_id})
      let code = get(data,'code','');
      if(code === 1){
        // console.log("提交报告数据",data);
        message.success('提交成功')
        this.props.report(this.state.app_id);
      }
    } catch (error) {
      if(error.response){
        let msg = get(error.response,'data.msg','数据获取失败');
        Modal.error({
          title: '提交失败',
          content: msg,
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
        // message.error(msg);
      }else{
        message.error('数据获取失败!');
      }
    }
  }
  // 申请权限筛选
  applyPowerChange=(e)=>{
    this.setState({
      applyPowerValue:e.target.value,
      pagecode:1
    })
  }
  // 隐私行为筛选
  applyPowerChange2=(e)=>{
    this.setState({
      applyPowerValue2:e.target.value,
      pagecode3:1
    },()=>{
    })
  }
  // 控制视频是否弹出
  cancel = (flag=false,hasvideo)=> {
    if(!hasvideo){
      message.warning("视频还未生成，请稍后");
    }else{
      this.setState({flag})
    }
  }
  componentDidUpdate = (value)=> {
    if(this.state.new_task_state===3){
      clearInterval(this.timer);
    }
  }
  // 点击配置 控制存证编辑页面的弹出
  clickUpdata = (e,flag,id,remarks) => {
    e.stopPropagation();
    this.setState({
      obtainEvidence:flag,
      dataid:id,
      Bigremark:remarks,
    })
  }
  // 点击查看
  clicksee = (e,flag,id,remarks) => {
      e.stopPropagation();
      this.setState({
        showSeeModal:flag,
        dataid:id,
        Bigremark:remarks
      })
  }
  // sdk 筛选
  SdkSortChange = (sdkValue) => {
    this.setState({
      sdkValue
    })
  }
  // sdk 筛选封装函数
  sdkFilter = (app_privacy_behavior_list,sdkValue) =>{
    let oldKeyarr =[]
    app_privacy_behavior_list.forEach((item)=>{
      item.call_function_info.forEach((items)=>{
      if(items.SDK === sdkValue ){
        oldKeyarr.push(item.key)
      }
      })
    })
    let keyarr = [...new Set(oldKeyarr)];
    let sdkArr= app_privacy_behavior_list.filter((item)=>{
      return keyarr.indexOf(item.key) !== -1
    })
    if(sdkValue !== "allSdk"){
      return sdkArr
    }else{
      return app_privacy_behavior_list
    }
  }
  // 点击展开行
  open = (record) => {
    return (e) => {
      // console.log("event",e.target.classList.value);
      let isSelect = get(e,"target.classList.value",'');
      console.log("isSelect",isSelect)
      if(/ant-select/.test(isSelect)){
        return false
      }
      const {arr} = this.state;
      let key = arr;
      const {checkedData={}} = this.state || this.props;
      let { app_Violationsmessage_list=[] } = checkedData;
      let list = app_Violationsmessage_list.filter((item)=>{
          return item.out !== true
      });
      let index = record.key - 1;
      let id = record.ids
      console.log("id",id)
      if (id > 0) {
        key.push(record.key);//点击的每一行的key的值保存下来。
        this.setState({
          arr: key
        })
        list[index].ids  = list[index].ids - 10000;
        list.splice(0, 0, {key:'审查类一',question_desc:'以下行为可被认定为"未公开收集使用规则"',out:true});
        list.splice(5, 0, {key:'审查类二',question_desc:'以下行为可被认定为"未明示收集使用个人信息的目的、方式和范围"',out:true});
        list.splice(10, 0, {key:'审查类三',question_desc:'以下行为可被认定为"未经用户同意收集使用个人信息"',out:true});
        list.splice(20, 0, {key:'审查类四',question_desc:'以下行为可被认定为"违反必要原则，收集与其提供的服务无关的个人信息"',out:true});
        list.splice(27, 0, {key:'审查类五',question_desc:'以下行为可被认定为"未经同意向他人提供个人信息"',out:true});
        list.splice(31, 0, {key:'审查类六',question_desc:'以下行为可被认定为"未按法律规定提供删除或更正个人信息功能”或“未公布投诉、举报方式等信息"',out:true});
        checkedData.app_Violationsmessage_list = list;
        this.setState({
          checkedData
        })
        console.log("checkedData",checkedData)
      } 
      else if (id < 0) {
        key.splice(key.indexOf(record.key), 1);//再次点击的时候从数组删除上次存入的key值。
        this.setState({
        arr: key
        })
        list[index].ids  = list[index].ids + 10000;
        list.splice(0, 0, {key:'审查类一',question_desc:'以下行为可被认定为"未公开收集使用规则"',out:true});
        list.splice(5, 0, {key:'审查类二',question_desc:'以下行为可被认定为"未明示收集使用个人信息的目的、方式和范围"',out:true});
        list.splice(10, 0, {key:'审查类三',question_desc:'以下行为可被认定为"未经用户同意收集使用个人信息"',out:true});
        list.splice(20, 0, {key:'审查类四',question_desc:'以下行为可被认定为"违反必要原则，收集与其提供的服务无关的个人信息"',out:true});
        list.splice(27, 0, {key:'审查类五',question_desc:'以下行为可被认定为"未经同意向他人提供个人信息"',out:true});
        list.splice(31, 0, {key:'审查类六',question_desc:'以下行为可被认定为"未按法律规定提供删除或更正个人信息功能”或“未公布投诉、举报方式等信息"',out:true});
        checkedData.app_Violationsmessage_list = list;
        this.setState({
          checkedData
        })
      }

    }
  }
  playVideo = (startTime) => {
     this.setState({flag:true},()=>{
        let newStartTime = startTime - 4;
        if(newStartTime < 0) {
          newStartTime = 0
        }
        setTimeout(()=>{
          let myVid=document.getElementById("myvideo");
          // console.log("myVid",myVid)
          myVid.currentTime = newStartTime;
          myVid.play();
          setTimeout(()=>{
            myVid.pause();
          },4000)
        },500)
     });
  }
  goTOUPpdate = () =>{
    // alert("11")
    this.setState({
      showSeeModal:false,
      obtainEvidence:true,
    })
  } 
  render(){
    if(this.state.new_task_state===3){
      clearInterval(this.timer);
    }
    const {loading,detectionState,applyPowerValue,applyPowerValue2,flag,dataid,Bigremark,sdkValue} = this.state;
    const {checkedData={}} = this.state || this.props;
    let appVersion = checkedData.appVersion
    // 基础信息的数据
    let icon = get(checkedData,'icon',"");
    let video_url = get(checkedData,'video_url',"");  // 视频链接
    let use_sdk_list = get(checkedData,'use_sdk_list',[]);  // 视频链接
    let appName = get(checkedData,'appName',"");
    let company_name = get(checkedData,'company_name',"");
    let industry = get(checkedData,'industry',"");
    let appType = get(checkedData,'appType',"");
    let area_name = get(checkedData,'area_name',"");
    let newArewName = area_name
    if(area_name.length>14){
      newArewName = area_name.slice(0,14) + '...'
    }
    let contactName = get(checkedData,'contactName',"");
    let contactPhone = get(checkedData,'contactPhone',"");
    // 判断有无视频
    let hasvideo = true;
    if(!video_url){
      hasvideo= false
    }
    // 版本号处理
    if(appVersion){
      // 对版本号 进行处理
       if(appVersion.indexOf('v') === -1){
        appVersion = "v" + appVersion;
      }
      if(appVersion.indexOf('(') !== -1){
        let num = appVersion.indexOf('(');
        appVersion = appVersion.substr(0,num)
        // console.log("88888888888",num,appVersion);
      }
    }
    let {app_permission_list=[],app_Violationsmessage_list=[],app_privacy_behavior_list=[]} = checkedData;
    if(!Array.isArray(app_permission_list)){
      app_permission_list = [];
    }
    if(!Array.isArray(app_privacy_behavior_list)){
      app_privacy_behavior_list = [];
    }
    // 防止描述被隐藏
    let descobj = { position:'relative',top:-37,width:753}
    // 前端分类筛选的数据
    let commonpower = app_permission_list.filter((item)=>{return item.level ===1})
    let commonpower2 = app_permission_list.filter((item)=>{return item.level ===2})
    let commonpower3 = app_permission_list.filter((item)=>{return item.level ===3})
    let commonpower4 = app_permission_list.filter((item)=>{return item.level ===4})
    let commonpower5 = app_permission_list.filter((item)=>{return item.level ===5})
    // 重新排序
    app_permission_list =commonpower3.concat(commonpower2).concat(commonpower).concat(commonpower4).concat(commonpower5)
    let behavier = app_privacy_behavior_list.filter((item)=>{return item.level ===1})
    let behavier2 = app_privacy_behavior_list.filter((item)=>{return item.level ===2})
    let behavier3 = app_privacy_behavior_list.filter((item)=>{return item.level ===3})
    let behavier4= app_privacy_behavior_list.filter((item)=>{return item.level ===4})
    app_privacy_behavior_list = behavier3.concat(behavier2).concat(behavier).concat(behavier4);
    // 隐私行为 sdk 筛选
    if(sdkValue !== "allSdk"){
      app_privacy_behavior_list = this.sdkFilter(app_privacy_behavior_list,sdkValue);
    }
    // 隐私行为 sdk 筛选  结束
    let tablelength = "",tablelength2="";
    if(applyPowerValue===1){
      app_permission_list = commonpower;
      tablelength = commonpower.length;
    }
    if(applyPowerValue===2){
      app_permission_list = commonpower2
      tablelength = commonpower2.length;
      if(commonpower2.length===0){
        descobj = {marginBottom:50,width:753,marginTop:20}
      }
    }
    if(applyPowerValue===3){
      app_permission_list = commonpower3
      tablelength = commonpower3.length;
      if(commonpower3.length===0){
        descobj = {marginBottom:50,width:753,marginTop:20}
      }
    }
    if(applyPowerValue===4){
      app_permission_list = commonpower4
      tablelength = commonpower4.length;
      if(commonpower4.length===0){
        descobj = {marginBottom:50,width:753,marginTop:20}
      }
    }
    if(applyPowerValue===5){
      app_permission_list = commonpower5
      tablelength = commonpower5.length;
      if(commonpower5.length===0){
        descobj = {marginBottom:50,width:753,marginTop:20}
      }
    }
    let descobj2 ={position:'relative',top:-39,width:753}
    if(applyPowerValue2===1){
      app_privacy_behavior_list = behavier
      if(sdkValue !== "allSdk" && behavier4.length !==0){
        app_privacy_behavior_list = this.sdkFilter(behavier,sdkValue);
      }
      tablelength2 = app_privacy_behavior_list.length;
      if(behavier.length===0){
        descobj2 = {marginBottom:60,marginTop:10,width:753}
      }
    }
    if(applyPowerValue2===2){
      app_privacy_behavior_list = behavier2
      if(sdkValue !== "allSdk" && behavier4.length !==0){
        app_privacy_behavior_list = this.sdkFilter(behavier2,sdkValue);
      }
      tablelength2 = app_privacy_behavior_list.length;
      if(behavier2.length===0){
        descobj2 = {marginBottom:60,marginTop:10,width:753}
      }
    }
    if(applyPowerValue2===3){
      app_privacy_behavior_list = behavier3;
      if(sdkValue !== "allSdk" && behavier4.length !==0 ){
        app_privacy_behavior_list = this.sdkFilter(behavier3,sdkValue);
      }
      tablelength2 = app_privacy_behavior_list.length;
      if(behavier3.length===0){
        descobj2 = {marginBottom:60,marginTop:10,width:753}
      }
    }
    if(applyPowerValue2===4){
      app_privacy_behavior_list = behavier4
      if(sdkValue !== "allSdk" && behavier4.length !==0 ){
        app_privacy_behavior_list = this.sdkFilter(behavier4,sdkValue);
      }
      tablelength2 = app_privacy_behavior_list.length;
      if(behavier4.length===0){
        descobj2 = {marginBottom:60,marginTop:10,width:753}
      }
    }
    // console.log("隐私行为table筛选数据",applyPowerValue2,app_privacy_behavior_list)
    if(!Array.isArray(app_Violationsmessage_list)){
      app_Violationsmessage_list = [];
    }
    // App违法违规收集使用个人信息行为认定（共计31项，其中待审查31项，通过0项，未通过0项）
    // 待审查的数量
    let waitCount = app_Violationsmessage_list.filter((item)=>{
      return item.option === 0
    }).length
    // 为通过的数量
    let nocheckedCount = app_Violationsmessage_list.filter((item)=>{
      return item.option === 1
    }).length
    // 通过的数量
    let checkedCount = 31-nocheckedCount-waitCount
    // 申请权限
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
      {title:'权限描述',dataIndex:'txt',key:'txt',align:'left',render:(txt)=>{
       if(txt.length>25){
        let newtxt =  txt.substr(0,4)
        //  console.log('我是txt',txt,newtxt)
        return <Tooltip title={txt}>
         <span>{newtxt}...</span>
        </Tooltip>
       }else{
         return <span>{txt}</span>
       }
      }},
      {title:'权限名称',dataIndex:'permission_key',key:'permission_key',align:'left'},
      {title:'风险等级',dataIndex:'level',key:'level',align:'center',render:(text)=>{
         let level = '未知权限'
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
    // 31项 columns2
    const columns2 = [
      {title:'序号',dataIndex:'key',key:'a',align:'center',width:100},
      {title:'问题描述',dataIndex:'question_desc',key:'question_desc',align:'left'}, 
      // {title:'审查建议',dataIndex:'',key:"addvise",align:'center',width:100},
      {title:'审查操作',dataIndex:'option',key:'option',align:'center',
       render:(text,record)=>{
         let color = this.state.color;
         if(text ===1){
           color = "#F5222D"
         }
         if(text === 2){
          color = "#52C41A"
        }
        if(record.out){
          return null
        }else{
          return(
            <div>
              <Select data-expanded = {false}  defaultValue={text}  style={{ width:96,color:color }} onChange={(value)=>this.handleChange2(value,record.id,record.type)}>
                <Option value={0}>未审核</Option>
                <Option value={1}>未通过</Option>
                <Option value={2}>通过</Option>
              </Select>
            </div>
          )
        }
       }
      },
      {title:'存证/记录',dataIndex:'',key:'recode',align:'center',render:(text,record)=>{
        if(record.out){
          return null
        }
        return (<div style={{paddingLeft:10,minWidth:120}}>
          <span 
            style={{color:'#0084ff',marginRight:10,cursor:'pointer'}}
            onClick={(e)=>this.clickUpdata(e,true,record.key,record.remark)}
          >
            存证
          </span>
          <span 
            style={{color:'#0084ff',marginRight:10,cursor:'pointer'}}
            onClick={(e)=>this.clicksee(e,true,record.key,record.remark)}
          >
            查看
          </span>
        </div>)
      }},
      {title:'',key:'nulls',align:'center',render:(text,record)=>{
        if(record.out){
          return null
        }
        return record.id > 0 ? <Icon type="right" style={{color:"e6e6e6"}}/>:<Icon type="down" style={{color:"e6e6e6"}}/>
      }}
    ]
    // 隐私行为
    const column =[
      {
        title:'序号',
        key:'num',
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
      {title:'风险等级',dataIndex:'level',key:'level',align:'center',render:(text)=>{
        let level = '中'
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
         <div style={{minWidth:70}}>{level}</div>
        )
     }},
      {title:'授权时间',dataIndex:'accredit_info',key:'time',align:'center',render:(text)=>{
        if(Object.keys(text).length !== 0){
          let time_str = text.time_str;
          let result = text.result;
          let yearTime = moment(time_str).format("YYYY-MM-DD");
          let dayTime = moment(time_str).format("HH:mm:ss:SSS");
          if(result === -1){
            return <span>授权拒绝 {dayTime}</span>
          }
          return (<span>授权通过  {dayTime}</span>);
        }
        else{
          return <span>--</span>
        }
      }},
      {title:'调用函数',dataIndex:'call_function_info',width:550,key:'call_function',align:'center',render:(text)=>{
        if(Array.isArray(text)){
          let texts = text
          if(sdkValue !== "allSdk"){
            texts = text.filter((item)=>{
              return item.SDK === this.state.sdkValue
            })
          }
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
                      <div className="functionTime" style={obj2} onClick={()=>this.playVideo(item.start_seconds)}>
                        {flag?null:<span style={{color:'#666',marginRight:5}}>[{indexs}]</span>}<span style={{marginRight:-3}}>时间：</span>{dayTime}<Icon  style={{marginLeft:10}} type="play-circle" theme="twoTone" /><br/></div>
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
        {/* 存证界面弹出 添加存证图片 视频 备注 */}
        {this.state.obtainEvidence?
        <AddImgandremarks  
          clickUpdata={(e)=>this.clickUpdata(e)} 
          dataid={dataid} 
          Bigremark={Bigremark}
          CheckedAction = {this.props.CheckedAction}
          />
          :
          null
        }
        {/* 查看存证 和编辑的弹框*/}
        {this.state.showSeeModal ?
        <SeeImgandremarks 
          clickUpdata={(e)=>this.clicksee(e)} 
          dataid={dataid}
          Bigremark={Bigremark}
          goTOUPpdate = {this.goTOUPpdate}
          />
          :
          null
        }
        {/* 播放完整视频 */}
        {flag?<div>
            <Modal
             wrapClassName="playVideo"
             footer={null}
             title=""
             width={337}
             visible={true}
             centered={true}
             onCancel = {()=>{this.cancel(false,true)}}
            >
              <video id="myvideo" src={video_url} controls={true} height='600' width='337'
                poster ={true}
              >
              </video>
            </Modal>
          </div>:null}
        <div className="ApplicationChecked">
          <div className='returnbutton'>
            <div>
              <Button icon="rollback" onClick={this.returnHome.bind(this,false)}>返回列表</Button>    
            </div>
             <div className="powerMessage">{ this.props.powerTitle}</div>
          </div>
          <Divider style={{position:'relative',top:'0px'}} />
          {/* apk基础信息 */}
          <div className='headmessage'>
                <div className='msgbox'>
                  <div className=" item1">
                    <img src={icon} alt=""/>
                  </div>
                  <div className='item item2'>
                    <div><span className='blads'>应用名称：</span>{appName} {appVersion}</div>
                    <div ><span className='blads'>归属组织：</span>{company_name}</div>
                    <div><span className='blads'>应用类型：</span>{industry}</div>
                  </div>
                  <div className='item item3'>
                    <div><span className='blads'>系统类型：</span>{appType}</div >
                    <div><span className='blads'>归属地区：</span><Tooltip title={area_name}>{newArewName}</Tooltip></div>
                    <div ><span className='blads'>负责人员：</span>{contactName}/{contactPhone}</div>
                  </div>
                </div>
          </div>
          {/* 申请权限 */}
          <div className='applypower'>
            <div className='titles'>申请权限</div>
            <div style={{marginTop:10,marginBottom:20}}>
              <Radio.Group className="radioWord" defaultValue='all' onChange={this.applyPowerChange}>
                <Radio.Button value="all">全部</Radio.Button>
                <Radio.Button value={1}>普通权限</Radio.Button>
                <Radio.Button value={2}>危险权限</Radio.Button>
                <Radio.Button value={3}>禁止权限</Radio.Button>
                <Radio.Button value={4}>未分配权限</Radio.Button>
                <Radio.Button value={5}>未知权限</Radio.Button>
              </Radio.Group>
            </div>
            <Table
              // bordered
              className="applyPowerTable"
              key='22'
              columns={columns}
              dataSource={app_permission_list}
              pagination={this.paginations(tablelength)}
              tableLayout='fixed'
            >
            </Table>
            <p className='' 
            style={descobj}
            
            >（说明：通过反编译解析APK文件中AndroidManifest.xml文件，提取APP所申请的权限信息；根据审查条例，APP不能申请与业务无关的权限）</p>
          </div>
          {/* 隐私行为 */}
          <div className='privacyBehavior' style={{marginBottom:24,marginTop:-24,position:'relative'}}>
            <div className='titles'>隐私行为</div>
            <div style={{marginTop:10,marginBottom:20}}>
              <Radio.Group key="11" defaultValue='all' onChange={this.applyPowerChange2} style={{marginRight:30}}>
                <Radio.Button value="all">全部</Radio.Button>
                <Radio.Button value={1}>普通行为</Radio.Button>
                <Radio.Button value={2}>危险行为</Radio.Button>
                <Radio.Button value={3}>禁止行为</Radio.Button>
                <Radio.Button value={4}>未分配行为</Radio.Button>
              </Radio.Group>
              <Select defaultValue="allSdk" style={{ width: 100 }} onChange={this.SdkSortChange}>
                <Option value="allSdk">全部SDK</Option>
                {use_sdk_list.map((item,index)=>{
                return <Option key={index} value={item}>{item}</Option>
                })}
              </Select>
            </div>
            <div className="palyVideo" onClick={()=>{this.cancel(true,hasvideo)}}>播放完整录屏 <Icon type="play-circle" theme="twoTone" /></div>
            {/* isdetectionSuccess  老流程 */}
            {this.state.new_task_state === 3 ?
            (<div className='ys'>
              <Table
              //  bordered
                key = 'best_test333'
                pagination = {this.paginations3(tablelength2)}
                dataSource={app_privacy_behavior_list}
                columns={column}
              />
              <p className='' style={descobj2}>（说明：通过定制手机对系统敏感API接口进行监控，在APP运行时，对应用的隐私行为进行实时监控并记录存证）</p>
            </div>):
            <div className='hideTabel'>
              <Table
                key='23'
                columns={column}
              >
              </Table>
              <div className='detection'>
                {detectionState?null:<div className="start-title"> <img src="/images/waitys.png" alt="" style={{marginBottom:15}}/><br/> 任务已下发至终端手机，待检测！</div>}
                {detectionState?<div>
                {this.state.new_task_state === -1?<Fail createDetection ={this.createDetection}></Fail>:null}
                {this.state.new_task_state === 1?<Detectioning></Detectioning>:null}
                </div>:null}
              </div>
              <p className='' style={{position:'relative',top:-30,width:753,marginTop:35}}>（说明：通过定制手机对系统敏感API接口进行监控，在APP运行时，对应用的隐私行为进行实时监控并记录存证）</p>
            </div>}
          </div>
          <div className='action action2'>
            <div className='titles'>App违法违规收集使用个人信息行为认定（共计31项，其中待审查{waitCount}项，通过<span style={{color:'green'}}>{checkedCount}</span>项，未通过<span style={{color:'red'}}>{nocheckedCount}</span>项）</div>
            <Table
              onRow={record => {
              return {
                onClick: this.open(record)
              };
              }}
              key='24'
              // tableLayout='fixed'
              columns={columns2}
              // expandIconColumnIndex={5}
              // rowSelection
              dataSource={app_Violationsmessage_list}
              pagination={this.paginations2()}
              rowClassName = {(record,index)=>{
               return record.out===true?'tableRowTitle':'clickClassName'
              }}
              onExpand = {(expanded, record)=>{
                console.log("onExpand",expanded, record)
              }}
              expandedRowKeys = {this.state.arr}
              // 点击小图标 出现下拉内容
              expandedRowRender={record =>
               <div style={{ margin: 0 }} className="tableselce">
                <div className="firstdiv" style={{width:77,paddingLeft:11}}>审查依据</div>
                <div className="secoddiv">
                  {record.gists.map((item,index)=>{
                    let obj = {marginBottom:15}
                    if(record.gists.length === index+1){
                      obj ={}
                    }
                    return <div style={obj} key={index}>({index+1}) {item}</div>
                  })}
                </div>
                </div>}
              expandIcon={(record)=>{
                return null;
                if(record.record.out){
                  return null
                }
               return record.expanded ? <Icon type="down"  onClick={record.onExpand}/>:<Icon type="right"  onClick={record.onExpand}/>
             }}
            />
            <div style={{textAlign:'center',position:'relative',top:-10}}>
              <Button type='primary' style={{marginRight:30}} onClick={this.submitReport}>提交报告</Button>
              <Button  style={{marginRight:20}} onClick={this.returnHome.bind(this,true)}>保存退出</Button>
            </div>
          </div>
        </div>
      </Spin>
    )
  }
}
export default ApplicationChecked;