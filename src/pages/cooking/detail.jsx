import Taro, { Component } from '@tarojs/taro';
import { View, Image, Block } from '@tarojs/components';

import './index.scss';

export default class Detail extends Component {
    config = {
        navigationBarTitleText: '详情'
    }

    constructor (props) {
        super(props);
        this.state = {
            cookDetail: {
                steps: []
            }
        };
    }

    componentWillMount () {
        const cookDetail = Taro.getStorageSync('cookDetail') || {};
        this.setState({ cookDetail });
    }

    componentDidMount () {}

    componentWillUnmount () {}

    componentDidShow () {}

    componentDidHide () {}

    render () {
        const { cookDetail } = this.state;
        const detail = cookDetail;
        return (
            <View className='wrap'>

                <View className='at-article'>
                    <View className='at-article__h1'>{detail.cpName}</View>
                    <View className='at-article__info'>{detail.ct}</View>
                    <View className='at-article__content'>
                        <View className='at-article__section'>
                            <View className='at-article__h3'>{detail.type}</View>
                            {
                                detail.steps.map((item, index) => <Block key={`detail-${index}`}>
                                    <View className='at-article__p'>{item.content}</View>
                                    <Image 
                                        className='at-article__img' 
                                        src={item.imgUrl} 
                                        mode='widthFix'
                                    />
                                </Block>)
                            }
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}
