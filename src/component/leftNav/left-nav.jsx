import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './left-nav.less';
import loginImg from '../../assets/images/logo.jpg';
import {
    PicCenterOutlined,
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu, Icon } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import menuList from '../../config/menuConifg';

// redux
import { connect } from 'react-redux';
import { setHeadTitle } from '../../redux/action';



const LeftNav = (props) => {

    let location = useLocation();

    const [states, setStates] = useState({
        menus: [],
        openKeys: ''
    })

    // 得到当前用户的权限数组
    const getCurrentMenus = () => {
        const menus = props.user.role.menus
        const newMenus = menuList.map((item) => {
            if (!item.children) {

                return (
                    menus.includes(item.key) ? {
                        title: item.title,
                        key: item.key,
                        icon: item.icon
                    } : '0'
                )
            }
            else {
                const childrenMenus = item.children.map((ic) => {
                    return (
                        menus.includes(ic.key) ? {
                            title: ic.title,
                            key: ic.key,
                            icon: ic.icon
                        } : '0'
                    )
                })
                // // 过滤其中为'0'的值
                const newChildren = []
                childrenMenus.forEach(e => {
                    if (e !== '0') newChildren.push(e)
                })
                if (newChildren.length !== 0) {
                    return (
                        {
                            title: item.title,
                            key: item.key,
                            icon: item.icon,
                            children: newChildren
                        }
                    )
                }
            }
        })
        // 过滤其中为'0'和莫名其妙产生的undefined的值
        const test = []
        newMenus.forEach(element => {
            if (element !== '0' && !!element) test.push(element)
        });
        setStates({
            ...states,
            menus:test
        })
    }


    const getMenuNodes_map = (menuList) => {

        const path = location.pathname;

        return menuList.map((items) => {
            if (!items.children) {

                if (items.key === path || path.indexOf(items.key) === 0) {
                    //更新redux中的状态
                    props.setHeadTitle(items.title);
                }

                return (
                    <Menu.Item key={items.key} >
                        <Link to={items.key} onClick={
                            () => {
                                props.setHeadTitle(items.title);
                            }
                        }></Link>
                        
                        {items.icon}
                        <span>{items.title}</span>
                    </Menu.Item>
                    
                )
            } else {

                const cItem = items.children.find(cItem => path.indexOf(cItem.key) === 0);
                if (cItem) {
                    const openKeys = items.key;
                    states.openKeys = openKeys;
                    
                    // return item.key;
                }
                return (
                    <SubMenu
                        key={items.key}
                        title={
                            <span>
                                {items.icon}
                                <span>{items.title}</span>
                            </span>
                        }>
                        {getMenuNodes_map(items.children, items.key)}
                    </SubMenu>
                )
            }

        })

    }

    // const getMenuNodes 

    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        getCurrentMenus();
        getMenuNodes_map(states.menus);

    }, [])

    const menuNodes = getMenuNodes_map(states.menus);
    let path = location.pathname;
    if (path.indexOf('/product') === 0) {
        path = '/product';
    }

    const openKeys = states.openKeys;

    return (
        <>
            <div className='left-nav'>
                <Link to="/" className='left-nav-header'>
                    <img src={loginImg} alt="" />
                    <h1>芜湖~~</h1>
                </Link>
                <div className='left-nav-menu'>

                    <Menu
                        selectedKeys={[path]}
                        defaultOpenKeys={[openKeys]}
                        mode="inline"
                        theme="dark"
                    >
                        {
                            menuNodes
                        }


                    </Menu>

                </div>

            </div>
        </>
    )

};


export default connect(
    state => ({
        user: state.user
    }),
    {setHeadTitle}
)(LeftNav);





