import * as mongoose from 'mongoose';
import * as mongoose_delete from 'mongoose-delete';
import * as findOrCreate from 'mongoose-findorcreate';
import * as QueryPlugin from 'mongoose-query';

const Schema = mongoose.Schema;

///订单表
export const orderSchema = new Schema({
    imtid:{type: String, required: true },//用户id
    orderid:{type: String, required: true },//订单id
    ordertitle: { type: String },//订单名称
    goodsid:{type: String, required: true },//商品id
    goodstitle: { type: String },//商品名称
    price:{type: Number},//价格
    num: { type: Number },//数量
    amount: { type: Number },//总金额
    buyer: { type: String },//买家
    supplier: { type: String },//供应商
    transaction_time: { type: String },//成交时间
    stats:{type: String,default:"00"},//订单状态,//00:待付款,01:待发货,02:已发货,03:已完成,04:已关闭,05:退款中
    classification:{type: String }///分类
}, { timestamps: true });

orderSchema.plugin(QueryPlugin);
orderSchema.plugin(mongoose_delete);
orderSchema.plugin(findOrCreate);
orderSchema.index({ goodid: 1 });
const commonSelectKey = 'orderid ordertitle price num amount buyer supplier supplier stats';

/**
 * 查询订单列表信息
 */
orderSchema.statics.findOrderList = function (data:any) {
    if(data){
        console.log(data);
        const per_page = parseInt(data.per_page);
        const page = parseInt(data.page);
        const stats = data.stats;
        const num = (page-1)*per_page;
        return this.find({stats:stats})
        .limit(per_page)
        .skip(num)
        .exec();
    }else{
        return this.find()
        .select()
        .exec();
    }
};

/**
 * 查询某一条订单详情
 */
orderSchema.statics.findDetailOrderInfo = function (orderid: string) {
    return this.find({orderid:orderid})
        .select(commonSelectKey)
        .exec();
};

/**
 * 编辑订单信息
 */
orderSchema.statics.updateOrderInfo = function (id:any,data:any) {
    return this.findOneAndUpdate(
        {orderid:id},
        {$set:data},
        {new:true}
    )
    .select()
    .exec();
};

/**
 * 删除订单
 */
orderSchema.statics.delOrder = function (id:any) {
    return this.remove({ orderid: id }).exec();
};

/**
 * 查询我的订单列表信息
 */
orderSchema.statics.findMyOrderList = function (data:any) {
        const per_page = parseInt(data.per_page);
        const page = parseInt(data.page);
        const stats = parseInt(data.stats);
        const imtid = parseInt(data.imtid);
        const num = page*per_page;
        return this.find({stats:stats,imtid:imtid})
        .limit(per_page)
        .skip(num)
        .exec();
};



export default (app) => {
    return app.mongoose.model('Order', orderSchema);
};
