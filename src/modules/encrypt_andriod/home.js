import React from "react";
import moment from "moment";
import PanelHeader from "../../common/panel_header";
import {Link} from "react-router-dom"
import { Button, Table, Upload, Radio, Input, message,Badge, Modal } from "antd";
import "./index.less"
import axios from '@/utils/request';
import CustomRangePicker from '@/common/CustomRangePicker/index';
import UploadBar from "@/common/UploadBar/index";
const { Search } = Input;
const { confirm } = Modal;
class EncryptAndriod extends React.Component {
  state = {
    data: [],
    state:"all",
    timeView: [
      moment(moment().subtract(1, "months"), "YYYY/MM/DD"),
      moment(new Date(), "YYYY/MM/DD")
    ],
    progress:'',
  }
  // 获取table数据
  getTableData = async () => {
    this.setState({loading:true})
    const { apkName, state, timeView } = this.state;
    let startTime = timeView[0].format("YYYY-MM-DD");
    let endTime = timeView[1].format("YYYY-MM-DD");
    let obj = { apkName, state, startTime, endTime };
    const { data } = await axios.get("/encryptAndroid/list", { params: obj })
    this.setState({ data: data.data,loading:false })
  }
  async componentDidMount() {
    this.getTableData();
  }
  // 应用名称搜索
  appNameSearch = (value) => {
    this.setState({
      apkName: value
    }, () => {
      this.getTableData();
    })
  }
  // 时间搜索
  getStartAndEndTime = (obj, timeView) => {
    this.setState({
      timeView,
    }, () => {
      this.getTableData();
    })
  }
  // 删除
  del = (md5) => {
    if (md5) {
      const { apkName, state } = this.state
      let obj = { apkName, state };
      let that = this;
      confirm({
        title:'你确定要删除吗？',
        okText:'确定',
        cancelText:'取消',
        async onOk(){
          const { data } = await axios.get(`/encryptAndroid/delect?md5=${md5}`);
          if (data.code === 1) {
            message.success("删除成功");
            that.getTableData(obj);
          }else{
            message.error("删除失败");
          }
        },
        onCancel(){
        }
      })
    } else {
      message.warning("md5缺失！");
    }
  }
  // 下载
  downLoad = async (ossFile) =>{
    if(ossFile){
     const {data} = axios.get(`/encryptAndroid/download?ossFile=${ossFile}`);
     console.log("下载的apk",data);
    }else{
      message.error("暂无apk包")
    }
  }
  handleSizeChange = (e) => {
    this.setState({state:e.target.value},()=>{
      this.getTableData();
    })
  }
  render() {
    let { data,state } = this.state;
    if (!Array.isArray(data)) {
      data = [];
    }
    const columns = [
      { title: '应用名称', dataIndex: 'apkName', key: 'apkName',align:'center' },
      { title: '应用版本', dataIndex: 'version', key: 'version',render:(text,record)=>{
        let version = text || "";
        let index = version.indexOf('(');
        if(index !== -1){
          version = text.slice(0,index);
        }
        if(version.indexOf("v") === -1){
          version = "v" + version
        }
        return <div>{version}</div>
      }},
      { title: '应用大小', dataIndex: 'apkSize', key: 'apkSize' },
      { title: '文件名称', dataIndex: 'package', key: 'package' },
      {
        title: '加固状态', dataIndex: '', key: '1', render: (text) => {
          let status = "", title = "";
          switch(text){
            case "default":
              status = "default";
              title = "待加固";
              break;
            default:
              status = "default";
              title = "待加固"; 
          }
          return <Badge status={status} text={title} />
        }
      },

      { title: '最后上传时间', dataIndex: 'updateTime', key: 'updateTime',render:(text,record)=>{
        let yearTime = moment(text).format("YYYY-MM-DD");
        let dayTime = moment(text).format("HH:mm:ss");
        return <div>{yearTime} {dayTime}</div>
      } },
      // {title:'备注',dataIndex:'',key:'100'},
      {
        title: '操作', dataIndex: '', key: '1333',align:'center', render: (text, record) => {
          let md5 = record.md5
          let ossFile = record.ossFile
          return (
            <div style={{ color: '#0084ff', cursor: 'pointer' }}>
              <Link style={{marginRight:10}} to="/Latout/andriodencrypt/details">详情</Link>
              <span  onClick={() => this.del(md5)} > 删除 </span>
              {/* <span  onClick={() => this.downLoad(ossFile)} > 下载 </span> */}
            </div>
          )
        }
      },
    ]
    const props = {
      name: 'file',
      action: '',
      showUploadList: false,
      multiple: true,
      headers: {
        authorization: 'authorization-text',
      },
      beforeUpload: async (file, filelist) => {
        this.setState({showBar:true});
        const fromDatas = new FormData();
        console.log("我是上传的file", file)
        fromDatas.append("file", file);
        fromDatas.append("msg", '我是上传的message');
        let that = this
        await axios({
          url: '/encryptAndroid/upload',
          method: 'post',
          data: fromDatas,
          // 上传的进度条显示
          onUploadProgress: function(progressEvent) {
            if (progressEvent.lengthComputable) {
              let total = progressEvent.total / 1024 / 1024; //总量
              let loaded = (progressEvent.loaded / 1024 / 1024).toFixed(2); //已上传多少
              let Surplus = Math.abs((total - loaded).toFixed(2)); //剩余多少
              let progress = (loaded / total).toFixed(2) * 100;
              that.setState({progress});
            }
          }
        }).then((res) => {
          console.log("上传的res", res);
          this.setState({showBar:false,progress:''});
        }).catch((error) => {
          console.error("上传错误", error)
        })
        await this.getTableData();
        return false;
      }
    };
    return (
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
        <UploadBar progress = {this.state.progress} showBar = {this.state.showBar}  />
        <div className='filter'>
          <Radio.Group value={state} size="small" onChange={this.handleSizeChange}>
            <Radio.Button value="all">全部</Radio.Button>
            <Radio.Button value="queue">队列中</Radio.Button>
            <Radio.Button value="encrypt">加固中</Radio.Button>
            <Radio.Button value="success">已完成</Radio.Button>
            <Radio.Button value="fail">失败</Radio.Button>
          </Radio.Group>
          <Search
            placeholder="请输入应用名称"
            onSearch={this.appNameSearch}
            style={{ width: 200, marginLeft: 20, marginRight: 20 }}
            size="small"
          />
          <CustomRangePicker size="small" styleObj={{ width: 240 }} getStartAndEndTime={this.getStartAndEndTime}></CustomRangePicker>
        </div>
        <Table
          columns={columns}
          dataSource={this.state.data}
          rowKey={(row) => row._id}
          tableLayout="fixed"
        >
        </Table>
      </div>
    )
  }
}
export default EncryptAndriod;