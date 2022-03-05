import React, { useState, useEffect } from 'react'
import './less/ListTable.less'
import { Table, Button, Space } from 'antd';
import moment from 'moment'
import { ArticleListApi } from '../request/api'

// 标题组件
function MyTitle(props) {
    return (
        <div>
            <a className='table_title' href={"http://codesohigh.com:8765/article/" + props.id} target="_blank">{props.title}</a>
            <p style={{ color: '#999' }}>{props.subTitle}</p>
        </div>
    )
}

export default function ListTable() {
    // 列表数组
    const [arr, setArr] = useState([])
    // 分页
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 })

    // 提取请求的代码
    const getArticleList = (current, pageSize) => {
        ArticleListApi({
            num: current,
            count: pageSize
        }).then(res => {
            if (res.errCode === 0) {
                // 更改pagination
                let { num, count, total } = res.data;
                setPagination({ current: num, pageSize: count, total })
                // 深拷贝获取到的数组
                let newArr = JSON.parse(JSON.stringify(res.data.arr));
                // 声明一个空数组
                let myarr = []
                /* 
                    1. 要给每个数组项加key，让key=id
                    2. 需要有一套标签结构，赋予一个属性
                */
                newArr.map(item => {
                    let obj = {
                        key: item.id,
                        date: moment(item.date).format("YYYY-MM-DD hh:mm:ss"),
                        mytitle: <MyTitle id={item.id} title={item.title} subTitle={item.subTitle} />
                    }
                    myarr.push(obj)
                })
                setArr(myarr)
            }
        })
    }

    // 请求文章列表(mounted)
    useEffect(() => {
        getArticleList(pagination.current, pagination.pageSize);
    }, [])

    // 分页的函数
    const pageChange = (arg) => getArticleList(arg.current, arg.pageSize);

    // 每一列
    const columns = [
        {
            dataIndex: 'mytitle',
            key: 'mytitle',
            width: '60%',
            render: text => <div>{text}</div>
        },
        {
            dataIndex: 'date',
            key: 'date',
            render: text => <p>{text}</p>,
        },
        {
            key: 'action',
            render: text => {
                return (
                    <Space size="middle">
                        {/* text.key就是id */}
                        <Button type='primary' onClick={() => console.log(text.key)}>编辑</Button>
                        <Button type='danger' onClick={() => console.log(text.key)}>删除</Button>
                    </Space>
                )
            },
        },
    ];

    return (
        <div className='list_table'>
            <Table
                showHeader={false}
                columns={columns}
                dataSource={arr}
                onChange={pageChange}
                pagination={pagination}
            />
        </div>
    )
}







