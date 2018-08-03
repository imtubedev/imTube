import { Controller } from 'egg';

export default class BaseController extends Controller {
  //查询
  async index(sname:any) {
    try {
      const params = this.ctx.request.query as any;
      const result = await this.ctx.service[sname].index(params);
      this.ctx.body = result;
    } catch (error) {

    }
  }
  //创建
  async create(sname:any){
    try {
      const params = this.ctx.request.body as any;
      const result = await this.ctx.service[sname].create(params);
      this.ctx.body = result;
    } catch (error) {

    }
  }
  //修改
  async update(sname:any){
    try {
      const authinfo = this.ctx.params;
      const params = this.ctx.request.body as any;
      const result = await this.ctx.service[sname].update(authinfo,params);
      this.ctx.body = result;
    } catch (error) {

    }
  }
  //显示
  async show(sname:any){
    try {
      const authinfo = this.ctx.params;
      const result = await this.ctx.service[sname].show(authinfo);
      this.ctx.body = result;
    } catch (error) {

    }
  }
  
  //删除
  async destroy(sname:any){
    try {
      const authinfo = this.ctx.params;
      const result = await this.ctx.service[sname].destroy(authinfo);
      this.ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }

  //权限判断
  async isAllow(code, authorization) {
    const model = this.ctx.model;
    const token = authorization.replace('Bearer ', '');

    const infos = await model.Worker.findByToken(token);
    const auths = await model.Roler.findAuth(infos.worker_roler)
    let arrys = auths.roler_auth;
    const isexit = arrys.indexOf(code.substring(0, code.lastIndexOf('-')));
    return isexit !==-1;
  }
}

declare module 'egg' {
  export interface IController {
    BaseController: BaseController;
  }
}
