import Taro, {reportAnalytics} from '@tarojs/taro';
import ajax from './r';
import helper from './helper';

const system = Taro.getSystemInfoSync();

export default {
    ajax,
    system,
    helper
};
