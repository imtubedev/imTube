import * as mongoose from 'mongoose';
import * as mongoose_delete from 'mongoose-delete';
import * as findOrCreate from 'mongoose-findorcreate';
import * as QueryPlugin from 'mongoose-query';

const Schema = mongoose.Schema;


//商品分组表
export const goodGroupSchema = new Schema({
    groupName: { type: String, required: true },//分组名称
    first: {type: String},//第一优先级
    second: { type: String},//第二优先级
    describe: {type: String},//商品分组描述
    createtime: { type: String, default: Date.now }///创建时间
},{ timestamps: true });

goodGroupSchema.plugin(QueryPlugin);
goodGroupSchema.plugin(mongoose_delete);
goodGroupSchema.plugin(findOrCreate);
//goodGroupSchema.index({goodGroupid: 1 });
//const commonSelectKey = 'groupName first second describe createtime ';

//查询商品分组
goodGroupSchema.statics.findGoodGroupTime = function ( ) {
    return this.aggregate({
        $project: {
            groupName: 1,
            createtime: 1,
        }
    })
};


//编辑商品信息
goodGroupSchema.statics.updateGoodGroupInfo = function (id: any, data: any) {
    return this.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id)},
        { $set: data },
        { new: true }
    )
    .select()
    .exec();
};


//删除商品
goodGroupSchema.statics.delGoodGroup = function (id: any) {
    return this.remove({ _id: mongoose.Types.ObjectId(id) }).exec();
};


export default (app) => {
    return app.mongoose.model('Goodgroup', goodGroupSchema);
};