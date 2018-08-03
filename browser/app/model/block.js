"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const findOrCreate = require("mongoose-findorcreate");
const QueryPlugin = require("mongoose-query");
const Schema = mongoose.Schema;
const block = {
    timestamp: { type: String },
    producer: { type: String },
    confirmed: { type: Number },
    previous: { type: String },
    transaction_mroot: { type: String },
    action_mroot: { type: String },
    schedule_version: { type: String },
    new_producers: { type: String },
    header_extensions: [{ type: String }],
    producer_signature: { type: String },
    transactions: [{ type: String }],
    block_extensions: [{ type: String }]
};
///区块表
exports.blockSchema = new Schema({
    block_id: { type: String, required: true },
    block_num: { type: Number, required: true },
    irreversible: { type: Boolean },
    in_current_chain: { type: Boolean },
    validated: { type: String },
    block: block
}, { timestamps: true });
exports.blockSchema.plugin(QueryPlugin);
exports.blockSchema.plugin(mongoose_delete);
exports.blockSchema.plugin(findOrCreate);
exports.blockSchema.index({ block_num: 1 });
const commonSelectKey = 'block_id block_num block.timestamp block.producer block.transactions';
/**
 * 查询区块列表信息
 */
exports.blockSchema.statics.findBlockList = function (data) {
    if (data) {
        const per_page = parseInt(data.per_page);
        const page = parseInt(data.page);
        const num = (page - 1) * per_page;
        return this.find()
            .limit(per_page)
            .skip(num)
            .sort({ block_num: -1 })
            .exec();
    }
    else {
        return this.find()
            .select(commonSelectKey)
            .sort({ block_num: -1 })
            .exec();
    }
};
/**
 * 查询对应区块号的详情
 */
exports.blockSchema.statics.findBlockDetailInfo = function (blockid) {
    return this.find({ block_num: blockid })
        .select()
        .exec();
};
exports.default = (app) => {
    return app.mongoose.model('Block', exports.blockSchema);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFxQztBQUNyQyxtREFBbUQ7QUFDbkQsc0RBQXNEO0FBQ3RELDhDQUE4QztBQUU5QyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO0FBRS9CLE1BQU0sS0FBSyxHQUFHO0lBQ1YsU0FBUyxFQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQztJQUN4QixRQUFRLEVBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0lBQ3pCLFNBQVMsRUFBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7SUFDeEIsUUFBUSxFQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQztJQUN2QixpQkFBaUIsRUFBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7SUFDaEMsWUFBWSxFQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQztJQUMzQixnQkFBZ0IsRUFBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7SUFDL0IsYUFBYSxFQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQztJQUM1QixpQkFBaUIsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO0lBQ2xDLGtCQUFrQixFQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQztJQUNqQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztJQUM3QixnQkFBZ0IsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO0NBQ3BDLENBQUE7QUFDRCxNQUFNO0FBQ08sUUFBQSxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUM7SUFDbEMsUUFBUSxFQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQ3hDLFNBQVMsRUFBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUN6QyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0lBQy9CLGdCQUFnQixFQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtJQUNqQyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0lBQzNCLEtBQUssRUFBQyxLQUFLO0NBQ2QsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRXpCLG1CQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2hDLG1CQUFXLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3BDLG1CQUFXLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2pDLG1CQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEMsTUFBTSxlQUFlLEdBQUcsc0VBQXNFLENBQUM7QUFFL0Y7O0dBRUc7QUFDSCxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQUcsVUFBVSxJQUFRO0lBQ2xELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7UUFDTCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDLEdBQUMsUUFBUSxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO2FBQ2pCLEtBQUssQ0FBQyxRQUFRLENBQUM7YUFDZixJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ1QsSUFBSSxDQUFDLEVBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7YUFDcEIsSUFBSSxFQUFFLENBQUM7SUFDWixDQUFDO0lBQUEsSUFBSSxDQUFBLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTthQUNqQixNQUFNLENBQUMsZUFBZSxDQUFDO2FBQ3ZCLElBQUksQ0FBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDO2FBQ3BCLElBQUksRUFBRSxDQUFDO0lBQ1osQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ0gsbUJBQVcsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEdBQUcsVUFBVSxPQUFlO0lBQy9ELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxDQUFDO1NBQ2hDLE1BQU0sRUFBRTtTQUNSLElBQUksRUFBRSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQUtGLGtCQUFlLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxtQkFBVyxDQUFDLENBQUM7QUFDcEQsQ0FBQyxDQUFDIn0=