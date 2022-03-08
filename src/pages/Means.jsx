import React, { useEffect, useState } from 'react'
import { Form, Input, Button, message, Upload } from 'antd';
import {GetUserDataApi, ChangeUserDataApi} from '../request/api'
import "./less/Means.less"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'

// 将图片路径转base64
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

// 限制图片大小只能是200KB
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 / 1024  < 200;
  if (!isLt2M) {
    message.error('请上传小于200KB的图!');
  }
  return isJpgOrPng && isLt2M;
}

function Means(props){
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  useEffect(()=>{
    GetUserDataApi().then(res=>{
      console.log(res)
      if(res.errCode===0){
        message.success(res.message)
        // 存到sessionStorage
        sessionStorage.setItem('username', res.data.username)
      }
    })
  }, [])

  // 表单提交的事件
  const onFinish = (values) => {
    // 如果表单的username有值，并且不等于初始化时拿到的username，同时密码非空
    if(values.username && values.username!==sessionStorage.getItem('username') && values.password.trim() !== ""){
      // 做表单的提交...
      ChangeUserDataApi({
        username: values.username,
        password: values.password
      }).then(res=>{
        console.log(res)
        // 当你修改成功的时候，不要忘了重新登录
      })
    }
  }

  // 点击了上传图片
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>{
        setLoading(false)
        setImageUrl(imageUrl)
        // 存储图片名称
        localStorage.setItem('avatar', info.file.response.data.filePath)
        // 使用react-redux
        props.addKey()
      }
      );
    }
  };

  // 上传按钮
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className='means'>
      <Form
        name="basic"
        style={{width: '400px'}}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="修改用户名：" name="username">
          <Input placeholder='请输入新用户名' />
        </Form.Item>

        <Form.Item label="修 改 密 码：" name="password">
          <Input.Password placeholder='请输入新密码' />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{float: 'right'}}>提交</Button>
        </Form.Item>
      </Form>
      <p>点击下方修改头像：</p>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{"cms-token": localStorage.getItem('cms-token')}}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    addKey(){
      dispatch({type: "addKeyFn"})
    }
  }
}

export default connect(null, mapDispatchToProps)(Means)