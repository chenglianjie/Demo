/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-12-08 15:42:16
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-08 15:57:23
 */
/* eslint-disable no-tabs */
import React from 'react';
import './uploadPanel.less';
import { Progress } from 'antd';

class UploadPanel extends React.Component {
  render() {
    // 提供两个参数 一个是progress进度条的百分比数字
    // 一个是showBar 控制进度条的显示与隐藏
    const { progress ,showBar} = this.props;
    
    const needShowClass = showBar ? 'upload-progress' : 'uploading-pro-none';
    if ( parseInt(progress) === 100) {
      return (
        <div
          id="uploading"
          className={needShowClass}
        >
          <div className="apk-uploading-panel">
            <div className="apk-uploading-title">
              <span className="apk-uploading-text">应用上传</span>
            </div>
            <Progress
              type="circle"
              percent={parseInt(progress)}
              showInfo
            />
            <div className="apk-uploading-footer">上传成功，解压中，请稍候!</div>
          </div>
        </div>
      );
    }
    return (
      <div
        id="uploading"
        className={needShowClass}
      >
        <div className="apk-uploading-panel">
          <div className="apk-uploading-title">
            <span className="apk-uploading-text">应用上传</span>
          </div>
          <Progress
            type="circle"
            percent={parseInt(progress)}
            showInfo
          />
          <div className="apk-uploading-footer">正在上传，请稍后...</div>
        </div>
      </div>
    );
  }
}
export default UploadPanel;
