import Taro, { Component } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { AtInput, AtButton, AtDrawer, AtIcon, AtList, AtListItem } from 'taro-ui';
import Topbar from '@/src/components/topbar';

import './index.scss';
import pageBg from './images/bg_2.jpg';

export default class Dream extends Component {
    config = {
        // navigationBarTitleText: '周公解梦'
        navigationStyle: 'custom'
    }

    constructor (props) {
        super(props);
        this.state = {
            keyWord: '',
            showMenu: false
        };
        this.menuData = [
            {name: '选择类型', url: 'bullet-list'},
            {name: '关键字搜素', url: 'search'}
        ];
    }

    componentWillMount () {}

    componentDidMount () {}

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    // 查询
    ajaxDreamQuery () {
        const { keyWord } = this.state;
        const isCy = /^[\u4E00-\u9FA5]{1,10}$/.test(keyWord);
        if (!isCy) {
            Taro.showToast({icon: 'none', title: '请输入中文字符'});
            return;
        }
        const url = '/pages/dream/detail?kw=' + encodeURIComponent(keyWord);
        Taro.navigateTo({ url });
    }

    // 获取分类
    // ajaxDreamCategory () {
    //     api.dreamCategory().then(
    //         (res) => {
    //             if (res.data.error_code !== 0) {
    //                 const result = res.data.result;
    //                 const errMessage = (typeof result === 'string') ? result : '查询有误！';
    //                 Taro.showToast({icon: 'none', title: errMessage});
    //                 return;
    //             }
    //             const result = res.data.result;
    //             this.setState({ categoryList: result });
    //         },
    //         () => {
    //             Taro.showToast({icon: 'none', title: '网络错误！'});
    //         }
    //     );
    // }

    toDetail (data) {
        console.log(123, data);
        // const url = '/pages/story/detail?id=' + id;
        // Taro.navigateTo({ url });
    }

    render () {
        const { keyWord } = this.state;

        return (<View className='out_box' style={{backgroundImage: `url(${pageBg})`}}>

            <Topbar
                title='汉薇商场123'
                renderLeft={
                    <AtIcon
                        value='bullet-list'
                        size='24'
                        color='#333'
                        onClick={() => this.setState({showMenu: true})}
                    />
                }
            />

            <View className='wrap'>
                <View className='search_box'>
                    <View className='zi_input'>
                        <AtInput
                            name='value'
                            type='text'
                            border={false}
                            maxLength='10'
                            placeholder='输入梦到的内容'
                            value={keyWord}
                            onChange={(val) => this.setState({keyWord: val})}
                        />
                    </View>
                    <View>
                        <AtButton
                            type='primary'
                            onClick={this.ajaxDreamQuery.bind(this)}
                        >查询
                        </AtButton>
                    </View>
                </View>

                <AtDrawer show={this.state.showMenu}>
                    <AtList>
                        {
                            this.menuData.map((item, index) => <Block key={`list-${index}`}>
                                <AtListItem
                                    title={item.name}
                                    arrow='right'
                                    onClick={this.toDetail.bind(this, item)}
                                />
                            </Block>)
                        }
                    </AtList>
                </AtDrawer>

            </View>
        </View>);
    }
}
