import libs from '@/src/libs';

const domains = 'https://v.juhe.cn';
const ajax = (path, data = {}) => {
    const url = domains + path;
    return libs.ajax(url, data);
};

export default {
    // aaa
    laohuangli (params) {
        params.key = '8c3aec27121c3b511cc91e7dec9c7c90';
        return ajax('/laohuangli/d', params);
    },
    cookList (params) {
        return ajax('/1164-1', params);
    },

};
