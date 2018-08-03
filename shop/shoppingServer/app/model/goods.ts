import * as mongoose from 'mongoose';
import * as mongoose_delete from 'mongoose-delete';
import * as findOrCreate from 'mongoose-findorcreate';
import * as QueryPlugin from 'mongoose-query';

const Schema = mongoose.Schema;

///商品表
export const goodsSchema = new Schema({
    goodid:{type: String, required: true },//商品id
    goodimg:{type: String },//商品首页
    title:{type: String },//商品名称
    pic: [{ type: String }],//商品图片
    price:{type: Number},//价格
    total: { type: Number },//库存总量
    salenum: { type: Number },//销量
    priority: { type: Number },//显示优先级
    supplier: { type: String },//供应商
    isLimit: { type: String },///是否限购
    effectime:{ type: String },///生效时间
    expirydate:{ type: Number },//有效期
    createtime:{ type: String ,default:Date.now},///创建时间
    classification:{type: String },///分类
    content:{type: String }   ////内容个描述
}, { timestamps: true });

goodsSchema.plugin(QueryPlugin);
goodsSchema.plugin(mongoose_delete);
goodsSchema.plugin(findOrCreate);
goodsSchema.index({ goodid: 1 });
const commonSelectKey = 'goodid pic price total salenum priority supplier classification content expirydate';



//根据分组名称查询对应的商品数量
goodsSchema.statics.findGroupnameNum = function name() {
     return this.aggregate([
         { "$group": { _id: "$groupName", count: { $sum: 1 }} },
    ]).exec();
}

/**
 * 查询商品列表信息
 */
goodsSchema.statics.findGoodsList = function (data:any) {
    if(data){
        const per_page = parseInt(data.per_page);
        const page = parseInt(data.page);
        const num = page*per_page;
        return this.find()
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
 * 查询某一条商品详情
 */
goodsSchema.statics.findDetailGoodInfo = function (goodid: string) {
    return this.find({_id:mongoose.Types.ObjectId(goodid)})
        .select(commonSelectKey)
        .exec();
};

/**
 * 编辑商品信息
 */
goodsSchema.statics.updateGoodInfo = function (id:any,data:any) {
    return this.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id)},
        {$set:data},
        {new:true}
    )
    .select()
    .exec();
};

/**
 * 删除商品
 */
goodsSchema.statics.delGoods = function (id:any) {
    return this.remove({ _id: mongoose.Types.ObjectId(id)}).exec();
};


/**
 * 根据商品价格区间查询商品列表
 */
goodsSchema.statics.findByPrice = function (data:any) {
        const per_page = parseInt(data.per_page);
        const page = parseInt(data.page);
        const lprice = parseInt(data.lprice);
        const hprice = parseInt(data.hprice);
        const num = page*per_page;
        return this.find({"price":{ "$gte":lprice , "$lte":hprice } })
        .limit(per_page)
        .skip(num)
        .exec();
};

/**
 * 模糊查询商品列表
 */
goodsSchema.statics.findRegexPrice = function (data:any) {
    const per_page = parseInt(data.per_page);
    const page = parseInt(data.page);
    const title = data.title;
    const filter = new RegExp(title, 'i') //不区分大小写
    const num = page*per_page;
    return this.find({title:{$regex:filter}})
    .limit(per_page)
    .skip(num)
    .exec();
};



export default (app) => {
    return app.mongoose.model('Goods', goodsSchema);
};
