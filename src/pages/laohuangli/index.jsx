import Taro, { Component } from '@tarojs/taro';
import { View, Text, Picker, Block } from '@tarojs/components';

import api from '@/src/api/juhe';
import './index.scss';

export default class Index extends Component {
    config = {
        navigationBarTitleText: 'xxx'
    }

    constructor (props) {
        super(props);
        this.state = {
            curDate: '',
            liDetail: []
        };
    }

    componentWillMount () {}

    componentDidMount () {
        const curDate = this.today();
        this.setState({ curDate }, () => {
            this.ajaxLaohuangli();
        });
    }

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    // 获取当前日期
    today () {
        const newDate = new Date();
        const year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let today = newDate.getDate();
        today = today < 10 ? '0' + today : today;
        return year + '-' + month + '-' + today;
    }

    ajaxLaohuangli () {
        const { curDate } = this.state;
        const param = {date: curDate};
        api.laohuangli(param).then(
            (res) => {
                const result = res.data.result;
                this.setState({ liDetail: result });
            },
            () => {
                Taro.showToast({icon: 'none', title: '网络错误！'});
            }
        );
    }

    changeDate (e) {
        const curDate = e.detail.value;
        this.setState({ curDate });
    }

    render () {
        const { liDetail, curDate } = this.state;
        const detail = liDetail;
        return (
            <View className='wrap'>

                <View className='date_box'>
                    <View>选择日期</View>
                    <View className='picker_box'>
                        <Picker
                            mode='date'
                            value={curDate}
                            onChange={this.changeDate.bind(this)}
                        >
                            <Text>{curDate}</Text>
                        </Picker>
                    </View>
                </View>

                <View className='at-article'>
                    <View className='at-article__h1'>阴历</View>
                    <View className='at-article__p'>{detail.yinli}</View>
                    <View className='at-article__h1'>宜</View>
                    <View className='at-article__p'>{detail.yi}</View>
                    <View className='at-article__h1'>忌</View>
                    <View className='at-article__p'>{detail.ji}</View>
                </View>

            </View>
        );
    }
}
