import React, { useState } from 'react'
import { Button, Form, Input, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ChangeUserInfoApi } from 'request/api'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

interface IProps {
  changeKeyFn: () => void;
}

function Means(props: IProps) {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const onFinish = (values: any) => {
    console.log('Success:', values);
    //调接口，修改用户名和密码
    ChangeUserInfoApi({
      username: values.username || '',
      password: values.password || '',
    }).then((res: any) => {
      if (res.errCode === 0) {
        message.success(res.message);
        let { avatar, username } = res.data;
        //存储用户信息
        localStorage.setItem("avatar", avatar)
        localStorage.setItem("username", username)
        localStorage.setItem("cms-token", res.data['cms-token'])
        //更新header的组件.走react-redux
        props.changeKeyFn();
      }
      if (res.errCode === 1) {
        message.warning(res.message);
      }
    })
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  
  //上传按钮
  const UploadButton =()=> (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  //onchange调用的函数
  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      console.log(info.file)
      if(info.file.response.errCode===0){
        message.success("头像修改成功");
        //存储用户信息
        localStorage.setItem('avatar',info.file.response.data.avatar);
        localStorage.setItem('username',info.file.response.data.username);
        localStorage.setItem('cms-token',info.file.response.data['cms-token']);
        //更新Header组件
        props.changeKeyFn();
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <Form
        style={{ width: '400px' }}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="on"
      >
        <Form.Item
          label="修改用户名："
          name="username"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="修 改 密 码："
          name="password"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={process.env.SERVER_PORT+"/manage/upload"}
        headers={{ "cms-token": localStorage.getItem('cms-token') as string }}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <UploadButton />}
      </Upload>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeKeyFn() {
      dispatch({ type: "changeKey" })
    }
  }
}

export default connect(null, mapDispatchToProps)(Means)