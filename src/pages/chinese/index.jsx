import Taro, { Component } from '@tarojs/taro';
import { View, Button, Textarea, Block } from '@tarojs/components';
import changeZi from '@/src/libs/changeZi';

import './index.scss';

export default class Index extends Component {
    config = {
        navigationBarTitleText: '汉字简体/繁体转换'
    }

    constructor (props) {
        super(props);
    }

    state = {
        textData: '',
        resultData: ''
    }

    componentWillMount () {}

    componentDidMount () {}

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    oldToNew (val) {
        let czi = val;
        const newZi = changeZi.newZi;
        const oldZi = changeZi.oldZi;
        for (let i = 0, len = newZi.length; i < len; i++) {
            const regzi = newZi.charAt(i);
            czi = czi.replace(new RegExp(regzi, 'g'), oldZi.charAt(i));
        }
        return czi;
    }

    newToOld (val) {
        let czi = val;
        const newZi = changeZi.newZi;
        const oldZi = changeZi.oldZi;
        for (let i = 0, len = oldZi.length; i < len; i++) {
            const regzi = oldZi.charAt(i);
            czi = czi.replace(new RegExp(regzi, 'g'), newZi.charAt(i));
        }
        return czi;
    }

    changeDoc (v) {
        const { textData } = this.state;
        const startTime = new Date().getTime();
        // const doc = require('@/src/libs/doc').default;
        const res = v ? this.oldToNew(textData) : this.newToOld(textData);
        const endTime = new Date().getTime();
        this.setState({resultData: res});
        console.log('用时' + (endTime - startTime) + 'ms');
    }

    changeInput (e) {
        const val = e.detail.value;
        this.setState({textData: val});
    }

    // 复制内容
    copyText () {
        const { resultData } = this.state;
        Taro.setClipboardData({data: resultData}); 
    }

    render () {
        const { textData, resultData } = this.state;

        return (
            <View className='wrap'>

                <Textarea
                    className='obox'
                    placeholder='输入需要转换的汉字'
                    value={textData}
                    maxlength='-1'
                    onInput={this.changeInput.bind(this)}
                />

                <View className='btn_box'>
                    <Button
                        className='btn r'
                        type='warn'
                        onClick={this.changeDoc.bind(this, 1)}
                    >简体转繁体</Button>
                    <Button
                        className='btn'
                        type='primary'
                        onClick={this.changeDoc.bind(this, 0)}
                    >繁体转简体</Button>
                </View>

                {
                    resultData &&
                    <Block>
                        <Textarea
                            className='obox'
                            value={resultData}
                            maxlength='-1'
                            placeholder='转换的汉字'
                            // onInput={this.changeInput.bind(this)}
                            disabled
                        />

                        <View className='btn_box'>
                            <Button
                                className='btn'
                                type='primary'
                                onClick={this.copyText.bind(this)}
                            >复制内容</Button>
                        </View>
                    </Block>
                }

                

            </View>
        );
    }
}
