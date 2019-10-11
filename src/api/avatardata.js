import libs from '@/src/libs';

const domains = 'https://api.avatardata.cn';

const ajax = (path, data = {}) => {
    const url = domains + path;
    data.key = 'ea0432ee62fe4904a91c6ba9a0da9446';
    return libs.ajax(url, data);
};

export default {
    // 分类
    cookMenu (params) {
        return ajax('/Cook/CookClass', params);
    },
    cookList (params) {
        return ajax('/Cook/List', params);
    },

};
