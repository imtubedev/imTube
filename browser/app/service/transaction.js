'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const reply_1 = require("../const/reply");
const errorcode_1 = require("../const/errorcode");
class TransactionService extends egg_1.Service {
    //查询区块列表
    async index(data) {
        try {
            const model = this.ctx.model;
            const infos = await model.Transaction.findTransactionList(data);
            if (infos) {
                return reply_1.default.success(infos);
            }
            return reply_1.default.err(errorcode_1.default.transaction.index, this.ctx.__("t2"));
        }
        catch (err) {
            return reply_1.default.err(errorcode_1.default.transaction.index, this.ctx.__("t1"));
        }
    }
    //显示区块详情
    async show(transinfo) {
        try {
            const model = this.ctx.model;
            const id = transinfo.id;
            let info = await model.Transaction.findTransactionDetailInfo(id);
            if (info) {
                return reply_1.default.success(info);
            }
            return reply_1.default.err(errorcode_1.default.transaction.show, this.ctx.__("t2"));
        }
        catch (err) {
            return reply_1.default.err(errorcode_1.default.transaction.show, this.ctx.__("t1"));
        }
    }
}
exports.TransactionService = TransactionService;
module.exports = TransactionService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cmFuc2FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7O0FBQ2IsNkJBQTRCO0FBQzVCLDBDQUFtQztBQUNuQyxrREFBMkM7QUFFM0Msd0JBQWdDLFNBQVEsYUFBTztJQUUzQyxRQUFRO0lBQ1IsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFTO1FBQ2pCLElBQUksQ0FBQztZQUNELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQzdCLE1BQU0sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLE1BQU0sQ0FBQyxlQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLENBQUM7WUFDRCxNQUFNLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxtQkFBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLG1CQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7SUFDTCxDQUFDO0lBRUQsUUFBUTtJQUNSLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBYztRQUNyQixJQUFJLENBQUM7WUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUM3QixNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ3hCLElBQUksSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNQLE1BQU0sQ0FBQyxlQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLENBQUM7WUFDRCxNQUFNLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxtQkFBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLG1CQUFTLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7SUFDTCxDQUFDO0NBR0o7QUFoQ0QsZ0RBZ0NDO0FBQ0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyJ9