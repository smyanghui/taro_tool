import Taro, { Component } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';

import api from '@/src/api/showapi';
import './index.scss';

export default class List extends Component {
    config = {
        navigationBarTitleText: '列表'
    }

    constructor (props) {
        super(props);
        this.state = {
            type: '',
            curPage: 1,
            isEmpty: false,
            storyList: []
        };
    }

    componentWillMount () {
        const type = this.$router.params.type || '';
        this.setState({ type }, () => {
            this.ajaxStroyList();
        });
    }

    componentDidMount () {}

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    toDetail (id) {
        const url = '/pages/story/detail?id=' + id;
        Taro.navigateTo({ url });
    }

    ajaxStroyList () {
        const { type, curPage } = this.state;
        const params = {
            classifyId: type,
            page: curPage,
        };
        api.storyList(params).then(
            (res) => {
                const result = res.data.showapi_res_body;
                const storyList = result.contentlist || [];
                const isEmpty = storyList.length === 0;
                this.setState({ storyList, isEmpty });
            },
            () => {
                Taro.showToast({icon: 'none', title: '网络错误！'});
            }
        );
    }

    render () {
        const { storyList, isEmpty } = this.state;
        return (
            <View className='wrap'>
                <AtList>
                    {
                        storyList.map((item, index) => <Block key={`list-${index}`}>
                            <AtListItem
                                title={item.title}
                                arrow='right'
                                onClick={this.toDetail.bind(this, item.id)}
                            />
                        </Block>)
                    }
                </AtList>

                {
                    isEmpty && <View className='list_empty'>未查到相关数据！</View>
                }

            </View>
        );
    }
}
