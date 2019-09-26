import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtInput, AtButton }  from 'taro-ui';

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
        const param = {word: zi};
        api.zdQuery(param).then(
            (res) => {
                console.log(123123, res);
                // const result = res.data.result;
                // this.setState({ liDetail: result });
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
        return (
            <View className='wrap'>

                <View className='search_box'>
                    <View className='zi_input'>
                        <AtInput
                            name='value'
                            type='text'
                            placeholder='输入要查询的汉字'
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

            </View>
        );
    }
}
