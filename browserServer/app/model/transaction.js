"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const findOrCreate = require("mongoose-findorcreate");
const QueryPlugin = require("mongoose-query");
const Schema = mongoose.Schema;
const transaction_header = {
    expiration: { type: String },
    ref_block_num: { type: Number },
    ref_block_prefix: { type: Number },
    max_net_usage_words: { type: Number },
    max_cpu_usage_ms: { type: Number },
    delay_sec: { type: Number }
};
const authorization = {
    actor: { type: String },
    permission: { type: String }
};
const action = {
    action_num: { type: Number },
    trx_id: { type: String },
    cfa: { type: Boolean },
    account: { type: String },
    name: { type: String },
    authorization: [authorization],
    hex_data: { type: String }
};
const fields = {
    name: { type: String },
    type: { type: String }
};
const transaction_extensions = {
    name: { type: String },
    base: { type: String },
    fields: [fields]
};
//交易表
exports.transactionSchema = new Schema({
    trx_id: { type: String, required: true },
    irreversible: { type: Boolean },
    transaction_header: transaction_header,
    actions: [action],
    transaction_extensions: [transaction_extensions],
    signatures: [{ type: String }],
    context_free_data: [{ type: String }]
}, { timestamps: true });
exports.transactionSchema.plugin(QueryPlugin);
exports.transactionSchema.plugin(mongoose_delete);
exports.transactionSchema.plugin(findOrCreate);
const commonSelectKey = 'trx_id ';
/**
 * 查询交易列表信息
 */
exports.transactionSchema.statics.findTransactionList = function (data) {
    if (data) {
        const per_page = parseInt(data.per_page);
        const page = parseInt(data.page);
        const num = (page - 1) * per_page;
        return this.find()
            .limit(per_page)
            .skip(num)
            .sort({ createdAt: -1 })
            .exec();
    }
    else {
        return this.find()
            .select()
            .sort({ createdAt: -1 })
            .exec();
    }
};
/**
 * 查询交易的详情
 */
exports.transactionSchema.statics.findTransactionDetailInfo = function (transid) {
    return this.find({ trx_id: transid })
        .select()
        .exec();
};
exports.default = (app) => {
    return app.mongoose.model('Transaction', exports.transactionSchema);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cmFuc2FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFxQztBQUNyQyxtREFBbUQ7QUFDbkQsc0RBQXNEO0FBQ3RELDhDQUE4QztBQUU5QyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO0FBRy9CLE1BQU0sa0JBQWtCLEdBQUc7SUFDdkIsVUFBVSxFQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQztJQUN6QixhQUFhLEVBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0lBQzlCLGdCQUFnQixFQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQztJQUMvQixtQkFBbUIsRUFBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7SUFDbEMsZ0JBQWdCLEVBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDO0lBQy9CLFNBQVMsRUFBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7Q0FDM0IsQ0FBQTtBQUNELE1BQU0sYUFBYSxHQUFHO0lBQ2xCLEtBQUssRUFBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7SUFDdEIsVUFBVSxFQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtDQUM5QixDQUFBO0FBRUQsTUFBTSxNQUFNLEdBQUc7SUFDWCxVQUFVLEVBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDO0lBQ3pCLE1BQU0sRUFBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7SUFDdkIsR0FBRyxFQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQztJQUNuQixPQUFPLEVBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDO0lBQ3RCLElBQUksRUFBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7SUFDbkIsYUFBYSxFQUFDLENBQUMsYUFBYSxDQUFDO0lBQzdCLFFBQVEsRUFBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7Q0FDMUIs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