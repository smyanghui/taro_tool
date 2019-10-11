import Taro, { Component } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { AtDrawer, AtList, AtListItem } from 'taro-ui';

import api from '@/src/api/avatardata';
import './index.scss';

export default class Cooking extends Component {
    config = {
        navigationBarTitleText: '首页'
    }

    constructor (props) {
        super(props);
        this.state = {
            twoShow: false,
            threeShow: false,
            cookingData: [],
            twoMenu: [],
            threeMenu: []
        };
    }

    componentWillMount () {}

    componentDidMount () {
        const cookingData = Taro.getStorageSync('cookingData') || [];
        if (cookingData.length > 0) {
            this.setState({ cookingData });
        } else {
            this.ajaxCookingMenu();
        }
    }

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    oneMenuClick (list) {
        const twoMenu = list || [];
        this.setState({ twoMenu, twoShow: true, threeShow: false });
    }

    twoMenuClick (list) {
        const threeMenu = list || [];
        this.setState({ threeMenu, twoShow: false, threeShow: true });
    }

    threeMenuClick (menu) {
        this.setState({ threeShow: false }, () => {
            const url = '/pages/cooking/list?menu=' + menu;
            Taro.navigateTo({ url });
        });
    }

    ajaxCookingMenu () {
        api.cookMenu().then(
            (res) => {
                const result = res.data.result;
                const cookingData = result;
                // for (let i in result) {
                //     const one = result[i];
                //     // if (typeof one !== 'object') { continue; }

                //     let twoData = [];
                //     for (let j in one) { twoData.push({ name: j, list: one[j] }); }
                //     cookingData.push({ name: i, list: twoData });
                // }
                this.setState({ cookingData });
                Taro.setStorageSync('cookingData', cookingData);
            },
            () => {
                Taro.showToast({icon: 'none', title: '网络错误！'});
            }
        );
    }


    render () {
        const { cookingData, twoMenu, threeMenu } = this.state;
        return (
            <View className='wrap'>
                <AtList>
                    {
                        cookingData.map((item, index) => <Block key={`menuone-${index}`}>
                            <AtListItem
                                title={item.name}
                                onClick={this.oneMenuClick.bind(this, item.list)}
                            />
                        </Block>)
                    }
                </AtList>

                <AtDrawer
                    show={this.state.twoShow}
                    mask
                >
                    <AtList>
                        {
                            twoMenu.map((item, index) => <Block key={`menutwo-${index}`}>
                                <AtListItem
                                    title={item.name}
                                    arrow='right'
                                    onClick={this.twoMenuClick.bind(this, item.list)}
                                />
                            </Block>)
                        }
                    </AtList>
                </AtDrawer>

                <AtDrawer
                    show={this.state.threeShow}
                    mask
                    right
                >
                    <AtList>
                        {
                            threeMenu.map((item, index) => <Block key={`menuthree-${index}`}>
                                <AtListItem
                                    title={item}
                                    arrow='right'
                                    onClick={this.threeMenuClick.bind(this, item)}
                                />
                            </Block>)
                        }
                    </AtList>
                </AtDrawer>
            </View>
        );
    }
}
