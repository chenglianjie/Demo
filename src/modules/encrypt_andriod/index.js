import React from "react";
import moment from "moment";
import PanelHeader from "../../common/panel_header";
import { Button, Table, Upload, Radio, Input, message } from "antd";
import "./index.less"
import axios from '@/utils/request';
import CustomRangePicker from '@/common/CustomRangePicker/index';
const { Search } = Input;
class EncryptAndriod extends React.Component {
  state = {
    data: [],
    timeView: [
      moment(moment().subtract(1, "months"), "YYYY/MM/DD"),
      moment(new Date(), "YYYY/MM/DD")
    ]
  }
  // 获取table数据
  getTableData = async () => {
    const { apkName, state, timeView } = this.state;
    let startTime = timeView[0].format("YYYY-MM-DD");
    let endTime = timeView[1].format("YYYY-MM-DD");
    let obj = { apkName, state, startTime, endTime };
    const { data } = await axios.get("/encryptAndroid/list", { params: obj })
    this.setState({ data: data.data })
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
  del = async (md5) => {
    if (md5) {
      const { apkName, state } = this.state
      let obj = { apkName, state };
      const { data } = await axios.get(`/encryptAndroid/delect?md5=${md5}`)
      if (data.code === 1) {
        message.success("删除成功");
        this.getTableData(obj);
      }
    } else {
      message.warning("md5缺失！");
    }
  }
  render() {
    let { data } = this.state;
    if (!Array.isArray(data)) {
      data = [];
    }
    const columns = [
      { title: '应用名称', dataIndex: 'apkName', key: 'apkName' },
      { title: '应用版本', dataIndex: 'version', key: 'version' },
      { title: '应用大小', dataIndex: 'apkSize', key: 'apkSize' },
      { title: '文件名称', dataIndex: 'package', key: 'package' },
      {
        title: '加固状态', dataIndex: '', key: '1', render: () => {
          return <span>待加固</span>
        }
      },

      { title: '最后上传时间', dataIndex: 'updateTime', key: 'updateTime' },
      // {title:'备注',dataIndex:'',key:'100'},
      {
        title: '操作', dataIndex: '', key: '1333', render: (text, record) => {
          let md5 = record.md5
          return (
            <div style={{ color: '#0084ff', cursor: 'pointer' }}>
              <span>加固</span>
              <span onClick={() => this.del(md5)} > 删除 </span>
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
        const fromDatas = new FormData();
        console.log("我是上传的file", file)
        fromDatas.append("file", file);
        fromDatas.append("msg", '我是上传的message');
        await axios({
          url: '/encryptAndroid/upload',
          method: 'post',
          data: fromDatas,
        }).then((res) => {
          console.log("上传的res", res);
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
        <div className='filter'>
          <Radio.Group value="all" size="small" onChange={this.handleSizeChange}>
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