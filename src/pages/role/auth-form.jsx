import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { Form, Input, Tree } from 'antd'
import Role from './role';
import menuList from '../../config/menuConifg';

// const treeData = [
//     {
//         title: '平台权限',
//         key: '0-0',
//         children: [
//             {
//                 title: '首页',
//                 key: '0-0-0',
//                 disabled: false,
//                 children: [

//                 ],
//             },
//             {
//                 title: '商品',
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: '品类管理',
//                         key: '0-0-1-0',
//                     },
//                     {
//                         title: '商品管理',
//                         key: '0-0-1-1',
//                     },
//                 ],
//             },
//             {
//                 title: '用户管理',
//                 key: '0-0-2',
//                 disabled: false,
//                 children: [],
//             },
//             {
//                 title: '角色管理',
//                 key: '0-0-3',
//                 disabled: false,
//                 children: [],
//             },
//             {
//                 title: '图形图表',
//                 key: '0-0-4',
//                 children: [
//                     {
//                         title: '柱形图',
//                         key: '0-0-4-0',
//                     },
//                     {
//                         title: '折线图',
//                         key: '0-0-4-1',
//                     },
//                     {
//                         title: '饼图',
//                         key: '0-0-4-2',
//                     },
//                 ],
//             },

//         ],
//     },
// ];



const AuthForm = (props, ref) => {

    useImperativeHandle(props.onRef, () => {
        return {
            func: getMenus,
        };
    });

    const defaultstates = {
        checkedKeys: props.role.menus
    }
    const [states, setStates] = useState(defaultstates);
    // console.log("props.role.menus", props.role.menus);
    // console.log("states", states);


    const onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
        setStates({ checkedKeys });

    };


    const getMenus = () => states.checkedKeys;

    const getTreeData = (menuList) => {
        let newTreeData = []
        menuList.map((menu) => {
            if (!menu.children) {
                return newTreeData.push({ title: menu.title, key: menu.key })
            } else {
                return newTreeData.push({ title: menu.title, key: menu.key, children: getTreeData(menu.children) })
            }
        })

        return newTreeData
    };



    const { role } = props;
    // console.log("props", props);
    const { checkedKeys } = states;
    // console.log("states", states);
    // console.log("checkedKeys", checkedKeys);
    // console.log("role.menus", role.menus);

    // console.log("props", props);
    const data = getTreeData(menuList)
    const treeData = [
        {
            title: '平台权限',
            key: 'all',
            children: data
        },
    ];



    return (
        <>
            <Form
            >
                <Form.Item
                    name='roleName'
                    label='角色名称'>
                    <Input value={role.name} disabled />
                </Form.Item>
                <Form.Item>
                    <Tree
                        checkable
                        treeData={treeData}
                        defaultExpandAll={true}
                        checkedKeys={checkedKeys}
                        onCheck={onCheck}

                    />

                </Form.Item>
            </Form>
        </>
    );
}



const WrappedForm = forwardRef(AuthForm);
export default WrappedForm;