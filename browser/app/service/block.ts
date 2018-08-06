'use strict';
import { Service } from 'egg';
import reply from '../const/reply';
import errorcode from '../const/errorcode';

export class BlockService extends Service {

    //查询区块列表
    async index(data: any) {
        try {
            const model = this.ctx.model;
            const infos = await model.Block.findBlockList(data);
            if (infos) {
                return reply.success(infos);
            }
            return reply.err(errorcode.block.index, this.ctx.__("t2"));
        } catch (err) {
            return reply.err(errorcode.block.index, this.ctx.__("t1"));
        }
    }

    //显示区块详情
    async show(blockinfo: any) {
        try {
            const model = this.ctx.model;
            const id = blockinfo.id;
            let info = await model.Block.findBlockDetailInfo(id);
            if (info) {
                return reply.success(info);
            }
            return reply.err(errorcode.block.show, this.ctx.__("t2"));
        } catch (err) {
            return reply.err(errorcode.block.show, this.ctx.__("t1"));
        }
    }


}

module.exports = BlockService;
