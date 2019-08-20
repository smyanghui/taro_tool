import libs from '@/libs';

export default {
    smsLogin (params) {
        return libs.ajax('/v1_user_login/loginBySms', params);
    },

    weChatLogin (params) {
        return libs.ajax('/v1_user_login/weChatMallProgramLogin', params);
    },

    agreeMQJ (params) {
        return libs.ajax('/v1_mqjuser_agree/index', params);
    }
};
