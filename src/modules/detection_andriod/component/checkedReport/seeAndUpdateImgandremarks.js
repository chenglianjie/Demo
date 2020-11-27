import React from 'react';
import {Modal,Icon,Input,Button, message } from "antd";
import "./updateAndSee.less";
import axios from '@/utils/request';
import {get} from "lodash";
const { TextArea } = Input;
class Updata extends React.Component {
  state = {
    previewVisible: false, //控制预览框的弹出
    previewImage: '',  //预览图片
    remarksList:[], //备注数组
    imgarr:[],      // 渲染的图片数组
    isUpdate:false, // 是否是编辑状态
    Bigremark:'', // 备注
  };
  // 关闭预览
  handleCancel = () => this.setState({ previewVisible: false });
  // 查看图片的预览图remarks
  handlePreview = (index) => {
    const {imgarr} = this.state;
    let previewImage = imgarr[index].base64_str;
    this.setState({
      previewImage,           // 预览图片
      previewVisible: true,   //是否显示预览框
    });
  };
  // 删除图片
  delectimg = (index) => {
    const {imgarr} = this.state;
    let new_imgarr = imgarr;
    new_imgarr.splice(index,1);
    this.setState({
      imgarr:new_imgarr
    })
  }
  // 修改备注
  remarks = (e,index) => {
    const {imgarr} = this.state;
    let newImgarr = imgarr;
    let remark = e.target.value;
    console.log("remark",remark)
    newImgarr[index].remark = remark;
    console.log("newImgarr",newImgarr)
    this.setState({
      imgarr:newImgarr
    })
  }
  // 获取查看数据 
  getShowData = () => {
    const {hash} = window.location;
    let app_id = hash.replace('#report=','');
    let key = this.props.dataid;
    axios.get("appguard/privacy/evidence/show",{params:{
      app_id,key
    }}).then((res)=>{
      console.log("获取结果res",res)
      if(res.data.code ===1){
        let data = res.data.data
        let imgarr = data.local_pic.concat(data.screenshot)
        this.setState({
          imgarr,
          Bigremark:data.remark
        },()=>{
          console.log("99999999",this.state.local_pic)
        })
      }
    }).catch((error)=>{
      if(error.response){
        let msg = get(error.response,'data.msg','数据获取失败');
        message.error(msg);
      }else{
        message.error('数据获取失败!');
      }
    })
  }
  componentDidMount = () => {
    this.getShowData();
  }
  // 改变成编辑状态
  changeUpdateState = () => {
    this.setState({
      isUpdate:true,
    })
  }
  // 回到查看状态
  returnSee = () => {
    this.setState({
      isUpdate:false,
    })
  }
  // 修改最后的备注
  BigremarkOnchange = (e) => {
    let value = e.target.value;
    this.setState({
      Bigremark:value
    })
  }
  // 编辑提交按钮
  finalSubmit = () => {
    const {Bigremark,imgarr} = this.state;
    const {hash} = window.location;
    let app_id = hash.replace('#report=','');
    let key = this.props.dataid;
    let obj = {app_id,key,imageInfo_list:imgarr,remark:Bigremark}
    axios.post("appguard/privacy/evidence/update",obj).then((res)=>{
      console.log("获取结果res",res)
      if(res.data.code ===1){
        message.success("更改成功")
      }
    }).catch((error)=>{
      if(error.response){
        let msg = get(error.response,'data.msg','数据获取失败');
        message.error(msg);
      }else{
        message.error('数据获取失败!');
      }
    })
  }
  render () {
    const { previewVisible, previewImage,isUpdate,imgarr,Bigremark} = this.state;
    let new_imgarr = imgarr;
    if(!Array.isArray(imgarr)){
      new_imgarr = [];
    }
    console.log("imgarr999",imgarr)
    return (
      <div className="edit">
        <Modal
           footer={null}
           title=""
           visible={true}
           centered={true}
           width={600}
           wrapClassName='see-modal'
           onCancel = {(e)=>{this.props.clickUpdata(e,false)}}
        >
          <div>
             {/* 预览图 弹框*/}
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            <div className="title">存证/记录详情</div>
            <div className="tabs">
              <div className="uploadimg" >
                {/* 本地图片 展示 */}
                <div  style={{display:'flex'}}>
                  <p className="title2">截图存证：</p>
                  <div className="localimgbox">
                  {/* 后台的图片渲染 */}
                  {new_imgarr.length === 0  ?<div className="no-log"><img style={{marginRight:5}} src="/images/no-log.png" alt=""/>暂无存证记录</div>:null}
                  {
                    new_imgarr.map((item,index)=>{
                      return(
                        <div key={index} className="localimg">
                          <div className="Mantle">
                            <img src={item.base64_str} alt=""/>
                            <span className="mark"></span>
                            <span className="action">
                             {isUpdate?<Icon type="delete" onClick={()=>this.delectimg(index)} style={{fontSize:18,marginRight:10,cursor:'pointer',color:'white'}} />:null}
                              <Icon type="eye-o" onClick={()=>this.handlePreview(index)} style={{fontSize:18,cursor:'pointer',color:'white'}}/>
                            </span>
                          </div>
                          {
                           isUpdate
                            ?
                            <div>
                            <Input placeholder="请输入备注" value={item.remark} onChange={(e)=>this.remarks(e,index)} style={{width:104,marginTop:10}}/>
                            </div>
                            :
                            <div>
                              {item.remark}
                            </div>
                          }
                        </div>
                      )
                    })}
                  </div>
                </div>
                {/* 录屏存证： */}
                <div  style={{display:'flex'}}>
                  <p className="title2">录屏存证：</p>
                  <div className="localimgbox no-log">
                  <img style={{marginRight:5,height:16,position:'relative',top:12}} src="/images/no-log.png" alt=""/>暂无存证记录
                  </div>
                </div>
                {/* 备注 */}
                <div style={{display:'flex'}}>
                  <p className="title2">备注：</p>
                  {Bigremark == "" && !isUpdate ? <div className="no-log no-log2"><img style={{marginRight:5,height:16}} src="/images/no-log.png" alt=""/>暂无存证记录</div>:null}
                  {isUpdate?
                  <TextArea
                   value={Bigremark}
                   onChange={this.BigremarkOnchange}
                  />
                  :
                  <div className="localimgbox">
                   {Bigremark}
                  </div>}
                </div>
                {/* 提交 编辑和取消按钮 */}
                {!isUpdate
                  ?
                  <div style={{marginTop:15}}>
                    {/* <Button onClick={this.changeUpdateState} style={{marginLeft:130,width:104,marginRight:142}}>编辑</Button> */}
                    <Button style={{width:107,marginLeft:222}} type="primary" onClick={(e)=>{this.props.clickUpdata(e,false)}}>关闭</Button>
                  </div>
                  :
                  <div style={{marginTop:15}}>
                    <Button onClick={this.returnSee} style={{marginLeft:130,width:104,marginRight:142}}>取消</Button>
                    <Button style={{width:104}} type="primary" onClick={this.finalSubmit}>确认</Button>
                  </div>
                }
              </div>
            </div>
          </div> 
        </Modal>
      </div>
    )
  }
}

export default Updata
