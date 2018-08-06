'use strict';
import {Service} from 'egg';
import reply from '../const/reply';
import errorcode from '../const/errorcode';

export class TransactionService extends Service {

    //查询区块列表
    async index(data: any) {
        try {
            const model = this.ctx.model;
            const infos = await model.Transaction.findTransactionList(data);
            if (infos) {
                return reply.success(infos);
            }
            return reply.err(errorcode.transaction.index, this.ctx.__("t2"));
        } catch (err) {
            return reply.err(errorcode.transaction.index, this.ctx.__("t1"));
        }
    }

    //显示区块详情
    async show(transinfo: any) {
        try {
            const model = this.ctx.model;
            const id = transinfo.id;
            let info = await model.Transaction.findTransactionDetailInfo(id);
            if (info) {
                return reply.success(info);
            }
            return reply.err(errorcode.transaction.show, this.ctx.__("t2"));
        } catch (err) {
            return reply.err(errorcode.transaction.show, this.ctx.__("t1"));
        }
    }


}
module.exports = TransactionService;
