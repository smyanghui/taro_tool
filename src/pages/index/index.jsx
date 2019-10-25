import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.scss';

export default class Index extends Component {
    config = {
        navigationBarTitleText: '调试'
    }

    constructor (props) {
        super(props);
    }

    state = {}

    componentWillMount () {}

    componentDidMount () {}

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    render () {
        // const { textData, resultData } = this.state;

        return (
            <View className='wrap'>

                test

            </View>
        );
    }
}
