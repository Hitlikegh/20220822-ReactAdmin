import './header.less';
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { reqWeatherQuery } from '../../api'
import memoryUtils from '../../utils/memoryUtils';
import { formateDate } from '../../utils/dataUtils'



const Headers = () => {


    const defaultstates = {
        currentTime: formateDate(Date.now()), //当前时间字符串
        weather: '', //天气的文本
        city: '',
    }

    const [states, useStates] = useState(defaultstates);

    // 获取天气 城市
    const getWeather = async (citycode) => {
        const { weather, city } = await reqWeatherQuery(310000)
        useStates({ weather, city });
    }

    // 获取用户名
    const getUserName = () => {
        const { username } = memoryUtils.getUser()
        return username
    }
    // 获取时间
    const getDate = () => {
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({ currentTime })
        }, 1000)
    }



    useEffect(() => {
        getDate();
        getWeather();
        useStates(states)

    }, [])

    return (
        <>
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，admin</span>
                    <a href="javascrip:;">退出</a>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>首页</div>
                    <div className='header-bottom-right'>
                        <span>{states.currentTime}</span>
                        <span>{states.city}</span>
                        <span>{states.weather}</span>
                    </div>
                </div>
                Header
            </div>
        </>
    )

};
export default Headers;