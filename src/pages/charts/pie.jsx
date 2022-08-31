import React, {useState} from 'react';
import { Card, Button } from 'antd'
import ReactECharts from 'echarts-for-react';

const Pie = () => {
    
    const getOptionNormal = () => {
        return {
            title: {
                text: 'Referer of a Website',
                subtext: 'Fake Data',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [
                {
                  name: 'Access From',
                  type: 'pie',
                  radius: '50%',
                  data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                  ],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
        }
    }

    const getOptionRose = () => {
        return {
            title: {
                text: 'Nightingale Chart',
                subtext: 'Fake Data',
                left: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              legend: {
                left: 'center',
                top: 'bottom',
                data: [
                  'rose1',
                  'rose2',
                  'rose3',
                  'rose4',
                  'rose5',
                  'rose6',
                  'rose7',
                  'rose8'
                ]
              },
              toolbox: {
                show: true,
                feature: {
                  mark: { show: true },
                  dataView: { show: true, readOnly: false },
                  restore: { show: true },
                  saveAsImage: { show: true }
                }
              },
              series: [
                {
                  name: 'Radius Mode',
                  type: 'pie',
                  radius: [20, 140],
                  center: ['25%', '50%'],
                  roseType: 'radius',
                  itemStyle: {
                    borderRadius: 5
                  },
                  label: {
                    show: false
                  },
                  emphasis: {
                    label: {
                      show: true
                    }
                  },
                  data: [
                    { value: 40, name: 'rose 1' },
                    { value: 33, name: 'rose 2' },
                    { value: 28, name: 'rose 3' },
                    { value: 22, name: 'rose 4' },
                    { value: 20, name: 'rose 5' },
                    { value: 15, name: 'rose 6' },
                    { value: 12, name: 'rose 7' },
                    { value: 10, name: 'rose 8' }
                  ]
                },
                {
                  name: 'Area Mode',
                  type: 'pie',
                  radius: [20, 140],
                  center: ['75%', '50%'],
                  roseType: 'area',
                  itemStyle: {
                    borderRadius: 5
                  },
                  data: [
                    { value: 30, name: 'rose 1' },
                    { value: 28, name: 'rose 2' },
                    { value: 26, name: 'rose 3' },
                    { value: 24, name: 'rose 4' },
                    { value: 22, name: 'rose 5' },
                    { value: 20, name: 'rose 6' },
                    { value: 18, name: 'rose 7' },
                    { value: 16, name: 'rose 8' }
                  ]
                }
              ]
        }
    }
    

    return (
        <>
        <div>
            {/* <Card >
            <Button type='primary' onClick={() => upDate(state)}>更新</Button> &nbsp;&nbsp;
            </Card> */}
            <Card title='饼图一'
            >               
                <ReactECharts option={getOptionNormal()} />                
            </Card>
            <Card title='饼图二'
            >               
                <ReactECharts option={getOptionRose()} />                
            </Card>

        </div>
        </>
    );
}


export default Pie;