import React from "react";
import { Form, Icon, Input, Button, message } from 'antd';
import axios from "axios";
import {get} from "lodash";
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 16 },
};
class Rigisters extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const passwordRegExp= /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,}$/
        // 邮箱校验正则
        const emailRegExp = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        // 手机号码正则校验
        const phoneRegExp =  /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
        if(!phoneRegExp.test(values.username) && !emailRegExp.test(values.username)) {
            message.error("用户名必须是手机号或邮箱")
            return;
        }
        await axios.post("http://127.0.0.1:3030/kiwisec/register",values).then((res)=>{
          console.log("res",res.data);
          let code = get(res,"data.code",'')
          let msg = get(res,"data.msg",'')
          if(res.data.code == 1){
            message.success(msg);
            this.props.changeFlag(1)
          }else{
            message.error(msg)
          }
        }).catch((err)=>{
          // const {}
          const {response} = err;
          let msg = get(response,"msg",'注册失败')
          console.error(msg);
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}   {...layout} className="login-form">
        <Form.Item label="手机/邮箱">
          {getFieldDecorator('username', {
            rules: [{ required: true,
               message: '请输入手机/邮箱！',
             }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入手机/邮箱"
            />,
          )}
        </Form.Item>
        <Form.Item label="密码" >
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '密码必须大于6位，且有数字和字母组成',
                pattern:/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,}$/,
            }
          ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码！"
            />,
          )}
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
            <span className='login-button register' onClick={()=>this.props.changeFlag(1)}>登录</span>
            <span className='login-button' onClick={()=>this.props.changeFlag(3)}>找回密码</span>
        </Form.Item>
      </Form>
    );
  }
}
const Rigister = Form.create({ name: 'normal_login' })(Rigisters);
export default Rigister;
