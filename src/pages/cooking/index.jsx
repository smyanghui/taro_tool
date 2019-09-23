import Taro, { Component } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { AtDrawer, AtList, AtListItem } from 'taro-ui';

import api from '@/src/api';
import './index.scss';

export default class Cooking extends Component {
    config = {
        navigationBarTitleText: '首页'
    }

    constructor (props) {
        super(props);
        this.state = {
            show: false,
            current: 0,
            menuData: [],
            oneMenu: [],
            twoMenu: []
        };
    }

    componentWillMount () {}

    componentDidMount () {
        this.ajaxCookingMenu();
    }

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    oneMenuClick (index) {
        const { menuData } = this.state;
        const curData = menuData[index];
        console.log(123123, curData);
        this.setState({ current: index, show: true });
    }

    ajaxCookingMenu () {
        api.cooking.cookMenu().then(
            (res) => {
                const result = res.data.showapi_res_body;
                let cookingData = [];
                for (let i in result) {
                    const one = result[i];
                    if (typeof one !== 'object') { continue; }

                    let twoData = [];
                    for (let j in one) { twoData.push({ name: j, list: one[j] }); }
                    cookingData.push({ name: i, list: twoData });
                }
                Taro.setStorageSync('cookingData', cookingData);
                this.formatMenu(cookingData);
            },
            () => {
                Taro.showToast({icon: 'none', title: '网络错误！'});
            }
        );
    }

    formatMenu (data) {
        let { oneMenu } = this.state;
        for (let i in data) {
            const one = data[i];
            oneMenu.push(one.name);
        }
        this.setState({ menuData: data, oneMenu });
    }

    render () {
        const { current, menuData, oneMenu } = this.state;
        return (
            <View className='wrap'>
                <AtList>
                    {
                        oneMenu.map((item, index) => <Block key={`menua-${index}`}>
                            <AtListItem
                                title={item}
                                arrow='right'
                                onClick={this.oneMenuClick.bind(this, index)}
                            />
                        </Block>)
                    }
                </AtList>

                <AtDrawer
                    show={this.state.show}
                    mask
                >
                    <AtList>
                        {
                            oneMenu.map((item, index) => <Block key={`menu-${index}`}>
                                <AtListItem
                                    title={item}
                                    arrow='right'
                                    onClick={this.oneMenuClick.bind(this, index)}
                                />
                            </Block>)
                        }
                    </AtList>
                </AtDrawer>
            </View>
        );
    }
}
