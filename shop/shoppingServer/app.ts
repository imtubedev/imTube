import * as Joi from 'joi';
import * as Keyv from 'keyv';
import { GoodsService } from './app/service/goods';
import { OrderService } from './app/service/order';
import { GoodGroupService } from './app/service/goodgroup';
import { GoodsDetailService } from './app/service/goodsdetail';


declare module "egg" {
    interface IService {
        goods: GoodsService;
        order: OrderService;
        goodgroup: GoodGroupService;
        goodsdetail: GoodsDetailService;
    }
    class Application {
        redis: any;
        Joi: Joi;
        jwt: any;
        keyv: Keyv;
    }
}

module.exports = app => {
    app.beforeStart(async () => {
        // await Config.Instance().initLoadData();
    });
};
