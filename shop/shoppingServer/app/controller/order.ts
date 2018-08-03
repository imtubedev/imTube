import BaseController from './basecontroller';
import authcode from '../const/authcode';
export default class OrderController extends BaseController {
  //查询订单列表
  async index() {
    const authorization = this.ctx.get('Authorization');
    const isexit = await this.isAllow(authcode.goods.index, authorization);
    if (isexit) {
      try {
        let data = this.ctx.request.query;
        if (data.page) {
          const Joi = this.app.Joi;
          this.ctx.validate(Joi.object().keys({
            locale: Joi.string().required(),
            stats: Joi.string().required(),
            per_page: Joi.number().required(),
            page: Joi.number().required()
          }), data);
        }
        await super.index('order');
      } catch (err) {
        this.ctx.body = this.ctx.__("t6");
      }
    } else {
      this.ctx.body = this.ctx.__("t7");
    }
  }
  //新增订单
  async create() {
     console.log('12345678')
    //  const authorization = this.ctx.get('Authorization');
    //  const isexit = await this.isAllow(authcode.goods.create, authorization);
    //  if (isexit) {
      try {
        const Joi = this.app.Joi;
        this.ctx.validate(Joi.object().keys({
          imtid: Joi.string().required(),
          ordertitle: Joi.string().required(),
          goodsid: Joi.string().required(),
          goodstitle: Joi.string().required(),
          price: Joi.number(),
          num:Joi.number(),
          amount:Joi.number(),
          buyer:Joi.string(),
          supplier:Joi.string(),
          classification:Joi.string()
        }), this.ctx.request.body);
        await super.create('order');
      } catch (err) {
        this.ctx.body = this.ctx.__("t6");
      }
    //  } else {
    //    this.ctx.body = this.ctx.__("t7");
    //  }
  }
  //修改订单信息
  async update() {
    // const authorization = this.ctx.get('Authorization');
    // const isexit = await this.isAllow(authcode.goods.update, authorization);
    // if (isexit) {
      try {
        const Joi = this.app.Joi;
        this.ctx.validate(Joi.object().keys({
          imtid: Joi.string().required(),
          ordertitle: Joi.string().required(),
          goodsid: Joi.string().required(),
          goodstitle: Joi.string().required(),
          price: Joi.number().required(),
          num:Joi.number().required(),
          amount:Joi.number().required(),
          buyer:Joi.string().required(),
          supplier:Joi.string().required(),
          classification:Joi.string().required()
        }), this.ctx.request.body);
        await super.update('order');
      } catch (err) {
        this.ctx.body = this.ctx.__("t6");
      }
    // } else {
    //   this.ctx.body = this.ctx.__("t7");
    // }

  }

  //删除订单
  async destroy() {
    // const authorization = this.ctx.get('Authorization');
    // const isexit = await this.isAllow(authcode.goods.destroy, authorization);
    // if (isexit) {
      try {
        const Joi = this.app.Joi;
        this.ctx.validate(Joi.object().keys({
          id: Joi.string().required()
        }), this.ctx.params);
        await super.destroy('order');
      } catch (err) {
        this.ctx.body = this.ctx.__("t6");
      }
    // } else {
    //   this.ctx.body = this.ctx.__("t7");
    // }

  }
  //显示选定订单
  async show() { 
    try {
      const Joi = this.app.Joi;
      this.ctx.validate(Joi.object().keys({
        locale: Joi.string().required(),
        id: Joi.string().required()
      }), this.ctx.params);
      await super.show('order');
    } catch (err) {
      this.ctx.body = this.ctx.__("t6");
    }
  }


  //修改订单状态
  async updateOrderStats() {
    // const authorization = this.ctx.get('Authorization');
    // const isexit = await this.isAllow(authcode.goods.update, authorization);
    // if (isexit) {
      try {
        const Joi = this.app.Joi;
        this.ctx.validate(Joi.object().keys({
          orderid:Joi.string().required(),
          stats:Joi.string().required()
        }), this.ctx.request.body);
        const data = this.ctx.request.body;
        //await super.update('order');
        this.ctx.body = await this.ctx.service.order.updateOrderStats(data);
      } catch (err) {
        this.ctx.body = this.ctx.__("t6");
      }
    // } else {
    //   this.ctx.body = this.ctx.__("t7");
    // }

  }

   //查询我的订单列表
   async myOrderList() {
      try {
        let data = this.ctx.request.query;
        if (data.page) {
          const Joi = this.app.Joi;
          this.ctx.validate(Joi.object().keys({
            locale: Joi.string().required(),
            imtid: Joi.string().required(),
            stats: Joi.string().required(),
            per_page: Joi.number().required(),
            page: Joi.number().required()
          }), data);
        }
        await super.index('order');
      } catch (err) {
        this.ctx.body = this.ctx.__("t6");
      }
  }

}

declare module 'egg' {
  export interface IController {
    order: OrderController;
  }
}
