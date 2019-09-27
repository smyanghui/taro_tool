import Taro, { Component } from '@tarojs/taro';
import { View, Text, Block } from '@tarojs/components';
import { AtCard }  from 'taro-ui';

import api from '@/src/api/juhe';
import './index.scss';

export default class Detail extends Component {
    config = {
        navigationBarTitleText: '周公解梦'
    }

    constructor (props) {
        super(props);
        this.state = {
            dreamList: []
        };
    }

    componentWillMount () {
        const kw = this.$router.params.kw || '';
        const id = this.$router.params.id || '';
        if (kw) { this.ajaxDreamQuery(kw); }
        if (id) { this.ajaxDreamQueryid(id); }
    }

    componentDidMount () {}

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    // 查询
    ajaxDreamQuery (keyWord) {
        const param = {q: keyWord};
        api.dreamQuery(param).then(
            (res) => {
                if (this.erroToast(res)) { return; }
                const result = res.data.result;
                for (let i in result) { result[i].list = []; }
                this.setState({ dreamList: result });
            },
            () => {
                Taro.showToast({icon: 'none', title: '网络错误！'});
            }
        );
    }

    // 查询
    ajaxDreamQueryid (id) {
        let { dreamList } = this.state;
        const param = {id};
        api.dreamQueryid(param).then(
            (res) => {
                if (this.erroToast(res)) { return; }
                const result = res.data.result;
                for (let i in dreamList) {
                    if (dreamList[i].id === id) { dreamList[i].list = result; }
                }
                this.setState({ dreamList });
            },
            () => {
                Taro.showToast({icon: 'none', title: '网络错误！'});
            }
        );
    }

    erroToast (res) {
        const isErro = res.data.error_code !== 0;
        if (isErro) {
            const result = res.data.result;
            const errMessage = (typeof result === 'string') ? result : '查询有误！';
            Taro.showToast({icon: 'none', title: errMessage});
        }
        return isErro;
    }

    render () {
        const { dreamList } = this.state;
        const isEmpty = dreamList.length === 0;

        return (
            <View className='wrap'>

                {
                    !isEmpty &&
                    dreamList.map((item, index) => <Block key={`list-${index}`}>
                        <View className='at-article'>
                            <View className='at-article__h2'>{item.title}</View>
                            {
                                item.list.length > 0
                                    ?
                                    item.list.map((item2, index2) => <Block key={`list2-${index2}`}>
                                        <View className='at-article__p'>{item2}</View>
                                    </Block>)
                                    :
                                    <View
                                        className='at-article__p'
                                        onClick={() => this.ajaxDreamQueryid(item.id)}
                                    >
                                        {item.des}
                                        <Text>点击查看更多</Text>
                                    </View>
                            }
                        </View>
                    </Block>)
                }

                {
                    isEmpty && <View className='list_empty'>未查到相关数据！</View>
                }

            </View>
        );
    }
}
