import BaseController from './basecontroller';

export default class BlockController extends BaseController {


  //查询区块列表信息
  async index() {
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
        await super.index('block');
      } catch (err) {
        this.ctx.body = this.ctx.__("t6");
      }
  }
 


  //查询区块详情
  async show() { 
    try {
      const Joi = this.app.Joi;
      this.ctx.validate(Joi.object().keys({
        id: Joi.number().min(2).required()
      }), this.ctx.params);
      await super.show('block');
    } catch (err) {
      this.ctx.body = this.ctx.__("t6");
    }
  }
}

declare module 'egg' {
  export interface IController {
    block: BlockController;
  }
}
