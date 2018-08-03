
///检验手机号是否有效
exports.checkMobile = (phone) => {
    return new Promise((resolve) => {
        if (!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(phone))) {
            resolve(false);
        } else {
            resolve(true);
        }
    });
};
