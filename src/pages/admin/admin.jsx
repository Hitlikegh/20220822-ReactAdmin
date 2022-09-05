import React from 'react'
// antd组件
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Layout } from 'antd';

// 二级路由导入

import Home from '../home/home';
import Category from '../category/category';
import Role from '../role/role';
import User from '../user/user';
import Product from '../products/product';

import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';


// import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../component/leftNav/left-nav';
import Headersh from '../../component/header/header';

// redux 
import { connect } from 'react-redux';
// import { lazy, Suspense, useEffect } from 'react';
import { useEffect } from 'react';

// 二级路由懒加载
// const Home = lazy(() => import('../home/home'));
// const Category = lazy(() => import('../category/category'));
// const Role = lazy(() => import('../role/role'));
// const User = lazy(() => import('../user/user'));
// const Product = lazy(() => import('../products/product'));

// const Bar = lazy(() => import('../charts/bar'));
// const Line = lazy(() => import('../charts/line'));
// const Pie = lazy(() => import('../charts/pie'));

const { Footer, Sider, Content } = Layout;

// 左右结构 右边是上下结构


const Admin = (props) => {
    
    let navigate = useNavigate();

    const user = props.user;
    useEffect(() => {
        if (!user && !user._id) {
        return navigate('/login', {replace : true});
    }
    }, [])
    

    
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
                            {/* <Suspense fallback={<div>Loading...</div>}>
                            </Suspense> */}
                                <Routes>
                                    <Route>
                                        <Route path='*' element={<Home />}></Route>
                                        <Route path='/home' element={<Home />}></Route>
                                    </Route>
                                    <Route path='/category' element={<Category />}></Route>

                                    <Route path='/product/*' element={<Product />}></Route>

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


export default connect(
    state => ({user: state.user}),
    {}
)(Admin);