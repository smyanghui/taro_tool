import Taro from '@tarojs/taro';

export default {

    makeQuery (params, enableFilter, exceptZero) {
        let arr = [];

        for (let key in params) {
            let value = params[key];

            if(typeof(value) === 'object') {
                value = JSON.stringify(value);
            }

            if(enableFilter) {
                (value || (value === 0 && exceptZero)) && arr.push(`${key}=${value}`);
            }else{
                arr.push(`${key}=${value}`);
            }
        }


        return arr.join('&');
    },

    makeURL (url, query) {
        return `${url}${query ? '?' : ''}${query}`;
    },

    loading (api, successMsg, errorMsg) {
        let loadingMsg;

        if (typeof successMsg == 'object') {
            errorMsg = successMsg.error;
            loadingMsg = successMsg.loading;
            successMsg = successMsg.success;
        }

        Taro.showLoading({
            title: loadingMsg || '请求中',
            mask: true
        });

        return new Promise((resolve, reject) => {
            api.then(
                (data) => {
                    Taro.hideLoading();
                    successMsg &&
                        Taro.showToast({
                            title: successMsg // || '请求成功'
                        });
                    resolve(data);
                },
                (data) => {
                    Taro.hideLoading();
                    Taro.showToast({
                        icon: 'none',
                        title: errorMsg || data.msg || '请求失败'
                    });
                    reject(data);
                }
            );
        });
    },

    currentPage () {
        let pages = Taro.getCurrentPages();
        let instance = pages[pages.length - 1];

        return instance;
    },


    rect (selector, context) {
        return new Promise((resolve, reject) => {
            const query = Taro.createSelectorQuery().in(context.$scope);

            query
                .select(selector)
                .boundingClientRect((res) => {
                    resolve(res);
                })
                .exec();
        });
    },


    obj2diff (a, b) {
        for (let i in a) {
            if (a[i] !== b[i]) return false;
        }

        for (let i in b) {
            if (b[i] !== a[i]) return false;
        }

        return true;
    },

};
