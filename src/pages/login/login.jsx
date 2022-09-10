// import logo from './logo.svg';
// import './App.css';
import React, {useCallback} from "react";
import { useNavigate } from 'react-router-dom'
import './login.less';
import logo from '../../assets/images/logo.jpg';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

// redux
import { login } from "../../redux/action";
import { connect } from "react-redux";

// 防抖优化lodash
import { debounce } from "lodash";

const Login = (props) => {

    const Item = Form.Item;
    let navigate = useNavigate();

    async function onFinish(values) {
        const { username, password } = values;
        console.log(values);
        
        try {
            props.login(username, password); 
            
        }catch(error) {
            console.log("请求出错", error);
        }
    }


    // 可以加入防抖！！
    const validatePWD = (rule, value, callback) => {
        // console.log('validatePWD');
        // console.log("value", value, "rule", rule);
        // console.log("callback", callback);

        // callback('')//参数表示验证的提示例如：请输入密码；为空表示验证通过(这是4.0版本之前)
        // 4.0版本需要使用Promise
        // return new Promise((resolve, reject) => {
        //     if (!value.trim()) reject('输入不能为空')
        //     else if (value.length < 4) reject('长度不小于4位')
        //     else if (value.length > 12) reject('长度不大于12位')
        //     else if (!/^[a-zA-Z0-9_]+$/.test(value)) reject('用户名必须是英文字母数字下划线')
        //     else resolve('输入正确')
        // })
        try {
            throw new Error('Something wrong!');
        } catch (err) {
            callback(err);
        }
        
        if (!value.trim()) {return Promise.reject('输入不能为空')}
        else if (value.length < 4) {return Promise.reject('长度不小于4位')}
        else if (value.length > 12) {return Promise.reject('长度不大于12位')}
        else if (!/^[a-zA-Z0-9_]+$/.test(value)) {return Promise.reject('用户名必须是英文字母数字下划线')}
        else return Promise.resolve('输入正确')

        
    }

    // const validatePWD_debounce = useCallback(debounce((rule, value, callback) => validatePWD(rule, value, callback), 1000), []) 
    // const validate = (rule, value, callback) => {
    //     validatePWD_debounce(rule, value, callback);
    // }

    
    
    const user = props.user;
    
    if (user && user._id) {
        return navigate('/home', {replace : true});
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
                            <Input 
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="用户名" 
                            />
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

export default connect(
    state => ({
        user: state.user
    }),
    { login}
)(Login);
