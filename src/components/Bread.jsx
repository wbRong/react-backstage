import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom'

export default function Bread() {
    const { pathname } = useLocation()
    const [breadName, setBreadName] = useState('')

    // 不是在组件mounted时去获取路径，而是路径一旦变化，就要获取对应的路径名称，并且修改breadName
    // 监听路由的路径(/list /edit /means)
    useEffect(() => {
        switch (pathname) {
            case "/listlist":
                setBreadName('查看文章列表List');
                break;
            case "/listtable":
                setBreadName('查看文章列表Table');
                break;
            case "/edit":
                setBreadName('文章编辑');
                break;
            case "/means":
                setBreadName('修改资料');
                break;
            default:
                setBreadName(pathname.includes('edit') ? '文章编辑' : "");
                break;
        }
    }, [pathname])

    return (
        <Breadcrumb style={{height: '30px', lineHeight: '30px'}}>
            <Breadcrumb.Item href='/'>
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>{breadName}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

