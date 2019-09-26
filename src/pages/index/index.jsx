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
                    image: 'https://smyanghui.oss-cn-beijing.aliyuncs.com/cart-light.png?Expires=1569493072&OSSAccessKeyId=TMP.hXHhwTff9kwK5Y2Ho6GzEzvpFCiFDgp7B9tXdnTFoASU9bPNeMecYmcu8gfB6rv3tSpGg4ZdC7VBQTunmym48bQXskkzptkACA8BA33ffg6H6CysnSFkmHEoEB5JLg.tmp&Signature=QqvDgYhWWIWCxM2C8CX6bIItoYs%3D',
                    value: 'xxxx',
                    url: '/pages/zidian/dream'
                },
                // {
                //     image: 'https://smyanghui.oss-cn-beijing.aliyuncs.com/cart-light.png?Expires=1569493072&OSSAccessKeyId=TMP.hXHhwTff9kwK5Y2Ho6GzEzvpFCiFDgp7B9tXdnTFoASU9bPNeMecYmcu8gfB6rv3tSpGg4ZdC7VBQTunmym48bQXskkzptkACA8BA33ffg6H6CysnSFkmHEoEB5JLg.tmp&Signature=QqvDgYhWWIWCxM2C8CX6bIItoYs%3D',
                //     value: '成语词典',
                //     url: '/pages/zidian/chengyu'
                // },
                // {
                //     image:
                //         'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                //     value: '新华字典',
                //     url: '/pages/zidian/index'
                // },
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
