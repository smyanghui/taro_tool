import Taro, { Component } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import Share from '@/src/components/share';

import api from '@/src/api/showapi';
import './index.scss';

export default class Index extends Component {
    config = {
        navigationBarTitleText: '今日油价'
    }

    constructor (props) {
        super(props);
        this.state = {
            curTime: '',
            oilList: []
        };
    }

    componentWillMount () {}

    componentDidMount () {
        this.ajaxOilPrice();
    }

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    ajaxOilPrice () {
        api.oilPrice().then(
            (res) => {
                const result = res.data.showapi_res_body;
                const oilList = result.list || [];
                const curTime = oilList[1].ct;
                oilList.unshift({prov: '地区', p89: '89号', p92: '92号', p95: '95号', p98: '98号'});
                this.setState({ oilList, curTime });
            },
            () => {
                Taro.showToast({icon: 'none', title: '网络错误！'});
            }
        );
    }

    render () {
        const { oilList, curTime } = this.state;
        return (
            <View className='wrap'>
                <View className='ct'>{curTime}</View>
                {
                    oilList.map((item, index) => <Block key={`oil-${index}`}>
                        <View className='table_box'>
                            <View>{item.prov}</View>
                            <View>{item.p89}</View>
                            <View>{item.p92}</View>
                            <View>{item.p95}</View>
                            <View>{item.p98}</View>
                        </View>
                    </Block>)
                }

                {/* 分享按钮 */}
                <Share />

            </View>
        );
    }
}
