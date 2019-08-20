import Taro from '@tarojs/taro';

const DOMAIN_API = 'https://www.baidu.com';

function r (url, data = {}) {
    let params = {
        url,
        data,
        method: 'POST'
    };

    if (!/^https?:/.test(params.url)) {
        params.url = DOMAIN_API + params.url;
    }

    return new Promise((resolve, reject) => {
        Taro.request(params).then(
            (res) => {
                resolve(res);
            },
            (res) => {
                // Taro.showModal({title: res.msg});
                reject(res);
            }
        );
    });
}


export default r;