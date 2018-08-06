"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
//const qs = require('querystring');
//import { RankManager } from '../manager/rankManager'
// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD hh:mm:ss');
// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
    ctx.body = {
        code: 0,
        data: res,
        msg
    };
    ctx.status = 200;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQWdDO0FBQ2hDLG9DQUFvQztBQUNwQyxzREFBc0Q7QUFFdEQsUUFBUTtBQUNSLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUE7QUFFdkUsU0FBUztBQUNULE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsSUFBSSxFQUFFLEdBQUcsR0FBRyxNQUFNLEVBQUUsRUFBRSxFQUFFO0lBQ3RELEdBQUcsQ0FBQyxJQUFJLEdBQUc7UUFDVCxJQUFJLEVBQUUsQ0FBQztRQUNQLElBQUksRUFBRSxHQUFHO1FBQ1QsR0FBRztLQUNKLENBQUE7SUFDRCxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTtBQUNsQixDQUFDLENBQUEifQ==