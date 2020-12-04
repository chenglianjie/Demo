import React from 'react';
import { Route,Link,Switch} from 'react-router-dom';
import { Layout,Menu, message,Icon} from "antd";
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
      openKeys: [],
      selectedKeys: "",
    };
  }
  click= (e) => {
    this.setState({
      selectedKeys:e.key,
      openKeys:e.keyPath[1],
    })
  }
 // 刷新时，保持在用户点击menu上
 componentDidMount(){
  // 获取当前路径
  let pathname = this.props.location.pathname
  // console.error("pathname",pathname)
  if(pathname==="/"){
    pathname="/Latout/andriodtest"
  }
  try {
    const selectedKeys= menu_list.filter(item=>item.routerPath===pathname)[0].key
    const openKeys= menu_list.filter(item=>item.routerPath===pathname)[0].parentKey
    this.setState({
      selectedKeys:selectedKeys,
      openKeys:[openKeys],
    })
  } catch (error) {
    
  }
}
// 退出登录
exit = () => {
  message.success("退出成功");
  window.localStorage.removeItem('kiwi');
  window.location.href="/login";
}
  render () {
    const { selectedKeys }=this.state;
    // 判断是否登录
    let islogin =  window.localStorage.getItem('kiwi');
    if(!selectedKeys){
      return <div></div>
    }
    return (
      <div className="layoutComponent">
        <Layout>
          {/* 头部 */}
          <Header className="header"  style={{ position: 'fixed', zIndex: 1, width: '100%',display:"flex",justifyContent:'space-between'}}>
            <div className="left-title" style={{color:'white'}} >几维盾牌<span className="title-item">移动应用安全管理平台</span></div>
           <div className="headtitle"><Icon type="user" />超级***<span  className="headtitle" onClick={this.exit}>退出</span></div>
          </Header>
          <Layout>
            {/* 侧边栏 */}
            <Sider 
              width={200}  
              style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top:60
              }}
            >
              {/* 左边导航菜单 */}
              {/* theme 主题颜色 mode 菜单类型 垂直 */}
              <Menu
                theme="dark" mode="inline" 
                defaultSelectedKeys={[this.state.selectedKeys]}  // 初始选中的菜单项 key 数组
                defaultOpenKeys={this.state.openKeys}            // 初始展开的 SubMenu 菜单项 key 数组
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
                        {itemlist.map((child)=><Menu.Item key={child.key}><Link to={child.routerPath}>{child.name}</Link></Menu.Item>)}
                      </SubMenu>
                      )
                  })
                }
              </Menu>
            </Sider>
            <Layout>
              <Content
               style={{ padding:24, marginTop: 64,marginLeft:200,backgroundColor:'#fff' }}
              >
                <Switch>
                   <Route path="/Latout/andriodtest" component={Andriodtest}/>
                   <Route exact path="/Latout/iostest" component={Iostest}/>
                   <Route exact path="/Latout/andriodencrypt" component={Andriodencrypt}/>
                   <Route exact path="/Latout/iosencrypt" component={Iosencrypt}/>
                   <Route exact path="/Latout/userlist" component={Userlist}/>
                   <Route exact path="/Latout/loginrecord" component={Loginrecord}/>
                   <Route exact path="/" component={Iosencrypt}/>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
     
    )
  }
}
export default Home
