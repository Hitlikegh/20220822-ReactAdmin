import React, { Component } from 'react'
// antd组件
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from 'antd';

// 二级路由导入
import Home from '../home/home';
import Category from '../category/category';
import Role from '../role/role';
import User from '../user/user';

import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';

import Product from '../products/product';
import HomeProduct from '../products/homeProduct';
import DetailProduct from '../products/detail';
import AddUpdate from '../products/add-update';

import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../component/leftNav/left-nav';
import Headersh from '../../component/header/header';


const { Header, Footer, Sider, Content } = Layout;

// 左右结构 右边是上下结构


const Admin = () => {
    const user = memoryUtils.getUser();
    if (user.username) {
        return (
            <>
                <Layout style={{ minHeight: '100%' }}>
                    <Sider>
                        <LeftNav />
                    </Sider>
                    <Layout>
                        <Headersh />
                        <div style={{ backgroundColor: "#f0f2f5", height: "30px" }}></div>

                        <Content style={{ margin: 20, backgroundColor: "white", height: "100%" }}>
                            <Routes>
                                <Route>
                                    <Route path='*' element={<Home />}></Route>
                                    <Route path='/home' element={<Home />}></Route>
                                </Route>
                                <Route path='/category' element={<Category />}></Route>

                                <Route path='/product/*' element={<Product />}>
                                    {/* <Route exact path='' element={<HomeProduct />}></Route>
                                    <Route path='detail' element={<DetailProduct />}></Route>
                                    <Route path='addupdate' element={<AddUpdate />}></Route> */}

                                </Route>

                                <Route path='/user' element={<User />}></Route>
                                <Route path='/role' element={<Role />}></Route>
                                <Route path='/charts/bar' element={<Bar />}></Route>
                                <Route path='/charts/line' element={<Line />}></Route>
                                <Route path='/charts/pie' element={<Pie />}></Route>
                            </Routes>
                        </Content>

                        <Footer style={{ textAlign: "center", backgroundColor: "#f0f2f5" }}>推荐使用谷歌浏览器浏览以获得最佳体验</Footer>
                    </Layout>
                </Layout>
            </>
        )

    } else {
        return (
            <Navigate to='/login' />
        )
    }




};


export default Admin;