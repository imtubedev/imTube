'use strict';
import {Service} from 'egg';
import reply from '../const/reply';
import errorcode from '../const/errorcode';

export class GoodsDetailService extends Service {

    //查询
    async index(data: any) {
        try {
            const model = this.ctx.model;
            const infos = await model.Goodsdetail.findGoodsDetailList(data);
            if (infos) {
                return reply.success(infos);
            }
            return reply.err(errorcode.goods.index, this.ctx.__("t2"));
        } catch (err) {
            return reply.err(errorcode.goods.index, this.ctx.__("t1"));
        }
    }


    //新增
    async create(data: any) {
        try {
            const model = this.ctx.model;
            const infoField = {
                orderid: data.orderid,
                timelimit: data.timelimit,
                money: data.money,
                cardid: data.cardid,
                pwd: data.pwd,
                classification: data.classification,
                state: data.state
            };
            try {
                let info = new model.Goodsdetail(infoField);
                info = await info.save();
                if (info) {
                    return reply.success(info);
                }
                return reply.err(errorcode.goodsDetail.create, this.ctx.__("t3"));
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            return reply.err(errorcode.goodsDetail.create, this.ctx.__("t3"));
        }
    }


    //编辑
    async update(goodsdetailinfo: any, data: any) {
        try {
            const model = this.ctx.model;
            const id = goodsdetailinfo.id;
            let info = await model.Goodsdetail.updateGoodsDetailInfo(id, data);
            if (info) {
                return reply.success(info);
            }
            return reply.err(errorcode.goodsDetail.update, this.ctx.__("t4"));
        } catch (err) {
            return reply.err(errorcode.goodsDetail.update, this.ctx.__("t4"));
        }
    }

    //删除
    async destroy(goodsdetailinfo: any) {
        try {
            const model = this.ctx.model;
            const id = goodsdetailinfo.id;
            let info = await model.Goodsdetail.delGoodsDetail(id);
            console.log(info.result.n);
            if (info.result.n === 1) {
                return reply.finish("OK");
            }
            return reply.err(errorcode.goodsDetail.destory, this.ctx.__("t5"));
        } catch (err) {
            return reply.err(errorcode.goodsDetail.destory, this.ctx.__("t5"));
        }
    }

}

module.exports = GoodsDetailService;
