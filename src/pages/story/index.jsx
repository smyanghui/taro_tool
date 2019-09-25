import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtGrid } from 'taro-ui';

import api from '@/src/api/showapi';
import './index.scss';

export default class Story extends Component {
    config = {
        navigationBarTitleText: '首页'
    }

    constructor (props) {
        super(props);
        this.state = {
            storylist: []
        };
    }

    componentWillMount () {}

    componentDidMount () {
        this.ajaxStroyList();
    }

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    ajaxStroyList () {
        api.storyMenu().then(
            (res) => {
                const result = res.data.showapi_res_body;
                let storylist = result.storylist || [];
                for (let i in storylist) {
                    const li = storylist[i];
                    li.value = li.classify;
                }
                this.setState({ storylist });
            },
            () => {
                Taro.showToast({icon: 'none', title: '网络错误！'});
            }
        );
    }

    toDetail (item) {
        const url = '/pages/story/list?type=' + item.classifyId;
        Taro.navigateTo({ url });
    }

    render () {
        const { storylist } = this.state;
        return (
            <View className='wrap'>
                <AtGrid
                    data={storylist}
                    mode='rect'
                    onClick={this.toDetail.bind(this)}
                />
            </View>
        );
    }
}
