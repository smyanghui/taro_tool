import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Block } from '@tarojs/components';
import { AtInput, AtButton, AtGrid } from 'taro-ui';

import './index.scss';
import mBg from './images/m.png';

export default class Dream extends Component {
    config = {
        navigationBarTitleText: '周公解梦'
        // navigationStyle: 'custom'
    }

    constructor (props) {
        super(props);
        this.state = {
            keyWord: ''
        };
        this.hotRecord = ['蛇', '鱼', '同学', '结婚', '吃饭', '打架', '吵架'];
        this.otherList = [
            {
                // image: 'https://smyanghui.oss-cn-beijing.aliyuncs.com/cart-light.png?Expires=1569493072&OSSAccessKeyId=TMP.hXHhwTff9kwK5Y2Ho6GzEzvpFCiFDgp7B9tXdnTFoASU9bPNeMecYmcu8gfB6rv3tSpGg4ZdC7VBQTunmym48bQXskkzptkACA8BA33ffg6H6CysnSFkmHEoEB5JLg.tmp&Signature=QqvDgYhWWIWCxM2C8CX6bIItoYs%3D',
                value: '老黄历',
                url: '/pages/laohuangli/index'
            },
            {
                value: '今日油价',
                url: '/pages/oilPrice/index'
            }
        ];
    }

    componentWillMount () {}

    componentDidMount () {
        this.setState({keyWord : ''});
    }

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    // 查询
    ajaxDreamQuery () {
        const { keyWord } = this.state;
        const isCy = /^[\u4E00-\u9FA5]{1,10}$/.test(keyWord);
        if (!isCy) {
            Taro.showToast({icon: 'none', title: '请输入中文字符'});
            return;
        }
        this.toDetail(keyWord);
    }

    toDetail (val) {
        let historyRecord = Taro.getStorageSync('historyRecord') || [];
        const isRecord = historyRecord.includes(val);
        console.log(isRecord, historyRecord);
        if (!isRecord) {
            historyRecord.push(val);
            Taro.setStorageSync('historyRecord', historyRecord);
        }
        const url = '/pages/dream/detail?kw=' + encodeURIComponent(val);
        Taro.navigateTo({ url });
    }

    toPages (item) {
        Taro.navigateTo({ url: item.url });
    }

    render () {
        const { keyWord } = this.state;
        const historyRecord = Taro.getStorageSync('historyRecord') || [];

        return (<View>

            <Image className='meng_bg' src={mBg} mode='widthFix' />

            <View className='wrap'>
                <View className='search_box'>
                    <View className='zi_input'>
                        <AtInput
                            name='value'
                            type='text'
                            border={false}
                            maxLength='10'
                            placeholder='输入梦到的内容'
                            value={keyWord}
                            onChange={(val) => this.setState({keyWord: val})}
                        />
                    </View>
                    <View>
                        <AtButton
                            type='primary'
                            onClick={this.ajaxDreamQuery.bind(this)}
                        >查询
                        </AtButton>
                    </View>
                </View>

                <View className='at-article'>
                    {
                        historyRecord.length > 0 &&
                        <Block>
                            <View className='at-article__h2'>最近搜索</View>
                            <View className='at-article__p'>
                                {
                                    historyRecord.map((item, index) => <Block key={index}>
                                        <Text
                                            className='record'
                                            onClick={this.toDetail.bind(this, item)}
                                        >{item}</Text>
                                    </Block>)
                                }
                            </View>
                        </Block>
                    }
                    <View className='at-article__h2'>热门搜索</View>
                    <View className='at-article__p'>
                        {
                            this.hotRecord.map((item, index) => <Block key={index}>
                                <Text
                                    className='record'
                                    onClick={this.toDetail.bind(this, item)}
                                >{item}</Text>
                            </Block>)
                        }
                    </View>
                    <View className='at-article__h2'>其他查询</View>
                    <AtGrid
                        data={this.otherList}
                        mode='rect'
                        onClick={this.toPages.bind(this)}
                    />
                </View>
            </View>
        </View>);
    }
}
