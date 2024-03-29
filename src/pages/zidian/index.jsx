import Taro, { Component } from '@tarojs/taro';
import { View, Text, Block } from '@tarojs/components';
import { AtInput, AtButton, AtCard }  from 'taro-ui';

import api from '@/src/api/juhe';
import './index.scss';

export default class Index extends Component {
    config = {
        navigationBarTitleText: '新华字典'
    }

    constructor (props) {
        super(props);
        this.state = {
            zi: '',
            ziDetail: {}
        };
    }

    componentWillMount () {}

    componentDidMount () {}

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    ajaxZdQuery () {
        const { zi } = this.state;
        const isHanZi = /^[\u4E00-\u9FA5]{1,5}$/.test(zi);
        if (!isHanZi) {
            Taro.showToast({icon: 'none', title: '请输入中文字符'});
            return;
        }
        const param = {word: zi};
        api.zdQuery(param).then(
            (res) => {
                const result = res.data.result;
                if (res.data.error_code !== 0) {
                    const errMessage = typeof result === 'string' ? result : '查询有误！';
                    Taro.showToast({icon: 'none', title: errMessage});
                    return;
                }
                this.setState({ ziDetail: result });
            },
            () => {
                Taro.showToast({icon: 'none', title: '网络错误！'});
            }
        );
    }

    changeZi (val) {
        const zi = val;
        this.setState({ zi });
    }

    render () {
        const { ziDetail, zi } = this.state;
        const detail = ziDetail;
        const jianjie = detail.jijie || [];
        const xiangjie = detail.xiangjie || [];
        const isTip = jianjie.length > 0 || xiangjie.length > 0;
        return (
            <View className='wrap'>

                <View className='search_box'>
                    <View className='zi_input'>
                        <AtInput
                            name='value'
                            type='text'
                            border={false}
                            maxLength='1'
                            placeholder='输入要查询的单个汉字'
                            value={zi}
                            onChange={this.changeZi.bind(this)}
                        />
                    </View>
                    <View>
                        <AtButton
                            type='primary'
                            onClick={this.ajaxZdQuery.bind(this)}
                        >查询
                        </AtButton>
                    </View>
                </View>

                {
                    !isTip &&
                    <View className='adfadsf'>
                        <Text>查询成语</Text>
                        <Text>查询词语</Text>
                    </View>
                }

                {
                    jianjie.length > 0 &&
                    <AtCard title='简介'>
                        <View className='zi_list'>拼音：{detail.pinyin}</View>
                        <View className='zi_list'>五笔：{detail.wubi}</View>
                        <View className='zi_list'>部首：{detail.bushou}</View>
                        {
                            jianjie.map((item, index) => <Block key={`zi-${index}`}>
                                {
                                    item && <View className='zi_list'>{item}</View>
                                }
                            </Block>)
                        }
                    </AtCard>
                }

                {
                    xiangjie.length > 0 &&
                    <AtCard title='详解' className='xx_box'>
                        {
                            xiangjie.map((item, index) => <Block key={`xi-${index}`}>
                                {
                                    item && <View className='zi_list'>{item}</View>
                                }
                            </Block>)
                        }
                    </AtCard>
                }
                
            </View>
        );
    }
}
