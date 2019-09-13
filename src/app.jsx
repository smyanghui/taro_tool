import Taro, { Component } from '@tarojs/taro';
import Index from './pages/index';

import './app.scss';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
    componentDidMount() {
        // Taro.startAccelerometer();
        // // 抖一抖切换环境
        // Taro.onAccelerometerChange((res) => {
        //   const isShake = res.x > 1 && res.y > 1;
        //   if (!isShake) { return; }
        //   Taro.stopAccelerometer();
        //   const curEnv = this.curEnv();
        //   Taro.showActionSheet({
        //       itemList: [
        //           '当前环境' + curEnv,
        //           '切换至生产环境',
        //           '切换至uat环境'
        //       ],
        //       success: (res) => {
        //         const tapIndex = res.tapIndex;
        //         if (!tapIndex) { return; }
        //         Taro.clearStorage();
        //         const newEnv = [curEnv, 'prod', 'uat'][tapIndex];
        //         Taro.setStorageSync('CURENV', newEnv);
        //       },
        //       complete: () => {
        //         Taro.startAccelerometer();
        //       }
        //   });
        // });
    }

    config = {
        pages: [
            'pages/index/index'
            // 'pages/cooking/index',
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        }
    };

    componentDidShow() {}

    componentDidHide() {}

    componentDidCatchError() {}

    // curEnv () {
    //   return Taro.getStorageSync('CURENV') || ENV;
    // }

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render() {
        return <Index />;
    }
}

Taro.render(<App />, document.getElementById('app'));
