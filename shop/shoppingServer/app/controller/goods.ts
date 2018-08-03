import BaseController from './basecontroller';
import authcode from '../const/authcode';
export default class GoodsController extends BaseController {
  //查询商品列表
  async index() {
    // const authorization = this.ctx.get('Authorization');
    // const isexit = await this.isAllow(authcode.goods.index, authorization);
    // if (isexit) {
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
        await super.index('goods');
      } catch (err) {
        this.ctx.body = this.ctx.__("t6");
      }
    // } else {
    //   this.ctx.body = this.ctx.__("t7");
    // }
  }
  //新增商品
  async create() {
     console.log('12345678')
     const authorization = this.ctx.get('Authorization');
     const isexit = await this.isAllow(authcode.goods.create, authorization);
     if (isexit) {
      try {
        const Joi = this.app.Joi;
        this.ctx.validate(Joi.object().keys({
          goodimg:Joi.string().required(),
          pic: Joi.array().required(),
          price: Joi.number().required(),
          total:Joi.number().required(),
          salenum:Joi.number().required(),
          priority:Joi.number().required(),
          supplier:Joi.string().required(),
          content:Joi.string().required(),
          expirydate:Joi.number().required(),
          classification:Joi.string().required()
        }), this.ctx.request.body);
        await super.create('goods');
      } catch (err) {
        console.log(err);
        this.ctx.body = this.ctx.__("t6");
      }
     } else {
       this.ctx.body = this.ctx.__("t7");
     }
  }
  //修改商品信息
  async update() {
    const authorization = this.ctx.get('Authorization');
    const isexit = await this.isAllow(authcode.goods.update, authorization);
    if (isexit) {
      try {
        const Joi = this.app.Joi;
        this.ctx.validate(Joi.object().keys({
          goodimg:Joi.string().required(),
          pic: Joi.array().required(),
          price: Joi.number().required(),
          total:Joi.number().required(),
          salenum:Joi.number().required(),
          priority:Joi.number().required(),
          supplier:Joi.string().required(),
          content:Joi.string().required(),
          expirydate:Joi.number().required(),
          classification:Joi.string().required()
        }), this.ctx.request.body);
        await super.update('goods');
      } catch (err) {
        this.ctx.body = this.ctx.__("t6");
      }
    } else {
      this.ctx.body = this.ctx.__("t7");
    }

  }
  //删除商品
  async destroy() {
    const authorization = this.ctx.get('Authorization');
    const isexit = await this.isAllow(authcode.goods.destroy, authorization);
    if (isexit) {
      try {
        const Joi = this.app.Joi;
        this.ctx.validate(Joi.object().keys({
          id: Joi.string().required()
        }), this.ctx.params);
        await super.destroy('goods');
      } catch (err) {
        this.ctx.body = this.ctx.__("t6");
      }
    } else {
      this.ctx.body = this.ctx.__("t7");
    }

  }
  //显示选定商品
  async show() { 
    try {
      const Joi = this.app.Joi;
      this.ctx.validate(Joi.object().keys({
        locale: Joi.string().required(),
        id: Joi.string().required()
      }), this.ctx.params);
      await super.show('goods');
    } catch (err) {
      this.ctx.body = this.ctx.__("t6");
    }
  }


   //根据价格区间查询商品
   async findByPrice() {
      try {
        let data = this.ctx.request.query;
        if (data.page) {
          const Joi = this.app.Joi;
          this.ctx.validate(Joi.object().keys({
            lprice: Joi.number().required(),
            hprice: Joi.number().required(),
            locale: Joi.string().required(),
            per_page: Joi.number().required(),
            page: Joi.number().required()
          }), data);
        }
        this.ctx.body=await this.ctx.service.goods.findByPrice(data);
      } catch (err) {
        this.ctx.body = this.ctx.__("t6");
      }
  }

  //根据查询条件模糊查询
  async findRegexList() {
    try {
      let data = this.ctx.request.query;
      if (data.page) {
        const Joi = this.app.Joi;
        this.ctx.validate(Joi.object().keys({
          title: Joi.string().required(),
          locale: Joi.string().required(),
          per_page: Joi.number().required(),
          page: Joi.number().required()
        }), data);
      }
      this.ctx.body=await this.ctx.service.goods.findRegexList(data);
    } catch (err) {
      this.ctx.body = this.ctx.__("t6");
    }
}

}

declare module 'egg' {
  export interface IController {
    goods: GoodsController;
  }
}
