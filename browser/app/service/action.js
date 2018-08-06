'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const reply_1 = require("../const/reply");
const errorcode_1 = require("../const/errorcode");
class ActionService extends egg_1.Service {
    //查询区块列表
    async index(data) {
        try {
            const model = this.ctx.model;
            const infos = await model.Action.findActionList(data);
            if (infos) {
                return reply_1.default.success(infos);
            }
            return reply_1.default.err(errorcode_1.default.action.index, this.ctx.__("t2"));
        }
        catch (err) {
            return reply_1.default.err(errorcode_1.default.action.index, this.ctx.__("t1"));
        }
    }
    //显示区块详情
    async show(blockinfo) {
        try {
            const model = this.ctx.model;
            const id = blockinfo.id;
            let info = await model.Action.findActionDetailInfo(id);
            if (info) {
                return reply_1.default.success(info);
            }
            return reply_1.default.err(errorcode_1.default.action.show, this.ctx.__("t2"));
        }
        catch (err) {
            return reply_1.default.err(errorcode_1.default.action.show, this.ctx.__("t1"));
        }
    }
}
exports.ActionService = ActionService;
module.exports = ActionService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7QUFDYiw2QkFBOEI7QUFDOUIsMENBQW1DO0FBQ25DLGtEQUEyQztBQUUzQyxtQkFBMkIsU0FBUSxhQUFPO0lBRXRDLFFBQVE7SUFDUixLQUFLLENBQUMsS0FBSyxDQUFDLElBQVM7UUFDakIsSUFBSSxDQUFDO1lBQ0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDN0IsTUFBTSxLQUFLLEdBQUcsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLE1BQU0sQ0FBQyxlQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLENBQUM7WUFDRCxNQUFNLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxtQkFBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoRSxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLG1CQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7SUFDTCxDQUFDO0lBRUQsUUFBUTtJQUNSLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBYztRQUNyQixJQUFJLENBQUM7WUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUM3QixNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ3hCLElBQUksSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNQLE1BQU0sQ0FBQyxlQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLENBQUM7WUFDRCxNQUFNLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxtQkFBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLG1CQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9ELENBQUM7SUFDTCxDQUFDO0NBR0o7QUFoQ0Qsc0NBZ0NDO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMifQ==