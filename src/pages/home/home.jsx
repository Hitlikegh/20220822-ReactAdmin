import React, { Component } from 'react'
import home_img from './home_img.png'
import './home.less'
import { DatePicker, Space } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


const Home = () => {
    return (
        <div className='home'>
            <div>
            <RangePicker
            defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
            format={dateFormat}
    />
            </div>
        </div>
    )
}

export default Home;