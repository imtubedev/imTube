import {Application} from 'egg';


export default (app: Application) => {
    const {router} = app;
    router.resources('block', '/browser/v1/block', 'block');
    router.resources('transaction', '/browser/v1/transaction', 'transaction');
    router.resources('account', '/browser/v1/account', 'account');
    router.resources('action', '/browser/v1/action', 'action');
}
