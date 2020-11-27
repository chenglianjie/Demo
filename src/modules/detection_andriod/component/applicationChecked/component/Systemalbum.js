import React from 'react';
import { Button, Checkbox,Modal,Icon, Spin} from "antd";
import moment from 'moment';
import axios from '@/utils/request';
import {get} from "lodash"
import "./style/Systemalbum.less"
// 系统相册组件
class Systemalbum extends React.Component {
  state = {
    onchangearr:[],  // onchange函数中选中的图片数组
    isOnchange:false,
    SystemalbumimgData:[],
    previewVisible:false,
    previewImage:''
  }
  // 多选框onchange事件
  CheckboxOnchange = (e,index) => {
    const {SystemalbumimgData} = this.props;
    let value = e.target.checked;
    SystemalbumimgData[index].is_check = value ? 1 : 0;
    console.log("onchange里面的SystemalbumimgData",SystemalbumimgData);
    this.props.changeSystemalbumimgData(SystemalbumimgData);
  }
  // 点击添加
  add = () => {
    const {SystemalbumimgData} = this.props;
    console.log("添加里面的SystemalbumimgData",SystemalbumimgData);
    let arr = SystemalbumimgData.filter((item)=>{
      return item.is_check === 1
      })
    console.log("else里面的arr",arr)
    this.props.childimg(arr);
    this.props.return();
  }
  // 查看图片的预览图remarks
  handlePreview = (index) => {
    const {SystemalbumimgData} = this.props;
    let previewImage = SystemalbumimgData[index].base64_str;
    this.setState({
      previewImage,           // 预览图片
      previewVisible: true,   //是否显示预览框
    });
  };
  // 关闭预览
  handleCancel = () => this.setState({ previewVisible: false });
  render () {
    const {SystemalbumimgData,loadings} = this.props;
    const {previewVisible, previewImage} = this.state;
    console.log("loadings",loadings)
    return (
      <Spin spinning={loadings}>
        <div className="Systemalbum">
              {/* 预览图 弹框*/}
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
              <div className="title">系统相册</div>
              <div className="time">2020/10/21</div>
              <div className="imgbox">
                {/* 一个盒子 */}
                {SystemalbumimgData.map((item,index)=>{
                  let dayTime = moment(item.time).format("HH:mm:ss");
                  let ischeck = item.is_check === 0?false:true
                  return (
                    <div  key={index*15655} className="imgbox-item">
                      <div className="Mantle">
                        <img src={item.base64_str} alt="" style={{width:150,height:'auto'}}/>
                        <span className="mark"></span>
                        <span className="action">
                          <Icon type="eye-o" onClick={()=>this.handlePreview(index)} style={{fontSize:18,cursor:'pointer',color:'white'}}/>
                        </span>
                      </div>
                      {/* <br/> */}
                      <div className="timeandcheck">
                        <span className="times">{dayTime}</span>
                        <Checkbox 
                          key={item.id} 
                          checked={ischeck}
                          onChange={(e)=>this.CheckboxOnchange(e,index)}>
                        </Checkbox >
                    </div>
                  </div>
                  )
                })}
                {/* 一个盒子end */}
              </div>
              <div style={{marginTop:50}}>
                <Button style={{marginLeft:130,width:104,marginRight:142}} onClick={this.props.clickSystemalbum.bind(this,false)}>返回</Button>
                <Button style={{width:104}}type="primary" onClick={this.add}>添加</Button>
              </div>
          </div>
      </Spin>
    )
  }
}
export default Systemalbum
