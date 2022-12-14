import React from 'react'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterApi } from 'request/api'
import "./less/Login.less"

const logo = require("assets/images/logo.png")

interface IRegisterLogin {
  username: string;
  password: string;
  password1?: string;
}

export default function Register() {
  const navigte = useNavigate()

  const onFinish = (values: IRegisterLogin) => {
    let { username, password, password1 } = values;
    if (password !== password1) {
      message.error("请输入相同的密码!", 1.5)
      return;
    }

    interface IRes {
      errCode?: number;
      message?: string;
      data?: any;
    }

    //获取用户名和密码，注册
    RegisterApi({ username, password }).then((res: IRes) => {
      if (res.errCode === 0) {
        //提示成功
        message.success(res.message, 1.5)
        //跳转登录页
        setTimeout(() => {
          navigte("/login")
        }, 1500)
      }
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='login_box'>
      <img src={logo} className="logo" alt="" />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size="large"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder='请输入用户名' />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder='请输入密码' />
        </Form.Item>

        <Form.Item
          name="password1"
          rules={[{ required: true, message: '两次密码不一致!' }]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder='请再次确认密码' />
        </Form.Item>

        <Form.Item>
          <Link to="/login">已有账号？返回登陆</Link>
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit" block size='large'>
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
