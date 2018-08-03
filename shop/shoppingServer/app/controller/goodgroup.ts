import BaseController from './basecontroller';
import authcode from '../const/authcode';
export default class GoodGroupController extends BaseController {
   //新建商品分组
   async create(){
    const authorization = this.ctx.get('Authorization');
    const isexit = await this.isAllow(authcode.goodGroup.create, authorization);
    if(isexit) {
      try{
          const Joi = this.app.Joi;
          this.ctx.validate(Joi.object().keys({
              groupName: Joi.string().required(),
              first: Joi.string().required(),
              second: Joi.string().required(),
              describe: Joi.string().required()
          }),this.ctx.request.body);
          await super.create('goodgroup');
      } catch (err){
          this.ctx.body = this.ctx.__("t6");
      }
    } else {
       this.ctx.body = this.ctx.__("t7");
    }
  }

  //查询商品分组
  async index(){
      try {
          let data = this.ctx.request.query;
          if(data.page){
              const Joi = this.app.Joi;
              this.ctx.validate(Joi.object().keys({
                  locale: Joi.string().required(),
                  per_page: Joi.number().required(),
                  page: Joi.number().required()
              }), data);
          }
          await super.index('goodgroup');
      } catch (error) {
          this.ctx.body  = this.ctx.__("t6");
      }
  }

  //修改商品信息
  async update(){
      const authorization = this.ctx.get('Authorization');
      const isexit = await this.isAllow(authcode.goodGroup.update,authorization);
      if(isexit){
      try {
          const Joi = this.app.Joi;
          this.ctx.validate(Joi.object().keys({
              groupName: Joi.string().required(),
              first: Joi.string().required(),
              second: Joi.string().required(),
              describe: Joi.string().required()
          }), this.ctx.request.body);
          await super.update('goodgroup'); 
      } catch (err) {
          console.log("controller 修改111111" + err);
        this.ctx.body = this.ctx.__("t6");
      }
    } else {
      this.ctx.body = this.ctx.__("t7");
    }
  }

  //删除商品
  async destroy(){
      const authorization  = this.ctx.get('Authorization');
      const isexit = await this.isAllow(authcode.goodGroup.destroy,authorization);
      if(isexit){
          try {
              const Joi = this.app.Joi;
              this.ctx.validate(Joi.object().keys({
                  id: Joi.string().required()
              }),this.ctx.params);
              await super.destroy('goodgroup');
          } catch (error) {
              this.ctx.body = this.ctx.__("t6");
          }
      }else{
          this.ctx.body = this.ctx.__("t7");
      }
  }

}

declare module 'egg' {
    export interface IController {
        goodGroup: GoodGroupController;
    }
}
