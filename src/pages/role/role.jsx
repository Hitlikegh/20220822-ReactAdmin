import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, message, Card, Modal } from 'antd';
import { reqAddRoles, reqGetRoles, reqUpdateRole } from '../../api';
import AddFormRole from './add-form-role';
import AuthForm from './auth-form'

// redux
import { connect } from 'react-redux';
import { logout } from '../../redux/action';


const Role = (props) => {

    const getFormValue = useRef();
    const getUpdateValue = React.createRef();
    // const [selectionType, setSelectionType] = useState('radio');
    const PAGE_SIZE = 3;

    const defaultstate = {
        roles: [], // 所有角色列表
        role: {}, // 选中的角色
        selectedRowKeys: [],
        isShowModal: false,
        isShowAuth: false
    }

    const [states, setStates] = useState(defaultstate);




    const getRoles = async () => {
        const result = (await reqGetRoles()).data;
        if (result.status === 0) {
            const roles = result.data;
            setStates({ ...states, roles });
        }
    };

    const addRole = async () => {

        // 搜集数据
        const getFieldsForm = getFormValue.current.formFields;

        const roleName = getFieldsForm.getFieldValue().roleName;
        console.log("roleName", roleName);
        // 请求添加
        const result = (await reqAddRoles(roleName)).data;
        console.log("result", result);
        if (result.status == 0) {
            message.success('添加角色成功')
            const role = result.data;
            setStates({
                ...states,
                roles: [...states.roles, role]
            });
            // 根据结果提示/更新列表显示
            getRoles();


        } else {
            message.error('添加失败')
        }
        // setStates({
        //     ...states,
        //     isShowModal: false
        // })
        states.isShowModal = false;

    }

    const updateRole = async () => {


        const role = states.role;
        const menus = getUpdateValue.current.func();//权限key数组
        role.menus = menus;
        const { _id } = role //id
        const auth_time = Date.now() //授权时间
        const auth_name = props.user.username //授权用户->当前登录用户
        const newRole = { _id, menus, auth_name, auth_time }
        const result = (await reqUpdateRole(newRole)).data;
        // console.log("role", role);
        // console.log("result", result);

        if (result.status === 0) {
            // 如果当前更新的是自己角色的权限, 强制退出
            if (states.role._id === props.user.role_id) {
                props.logout()
                message.success('当前角色权限更新成功')

            } else {
            // 更新roles
                message.success('角色权限更新成功');
                getRoles();
            }

        } else {
            message.error('角色权限更新失败')
        }
        // setStates({
        //     ...states,
        //     isShowAuth: false
        // })
        states.isShowAuth = false;
    };


    const columns = [
        {
            title: '角色名称',
            dataIndex: 'name',
            ellipsis: true,
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            ellipsis: true,
        },
        {
            title: '授权时间',
            dataIndex: 'auth_time',
            ellipsis: true,
        },
        {
            title: '授权人',
            dataIndex: 'auth_name',
            ellipsis: true,
        },

    ]



    const title = (
        <span>
            <Button type='primary' onClick={() => setStates({ ...states, isShowModal: true })}>创建角色</Button> &nbsp;&nbsp;
            <Button type='primary' disabled={!states.role._id} onClick={() => setStates({ ...states, isShowAuth: true })}>设置角色权限</Button>
        </span>
    )
    const onRow = (role) => {
        return {
            onClick: event => {

                setStates({
                    ...states,
                    role
                })
            }
        }
    };



    useEffect(() => {
            getRoles();
    }, []);

    const { roles, role, isShowModal, isShowAuth } = states;
    // console.log("role", role);


    return (
        <>
            <Card
                title={title}
            // extra={extra}
            >

                <Table
                    bordered
                    dataSource={states.roles}
                    columns={columns}
                    rowKey={'_id'}
                    // loading={loading}
                    pagination={{ defaultPageSize: PAGE_SIZE }}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: [role._id],
                        onSelect: (role) => {
                            setStates({
                                ...states,
                                role
                            })
                        }
                    }}
                    onRow={onRow}
                />
                <Modal
                    title="创建角色"
                    visible={isShowModal}
                    onOk={addRole}
                    onCancel={() => {
                        setStates({
                            ...states,
                            isShowModal: false
                        });
                        getFormValue.current.formFields.resetFields();
                    }}
                // destroyOnClose={true}
                >
                    <AddFormRole
                        roles={roles}
                        role={role}
                        ref={getFormValue}
                    />
                </Modal>

                <Modal
                    title="设置角色权限"
                    visible={isShowAuth}
                    onOk={updateRole}
                    onCancel={() => {
                        setStates({
                            ...states,
                            role: {},
                            isShowAuth: false
                        });
                    }}
                    destroyOnClose
                >

                    <AuthForm
                        role={role}
                        onRef={getUpdateValue}
                    />
                </Modal>
            </Card>
        </>
    );
}


export default connect(
    state => ({
        user: state.user
    }),
    {logout}
)(Role);