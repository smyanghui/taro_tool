import Taro, { Component } from '@tarojs/taro';
import { View, Text, Block } from '@tarojs/components';

import api from '@/src/api/juhe';
import './index.scss';

export default class Detail extends Component {
    config = {
        navigationBarTitleText: '周公解梦'
    }

    constructor (props) {
        super(props);
        this.state = {
            isEmpty: false,
            dreamList: []
        };
    }

    componentWillMount () {
        const kw = this.$router.params.kw || '';
        const id = this.$router.params.id || '';
        if (kw) { this.ajaxDreamQuery(kw); }
        Taro.setNavigationBarTitle({title: kw});
        if (id) { this.ajaxDreamQueryid(id); }
    }

    componentDidMount () {}

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    // 查询
    ajaxDreamQuery (keyWord) {
        const param = {q: decodeURIComponent(keyWord)};
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

    // 通过ID查询
    ajaxDreamQueryid (id) {
        let { dreamList } = this.state;
        const param = {id};
        api.dreamQueryid(param).then(
            (res) => {
                if (this.erroToast(res)) { return; }
                const result = res.data.result;
                for (let i in dreamList) {
                    if (dreamList[i].id === id) { dreamList[i].list = result.list; }
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
        this.setState({ isEmpty: true });
        return isErro;
    }

    render () {
        let { isEmpty, dreamList } = this.state;
        isEmpty = !isEmpty && dreamList.length !== 0;

        return (<View>
            <View className='at-article'>
                {
                    dreamList.map((item, index) => <Block key={`list-${index}`}>
                        <View className='at-article__h2'>{item.title}</View>
                        {
                            item.list && item.list.length > 0
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
                                    <Text className='more'>查看更多</Text>
                                </View>
                        }
                    </Block>)
                }
            </View>

            {
                isEmpty && <View className='list_empty'>未查到相关数据！</View>
            }

        </View>);
    }
}
