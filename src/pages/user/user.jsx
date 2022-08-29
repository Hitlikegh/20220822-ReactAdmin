import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Button, Modal, message, Form, Input, Select } from 'antd'
import { reqGetUsers } from '../../api';
import PAGE_SIZE from '../../component/constant';
import { formateDate } from '../../utils/dataUtils';
import { reqUpdateUser, reqAddUser, reqDeleteUser } from '../../api';
import { QuestionCircleOutlined } from '@ant-design/icons';

const User = () => {

    const [form] = Form.useForm()
    const defaultState = {
        users: [], // 所有用户列表
        roles: [], // 所有角色列表
        user: {}, // 当前用户
        isShowModal: false,
        isUpdate: false
    }

    const [states, setStates] = useState(defaultState);



    const columns = [
        { title: '用户名', dataIndex: 'username', key: 'username', ellipsis: true, },
        { title: '邮箱', dataIndex: 'email', key: 'email', ellipsis: true },
        { title: '电话', dataIndex: 'phone', key: 'phone', ellipsis: true },
        {
            title: '注册时间',
            dataIndex: 'create_time', key: 'create_time',
            render: (create_time) => {
                return (formateDate(create_time).toString())
            },
            ellipsis: true
        },
        {
            title: '所属角色',
            dataIndex: 'role_id', key: 'role_id',
            render: (role_id) => getRoles(role_id),
            ellipsis: true
        },
        {
            title: '操作',
            render: (user) => {
                return (
                    <>
                        <Button type='link' onClick={() => updateUser(user)}>修改</Button>
                        <Button type='link' onClick={() => showConfirm(user)}>删除</Button>
                        <Button />
                    </>
                )
            }
        }
    ]




    const getRoles = (role_id) => {
        const role = states.roles.find((role) => {
            return role._id === role_id
        })
        // console.log("role", role);
        if (role) {
            return role.name
        } else {
            return ''
        }
    }

    const getUsers = async () => {
        const result = (await reqGetUsers()).data;
        // console.log("result", result);
        if (result.status === 0) {
            const { users, roles } = result.data;
            // const test = [users[9]];
            // console.log("test", test);
            // console.log("users", users);
            setStates({
                ...states,
                users: users,
                roles: roles
            });
            // console.log("users", states.users);

        } else {
            message.error('获取用户列表失败')
        }
    };


    const addUser = () => {
        setStates({
            ...states,
            isUpdate: false,
            user: {},
            isShowModal: true
        })
    };

    const updateUser = (user) => {

        // 保存当前用户用于默认值显示
        setStates({
            ...states,
            isUpdate: true,
            user: user
        })
        // 清空form
        form.setFieldsValue(user)
        setStates({
            ...states,
            isShowModal: true,
        })

    }


    const showConfirm = (user) => {
        Modal.confirm({
            title: `确认删除${user.username}吗?`,
            icon: <QuestionCircleOutlined />,
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                const result = (await reqDeleteUser(user._id)).data
                if (result.status === 0) {
                    message.success('删除用户成功')
                    // 重新获取用户列表
                    getUsers()
                }
            }
        });
    }

    const handleOk = async () => {
        // 判断是修改还是添加
        if (states.isUpdate) {//修改
            // 保存数据
            const { _id } = user
            const { username, phone, email, role_id } = form.getFieldsValue()
            const newUser = { _id, username, phone, email, role_id }
            // 发送请求
            const result = (await reqUpdateUser(newUser)).data
            if (result.status === 0) {
                message.success(`${isUpdate ? '修改' : '添加'}用户成功`)
                // 更新用户列表
                getUsers()
                setStates({
                    ...states,
                    isShowModal: false
                })
            }
        } else {//添加
            // 保存数据
            const newUser = form.getFieldsValue()
            // 发送请求
            const result = (await reqAddUser(newUser)).data
            if (result.status === 0) {
                message.success(`${isUpdate ? '修改' : '添加'}用户成功`)
                // 更新用户列表
                getUsers()
                setStates({
                    ...states,
                    isShowModal: false
                })
            }
        }

    };

    const handleCancel = () => {
        // form清空
        setStates({
            ...states,
            isShowModal: false
        })
    };

    const title = (
        <span>
            <Button type='primary' onClick={addUser}>创建用户</Button> &nbsp;&nbsp;
        </span>
    );

    useEffect(() => {
        getUsers()//获取用户列表
    }, [])

    const { users, user, roles, isUpdate, isShowModal } = states;
    // console.log("users", users);




    return (
        <>
            <Card
                title={title}
            >
                {/* <Table dataSource={dataSource} columns={columns} rowKey={'_id'} />; */}
                <Table
                    bordered
                    dataSource={users}
                    columns={columns}
                    rowKey={'_id'}
                    pagination={{ defaultPageSize: 3 }}
                />
                <Modal
                    title={isUpdate ? '修改用户' : '添加用户'}
                    visible={isShowModal}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    destroyOnClose
                >
                    <Form
                        form={form}
                        preserve={false}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 15 }}
                        initialValues={{
                            username: user.username,
                            email: user.email,
                            phone: user.phone,
                            role: user.role_id
                        }}
                    >
                        <Form.Item label='用户名' name='username' rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            }
                        ]}>
                            <Input placeholder='请输入用户名' />
                        </Form.Item>
                        {isUpdate ? null :
                            <Form.Item label='密码' name='password' rules={[
                                {
                                    required: true,
                                    message: '请输入密码',
                                }
                            ]}>
                                <Input placeholder='请输入密码' type='password' />
                            </Form.Item>
                        }
                        <Form.Item label='手机号' name='phone' rules={[
                            {
                                required: true,
                                message: '请输入手机号',
                            }
                        ]}>
                            <Input placeholder='请输入手机号' />
                        </Form.Item>
                        <Form.Item label='邮箱' name='email' rules={[
                            {
                                required: true,
                                message: '请输入邮箱',
                            }
                        ]}>
                            <Input placeholder='请输入邮箱' />
                        </Form.Item>
                        <Form.Item label='角色' name='role_id' rules={[
                            {
                                required: true,
                                message: '请选择所属角色',
                            }
                        ]}>
                            <Select>
                                {roles.map((role) => {
                                    return (
                                        <Select.Option value={role._id} key={role._id}>{role.name}</Select.Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </>
    );
}


export default User;