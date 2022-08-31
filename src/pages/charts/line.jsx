
import React, {useState} from 'react';
import { Card, Table, Button, Modal, message, Form, Input, Select } from 'antd'
import ReactECharts from 'echarts-for-react';

// render echarts option.

const Line = () => {
    const initialState = {
        sales: [5, 20, 36, 10, 10, 20],
        stores: [5, 10, 6, 14, 19, 11]
    }

    const [state, setstate] = useState(initialState);

    const upDate = (state) => {
        // console.log(state.sales);

        const newSales = state.sales.map((sale) => sale + 1);
        const newStores = state.stores.map((store) => store - 1);
        // console.log(newSales);
        
        setstate( {
            sales:newSales ,
            stores: newStores
        })
        // console.log(state);

    }

    const {sales, stores} = state
    const getOption = () => {
        return {
            title: {
                text: 'ECharts 入门示例'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                  }
              },
              lengend: {
                data:['销量', '库存']
              },
              xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
              },
              yAxis: {},
              series: [
                {
                  name: '销量',
                  type: 'line',
                  data: sales
                },
                {
                    name: '库存',
                    type: 'line',
                    data: stores
                  }
              ]
        }
    }
    

    return (
        <>
        <div>
            <Card >
            <Button type='primary' onClick={() => upDate(state)}>更新</Button> &nbsp;&nbsp;
            </Card>
            <Card title='折线图一'
            >               
                <ReactECharts option={getOption()} />                
            </Card>

        </div>
        </>
    );
}


export default Line;






    

