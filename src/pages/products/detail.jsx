import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'
import { reqCategory } from '../../api';
import { useNavigate } from 'react-router-dom';

// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const DetailProduct = () => {

    const { state } = useLocation();
    const navigate = useNavigate();


    const BASE_IMG_URL = 'http://47.102.40.110:5000/upload/';

    const defausltState = {
        cName1: '', // 一级分类名称
        cName2: '' //二级分类名称

    };

    const [states, setStates] = useState(defausltState)

    const title = (
        <span>
            <Button
                type='link'
                onClick={() => navigate(-1)}>
                <ArrowLeftOutlined style={{ marginRight: 5, fontSize: 20 }} />
            </Button>
            <span>商品详情</span>
        </span>
    )
    const { products } = state;
    // console.log(products);
    const { cName1, cName2 } = states;
    // console.log(states);

    const getDetail = async () => {
        const { pCategoryId, categoryId } = products;
        if (pCategoryId === '0') {//一级分类所属
            const result = (await reqCategory(categoryId)).data
            setStates({
                ...states,
                cName1: result.data.name
            })
        } else {
            const result1 = (await reqCategory(categoryId)).data
            const result = (await reqCategory(pCategoryId)).data
            setStates({
                ...states,
                cName1: result.data.name,
                cName2: result1.data.name
            })
        }
    }

    useEffect(() => {
        getDetail();
    }, [])

    return (
        <Card
            title={title}
            style={{ width: '100%', height: '100%' }}
            bordered>
            <List>
                <List.Item>
                    <span style={{ marginRight: '15px', fontSize: '20px', fontWeight: 'bold' }}>商品名称:</span>
                    <span>{products.name}</span>
                </List.Item>
                <List.Item>
                    <span style={{ marginRight: '15px', fontSize: '20px', fontWeight: 'bold' }}>商品描述:</span>
                    <span>{products.desc}</span>
                </List.Item>
                <List.Item>
                    <span style={{ marginRight: '15px', fontSize: '20px', fontWeight: 'bold' }}>商品价格:</span>
                    <span>{products.price}元</span>
                </List.Item>
                <List.Item>
                    <span style={{ marginRight: '15px', fontSize: '20px', fontWeight: 'bold' }}>所属分类:</span>
                    <span>{cName2 ? (cName1 + '-->' + cName2) : cName1}</span>
                </List.Item>
                <List.Item>
                    <span style={{ marginRight: '15px', fontSize: '20px', fontWeight: 'bold' }}>商品图片:</span>

                    <span>
                        {
                            products.imgs.length > 0 ? (
                                products.imgs.map(img => {
                                    return <img src={BASE_IMG_URL + img} alt='img' key={img} style={{ width: 40, height: 40 }} />
                                })
                            ) : '暂无图片'
                        }
                    </span>
                </List.Item>
                <List.Item>
                    <span style={{ marginRight: '15px', fontSize: '20px', fontWeight: 'bold' }}>商品详情:</span>
                    <span dangerouslySetInnerHTML={{ __html: products.detail ? products.detail : '暂无详情介绍' }}></span>
                </List.Item>
            </List>
        </Card>
    )
}


DetailProduct.propTypes = propTypes;
DetailProduct.defaultProps = defaultProps;
// #endregion

export default DetailProduct;