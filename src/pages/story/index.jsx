import Taro, { Component } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';

import api from '@/src/api';
import './index.scss';

export default class Story extends Component {
    config = {
        navigationBarTitleText: '首页'
    }

    constructor (props) {
        super(props);
        this.state = {
            storylist: []
        };
    }

    componentWillMount () {}

    componentDidMount () {
        this.ajaxStroyList();
    }

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    ajaxStroyList () {
        api.story.storyMenu().then(
            (res) => {
                const result = res.data.showapi_res_body;
                const storylist = result.storylist || [];
                this.setState({ storylist });
            },
            () => {
                Taro.showToast({icon: 'none', title: '网络错误！'});
            }
        );
    }

    toDetail (id) {
        const url = '/pages/story/list?type=' + id;
        Taro.navigateTo({ url });
    }

    render () {
        const { storylist } = this.state;
        return (
            <View className='wrap'>
                <AtList>
                    {
                        storylist.map((item, index) => <Block key={`stroy-${index}`}>
                            <AtListItem
                                title={item.classify}
                                onClick={this.toDetail.bind(this, item.classifyId)}
                            />
                        </Block>)
                    }
                </AtList>
            </View>
        );
    }
}
