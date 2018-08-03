import BaseController from './basecontroller';
import authcode from '../const/authcode';
export default class GoodsdetailController extends BaseController {
    //查询商品明细列表
    async index() {
        const authorization = this.ctx.get('Authorization');
        const isexit = await this.isAllow(authcode.goodsdetail.index, authorization);
        if (isexit) {
            try {
                let data = this.ctx.request.query;
                if (data.page) {
                    const Joi = this.app.Joi;
                    this.ctx.validate(Joi.object().keys({
                        locale: Joi.string().required(),
                        per_page: Joi.number().required(),
                        page: Joi.number().required()
                    }), data);
                }
                await super.index('goodsdetail');
            }
            catch (err) {
                this.ctx.body = this.ctx.__("t6");
            }
        }
        else {
            this.ctx.body = this.ctx.__("t7");
        }
    }
    //新增商品明细
    async create() {
        //  const authorization = this.ctx.get('Authorization');
        //  const isexit = await this.isAllow(authcode.goods.create, authorization);
        //  if (isexit) {
        try {
            const Joi = this.app.Joi;
            this.ctx.validate(Joi.object().keys({
                orderid: Joi.string().required(),
                timelimit: Joi.string().required(),
                money: Joi.string().required(),
                cardid: Joi.string().required(),
                pwd: Joi.string().required(),
                classification: Joi.string().required(),
                state: Joi.number().required()
            }), this.ctx.request.body);
            await super.create('goodsdetail');
        }
        catch (err) {
            this.ctx.body = this.ctx.__("t6");
        }
        //  } else {
        //    this.ctx.body = this.ctx.__("t7");
        //  }
    }
    //修改商品明细
    async update() {
        // const authorization = this.ctx.get('Authorization');
        // const isexit = await this.isAllow(authcode.goods.update, authorization);
        // if (isexit) {
        try {
            const Joi = this.app.Joi;
            this.ctx.validate(Joi.object().keys({
                timelimit: Joi.string().required(),
                money: Joi.string().required(),
                pwd: Joi.string().required(),
                classification: Joi.string().required(),
                state: Joi.number().required()
            }), this.ctx.request.body);
            await super.update('goodsdetail');
        }
        catch (err) {
            this.ctx.body = this.ctx.__("t6");
        }
        // } else {
        //   this.ctx.body = this.ctx.__("t7");
        // }
    }
    //删除商品明细
    async destroy() {
        // const authorization = this.ctx.get('Authorization');
        // const isexit = await this.isAllow(authcode.goods.destroy, authorization);
        // if (isexit) {
        try {
            const Joi = this.app.Joi;
            this.ctx.validate(Joi.object().keys({
                id: Joi.string().required()
            }), this.ctx.params);
            await super.destroy('goodsdetail');
        }
        catch (err) {
            this.ctx.body = this.ctx.__("t6");
        }
        // } else {
        //   this.ctx.body = this.ctx.__("t7");
        // }
    }
}

declare module 'egg' {
    export interface IController {
        goodsDetail: GoodsdetailController;
    }
}
