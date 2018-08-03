'use strict';

export default {
    code: {
        FAILED: -1,
        SUCCESS: 0,
        FINISH: 1,
        ALARM:2
    },

    // tslint:disable-next-line:object-literal-shorthand
    success: function (data: any) {
        //return {code: 0, msg: 'ok', data};
        return { data };
    },

    // tslint:disable-next-line:object-literal-shorthand
    err: function (code: any, msg: string) {
        return { errCode: code, errMsg:msg };
    },
    finish: function (data:any) {
        return { errCode: 0, errMsg: data };
    },
    alarm: function (code:any,data:any) {
        return { errCode: code, errMsg: data };
    },

};
