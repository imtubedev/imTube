'use strict';
import { Service } from 'egg';
import reply from '../const/reply';
import errorcode from '../const/errorcode';

export class OrderService extends Service {

    //查询
    async index(data: any) {
        try {
            const model = this.ctx.model;
            const infos = await model.Order.findOrderList(data);
            if (infos) {
                return reply.success(infos);
            }
            return reply.err(errorcode.order.index, this.ctx.__("t2"));
        } catch (err) {
            return reply.err(errorcode.order.index, this.ctx.__("t1"));
        }
    }
    //新增
    async create(data: any) {
        try {
            const model = this.ctx.model;
            const infoField = {
                orderid: "Order" + new Date().getTime(),
                imtid: data.imtid,
                ordertitle: data.ordertitle,
                goodsid: data.goodsid,
                goodstitle: data.goodstitle,
                price: data.price,
                num: data.num,
                amount: data.amount,
                buyer: data.buyer,
                supplier: data.supplier,
                classification: data.classification,
            };
            console.log(infoField);
            try {
                let info = new model.Order(infoField);
                info = await info.save();
                console.log(info);
                if (info) {
                    return reply.success(info);
                }
                return reply.err(errorcode.order.create, this.ctx.__("t3"));
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            return reply.err(errorcode.order.create, this.ctx.__("t3"));
        }
    }
    //编辑
    async update(orderinfo: any, data: any) {
        try {
            const model = this.ctx.model;
            const id = orderinfo.id;
            let info = await model.Order.updateOrderInfo(id, data);
            if (info) {
                return reply.success(info);
            }
            return reply.err(errorcode.order.update, this.ctx.__("t4"));
        } catch (err) {
            return reply.err(errorcode.order.update, this.ctx.__("t4"));
        }
    }

    //删除
    async destroy(orderinfo: any) {
        try {
            const model = this.ctx.model;
            const id = orderinfo.id;
            let info = await model.Order.delOrder(id);
            console.log(info.result.n);
            if (info.result.n === 1) {
                return reply.finish("OK");
            }
            return reply.err(errorcode.order.destory, this.ctx.__("t5"));
        } catch (err) {
            return reply.err(errorcode.order.destory, this.ctx.__("t5"));
        }
    }

    //显示详情
    async show(goodinfo: any) {
        try {
            console.log(goodinfo);
            const model = this.ctx.model;
            const id = goodinfo.id;
            let info = await model.Order.findDetailOrderInfo(id);
            if (info) {
                return reply.success(info);
            }
            return reply.err(errorcode.order.show, this.ctx.__("t5"));
        } catch (err) {
            return reply.err(errorcode.order.show, this.ctx.__("t5"));
        }
    }
    //编辑
    async updateOrderStats(data: any) {
        try {
            const model = this.ctx.model;
            const id = data.orderid;
            delete data.orderid;
            console.log(data);
            let info = await model.Order.updateOrderInfo(id, data);
            if (info) {
                return reply.success(info);
            }
            return reply.err(errorcode.order.update, this.ctx.__("t4"));
        } catch (err) {
            return reply.err(errorcode.order.update, this.ctx.__("t4"));
        }
    }

    //查询我的订单
    async getMyOrderList(data: any) {
        try {
            const model = this.ctx.model;
            const infos = await model.Order.findMyOrderList(data);
            if (infos) {
                return reply.success(infos);
            }
            return reply.err(errorcode.order.index, this.ctx.__("t2"));
        } catch (err) {
            return reply.err(errorcode.order.index, this.ctx.__("t1"));
        }
    }


}

module.exports = OrderService;
