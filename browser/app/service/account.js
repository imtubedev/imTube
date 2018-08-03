'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const reply_1 = require("../const/reply");
const errorcode_1 = require("../const/errorcode");
class AccountService extends egg_1.Service {
    //显示账户详情
    async show(userinfo) {
        try {
            const model = this.ctx.model;
            const id = userinfo.id;
            let info = await model.Account.findAccountInfo(id);
            if (info) {
                return reply_1.default.success(info);
            }
            return reply_1.default.err(errorcode_1.default.account.show, this.ctx.__("t2"));
        }
        catch (err) {
            return reply_1.default.err(errorcode_1.default.account.show, this.ctx.__("t1"));
        }
    }
}
exports.AccountService = AccountService;
module.exports = AccountService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOztBQUNiLDZCQUE4QjtBQUM5QiwwQ0FBbUM7QUFDbkMsa0RBQTJDO0FBRTNDLG9CQUE0QixTQUFRLGFBQU87SUFFdkMsUUFBUTtJQUNSLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBYTtRQUNwQixJQUFJLENBQUM7WUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUM3QixNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUCxNQUFNLENBQUMsZUFBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixDQUFDO1lBQ0QsTUFBTSxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsbUJBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDaEUsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxtQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoRSxDQUFDO0lBQ0wsQ0FBQztDQUdKO0FBbEJELHdDQWtCQztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDIn0=