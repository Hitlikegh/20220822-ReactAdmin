import { React, useEffect, useState } from 'react';
import { Table, Button, message, Card, Modal, Select, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;



const HomeProduct = () => {
    // 常数
    const PAGE_SIZE = 3;
    const navigate = useNavigate();


    const defaultState = {
        pageNum: ' 1',
        total: 0, //商品的总数量
        products: [], // 商品的数组
        loading: false, // 是否正在加载中
        searchName: '',//搜索的关键字
        searchType: 'productName' // 根据哪个字段搜索
    }

    const [states, setStates] = useState(defaultState);

    const getProducts = async (pageNum) => {
        states.pageNum = pageNum;

        setStates({ 
            ...states, 
            loading: true, 
            pageNum 
        })
        const { searchName, searchType } = states
        // 如果搜索关键字有值, 说明我们要做搜索分页
        let result
        if (searchName) {
            // 发送请求
            result = (await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })).data;
            // console.log('搜索分页返回数据', result);
        } else {
            // 一般分页请求
            result = (await reqProducts(pageNum, PAGE_SIZE)).data
        }
        if (result.status === 0) {
            // 隐藏loading
            setStates({ 
                ...states, 
                loading: false 
            })
            const total = result.data.total;
            // console.log('搜索结果的总数：', total);
            // console.log('商品总数：', total);
            const products = result.data.list;
            // 设置初始化指定页商品products
            setStates({
                ...states,
                total: total,
                products: products
            })
        } else {

            message.error('获取列表失败');
        }

    };

    const updateStatus = async (_id, newStatus, pageNum) => {
        // console.log("status", newStatus, '_id', _id);
        const result = (await reqUpdateStatus(_id, newStatus)).data
        if (result.status === 0) {
            message.success('更新商品成功')
            // console.log(pageNum);
            getProducts(pageNum)
        }
    }


    const initColumns = () => {
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                width: 150,

            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                width: 300,
            },
            {
                title: '价格',
                dataIndex: 'price',
                width: 100,
                render: (price) => '¥' + price  // 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
                title: '状态',
                width: 100,
                render: (products) => {
                    const { status, _id } = products

                    const newStatus = status === 1 ? 2 : 1
                    return (
                        <span>

                            <Button type='primary' onClick={() => updateStatus(_id, newStatus, states.pageNum)}>
                                {status === 1 ? '下架' : '在售'}
                            </Button>
                            <span>
                                {status === 1 ? '在售' : '下架'}
                            </span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                width: 100,
                render: (products) => {
                    // console.log("products", products);
                    return (
                        <span>
                            <Button type='link' onClick={() => navigate('/product/detail', { state: { products } })}>详情</Button>
                            <Button type='link' onClick={() => navigate('/product/addupdate', {
                                state: { products } //将产品相关信息传递过去，对应页面使用this.props.location.state接收
                            })}>修改</Button>
                        </span>
                    )
                }
            },
        ]
        return columns
    }

    const title = (
        <span>
            <Select
                style={{ width: 150 }}
                value={states.searchType}
                onChange={(value) => setStates({ ...states, searchType: value })}>
                <Option value='productName'>按名称搜索</Option>
                <Option value='productDesc'>按描述搜索</Option>
            </Select>
            <Input
                placeholder='关键字'
                style={{ width: 150, margin: '0 15px' }}
                value={states.searchName}
                onChange={event => setStates({ ...states, searchName: event.target.value })}
            />
            <Button
                type='primary'
                onClick={() => getProducts(1)}
            >搜索</Button>
        </span>
    )
    const extra = <Button
        type='primary'
        onClick={() => navigate('/product/addupdate', {
            state: { products: {} } //将产品相关信息传递过去，对应页面使用this.props.location.state接收
        })}
    >
        <PlusOutlined />添加商品
    </Button>;
    const { pageNum, products, total, loading, searchType, searchName } = states;
    const columns = initColumns();

    useEffect(() => {
        initColumns();
        getProducts(1);
    }, [])

    return (
        <>

            <Card
                title={title}
                extra={extra}
                className='product'>

            </Card>
            <Table
                dataSource={products}
                columns={columns}
                bordered
                rowKey={'_id'}
                pagination={
                    {
                        current: pageNum,
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true.valueOf,
                        onChange: getProducts
                    }
                } />;
        </>
    );
}

export default HomeProduct;