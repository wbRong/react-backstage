import React, { useEffect } from 'react'
import { Form, Input, Button, message } from 'antd';
import {GetUserDataApi, ChangeUserDataApi} from '../request/api'
import "./less/Means.less"

export default function Means(){
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
    </div>
  )
}
