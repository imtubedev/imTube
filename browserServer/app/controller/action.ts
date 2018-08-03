import BaseController from './basecontroller';

export default class ActionController extends BaseController {


  //查询动作列表信息
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
        await super.index('action');
      } catch (err) {
        this.ctx.body = this.ctx.__("t6");
      }
  }
 


  //查询动作详情
  async show() { 
    try {
      const Joi = this.app.Joi;
      this.ctx.validate(Joi.object().keys({
        id: Joi.string().required()
      }), this.ctx.params);
      await super.show('action');
    } catch (err) {
      this.ctx.body = this.ctx.__("t6");
    }
  }
}

declare module 'egg' {
  export interface IController {
    action: ActionController;
  }
}
