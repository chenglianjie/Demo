import React from "react";
import { Form, Icon, Input, Button, } from 'antd';
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
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码！"
            />,
          )}
        </Form.Item>
        <Form.Item label="新密码" >
          {getFieldDecorator('newpassword', {
            rules: [{ required: true, message: '请输入密码！' }],
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
