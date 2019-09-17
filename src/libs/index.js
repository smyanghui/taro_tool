import Taro, { Component } from '@tarojs/taro';
import ajax from './r';
import helper from './helper';

const system = Taro.getSystemInfoSync();

const mpApp = {

    curEnv () {
        return Taro.getStorageSync('CURENV') || ENV;
    }

}

export default {
    mpApp,
    ajax,
    system,
    helper
};
