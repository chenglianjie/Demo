import React from 'react';
import {Modal, Tabs,Upload, Icon,Input,Button,Checkbox, message, Spin } from "antd";
import Systemalbums from "./Systemalbum" //系统相册
import "./style/edit.less";
import axios from '@/utils/request';
import {get, isArray} from "lodash"
const { TabPane } = Tabs;
const { TextArea } = Input;
class Edit extends React.Component {
  state = {
    loading:false,  //控制loading状态
    loadings:false, // 控制系统相册的loading状态
    previewVisible: false,  //控制预览框是否弹出
    previewImage: '',       //预览图片的url
    Systemalbum:false,     //控制系统相册是否弹出
    SystemalbumimgData:[],  //获取后台系统相册的图片数组
    noquest:true,           // 是否请求 系统图片的数据
    remarkObj:{},         // 提交到后台的备注对象
    localImgListArr:[],    // 本地图片要拿来渲染的和上传的
    systemImgListArr:[],    // 系统图片要拿来渲染的和上传的
    remark:'',             // 备注
  };
  // 获取已经存证的数据 初始化渲染的数据
  getShowData = async () => {
    this.setState({loading:true})
    const {hash} = window.location;
    let app_id = hash.replace('#check=','');
    let key = this.props.dataid;
    await axios.get("appguard/privacy/evidence/show",{params:{
      app_id,key
    }}).then((res)=>{
      console.log("获取结果res",res)
      if(res.data.code ===1){
        let data = res.data.data;
        let  localImgListArr = JSON.parse(JSON.stringify(this.state.localImgListArr))
        localImgListArr =localImgListArr.concat(data.local_pic);
        let  systemImgListArr = JSON.parse(JSON.stringify(this.state.systemImgListArr))
        systemImgListArr =systemImgListArr.concat(data.screenshot);
        let remark = data.remark
        this.setState({
          localImgListArr,
          systemImgListArr,
          remark
        })
      }
    }).catch((error)=>{
      if(error.response){
        let msg = get(error.response,'data.msg','数据获取失败');
        message.error(msg);
      }else{
        message.error('数据获取失败!');
      }
      this.setState({loading:false})
    })
    this.setState({loading:false})
  }
  componentDidMount(){
    this.getShowData();
  }
  // 关闭预览图
  handleCancel = () => this.setState({ previewVisible: false });
  // 查看本地图片的预览图
  handlePreview = (index) => {
    const {localImgListArr} = this.state;
    let previewImage = localImgListArr[index].base64_str;
    this.setState({
      previewImage, // 预览图片
      previewVisible: true,   // 是否显示预览框
    });
  };
  // 查看系统图片的预览图
  handlesystemPreview = (index) => {
    const {systemImgListArr} = this.state;
    let previewImage = systemImgListArr[index].base64_str;
    this.setState({
      previewImage, // 预览图片
      previewVisible: true,   // 是否显示预览框
    });
  };
  // 删除本地图片
  delectimg = (index) => {
    const {localImgListArr} = this.state;
    let newimglist = JSON.parse(JSON.stringify(localImgListArr))
    newimglist.splice(index, 1); 
    this.setState({
      localImgListArr:newimglist
    });
  }
  // 删除系统相册图片 
  delectsystemimg = (index) => {
    const {systemImgListArr,SystemalbumimgData} = this.state;
    let newimglist = JSON.parse(JSON.stringify(systemImgListArr))
    newimglist.splice(index, 1);
    // 删除过后 系统图片里 is-check要变成0
    SystemalbumimgData.filter((item)=>{
      let idList = newimglist.map(v=>v.uid)
      if(idList.includes(item.uid)){
        item.is_check = 1
      }else{
        item.is_check = 0
      }
    })
    console.log("用户选择的图片",newimglist)
    console.log("全部的系统图片",SystemalbumimgData)
    this.setState({
      systemImgListArr:newimglist,
      SystemalbumimgData
    });
  }
  // 将本地上传的图片转化成base64 然后存到state
  beforeUpload =(file)=> {
    // console.log("file",file)
    if(!/image/.test(file.type)){
      message.warning("请上传正确的图片格式！")
      return false;
    }
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      }).then((favimgbase64)=>{
        // console.log("base64",favimgbase64);
        let  localImgListArr = JSON.parse(JSON.stringify(this.state.localImgListArr))
        let  obj = {base64_str:favimgbase64,remark:''};
        localImgListArr.push(obj);
        this.setState({
          localImgListArr
        })
      });
      return false;  // 阻止上传
  }
  // 点击系统相册上传框
  clickSystemalbum =async (flag) => {
    this.setState({
      Systemalbum:flag,
    })
    const {noquest} = this.state
    const {hash} = window.location;
    let app_id = hash.replace('#check=','');
    this.setState({loadings:true})
    try {
      if(noquest){
      await axios.get("appguard/privacy/evidence/screenshot/list",{params:{
          app_id,
          key:this.props.dataid
        }}).then((res)=>{
          console.log("系统相册data",res.data.data)
          // res.data.data.map((item)=>{
          //   item.remark = ""
          // });
          this.setState({
            SystemalbumimgData:res.data.data
          })
        })
      }
    } catch (error) {
      if(error.response){
        let msg = get(error.response,'data.msg','系统相册获取失败')
        message.error(msg);
      }else{
        message.error('系统相册获取失败!');
      }
      this.setState({loadings:false})
    }
    this.setState({loadings:false})
  }
  // 传给系统相册组件 改变SystemalbumimgData
  changeSystemalbumimgData = (SystemalbumimgData)=>{
    this.setState({
      SystemalbumimgData,
      noquest:false,
    })
  }
  // 从系统相册 返回到上传界面
  return = () => {
    this.setState({
      Systemalbum:false
    })
  }
  // 本地图片备注修改
  remarks = (e,index) => {
    let value = e.target.value
    let localImgListArr = JSON.parse(JSON.stringify(this.state.localImgListArr));
    localImgListArr[index].remark = value
    this.setState({
      localImgListArr
   })
  }
  // 去掉不唯一的key
  verse=(arrs) => {
      return arrs.reduce((r, c, index)=>{
        if(arrs.indexOf(c) !== arrs.lastIndexOf(c)) {
          return r;
        }
        return [...r,c];
      }, []);
  }
  // 提交上传图片 函数
  imgsubmit =async () => {
    const {hash} = window.location;
    // 最后一个备注的提交
    const  {localImgListArr,systemImgListArr,remarkObj,remark} = this.state;
    let app_id = hash.replace('#check=','');
    let key = this.props.dataid;
    let obj ={app_id,key,localImgListArr,systemImgListArr};
    // 存证备注提交
    remarkObj.type = "violation_behavior_option";
    remarkObj.app_id =app_id;
    remarkObj.key = key;
    remarkObj.remark = remark;
    this.props.CheckedAction(remarkObj);
     // 存证备注提交 end
    // 上传图片的接口
    await axios.post('appguard/privacy/evidence/picture/upload',obj).then((res)=>{
      message.success(res.data.msg);
    }).catch((error)=>{
      if(error.response){
        let msg = get(error.response,'data.msg','上传错误')
        message.error(msg);
      }else{
        message.error('上传错误!');
      }
    });
  }
  // 系统相册选择的图片 更新到父组件的state
  childimg = (systemImgListArr) => {
    this.setState({
      systemImgListArr
    })
  }
  // 系统备注onchange 函数
  systemRemarkOnchange = (e,index) => {
    let  systemImgListArr = JSON.parse(JSON.stringify(this.state.systemImgListArr));
    let value = e.target.value;
    systemImgListArr[index].remark = value;
    this.setState({
      systemImgListArr
    });
  }
  // 取消图片上传
  cancelImgupdate = () => {
    const { SystemalbumimgData } = this.state;
    SystemalbumimgData.map((item)=>{
      item.is_check = 0
    })
    this.setState({
      localImgListArr:[],
      systemImgListArr:[],
      SystemalbumimgData
    })
  }
  // 存证备注 失焦事件
  remarksonBlur =async (e) => {
    let remark = e.target.value;
    let obj ={};
    const {hash} = window.location;
    let app_id = hash.replace('#check=','');
    obj ={app_id,remark}
    obj.key = this.props.dataid;
    obj.type = "violation_behavior_option";
    console.log("失焦时间提交到后台的参数",obj);
    this.setState({
      remarkObj:obj,
      remark
    })
  }
  // 提交最后tabbar的存证备注
  submitRmark = () => {
    const {remarkObj,remark} = this.state;
    if(remark){
      this.props.CheckedAction(remarkObj);
    }else{
      message.warning("提交内容不能为空！")
    }
  }
  render () {
    const { previewVisible, previewImage,Systemalbum,SystemalbumimgData,localImgListArr,systemImgListArr,loading} = this.state;
    return (
      <div className="edit">
        <Modal
           footer={null}
           title=""
           visible={true}
           centered={true}
           width={600}
           wrapClassName='edit-modal'
           onCancel = {(e)=>{this.props.clickUpdata(e,false)}}
        >
         {Systemalbum ? 
          <Systemalbums 
            changeSystemalbumimgData = {this.changeSystemalbumimgData}
            clickSystemalbum={this.clickSystemalbum}  
            key = {this.props.dataid}
            SystemalbumimgData={SystemalbumimgData}
            childimg= {this.childimg}
            return = {this.return}
            loadings= {this.state.loadings}
          />
         :
          <Spin spinning={loading}>
            <div>
            <div className="title">存证</div>
            <div className="tabs">
            <Tabs defaultActiveKey="1" tabBarGutter={140}>
            <TabPane tab="截图存证" key="1">
               {/* <Spin></Spin> */}
              <div className="uploadimg" >
                <div style={{display:'flex',marginBottom:24}}>
                  <div className="title2">上传截图：</div>
                  {/* 系统截图选取 */}
                  <div  className="uploadcard" onClick={this.clickSystemalbum.bind(this,true)}>
                    <div className="icon">
                      <Icon type="plus" />
                    </div>
                    <div>截屏图片</div>
                  </div>
                  {/* 本地图片上传 */}
                  <div>
                    <Upload
                      accept="image/*"
                      multiple={true}         //支持批量上传
                      showUploadList={false}
                      beforeUpload={this.beforeUpload} // 上传 拦截函数
                    >
                      {/* 自定义样式的上传框 */}
                      <div  className="uploadcard">
                        <div className="icon"><Icon type="plus" />
                        </div><div>本地图片</div>
                      </div>
                    </Upload>
                    {/* 预览图 */}
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
                </div>
                {/* 系统图片展示 */}
                <div  style={{display:'flex'}}>
                  <p className="title2">截屏图片：</p>
                  <div className="localimgbox">
                  {
                    systemImgListArr.length === 0 
                    ?
                    <div style={{paddingTop:39}}>
                      <img style={{marginRight:5,position:'relative',top:-2}} src="/images/no-log.png" alt=""/>暂无存证记录
                    </div>
                    :
                    null
                  }
                  {systemImgListArr.map((item,index)=>{
                      return(
                        <div key={index} className="localimg">
                          <div className="Mantle">
                            <img src={item.base64_str} alt=""/>
                            <span className="mark"></span>
                            <span className="action">
                              <Icon type="delete" onClick={()=>this.delectsystemimg(index)} style={{fontSize:18,marginRight:10,cursor:'pointer',color:'white'}} />
                              <Icon type="eye-o" onClick={()=>this.handlesystemPreview(index)} style={{fontSize:18,cursor:'pointer',color:'white'}}/>
                            </span>
                          </div>
                          <div>
                            <Input
                              onChange = {(e)=>{this.systemRemarkOnchange(e,index)}} 
                              placeholder="备注" 
                              value={item.remark}
                              // onBlur={(value)=>this.systemremarks(value,index)} 
                              style={{width:104,marginTop:10}}/></div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                {/* 本地图片 展示 */}
                <div  style={{display:'flex'}}>
                  <p className="title2">本地图片：</p>
                  <div className="localimgbox">
                  {
                    localImgListArr.length === 0 
                    ?
                    <div style={{paddingTop:39}}>
                      <img style={{marginRight:5,position:'relative',top:-2}} src="/images/no-log.png" alt=""/>暂无存证记录
                    </div>
                    :
                    null
                  }
                    {localImgListArr.map((item,index)=>{
                      return(
                        <div key={index} className="localimg">
                          <div className="Mantle">
                            <img src={item.base64_str} alt=""/>
                            <span className="mark"></span>
                            <span className="action">
                              <Icon type="delete" onClick={()=>this.delectimg(index)} style={{fontSize:18,marginRight:10,cursor:'pointer',color:'white'}} />
                              <Icon type="eye-o" onClick={()=>this.handlePreview(index)} style={{fontSize:18,cursor:'pointer',color:'white'}}/>
                            </span>
                          </div>
                          <div>
                            <Input placeholder="备注"
                              value={item.remark}  
                              onChange={(e)=>this.remarks(e,index)} 
                              style={{width:104,marginTop:10}}/>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                {/* 提交和取消按钮 */}
                <div style={{marginTop:15}}>
                  <Button onClick={this.cancelImgupdate} style={{marginLeft:130,width:104,marginRight:142}}>取消</Button>
                  <Button style={{width:104}} type="primary" onClick={this.imgsubmit}>提交</Button>
                </div>
              </div>
            </TabPane>
            <TabPane tab="录屏存证" key="2">
              <div style={{height:400,textAlign:'center',fontSize:18,paddingTop:170,color:'#999999'}}>
                暂未开放，敬请期待！
              </div>
            </TabPane>
            <TabPane tab="存证备注" key="3">
              <div className="edit-remarks" style={{display:'flex'}}>
                <div style={{marginLeft:20,width:50}}>备注：</div>
                <div>
                  <TextArea 
                    value={this.state.remark} 
                    style={{width:480,height:350}}
                    onChange = {this.remarksonBlur}
                    >
                  </TextArea>
                </div>
              </div>
              <div style={{marginTop:15}}>
                <Button style={{marginLeft:130,width:104,marginRight:142}}>取消</Button>
                <Button style={{width:104}}type="primary" onClick={this.imgsubmit}>提交</Button>
              </div>
            </TabPane>
          </Tabs>,
            </div>
          </div> 
          </Spin>
        }
        </Modal>
      </div>
    )
  }
}
export default Edit
