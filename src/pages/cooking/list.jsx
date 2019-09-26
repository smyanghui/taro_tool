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
            menu: '',
            curPage: 0,
            maxPage: 1,
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
        const { menu, curPage, maxPage } = this.state;
        const nextPage = curPage + 1;
        if (nextPage > maxPage) { return; }
        Taro.showLoading({title: ''});

        const params = {
            type: menu,
            page: nextPage,
        };
        api.cookList(params).then(
            (res) => {
                Taro.hideLoading();
                const result = res.data.showapi_res_body;
                const cookingList = result.datas || [];

                // if (result.ret_code !== '0') {
                //     wx.showToast({icon: 'none', title: result.msg})
                //     this.moreVisiable = false
                //     if (curPage === 1) {
                //         this.empty = true
                //     }
                //     this.$apply()
                //     return
                // }
                // this.curPage = curPage
                // this.maxPage = result.allPage
                // this.cookList = (curPage === 1) ? list : this.cookList.concat(list)

                const isEmpty = cookingList.length === 0;
                this.setState({ cookingList, isEmpty });
            },
            () => {
                Taro.hideLoading();
                Taro.showToast({icon: 'none', title: '网络错误！'});
            }
        );
    }

    onReachBottom() {
        console.log(123);
        // this.ajaxCookingList();
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
