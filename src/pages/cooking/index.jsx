import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui';

import './index.scss';

export default class Cooking extends Component {
    config = {
        navigationBarTitleText: '首页'
    }

    state = {
        current: 0,
        list: [
            { title: '标签页1' },
            { title: '标签页2' },
            { title: '标签页3' },
            { title: '标签页4' },
            { title: '标签页5' },
            { title: '标签页6' }
        ]
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    handleClick(index) {
        this.setState({ current: index });
    }

    render() {
        const { current, list } = this.state;
        return (
            <View className='wrap'>
                <AtTabs
  current={this.state.current}
  scroll
  height='200px'
  tabDirection='vertical'
  tabList={[
    { title: '标签页1' },
    { title: '标签页2' },
    { title: '标签页3' },
    { title: '标签页4' },
    { title: '标签页5' },
    { title: '标签页6' },
  ]}
  onClick={this.handleClick.bind(this)}>
  <AtTabsPane tabDirection='vertical' current={this.state.current} index={0}>
    <View style='font-size:18px;text-align:center;height:200px;'>标签页一的内容</View>
  </AtTabsPane>
  <AtTabsPane tabDirection='vertical' current={this.state.current} index={1}>
    <View style='font-size:18px;text-align:center;height:200px;'>标签页二的内容</View>
  </AtTabsPane>
  <AtTabsPane tabDirection='vertical' current={this.state.current} index={2}>
    <View style='font-size:18px;text-align:center;height:200px;'>标签页三的内容</View>
  </AtTabsPane>
  <AtTabsPane tabDirection='vertical' current={this.state.current} index={3}>
    <View style='font-size:18px;text-align:center;height:200px;'>标签页四的内容</View>
  </AtTabsPane>
  <AtTabsPane tabDirection='vertical' current={this.state.current} index={4}>
    <View style='font-size:18px;text-align:center;height:200px;'>标签页五的内容</View>
  </AtTabsPane>
  <AtTabsPane tabDirection='vertical' current={this.state.current} index={5}>
    <View style='font-size:18px;text-align:center;height:200px;'>标签页六的内容</View>
  </AtTabsPane>
</AtTabs>
            </View>
        );
    }
}
