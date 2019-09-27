import Taro, { Component } from '@tarojs/taro';
import { View, Text, Block } from '@tarojs/components';
import { AtInput, AtButton, AtTabBar, AtIcon } from 'taro-ui';
import Topbar from '@/src/components/topbar';

import api from '@/src/api/juhe';
import './index.scss';
import pageBg from './images/bg_1.jpg';

export default class Dream extends Component {
    config = {
        // navigationBarTitleText: '周公解梦'
        navigationStyle: 'custom'
    }

    constructor (props) {
        super(props);
        this.state = {
            currentTabBar: 0,
            keyWord: '',
            categoryList: []
        };
        this.tabBarData = [
            {title: '选择类型', iconType: 'bullet-list'},
            {title: '关键字搜素', iconType: 'search'}
        ];
    }

    componentWillMount () {
        // this.ajaxDreamCategory();
    }

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
        const url = '/pages/dream/detail?kw=' + keyWord;
        Taro.navigateTo({ url });
    }

    // 获取分类
    ajaxDreamCategory () {
        api.dreamCategory().then(
            (res) => {
                if (res.data.error_code !== 0) {
                    const result = res.data.result;
                    const errMessage = (typeof result === 'string') ? result : '查询有误！';
                    Taro.showToast({icon: 'none', title: errMessage});
                    return;
                }
                const result = res.data.result;
                this.setState({ categoryList: result });
            },
            () => {
                Taro.showToast({icon: 'none', title: '网络错误！'});
            }
        );
    }

    changeZi (val) {
        const keyWord = val;
        this.setState({ keyWord });
    }

    // 选择分类
    selectCategory (item) {
        const url = '/pages/dream/detail?id=' + item.id;
        Taro.navigateTo({ url });
    }

    render () {
        const { categoryList, keyWord } = this.state;
        const backIcon = <AtIcon
            value='bullet-list'
            size='24'
            color='#333'
            onClick={this.adfasdf.bind(this)}
        />;

        return (<View style={{backgroundImage: `url(${pageBg})`}}>

            <Topbar renderLeft={backIcon}>汉薇商场</Topbar>

            <View className='wrap' style={{backgroundImage: `url(${pageBg})`}}>

                <View className='search_box'>
                    <View className='zi_input'>
                        <AtInput
                            name='value'
                            type='text'
                            border={false}
                            maxLength='10'
                            placeholder='输入关键词'
                            value={keyWord}
                            onChange={this.changeZi.bind(this)}
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

                <View className='category_box'>
                    {
                        categoryList.map((item, index) => <Block key={index}>
                            <Text onClick={this.selectCategory.bind(this, item)}>{item.name}</Text>
                        </Block>)
                    }
                </View>

            </View>
        </View>);
    }
}
