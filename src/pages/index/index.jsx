import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtGrid } from 'taro-ui';

import './index.scss';

export default class Index extends Component {
    config = {
        navigationBarTitleText: '首页'
    }

    constructor (props) {
        super(props);
        this.state = {
            list: [
                {
                    image:
                        'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                    value: '首页',
                    url: '/pages/zidian/index'
                },
                // {
                //     image:
                //         'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                //     value: '老黄历',
                //     url: '/pages/laohuangli/index'
                // },
                // {
                //     image:
                //         'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                //     value: '故事',
                //     url: '/pages/story/index'
                // },
                // {
                //     image:
                //         'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                //     value: '油价',
                //     url: '/pages/oilPrice/index'
                // }
            ]
        };
    }

    componentWillMount () {}

    componentDidMount () {}

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    toPages (item, index) {
        Taro.navigateTo({ url: item.url });
    }

    render () {
        const { list } = this.state;
        return (
            <View className='wrap'>
                <AtGrid data={list} onClick={this.toPages.bind(this)} />
            </View>
        );
    }
}
