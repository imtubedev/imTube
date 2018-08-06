import * as mongoose from 'mongoose';
import * as mongoose_delete from 'mongoose-delete';
import * as findOrCreate from 'mongoose-findorcreate';
import * as QueryPlugin from 'mongoose-query';

const Schema = mongoose.Schema;


const transaction_header = {
    expiration:{type: String},///时间段
    ref_block_num:{ type: Number },
    ref_block_prefix:{type: Number},
    max_net_usage_words:{type: Number},
    max_cpu_usage_ms:{type: Number},
    delay_sec:{type: Number}
}
const authorization = {
    actor:{ type: String },
    permission:{ type: String }
}

const action = {
    action_num:{type: Number},
    trx_id:{ type: String },
    cfa:{type: Boolean},
    account:{type: String},
    name:{type: String},
    authorization:[authorization],
    hex_data:{type: String}
}
const fields = {
    name:{type: String},
    type:{ type: String }
}
const transaction_extensions = {
    name:{type: String},
    base:{ type: String },
    fields:[fields]
}


//交易表
export const transactionSchema = new Schema({
    trx_id: { type: String, required: true },
    irreversible: {type: Boolean},
    transaction_header: transaction_header,
    actions: [action],
    transaction_extensions: [transaction_extensions],
    signatures:[{ type: String }],
    context_free_data:[{ type: String }]
},{ timestamps: true });

transactionSchema.plugin(QueryPlugin);
transactionSchema.plugin(mongoose_delete);
transactionSchema.plugin(findOrCreate);


const commonSelectKey = 'trx_id ';

/**
 * 查询交易列表信息
 */
transactionSchema.statics.findTransactionList = function (data:any) {
    if(data){
        const per_page = parseInt(data.per_page);
        const page = parseInt(data.page);
        const num = (page-1)*per_page;
        return this.find()
        .limit(per_page)
        .skip(num)
        .sort({createdAt:-1})
        .exec();
    }else{
        return this.find()
        .select()
        .sort({createdAt:-1})
        .exec();
    }
};

/**
 * 查询交易的详情
 */
transactionSchema.statics.findTransactionDetailInfo = function (transid: string) {
    return this.find({trx_id:transid})
        .select()
        .exec();
};



export default (app) => {
    return app.mongoose.model('Transaction', transactionSchema);
};