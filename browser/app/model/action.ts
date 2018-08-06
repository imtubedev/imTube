import * as mongoose from 'mongoose';
import * as mongoose_delete from 'mongoose-delete';
import * as findOrCreate from 'mongoose-findorcreate';
import * as QueryPlugin from 'mongoose-query';

const Schema = mongoose.Schema;

const authorization = {
    actor:{type: String},
    permission:{ type: String }
}
///动作表
export const actionSchema = new Schema({
    action_num:{type: Number, required: true },
    trx_id:{type: String, required: true },
    cfa: { type: Boolean },
    account:{type: String },
    name: { type: String },
    authorization:[authorization],
    hex_data: { type: String }
}, { timestamps: true });

actionSchema.plugin(QueryPlugin);
actionSchema.plugin(mongoose_delete);
actionSchema.plugin(findOrCreate);
const commonSelectKey = 'action_num trx_id cfa account name authorization hex_data';

/**
 * 查询动作列表信息
 */
actionSchema.statics.findActionList = function (data:any) {
    if(data){
        const per_page = parseInt(data.per_page);
        const page = parseInt(data.page);
        const num = (page-1)*per_page;
        return this.find()
        .limit(per_page)
        .skip(num)
        .exec();
    }else{
        return this.find()
        .select(commonSelectKey)
        .exec();
    }
};

/**
 * 查询动作的详情
 */
actionSchema.statics.findActionDetailInfo = function (aid: string) {
    return this.find({ _id: mongoose.Types.ObjectId(aid)})
        .select()
        .exec();
};




export default (app) => {
    return app.mongoose.model('Action', actionSchema);
};
