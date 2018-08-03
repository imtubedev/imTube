import * as Joi from 'joi';
import * as Keyv from 'keyv';
import { BlockService } from './app/service/block';
import { TransactionService } from './app/service/transaction';
import { AccountService } from './app/service/account';
import { ActionService } from './app/service/action';





declare module "egg" {
    interface IService {
        block: BlockService;
        transaction:TransactionService;
        account:AccountService;
        action:ActionService;
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
