"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const findOrCreate = require("mongoose-findorcreate");
const QueryPlugin = require("mongoose-query");
const Schema = mongoose.Schema;
const authorization = {
    actor: { type: String },
    permission: { type: String }
};
///动作表
exports.actionSchema = new Schema({
    action_num: { type: Number, required: true },
    trx_id: { type: String, required: true },
    cfa: { type: Boolean },
    account: { type: String },
    name: { type: String },
    authorization: [authorization],
    hex_data: { type: String }
}, { timestamps: true });
exports.actionSchema.plugin(QueryPlugin);
exports.actionSchema.plugin(mongoose_delete);
exports.actionSchema.plugin(findOrCreate);
const commonSelectKey = 'action_num trx_id cfa account name authorization hex_data';
/**
 * 查询动作列表信息
 */
exports.actionSchema.statics.findActionList = function (data) {
    if (data) {
        const per_page = parseInt(data.per_page);
        const page = parseInt(data.page);
        const num = (page - 1) * per_page;
        return this.find()
            .limit(per_page)
            .skip(num)
            .exec();
    }
    else {
        return this.find()
            .select(commonSelectKey)
            .exec();
    }
};
/**
 * 查询动作的详情
 */
exports.actionSchema.statics.findActionDetailInfo = function (aid) {
    return this.find({ _id: mongoose.Types.ObjectId(aid) })
        .select()
        .exec();
};
exports.default = (app) => {
    return app.mongoose.model('Action', exports.actionSchema);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQXFDO0FBQ3JDLG1EQUFtRDtBQUNuRCxzREFBc0Q7QUFDdEQsOENBQThDO0FBRTlDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFFL0IsTUFBTSxhQUFhLEdBQUc7SUFDbEIsS0FBSyxFQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQztJQUNwQixVQUFVLEVBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0NBQzlCLENBQUE7QUFDRCxNQUFNO0FBQ08sUUFBQSxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUM7SUFDbkMsVUFBVSxFQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQzFDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUN0QyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0lBQ3RCLE9BQU8sRUFBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7SUFDdkIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtJQUN0QixhQUFhLEVBQUMsQ0FBQyxhQUFhLENBQUM7SUFDN0IsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtDQUM3QixFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFFekIsb0JBQVksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDakMsb0JBQVksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDckMsb0JBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDbEMsTUFBTSxlQUFlLEdBQUcsMkRBQTJELENBQUM7QUFFcEY7O0dBRUc7QUFDSCxvQkFBWSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsVUFBVSxJQUFRO0lBQ3BELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7UUFDTCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDLEdBQUMsUUFBUSxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO2FBQ2pCLEtBQUssQ0FBQyxRQUFRLENBQUM7YUFDZixJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ1QsSUFBSSxFQUFFLENBQUM7SUFDWixDQUFDO0lBQUEsSUFBSSxDQUFBLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTthQUNqQixNQUFNLENBQUMsZUFBZSxDQUFDO2FBQ3ZCLElBQUksRUFBRSxDQUFDO0lBQ1osQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ0gsb0JBQVksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEdBQUcsVUFBVSxHQUFXO0lBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUM7U0FDakQsTUFBTSxFQUFFO1NBQ1IsSUFBSSxFQUFFLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBS0Ysa0JBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuQixNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLG9CQUFZLENBQUMsQ0FBQztBQUN0RCxDQUFDLENBQUMifQ==