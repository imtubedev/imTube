import BaseController from './basecontroller';

export default class TransactionController extends BaseController {


    //查询商品分组
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
            await super.index('transaction');
        } catch (error) {
            this.ctx.body = this.ctx.__("t6");
        }
    }


    //查询交易详情
    async show() {
        try {
            const Joi = this.app.Joi;
            this.ctx.validate(Joi.object().keys({
                id: Joi.string().required()
            }), this.ctx.params);
            await super.show('transaction');
        } catch (err) {
            this.ctx.body = this.ctx.__("t6");
        }
    }



}





declare module 'egg' {
    export interface IController {
        transaction: TransactionController;
    }
}
