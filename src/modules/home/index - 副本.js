import React from 'react';
import { Route,Link,Switch} from 'react-router-dom';
import { Layout,Menu} from "antd";
// 六大模块
import Andriodtest from "../detection_andriod";
import Iosencrypt from "../encrypt_ios";
import Iostest from "../detection_ios";
import Andriodencrypt from "../encrypt_andriod";
import Userlist from "../user_list";
import Loginrecord from "../Login_record";
// 左边菜单list
import menu_list from "../../config/menu_config";
import "./home.less"
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
// 筛选出menu一级标题  
const parentlist=menu_list.filter( (item) => item.parentKey===null);
class Home extends React.Component {
  constructor(){
    super()
    this.state = {
      openKeys: ['encrypt-item1'],      // SubMenu 菜单项 key 数组
      selectedKeys: "encrypt-item3", // 初始选中的菜单项 key 数组
    };
  }
  click= (e) => {
    // console.log(e)
    // let arr = menu_list.filter((item)=>item.key === e.key);
    // window.location.pathname = arr[0].routerPath
    this.setState({
      selectedKeys:e.key,
      openKeys:e.keyPath[1],
    })
  }
  componentDidMount(){
  }
  render () {
    const { selectedKeys,openKeys }=this.state;
    if(!selectedKeys){
      return <div></div>
    }
    // console.log("selectedKeys",selectedKeys)
    // console.log("openKeys",openKeys)
    return (
      <div className="layoutComponent">
        <Layout>
          {/* 头部 */}
          <Header className="header" >
            几维盾牌
          </Header>
          {/* <Layout> */}
            {/* 侧边栏 */}
            <Sider 
              width={200}  
              style={{ background: '#fff' }}
            >
              {/* 左边导航菜单 */}
              {/* theme 主题颜色 mode 菜单类型 垂直 */}
              <Menu
                theme="dark" mode="inline" 
                // onOpenChange={this.openParentkey}  // SubMenu 展开/关闭的回调
                defaultSelectedKeys={[this.state.selectedKeys]}  // 初始选中的菜单项 key 数组
                // selectedKeys={[this.state.selectedKeys]}
                defaultOpenKeys={this.state.openKeys}            // 初始展开的 SubMenu 菜单项 key 数组
                // openKeys={this.state.openKeys}
                onClick={this.click} 
                style={{ height: '100%', borderRight: 0,}}
              >
                {/* 遍历菜单  parentlist是一级标题*/}
                {
                  parentlist.map( (item) => {
                      // 筛选出二级标题所对应的以及标题  itemlist 是二级标题
                      let itemlist = menu_list.filter((newItem)=>newItem.parentKey === item.key)
                      return (
                      <SubMenu key={item.key} title={ <span>{item.name}</span>}>
                        {itemlist.map((child)=><Menu.Item key={child.key}><div>{child.name}</div></Menu.Item>)}
                      </SubMenu>
                      )
                  })
                }
              </Menu>
            </Sider>
            {/* <Layout style={{ padding: '24px 24px 24px',marginLeft:"200px"}}> */}
              <Content
               style={{
                background: '#fff',
                padding: 24,
                marginTop:24,
                minHeight: 280,
              }}
              >
                <Switch>
                   <Route exact path="/" component={Iosencrypt}/>
                   <Route exact path="/Latout/andriodtest" component={Andriodtest}/>
                   <Route exact path="/Latout/iostest" component={Iostest}/>
                   <Route exact path="/Latout/andriodencrypt" component={Andriodencrypt}/>
                   <Route exact path="/Latout/iosencrypt" component={Iosencrypt}/>
                   <Route exact path="/Latout/userlist" component={Userlist}/>
                   <Route exact path="/Latout/loginrecord" component={Loginrecord}/>
                </Switch>
                <div style={{color:'red'}}>hahhhh</div>
              </Content>
            {/* </Layout> */}
          {/* </Layout> */}
        </Layout>
      </div>
     
    )
  }
}

export default Home
