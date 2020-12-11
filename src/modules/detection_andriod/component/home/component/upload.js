/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-11 10:30:44
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-11 11:48:13
 */
import React,{useState} from 'react';
import { Button, Upload,Divider, message } from "antd";
import UploadBar from "@/common/UploadBar/index";
import axios from '@/utils/request';
import {get} from "lodash"
import "./style/upload.less"
const UploadApk = () => {
  const [ progress, setProgress ] = useState('');
  const [showBar, setShowBar ] = useState(false);
  const props = {
    name: 'file',
    accept:".apk", // 接受上传的文件类型
    showUploadList: false, // 是否展示文件列表
    headers: {             //设置上传的请求头部
      authorization: 'authorization-text',
    },
    //上传文件之前的钩子 参数为上传的文件，若返回 false 则停止上传。
    beforeUpload: async (file, filelist) => {
      setShowBar(true)
      const fromDatas = new FormData();
      fromDatas.append("file", file);
      await axios({
        url: '/detectionAndroid/upload',
        method: 'post',
        data: fromDatas,
        // 上传的进度条显示
        onUploadProgress: function(progressEvent) {
          if (progressEvent.lengthComputable) {
            let total = progressEvent.total / 1024 / 1024; //总量
            let loaded = (progressEvent.loaded / 1024 / 1024).toFixed(2); //已上传多少
            let progress = (loaded / total).toFixed(2) * 100;
            setProgress(progress)
          }
        }
      }).then((res) => {
        console.log("上传的res", res);
        const code = get(res,'data.code','')
        if(code ===1){
          message.success("文件上传成功");
        }
        setShowBar(false);
        setProgress('');
      }).catch((error) => {
        console.error("上传错误", error)
      })
      // await this.getTableData();
      return false;
    }
  };
  return(
    <div className="apk-detection-upload">
        <div className="apk-head">
          <Upload {...props}>
            <Button icon="plus" type="primary" className="button">上传应用（APK）</Button>
          </Upload>
          <UploadBar progress = {progress} showBar = {showBar}  />
        </div>
        <div className="apk-head">
          <span>标准版[2020-11-16~2021-02-04]</span>
        </div>  
    </div>
  )
}
export default UploadApk;