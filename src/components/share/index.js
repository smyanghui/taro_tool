import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';

import './index.scss';

export default class Share extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    componentWillMount () { }

    componentDidMount () {}

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    render () {
        return (
            <View className='share_btn'>
                <Button
                    plain='true'
                    open-type='share'
                    hover-class='none'
                >分享给好友</Button>
            </View>
        );
    }
}
