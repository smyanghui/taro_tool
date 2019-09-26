import Taro, { Component } from '@tarojs/taro';
import { View, Text, Block } from '@tarojs/components';
import { AtInput, AtButton, AtCard, AtList, AtListItem }  from 'taro-ui';

import api from '@/src/api/juhe';
import './index.scss';

export default class Dream extends Component {
    config = {
        navigationBarTitleText: '周公解梦'
    }

    constructor (props) {
        super(props);
        this.state = {
            cy: '',
            dreamList: []
        };
    }

    componentWillMount () {}

    componentDidMount () {}

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    ajaxCyQuery () {
        const { cy } = this.state;
        const isCy = /^[\u4E00-\u9FA5]{1,10}$/.test(cy);
        if (!isCy) {
            Taro.showToast({icon: 'none', title: '请输入中文字符'});
            return;
        }
        const param = {q: cy};
        api.dreamQuery(param).then(
            (res) => {
                const result = res.data.result;
                if (res.data.error_code !== 0) {
                    const errMessage = typeof result === 'string' ? result : '查询有误！';
                    Taro.showToast({icon: 'none', title: errMessage});
                    return;
                }
                this.setState({ dreamList: result });
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

    toDetail (id) {
        // const url = '/pages/story/detail?id=' + id;
        // Taro.navigateTo({ url });
    }

    render () {
        const { dreamList, cy } = this.state;
        const isEmpty = dreamList.length === 0;

        return (
            <View className='wrap'>

                <View className='search_box'>
                    <View className='zi_input'>
                        <AtInput
                            name='value'
                            type='text'
                            border={false}
                            maxLength='10'
                            placeholder='输入关键词'
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
                    !isEmpty &&
                    dreamList.map((item, index) => <Block key={`list-${index}`}>
                        <AtCard title={item.title} className='xx_box'>
                            {item.des}
                        </AtCard>
                    </Block>)
                    
                }

                {
                    isEmpty && <View className='list_empty'>未查到相关数据！</View>
                }

            </View>
        );
    }
}
