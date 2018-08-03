import BaseController from './basecontroller';

export default class AccountController extends BaseController {


  //查询账户详情
  async show() { 
    try {
      const Joi = this.app.Joi;
      this.ctx.validate(Joi.object().keys({
        id: Joi.string().required()
      }), this.ctx.params);
      await super.show('account');
    } catch (err) {
      this.ctx.body = this.ctx.__("t6");
    }
  }
}

declare module 'egg' {
  export interface IController {
    account: AccountController;
  }
}
