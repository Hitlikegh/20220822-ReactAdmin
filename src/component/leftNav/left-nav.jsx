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
import memoryUtils from '../../utils/memoryUtils';




const LeftNav = () => {
    const navigate = useNavigate();
    let location = useLocation();


    // console.log('path:', path);

    const [states, setStates] = useState({
        menus: [],
        openKeys: ''
    })

    // 得到当前用户的权限数组
    const getCurrentMenus = () => {
        const menus = memoryUtils.getUser().role.menus
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


        return menuList.map((items) => {
            // console.log(items);
            if (!items.children) {

                return (
                    <Menu.Item key={items.key}>
                        <Link to={items.key}></Link>
                        {items.icon}
                        <span>{items.title}</span>
                    </Menu.Item>
                )
            } else {

                const path = location.pathname;

                const cItem = items.children.find(cItem => path.indexOf(cItem.key) === 0);
                if (cItem) {
                    const openKeys = items.key;
                    states.openKeys = openKeys;
                    // console.log("openKeys", openKeys);
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
        const menuNodes = getMenuNodes_map(states.menus);

    }, [])

    const menuNodes = getMenuNodes_map(states.menus);
    let path = location.pathname;
    if (path.indexOf('/product') === 0) {
        path = '/product';
    }


    const openKeys = states.openKeys;
    // console.log("path", path);
    // console.log("openKeys", openKeys);

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
                        {/* <Menu.Item key='1'>
                            <Link to='/'></Link>
                            <AppstoreOutlined />
                            <span>首页</span>
                        </Menu.Item>

                        <SubMenu
                            key='sub1'
                            title={
                                <span>
                                    <PicCenterOutlined />
                                    <span>商品</span>
                                </span>
                            }>
                            <Menu.Item key='3'>
                                <Link to='category'></Link>
                                <span>品类管理</span>
                            </Menu.Item>
                            <Menu.Item key='4'>
                                <Link to='/products'></Link>
                                <span>商品管理</span>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key='5'>
                            <Link to='/user'></Link>
                            <span>用户管理</span>
                        </Menu.Item>
                        <Menu.Item key='6'>
                            <Link to='/role'></Link>
                            <span>角色管理</span>
                        </Menu.Item>
                        <SubMenu
                            key='sub2'
                            title={
                                <span>
                                    <Icon type='mail'></Icon>
                                    <span>图形与图表</span>
                                </span>
                            }>
                            <Menu.Item key='7'>
                                <Link to='/charts/bar'></Link>
                                <span>Bar</span>
                            </Menu.Item>
                            <Menu.Item key='8'>
                                <Link to='/charts/line'></Link>
                                <PieChartOutlined />
                                <span>折线图</span>

                            </Menu.Item>
                            <Menu.Item key='9'>
                                <Link to='/charts/pie'></Link>
                                <span>饼图</span>
                            </Menu.Item>
                        </SubMenu> */}

                        {
                            menuNodes
                        }


                    </Menu>

                </div>

            </div>
        </>
    )

};


export default LeftNav;





