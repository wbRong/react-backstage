import React, {useState, useEffect} from 'react'
import './less/ListTable.less'
import { Table, Button, Space } from 'antd';
import { Link } from 'react-router-dom'
import {ArticleListApi} from '../request/api'

export default function ListTable() {
    // 列表数组
    const [arr, setArr] = useState([
        {
            key: '1',
            name: 'John Brown',
            subName: "asda",
            address: 'New York No. 1 Lake Park',
        }
    ])

    // 请求文章列表
    useEffect(()=>{
        ArticleListApi().then(res=>{
            if(res.errCode===0){
                let newArr = JSON.parse(JSON.stringify(res.data.arr));
                /* 
                    1. 要给每个数组项加key，让key=id
                    2. 需要有一套标签结构，赋予一个属性
                */
                newArr.map(item=>{
                    item.key = item.id;
                    item.mytitle = `
                        <>
                            <Link className='table_title' to="/">标题</Link>
                            <p style={{ color: '#999' }}>简直是大家</p>
                        </>
                    `;
                })
                console.log(newArr)
            }
        })
    }, [])

    // 每一列
    const columns = [
        {
            dataIndex: 'name',
            key: 'name',
            width: '60%'
        },
        {
            dataIndex: 'address',
            key: 'address',
            render: text => <p>2022-03-03 20:33:06</p>,
        },
        {
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary'>编辑</Button>
                    <Button type='danger'>删除</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className='list_table'>
            {/* columns列   dataSource数据 */}
            <Table showHeader={false} columns={columns} dataSource={arr} />
        </div>
    )
}







