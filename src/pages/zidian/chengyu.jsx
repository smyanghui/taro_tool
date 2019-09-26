import Taro, { Component } from '@tarojs/taro';
import { View, Text, Block } from '@tarojs/components';
import { AtInput, AtButton, AtCard }  from 'taro-ui';

import api from '@/src/api/juhe';
import './index.scss';

export default class Chengyu extends Component {
    config = {
        navigationBarTitleText: '成语词典'
    }

    constructor (props) {
        super(props);
        this.state = {
            cy: '',
            cyDetail: {}
        };
    }

    componentWillMount () {}

    componentDidMount () {}

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    ajaxCyQuery () {
        const { cy } = this.state;
        const isCy = /^[\u4E00-\u9FA5]{1,5}$/.test(cy);
        if (!isCy) {
            Taro.showToast({icon: 'none', title: '请输入中文字符'});
            return;
        }
        const param = {word: cy};
        api.chengyuQuery(param).then(
            (res) => {
                const result = res.data.result;
                if (res.data.error_code !== 0) {
                    const errMessage = typeof result === 'string' ? result : '查询有误！';
                    Taro.showToast({icon: 'none', title: errMessage});
                    return;
                }
                this.setState({ cyDetail: result });
            },
            () => {
                Taro.showToast({icon: 'none', title: '网络错误！'});
            }
        );
    }

    changeZi (val) {
        const cy = val;
        this.setState({ cy });
    }

    render () {
        const { cyDetail, cy } = this.state;
        const detail = cyDetail;
        const tongyi = detail.tongyi || [];
        const fanyi = detail.fanyi || [];
        const isPinyin = detail.pinyin;
        return (
            <View className='wrap'>

                <View className='search_box'>
                    <View className='zi_input'>
                        <AtInput
                            name='value'
                            type='text'
                            border={false}
                            maxLength='4'
                            placeholder='输入要查询的成语'
                            value={cy}
                            onChange={this.changeZi.bind(this)}
                        />
                    </View>
                    <View>
                        <AtButton
                            type='primary'
                            onClick={this.ajaxCyQuery.bind(this)}
                        >查询
                        </AtButton>
                    </View>
                </View>

                {
                    !isPinyin &&
                    <View className='adfadsf'>
                        <Text>查询成语</Text>
                        <Text>查询词语</Text>
                    </View>
                }

                {
                    isPinyin &&
                    <AtCard title='简介'>
                        <View className='zi_list'>拼音：{detail.pinyin}</View>
                        <View className='zi_list'>解释：{detail.chengyujs}</View>
                        <View className='zi_list'>出处：{detail.from_}</View>
                        <View className='zi_list'>语法：{detail.yufa}</View>
                        <View className='zi_list'>举例：{detail.example}</View>
                    </AtCard>
                }

                {
                    tongyi.length > 0 &&
                    <AtCard title='同义词' className='xx_box'>
                        {
                            tongyi.map((item, index) => <Block key={`ty-${index}`}>
                                {
                                    item && <View className='zi_list'>{item}</View>
                                }
                            </Block>)
                        }
                    </AtCard>
                }

                {
                    fanyi.length > 0 &&
                    <AtCard title='反义词' className='xx_box'>
                        {
                            fanyi.map((item, index) => <Block key={`fy-${index}`}>
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
