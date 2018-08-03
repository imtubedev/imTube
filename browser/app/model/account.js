"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const findOrCreate = require("mongoose-findorcreate");
const QueryPlugin = require("mongoose-query");
const Schema = mongoose.Schema;
const types = {
    new_type_name: { type: String },
    type: { type: String }
};
const fields = {
    name: { type: String },
    type: { type: String }
};
const structs = {
    name: { type: String },
    base: { type: String },
    fields: [fields]
};
const actions = {
    name: { type: String },
    type: { type: String },
    ricardian_contract: { type: String }
};
const tables = {
    name: { type: String },
    index_type: { type: String },
    key_names: [{ type: String }],
    key_types: [{ type: String }],
    type: { type: String }
};
const ricardian_clauses = {
    id: { type: String },
    body: { type: String }
};
const error_messages = {
    error_code: { type: String },
    error_msg: { type: String }
};
const abi = {
    version: { type: String },
    types: [types],
    structs: [structs],
    actions: [actions],
    tables: [tables],
    ricardian_clauses: [ricardian_clauses],
    error_messages: [error_messages],
    abi_extensions: [{ type: String }]
};
///账户表
exports.accountSchema = new Schema({
    name: { type: String, required: true },
    abi: abi
}, { timestamps: true });
exports.accountSchema.plugin(QueryPlugin);
exports.accountSchema.plugin(mongoose_delete);
exports.accountSchema.plugin(findOrCreate);
exports.accountSchema.index({ block_num: 1 });
const commonSelectKey = 'block_id block_num block.timestamp block.producer block.transactions';
/**
 * 查询账户详情
 */
exports.accountSchema.statics.findAccountInfo = function (uid) {
    return this.find({ name: uid })
        .select()
        .exec();
};
exports.default = (app) => {
    return app.mongoose.model('Account', exports.accountSchema);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBcUM7QUFDckMsbURBQW1EO0FBQ25ELHNEQUFzRDtBQUN0RCw4Q0FBOEM7QUFFOUMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUsvQixNQUFNLEtBQUssR0FBRztJQUNWLGFBQWEsRUFBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7SUFDNUIsSUFBSSxFQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtDQUN4QixDQUFBO0FBQ0QsTUFBTSxNQUFNLEdBQUc7SUFDWCxJQUFJLEVBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDO0lBQ25CLElBQUksRUFBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7Q0FDeEIsQ0FBQTtBQUNELE1BQU0sT0FBTyxHQUFHO0lBQ1osSUFBSSxFQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQztJQUNuQixJQUFJLEVBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0lBQ3JCLE1BQU0sRUFBQyxDQUFDLE1BQU0sQ0FBQztDQUNsQixDQUFBO0FBRUQsTUFBTSxPQUFPLEdBQUc7SUFDWixJQUFJLEVBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDO0lBQ25CLElBQUksRUFBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7SUFDckIsa0JBQWtCLEVBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0NBQ3RDLENBQUE7QUFFRCxNQUFNLE1BQU0sR0FBRztJQUNYLElBQUksRUFBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7SUFDbkIsVUFBVSxFQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtJQUMzQixTQUFTLEVBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUM1QixTQUFTLEVBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUM1QixJQUFJLEVBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0NBQ3hCLENBQUE7QUFDRCxNQUFNLGlCQUFpQixHQUFHO0lBQ3RCLEVBQUUsRUFBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7SUFDakIsSUFBSSxFQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtDQUN4QixDQUFBO0FBQ0QsTUFBTSxjQUFjLEdBQUc7SUFDbkIsVUFBVSxFQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQztJQUN6QixTQUFTLEVBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0NBQzdCLENBQUE7QUFFRCxNQUFNLEdBQUcsR0FBRztJQUNSLE9BQU8sRUFBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7SUFDdEIsS0FBSyxFQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2IsT0FBTyxFQUFDLENBQUMsT0FBTyxDQUFDO0lBQ2pCLE9BQU8sRUFBQyxDQUFDLE9BQU8sQ0FBQztJQUNqQixNQUFNLEVBQUMsQ0FBQyxNQUFNLENBQUM7SUFDZixpQkFBaUIsRUFBQyxDQUFDLGlCQUFpQixDQUFDO0lBQ3JDLGNBQWMsRUFBQyxDQUFDLGNBQWMsQ0FBQztJQUMvQixjQUFjLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztDQUNsQyxDQUFBO0FBQ0QsTUFBTTtBQUNPLFFBQUEsYUFBYSxHQUFHLElBQUksTUFBTSxDQUFDO0lBQ3BDLElBQUksRUFBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUNwQyxHQUFHLEVBQUMsR0FBRztDQUNWLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUV6QixxQkFBYSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsQyxxQkFBYSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN0QyxxQkFBYSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNuQyxxQkFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLE1BQU0sZUFBZSxHQUFHLHNFQUFzRSxDQUFDO0FBRy9GOztHQUVHO0FBQ0gscUJBQWEsQ0FBQyxPQUFPLENBQUMsZUFBZSxHQUFHLFVBQVUsR0FBVztJQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQztTQUN6QixNQUFNLEVBQUU7U0FDUixJQUFJLEVBQUUsQ0FBQztBQUNoQixDQUFDLENBQUM7QUFLRixrQkFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUscUJBQWEsQ0FBQyxDQUFDO0FBQ3hELENBQUMsQ0FBQyJ9