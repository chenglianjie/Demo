import React from "react";
import { Form, Icon, Input, Button, message, } from 'antd';
import axios from "axios";
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 16 },
};
class ForgetPasswords extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // const passwordRegExp= /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,}$/
        // 邮箱校验正则
        const emailRegExp = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        // 手机号码正则校验
        const phoneRegExp =  /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
        if(!phoneRegExp.test(values.username) && !emailRegExp.test(values.username)) {
            message.error("用户名必须是手机号或邮箱")
            return;
        }
      }
      if(values.oldpassword ===values.newpassword ){
        message.error("新密码不能和原密码一致")
      }else{
        axios.post("http://127.0.0.1:3030/kiwisec/updatePassword",values).then((res)=>{
          console.log("res",res.data);
          if(res.data.code === 1){
            message.success("修改密码成功");
            this.props.changeFlag(1)
          }else{
            message.error("修改密码失败")
          }
        }).catch((err)=>{
          console.error(err);
          message.error("修改密码失败")
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}   {...layout} className="login-form">
        <Form.Item label="用户名">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名！' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入用户名"
            />,
          )}
        </Form.Item>
        <Form.Item label="旧密码" >
          {getFieldDecorator('oldpassword', {
            rules: [{ required: true, message: '密码必须大于6位，且有数字和字母组成',
            pattern:/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,}$/,
          }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入旧密码！"
            />,
          )}
        </Form.Item>
        <Form.Item label="新密码" >
          {getFieldDecorator('newpassword', {
            rules: [{ required: true, message: '密码必须大于6位，且有数字和字母组成',
            pattern:/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,}$/,
          }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入新密码！"
            />,
          )}
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
              找回密码
          </Button>
            <span className='login-button register' onClick={()=>this.props.changeFlag(1)}>登录</span>
            <span className='login-button' onClick={()=>this.props.changeFlag(2)}>注册</span>
        </Form.Item>
      </Form>
    );
  }
}
const ForgetPassword = Form.create({ name: 'normal_login' })(ForgetPasswords);
export default ForgetPassword;
