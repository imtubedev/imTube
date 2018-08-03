'use strict';
import { Service } from 'egg';
import reply from '../const/reply';
import errorcode from '../const/errorcode';

export class AccountService extends Service {

    //显示账户详情
    async show(userinfo: any) {
        try {
            const model = this.ctx.model;
            const id = userinfo.id;
            let info = await model.Account.findAccountInfo(id);
            if (info) {
                return reply.success(info);
            }
            return reply.err(errorcode.account.show, this.ctx.__("t2"));
        } catch (err) {
            return reply.err(errorcode.account.show, this.ctx.__("t1"));
        }
    }


}

module.exports = AccountService;
