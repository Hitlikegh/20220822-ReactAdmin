// import logo from './logo.svg';
// import './App.css';
import React from "react";
import { useNavigate } from 'react-router-dom'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './login.less';
import logo from '../../assets/images/logo.jpg';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { reqLogin } from '../../api/index';
import { ajax } from '../../api/ajax';
import memoryUtils from '../../utils/memoryUtils';

const Login = () => {

    const Item = Form.Item;
    let navigate = useNavigate();
    async function onFinish(values) {
        const { username, password } = values;
        // reqLogin(username,password).then(response=>{
        //     console.log('请求成功',response.data)
        // }).catch(err=>{
        //     console.log('失败',err)
        // })
        const response = await reqLogin(username, password);

        const result = response.data;
        // console.log(result);
        if (result.status === 0) {
            // 成功登录
            message.success('登录成功');
            // 保持登录状态
            const user = result.data;
            memoryUtils.saveUser(user);

            // 跳转到管理界面
            navigate('/home', { replace: true })

        } else {//失败了题
            //提示错误信息
            message.error(result.msg);
        }


    }

    function validatePWD(rule, value, callback) {



        // callback('')//参数表示验证的提示例如：请输入密码；为空表示验证通过(这是4.0版本之前)
        // 4.0版本需要使用Promise
        return new Promise((resolve, reject) => {
            if (!value.trim()) reject('输入不能为空')
            else if (value.length < 4) reject('长度不小于4位')
            else if (value.length > 12) reject('长度不大于12位')
            else if (!/^[a-zA-Z0-9_]+$/.test(value)) reject('用户名必须是英文字母数字下划线')
            else resolve('输入正确')
        })
    }

    return (
        <div className="login">
            <header className="login-header">
                <img src={logo} alt="" />
                <h1>React项目：后台管理系统</h1>
            </header>
            <section className="login-content">
                <h2>用户登录</h2>
                <div>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Item
                            name="username"
                            rules={[
                                { required: true, message: '输入你的用户名' },
                                { min: 4, message: '用户名至少4位' },
                                { max: 12, message: '用户名最多12位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文字母数字下划线' },
                                { whitespace: true }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Item>
                        <Item
                            name="password"
                            rules={[
                                { validator: validatePWD },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Item>

                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Item>
                    </Form>
                </div>
            </section>
        </div>
    )
};

export default Login;
