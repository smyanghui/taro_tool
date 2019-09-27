import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtIcon } from 'taro-ui';

import './index.scss';

export default class Topbar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            top: 0,
            height: 0
        };
    }

    componentWillMount () {
        const sysMenu = Taro.getMenuButtonBoundingClientRect();
        this.setState({
            top: sysMenu.top,
            height: sysMenu.height
        });
    }

    componentDidMount () {}

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    render () {
        const { top, height } = this.state;
        const styleTopBar = {
            top: top + 'px',
            height: height + 'px',
            lineHeight: height + 'px',
            paddingBottom: '10px'
        };
        const barHeight = {
            height: (top + height + 10) + 'px'
        };

        return (
            <View className='top_bar' style={barHeight}>

                {/* 顶部内容 */}
                <View className='wrap' style={styleTopBar}>
                    <View className='icon_box'>
                        {this.props.renderLeft}
                    </View>
                    {this.props.children}
                </View>

                {/* 占位高度 */}
                <View style={{height: '100%'}} />
            </View>
        );
    }
}
