import React, { Component } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from 'antd';

import HomeProduct from './homeProduct';
import DetailProduct from './detail';
import AddUpdate from './add-update';
const { Header, Footer, Sider, Content } = Layout;



const Product = () => {
    return (
        <>
            {/* {console.log('测试')} */}
            <Routes>
                <Route exact path='' element={<HomeProduct />}></Route>
                <Route path='/detail' element={<DetailProduct />}></Route>
                <Route path='/addupdate' element={<AddUpdate />}></Route>

            </Routes>
        </>

    );
}


export default Product;