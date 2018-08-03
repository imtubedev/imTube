import {Application} from 'egg';


export default (app: Application) => {
    const {router, controller} = app;
    router.put('/shop/v1/order/orderstats', controller.order.updateOrderStats); ///变更订单状态
    router.get('/shop/v1/order/myorder', controller.order.myOrderList); ///查询我的订单
    router.get('/shop/v1/goods/goodsprice', controller.goods.findByPrice); ///根据价格区间查询商品列表
    router.get('/shop/v1/goods/goodsregex', controller.goods.findRegexList); ///模糊查询商品
    router.resources('goods', '/shop/v1/goods', 'goods');
    router.resources('order', '/shop/v1/order', 'order');
    router.resources('goodgroup', '/shop/v1/goodgroup', 'goodgroup');
    router.resources('goodsdetail', '/shop/v1/goodsdetail', 'goodsdetail');
}
