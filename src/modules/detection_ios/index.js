import React from "react"
import {Upload,Modal,Icon,Button} from 'antd';
import axios from '@/utils/request';

class PicturesWall extends React.Component{
  // constructor(props){
  //   super(props);
  // }
  state = {
    previewVisible:false,
    previewImage:'',
    fileList:[],
    upFiles:[]
  };
  
  handleCancel=()=>{
    this.setState({previewVisible:false});
  }
  
  handlePreview = async file =>{
    if(!file.url && !file.preview){
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  }
  
  handleChange = (info) => {
    this.setState({fileList: info.fileList});
  }
  
  beforeUpload = (file) => {
    const {upFiles} = this.state;
    upFiles.push(file);
    this.setState({upFiles},()=>{
      console.log("upFiles",this.state.upFiles);
    },()=>{
      return false;
    });
    return false;
  }
  
  addOk = () => {
    const {upFiles, id} = this.state;
    const formDatas = new FormData();
    upFiles.forEach((file) => {
      formDatas.append('file',file);
    });
    axios({
      url:'/encryptAndroid/upload',
      method:'post',
      data:formDatas,
    }).then((res)=>{
        console.log("上传多张图片返回的res",res);
    }).catch((error)=>{
      console.error("上传错误",error)
    })
    return false;
  }
  
  render() {
    const {previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div>
        <Button type="primary" onClick={this.addOk}>确认</Button>
        <Upload
          listType="picture-card"
          multiple={true}
          fileList={fileList}
          onChange={this.handleChange}
          onPreview={this.handlePreview}
          beforeUpload={this.beforeUpload}
        >
          {fileList.length > 5 ? null : uploadButton}
        </Upload>
      </div>
    )
  }
}

function getBase64(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default PicturesWall;