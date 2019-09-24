import Taro, { Component } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';

import api from '@/src/api';
import './index.scss';

export default class List extends Component {
    config = {
        navigationBarTitleText: '列表'
    }

    constructor (props) {
        super(props);
        this.state = {
            menu: '',
            curPage: 1,
            isEmpty: false,
            cookingList: []
        };
    }

    componentWillMount () {
        const menu = this.$router.params.menu || '';
        this.setState({ menu }, () => {
            this.ajaxCookingList();
        });
    }

    componentDidMount () {}

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    toDetail (data) {
        Taro.setStorageSync('cookDetail', data);
        const url = '/pages/cooking/detail';
        Taro.navigateTo({ url });
    }

    ajaxCookingList () {
        const { menu, curPage } = this.state;
        const params = {
            type: menu,
            page: curPage,
        };
        api.cooking.cookList(params).then(
            (res) => {
                const result = res.data.showapi_res_body;
                const cookingList = result.datas || [];
                const isEmpty = cookingList.length === 0;
                this.setState({ cookingList, isEmpty });
            },
            () => {
                Taro.showToast({icon: 'none', title: '网络错误！'});
            }
        );
    }

    render () {
        const { cookingList, isEmpty } = this.state;
        return (
            <View className='wrap'>
                <AtList>
                    {
                        cookingList.map((item, index) => <Block key={`list-${index}`}>
                            <AtListItem
                                title={item.cpName}
                                note={item.des.substr(0, 20)}
                                arrow='right'
                                thumb={item.smallImg}
                                onClick={this.toDetail.bind(this, item)}
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
