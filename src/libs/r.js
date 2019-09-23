import Taro from '@tarojs/taro';

const DOMAIN_API = 'https://www.xxx.com';

function r (url, data = {}) {
    let params = {
        url,
        data,
        method: 'GET'
    };

    if (!/^https?:/.test(params.url)) {
        params.url = DOMAIN_API + params.url;
    }

    return new Promise((resolve, reject) => {
        Taro.request(params).then(
            (res) => { resolve(res); },
            (res) => { reject(res); }
        );
    });
}


export default r;