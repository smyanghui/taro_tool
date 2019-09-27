import libs from '@/src/libs';

const domains = 'https://v.juhe.cn';
const ajax = (path, data = {}) => {
    const url = domains + path;
    return libs.ajax(url, data);
};

export default {
    // 老黄历
    laohuangli (params) {
        params.key = '8c3aec27121c3b511cc91e7dec9c7c90';
        return ajax('/laohuangli/d', params);
    },
    // 新华字典
    zdQuery (params) {
        params.key = '3916e88ac9443e1319df9a190abb0bb5';
        return ajax('/xhzd/query', params);
    },
    // 成语词典
    chengyuQuery (params) {
        params.key = 'fcebce9d6a51bb341c4b7d34b019c517';
        return ajax('/chengyu/query', params);
    },
    // 周公解梦
    dreamQuery (params) {
        params.key = '1d02f61ee140ae28db5a5b0fbd6e92e5';
        return ajax('/dream/query', params);
    },
    dreamCategory (params = {}) {
        params.key = '1d02f61ee140ae28db5a5b0fbd6e92e5';
        return ajax('/dream/category', params);
    },
    dreamQueryid (params = {}) {
        params.key = '1d02f61ee140ae28db5a5b0fbd6e92e5';
        return ajax('/dream/queryid', params);
    }

};
