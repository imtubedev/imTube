'use strict';
import { Service } from 'egg';
import reply from '../const/reply';
import errorcode from '../const/errorcode';

export class GoodsService extends Service {

    //查询
    async index(data: any) {
        try {
            const model = this.ctx.model;
            console.log(data);
            const infos = await model.Goods.findGoodsList(data);
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
                goodid: new Date().getTime(),
                goodimg: data.goodimg,
                pic: data.pic,
                price: data.price,
                total: data.total,
                salenum: data.salenum,
                priority: data.priority,
                supplier: data.supplier,
                content: data.content,
                expirydate: data.expirydate,
                classification: data.classification
            };
            try{
            let info = new model.Goods(infoField);
            info = await info.save();
            if (info) {
                return reply.success(info);
            }
            return reply.err(errorcode.goods.create, this.ctx.__("t3"));
            }catch(err){
                console.log(err);
            }
        } catch (err) {
            console.log(err)
            return reply.err(errorcode.goods.create, this.ctx.__("t3"));
        }
    }
    //编辑
    async update(goodinfo: any, data: any) {
        try {
            const model = this.ctx.model;
            const id = goodinfo.id;
            let info = await model.Goods.updateGoodInfo(id, data);
            if (info) {
                return reply.success(info);
            }
            return reply.err(errorcode.goods.update, this.ctx.__("t4"));
        } catch (err) {
            return reply.err(errorcode.goods.update, this.ctx.__("t4"));
        }
    }

    //删除
    async destroy(goodinfo: any) {
        try {
            const model = this.ctx.model;
            const id = goodinfo.id;
            let info = await model.Goods.delGoods(id);
            console.log(info.result.n);
            if (info.result.n === 1) {
                return reply.finish("OK");
            }
            return reply.err(errorcode.goods.destory, this.ctx.__("t5"));
        } catch (err) {
            return reply.err(errorcode.goods.destory, this.ctx.__("t5"));
        }
    }

    //显示详情
    async show(goodinfo: any) {
        try {
            console.log(goodinfo);
            const model = this.ctx.model;
            const id = goodinfo.id;
            let info = await model.Goods.findDetailGoodInfo(id);
            if (info) {
                return reply.success(info);
            }
            return reply.err(errorcode.goods.show, this.ctx.__("t5"));
        } catch (err) {
            return reply.err(errorcode.goods.show, this.ctx.__("t5"));
        }
    }

    //根据价格区间查询商品
    async findByPrice(data: any) {
        try {
            const model = this.ctx.model;
            const infos = await model.Goods.findByPrice(data);
            if (infos) {
                return reply.success(infos);
            }
            return reply.err(errorcode.goods.index, this.ctx.__("t2"));
        } catch (err) {
            return reply.err(errorcode.goods.index, this.ctx.__("t1"));
        }
    }

       //根据价格区间查询商品
       async findRegexList(data: any) {
        try {
            const model = this.ctx.model;
            const infos = await model.Goods.findRegexPrice(data);
            if (infos) {
                return reply.success(infos);
            }
            return reply.err(errorcode.goods.index, this.ctx.__("t2"));
        } catch (err) {
            return reply.err(errorcode.goods.index, this.ctx.__("t1"));
        }
    }

}

module.exports = GoodsService;
