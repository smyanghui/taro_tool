import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
// import { AtGrid } from 'taro-ui';
import changeZi from '@/src/libs/changeZi';

import './index.scss';

export default class Index extends Component {
    config = {
        navigationBarTitleText: '调试页面'
    }

    constructor (props) {
        super(props);
        this.state = {};
    }

    componentWillMount () {}

    componentDidMount () {
        // this.replaceZi();
    }

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    newToOld (val) {
        let czi = val;
        const newZi = changeZi.newZi;
        const oldZi = changeZi.oldZi;

        console.log('开始时间：', new Date().getTime());
        for (let i = 0, len = newZi.length; i < len; i++) {
            const regzi = newZi.charAt(i);
            //if (czi.indexOf(regzi) > -1) {
            czi = czi.replace(new RegExp(regzi, 'g'), oldZi.charAt(i));
            //}
        }
        console.log('结束时间：', new Date().getTime());
        console.log(czi);
        return czi;
    }

    oldToNew (val) {
        let czi = val;
        const newZi = changeZi.newZi;
        const oldZi = changeZi.oldZi;

        for (let i = 0, len = oldZi.length; i < len; i++) {
            const regzi = oldZi.charAt(i);
            czi = czi.replace(new RegExp(regzi, 'g'), newZi.charAt(i));
        }
        
        return czi;
    }

    changeDoc () {
        console.log('开始 ', new Date().getTime());
        const doc = require('@/src/libs/doc').default;
        const resZi = this.oldToNew(doc);
        console.log('结束 ', new Date().getTime());
        console.log(resZi);

        // Taro.downloadFile({
        //     url: './v1.pdf'
        // }).then((res) => {
        //     console.log(res);
        // });

        // Taro.openDocument({
        //     filePath: './v1.pdf'
        // }).then((res) => {
        //     console.log(res);
        // });
    }

    render () {
        // const { list } = this.state;

        return (
            <View className='wrap'>

                <Text onClick={this.changeDoc.bind(this)}>点击开始转换</Text>

            </View>
        );
    }
}
