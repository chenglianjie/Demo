import React from "react";
import { BrowserRouter as Router, Switch,Route,Link} from "react-router-dom";
import { Cascader,DatePicker,Input,Button,Form,Modal,Radio,Avatar,Upload,message,Select,Table, Spin} from 'antd';
import Home from "./Home"
import About from "./about"
import Panelheader from "./component/panel_header/index"
import Indextable from "./component/indextable/indextable"
import "./index.less"
const { Option } = Select;
const { Dragger } = Upload;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
let Search = Input.Search;
class DetectionAndriod extends React.Component {
  state= {
    flag:false,
    flag2:false,
  }
  render(){
    const {flag,flag2} = this.state
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Age', dataIndex: 'age', key: 'age' },
      { title: 'Address', dataIndex: 'address', key: 'address' },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a>取证</a>,
      },
    ];
    const data = [
      {
        key: 1,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
      },
      {
        key: 2,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
      },
      {
        key: 3,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        description: '',
      },
    ];
    return(
      <div>
          {/* 子级路由 */}
          <Route  path="/Latout/andriodtest">
            <Home />
          </Route>
          <Route  path="/Latout/andriodtest/about">
            <About {...this.props}/>
          </Route>
          <div className="secret">
          <div>
          <div className='headbox'>
            <Panelheader title="应用审查" content="（通过特定手机对应用程序进行隐私行为监测、提高合规审查效率）"></Panelheader>
            <div className='addbutton'>
            <div>
              <Button type='primary' icon="plus" onClick={this.buttonclick}>创建审查任务(apk)</Button>
              {/* <UploadPanel {...this.props}/> */}
            </div>
            <div>暂无权限</div>
            </div>
          </div>
            <div className='head'>
              <div >
                <span className="headtitle">归属地区：</span> 
                <Cascader
                    //disabled={loading}
                    className="filter-size"
                    allowClear={false}
                    style={{ marginRight: "43px",width:221 }}
                    defaultValue={["9999"]}
                    // options={newoptions}
                    onChange={this.CascaderonChange}
                    // expandTrigger='hover'
                    changeOnSelect={true}
                  />
                 <span className="headtitle">归属组织：</span>
                  <Search
                    // //disabled={loading}
                    style ={{width:280,marginRight:43}}
                    onChange={ (e) => {this.serchChange(e)}}
                    placeholder="请输入企业名称"
                  />
                  <span className="headtitle" style={{marginLeft:12}}>审查员：</span>
                  <Search
                    //disabled={loading}
                    className="filter-size"
                    style ={{width:200}}
                    onChange={ (e) => {this.serchChangetaskReviewer(e)}}
                    placeholder="请输入审查员"
                  />

                <div style={{marginTop:20}} className='headtwo'>
               
                <span className="headtitle">创建日期：</span>
                <span onClick={this.clickRangePicker} className="createTime">
                  <RangePicker
                    //disabled={loading}
                    className="filter-size"
                    allowClear={false}
                    style={{ marginRight: "43px",width:221}}
                    defaultValue={this.state.timeView}
                    format="YYYY-MM-DD"
                    value={this.state.timeView}
                    onChange={this.dateChange}
                    open={this.state.RangePickeropen}
                    renderExtraFooter = {()=>{
                      return (
                              <div className="RangePickertime">
                                <div className='first-div'>
                                  <span onClick={()=>{this.changeDate("a")}}>所有</span>  
                                  <span onClick={()=>{this.changeDate("b")}}>今天</span>  
                                  <span onClick={()=>{this.changeDate("c")}}>近7天</span>  
                                  <span onClick={()=>{this.changeDate("d")}}>近14天</span>  
                                  <span onClick={()=>{this.changeDate("e")}}>近30天</span> 
                                </div>
                                <div>
                                  <Button onClick={this.closeTimepacker} type="primary">关闭</Button>  
                                </div>
                              </div>
                              )
                    }}
                 />
                </span>
                
                 <span className="headtitle">审查状态：</span>
                <RadioGroup
                  //disabled={loading}
                  defaultValue="all"
                  // value=
                  onChange={this.changework}
                  style={{marginRight:43}}
                >
                  <RadioButton value="all">全部</RadioButton>
                  {/* <RadioButton value="1">待分配</RadioButton> */}
                  <RadioButton value="0">待审查</RadioButton>
                  <RadioButton value="3">已通过</RadioButton>
                  <RadioButton value="2">未通过</RadioButton>
                </RadioGroup>
                <span className="headtitle">应用名称：</span>
                  <Search
                    //disabled={loading}
                    className="filter-size"
                    style ={{width:200}}
                    onChange={ (e) => {this.serchAplicationName(e)}}
                    placeholder="请输入应用名称"
                  />
                </div>
              </div>
            </div>
            <div className ="table">
              <Indextable 
                // ispower = {ispower}
                del = {this.del} 
                updata ={this.updata}
                checked={this.checked}
                report = {this.report}
                loading = {this.state.loading}
                paginations = {this.paginations}
                updataChangeState = {this.updataChangeState}
                handleCancels = {this.handleCancels}
                clickdtail = {this.clickdtail}
                {...this.props}
              ></Indextable>
            </div>
          </div> 
          </div>
      </div>    
    )
  }
}
export default DetectionAndriod;