import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtButton, AtList, AtListItem } from 'taro-ui';

import libs from '@/src/libs';

import './index.scss';

export default class Set extends Component {
    config = {
        navigationBarTitleText: '设置'
    }

    state = {
        curEnv: ''
    }

    componentWillMount() {
        this.currentEnv();
    }

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    // 摇一摇
    shakePhone () {
        // Taro.startAccelerometer();
        // Taro.onAccelerometerChange((res) => {
        //     const isShake = res.x > 1 && res.y > 1;
        //     if (!isShake) { return; }
        //     this.changeENV();
        // });
    }

    currentEnv () {
        const curEnv = libs.mpApp.curEnv();
        this.setState({curEnv});
    }

    changeENV () {
        const itemList = [
            '切换至生产环境',
            '切换至预发环境'
        ];
        Taro.showActionSheet({itemList}).then(res => {
            const tapIndex = res.tapIndex;
            this.clearCache();
            const newEnv = ['prod', 'uat'][tapIndex];
            Taro.setStorageSync('CURENV', newEnv);
            this.currentEnv();
        }).catch(err => {
            console.log(err);
        });
    }

    clearCache () {
        Taro.clearStorageSync();
    }

    render() {
        const {curEnv} = this.state;
        return (
            <View className='wrap'>
                <AtList>
                    <AtListItem
                        arrow='right'
                        title='当前环境'
                        extraText={curEnv}
                        onClick={this.changeENV.bind(this)}
                    />
                </AtList>

                <View className='btn_box'>
                    <AtButton
                        type='secondary'
                        onClick={this.clearCache.bind(this)}
                    >清除缓存
                    </AtButton>
                </View>

            </View>
        );
    }
}
