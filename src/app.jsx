import Taro, {Component} from '@tarojs/taro';
import Index from './pages/index';

import './app.scss';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
    config = {
        pages: [
            'pages/index/index',
            // 菜谱
            // 'pages/cooking/index',
            // 'pages/cooking/list',
            // 'pages/cooking/detail',
            // 故事
            // 'pages/story/index',
            // 'pages/story/list',
            // 'pages/story/detail',
            // 油价
            // 'pages/oilPrice/index',
            // 老黄历
            // 'pages/laohuangli/index',
            // 新华字典
            // 'pages/zidian/index',
            // 成语词典
            // 'pages/zidian/chengyu',
            // 周公解梦
            // 'pages/dream/index',
            // 'pages/dream/detail',
            // 'pages/set/index',
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        }
    }

    componentDidMount () {}

    componentDidShow () {}

    componentDidHide () {}

    componentDidCatchError () {}

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render () {
        return (
            <Index />
        );
    }
}

Taro.render(<App />, document.getElementById('app'));
