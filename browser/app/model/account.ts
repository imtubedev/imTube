import * as mongoose from 'mongoose';
import * as mongoose_delete from 'mongoose-delete';
import * as findOrCreate from 'mongoose-findorcreate';
import * as QueryPlugin from 'mongoose-query';

const Schema = mongoose.Schema;




const types = {
    new_type_name:{type: String},///时间段
    type:{ type: String }
}
const fields = {
    name:{type: String},///时间段
    type:{ type: String }
}
const structs = {
    name:{type: String},///时间段
    base:{ type: String },
    fields:[fields]
}

const actions = {
    name:{type: String},///时间段
    type:{ type: String },
    ricardian_contract:{ type: String }
}

const tables = {
    name:{type: String},///时间段
    index_type:{ type: String },
    key_names:[{ type: String }],
    key_types:[{ type: String }],
    type:{ type: String }
}
const ricardian_clauses = {
    id:{type: String},///时间段
    body:{ type: String }
}
const error_messages = {
    error_code:{type: String},///时间段
    error_msg:{ type: String }
}

const abi = {
    version:{type: String},///时间段
    types:[types],
    structs:[structs],
    actions:[actions],
    tables:[tables],
    ricardian_clauses:[ricardian_clauses],
    error_messages:[error_messages],
    abi_extensions:[{type: String}]
}
///账户表
export const accountSchema = new Schema({
    name:{type: String, required: true },//名称
    abi:abi
}, { timestamps: true });

accountSchema.plugin(QueryPlugin);
accountSchema.plugin(mongoose_delete);
accountSchema.plugin(findOrCreate);
accountSchema.index({ block_num: 1 });
const commonSelectKey = 'block_id block_num block.timestamp block.producer block.transactions';


/**
 * 查询账户详情
 */
accountSchema.statics.findAccountInfo = function (uid: string) {
    return this.find({ name: uid})
        .select()
        .exec();
};




export default (app) => {
    return app.mongoose.model('Account', accountSchema);
};
