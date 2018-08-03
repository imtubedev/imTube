import * as mongoose from 'mongoose';
import * as mongoose_delete from 'mongoose-delete';
import * as findOrCreate from 'mongoose-findorcreate';
import * as QueryPlugin from 'mongoose-query';

const Schema = mongoose.Schema;

const block = {
    timestamp:{type: String},///时间段
    producer:{ type: String },
    confirmed:{type: Number},
    previous:{type: String},
    transaction_mroot:{type: String},
    action_mroot:{type: String},
    schedule_version:{type: String},
    new_producers:{type: String},
    header_extensions:[{type: String}],
    producer_signature:{type: String},
    transactions:[{type: String}],
    block_extensions:[{type: String}]
}
///区块表
export const blockSchema = new Schema({
    block_id:{type: String, required: true },//区块id
    block_num:{type: Number, required: true },//区块号
    irreversible: { type: Boolean },
    in_current_chain:{type: Boolean },
    validated: { type: String },
    block:block
}, { timestamps: true });

blockSchema.plugin(QueryPlugin);
blockSchema.plugin(mongoose_delete);
blockSchema.plugin(findOrCreate);
blockSchema.index({ block_num: 1 });
const commonSelectKey = 'block_id block_num block.timestamp block.producer block.transactions';

/**
 * 查询区块列表信息
 */
blockSchema.statics.findBlockList = function (data:any) {
    if(data){
        const per_page = parseInt(data.per_page);
        const page = parseInt(data.page);
        const num = (page-1)*per_page;
        return this.find()
        .limit(per_page)
        .skip(num)
        .sort({block_num:-1})
        .exec();
    }else{
        return this.find()
        .select(commonSelectKey)
        .sort({block_num:-1})
        .exec();
    }
};

/**
 * 查询对应区块号的详情
 */
blockSchema.statics.findBlockDetailInfo = function (blockid: string) {
    return this.find({block_num:blockid})
        .select()
        .exec();
};




export default (app) => {
    return app.mongoose.model('Block', blockSchema);
};
