import libs from '@/src/libs';
import domains from './domains';

const ajax = (path, data = {}) => {
    const curEnv = libs.mpApp.curEnv() || 'prod';
    const curDomain = domains[curEnv].mpDomain;
    const url = curDomain + path;
    data.showapi_appid = '92103';
    data.showapi_sign = 'a17abc2a1bc04c7e9850a796338f10db';
    return libs.ajax(url, data);
};

export default {
    // 菜谱
    cookMenu (params) {
        return ajax('/1164-2', params);
    },
    cookList (params) {
        return ajax('/1164-1', params);
    },
    // 故事
    storyMenu (params) {
        return ajax('/1700-1', params);
    },
    storyList (params) {
        return ajax('/1700-2', params);
    },
    storyDetail (params) {
        return ajax('/1700-3', params);
    }
};
