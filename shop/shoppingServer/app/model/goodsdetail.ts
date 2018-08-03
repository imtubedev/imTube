import * as mongoose from 'mongoose';
import * as mongoose_delete from 'mongoose-delete';
import * as findOrCreate from 'mongoose-findorcreate';
import * as QueryPlugin from 'mongoose-query';

const Schema = mongoose.Schema;

//订单明细列表
export const goodsDetailSchema = new Schema({
    orderid: {type: String, required: true}, //订单号
    timelimit: {type: String, required: true}, //有效期
    money: {type: String, required: true}, //金额
    cardid: {type: String, required: true}, //卡号
    pwd: {type: String, required: true}, //密码
    classification: {type: String, required: true}, //卡类型
    state: {type: Number, required: true}, //卡状态
}, {timestamps: true});

goodsDetailSchema.plugin(QueryPlugin);
goodsDetailSchema.plugin(mongoose_delete);
goodsDetailSchema.plugin(findOrCreate);
//goodGroupSchema.index({goodGroupid: 1 });
//const commonSelectKey = 'groupName first second describe createtime ';

//查询
goodsDetailSchema.statics.findGoodsDetailList = function (data: any) {
    if (data) {
        const per_page = parseInt(data.per_page);
        const page = parseInt(data.page);
        const num = (page - 1) * per_page;
        return this.find()
            .limit(per_page)
            .skip(num)
            .exec();
    } else {
        return this.find()
            .select()
            .exec();
    }
};

//编辑
goodsDetailSchema.statics.updateGoodsDetailInfo = function (id: any, data: any) {
    return this.findOneAndUpdate(
        {_id: mongoose.Types.ObjectId(id)},
        {$set: data},
        {new: true}
    )
        .select()
        .exec();
};


//删除
goodsDetailSchema.statics.delGoodsDetail = function (id: any) {
    return this.remove({_id: mongoose.Types.ObjectId(id)}).exec();
};

export default (app) => {
    return app.mongoose.model('Goodsdetail', goodsDetailSchema);
};