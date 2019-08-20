import libs from '@/libs';

export default {
    // 添加到购物车
    addToCart (params) {
        return libs.ajax('/v1_cart_index/addCart/v1_cart_index/addCart', params);
    }

};
