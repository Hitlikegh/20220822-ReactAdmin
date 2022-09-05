import './header.less';
import memoryUtils from '../../utils/memoryUtils';
import { formateDate } from '../../utils/dataUtils'
import React, { Component } from 'react'
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { reqWeatherQuery } from '../../api'
import withRouter from '../../utils/withRouter.js'

// redux
import { connect } from 'react-redux';
import { logout } from '../../redux/action';

const { confirm } = Modal;

class Headersh extends Component {

    

    state = {
        currentTime: formateDate(Date.now()), //当前时间字符串
        weather: '', //天气的文本
        city: '',
    }
    // 获取天气,城市
    getWeather = async (citycode) => {
        const { weather, city } = await reqWeatherQuery(310000)
        this.setState({ weather, city })
    }
    
    // 获取时间
    getDate = () => {
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({ currentTime })
        }, 1000)
    }
    
    // 退出登录,使用antd的Modal对话框
    logout = () => {
        confirm({
            title: '确定退出吗?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            onOk: () => {
                
                this.props.logout();
            },
            onCancel() {
            },
        });
    }
    componentDidMount() {
        this.getDate()
        this.getWeather()
        // this.getTitle()
    }
    componentWillUnmount() {
        // 清除定时器
        clearInterval(this.intervalId)
    }
    render() {
        // const title = this.getTitle(); 
        const title = this.props.headTitle; // redux
        const username = this.props.user.username; // redux

        return (
            <div className='header'>
                <div className='header-top'>
                    {/* <span>欢迎{this.getUserName()}</span> */}
                    <span>欢迎{username}</span>
                    <Button type="link" onClick={() => this.logout()}>退出</Button>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{this.state.currentTime}</span>
                        <span>{this.state.city}</span>
                        <span>{this.state.weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        ...state,
        headTitle: state.headTitle,
        user: state.user
    }),
    { logout}
    )(withRouter(Headersh))
    
// export default withRouter(Headersh)