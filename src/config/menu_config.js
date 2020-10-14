const menu_list =[
  // routerPath是路由路径 showComponent 路由对应的组件
  // 安全检测模块
  { key:"test-item1",name:"安全检测", parentKey:null },
  { key:"test-item2", name:"Android检测", routerPath:"/Latout/andriodtest",parentKey:"test-item1"},
  { key:"test-item3", name:"ios检测", routerPath:"/Latout/iostest",parentKey:"test-item1" },
  // 安全加固模块
  { key:"encrypt-item1",name:"安全加固",parentKey:null },
  { key:"encrypt-item2", name:"Android加固", routerPath:"/Latout/andriodencrypt", parentKey:"encrypt-item1" },
  { key:"encrypt-item3", name:"ios加固", routerPath:"/Latout/iosencrypt" ,parentKey:"encrypt-item1" },
  // 用户管理模块
  { key:"user-item1",name:"用户管理",  parentKey:null },
  { key:"user-item2", name:"用户列表", routerPath:"/Latout/userlist" ,parentKey:"user-item1" },
  { key:"user-item3", name:"登录记录", routerPath:"/Latout/loginrecord" ,parentKey:"user-item1" },
]
export default menu_list;
