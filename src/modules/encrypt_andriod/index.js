import React from "react";
import PanelHeader from "../../common/panel_header";
import {Button, Table, Upload} from "antd";
import "./index.less"
import axios from '@/utils/request';
class EncryptAndriod extends React.Component {
  componentDidMount(){
    axios.get("")
  }
  render(){
    const columns = [
      {title:'应用名称/版本',dataIndex:'',key:'1'},
      {title:'应用大小',dataIndex:'',key:'1'},
      {title:'文件名称',dataIndex:'',key:'1'},
      {title:'加固状态',dataIndex:'',key:'1'},
      {title:'加固版本',dataIndex:'',key:'1'},
      {title:'最后上传时间',dataIndex:'',key:'1'},
      {title:'备注',dataIndex:'',key:'1'},
      {title:'操作',dataIndex:'',key:'1'},
    ]
    const props = {
      name: 'file',
      action: '',
      multiple:true,
      headers: {
        authorization: 'authorization-text',
      },
      beforeUpload:(file,filelist)=>{
        const fromDatas = new FormData();
        console.log("我是上传的file",file)
        fromDatas.append("file", file);
        fromDatas.append("msg",'我是上传的message');
        axios({
          url:'/encryptAndroid/upload',
          method:'post',
          data:fromDatas,
        }).then((res)=>{
            console.log("上传的res",res);
        }).catch((error)=>{
          console.error("上传错误",error)
        })
        return false;
      }
    };
    return(
      <div className="encrypt-android">
         <PanelHeader
            //  支持对安卓应用的APK、JAR、AAR文件进行多项安全加固，包括Java2C加密技术
            title="Android加固"
            content="( 支持对安卓应用的APK文件进行多项安全加固，包括Java2C加密技术 )"
            txt="开发文档"
            link="https://doc.kiwisec.com/kiwiApkEncrypt/"
            isIcon={true}
            toolTipText="安卓应用加固使用说明"
          />
          <Upload {...props}>
            <Button icon="plus" type="primary" className="button">上传应用（APK）</Button>
          </Upload>
          <Table 
            columns={columns}
            // dataSource={}
          > 
          </Table>

      </div>    
    )
  }
}
export default EncryptAndriod;