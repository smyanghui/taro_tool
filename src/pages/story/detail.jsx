import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import api from '@/src/api/showapi';
import './index.scss';

export default class Detail extends Component {
    config = {
        navigationBarTitleText: '详情'
    }

    constructor (props) {
        super(props);
        this.state = {
            storyId: '',
            storyDetail: {}
        };
    }

    componentWillMount () {
        const storyId = this.$router.params.id || '';
        this.setState({ storyId }, () => {
            this.ajaxStroyDetail();
        });
    }

    componentDidMount () {}

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    ajaxStroyDetail () {
        const { storyId } = this.state;
        const params = {
            id: storyId
        };
        api.storyDetail(params).then(
            (res) => {
                const storyDetail = res.data.showapi_res_body || {};
                this.setState({ storyDetail });
            },
            () => {
                Taro.showToast({icon: 'none', title: '网络错误！'});
            }
        );
    }

    render () {
        const { storyDetail } = this.state;
        const detail = storyDetail;

        return (
            <View className='wrap'>

                <View className='at-article'>
                    <View className='at-article__h1'>{detail.title}</View>
                    <View className='at-article__info'>{detail.classify}</View>
                    <View className='at-article__content'>
                        <View className='at-article__section'>
                            <View className='at-article__p'>{detail.content}</View>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}
