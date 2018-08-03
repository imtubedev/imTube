'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const reply_1 = require("../const/reply");
const errorcode_1 = require("../const/errorcode");
class BlockService extends egg_1.Service {
    //查询区块列表
    async index(data) {
        try {
            const model = this.ctx.model;
            const infos = await model.Block.findBlockList(data);
            if (infos) {
                return reply_1.default.success(infos);
            }
            return reply_1.default.err(errorcode_1.default.block.index, this.ctx.__("t2"));
        }
        catch (err) {
            return reply_1.default.err(errorcode_1.default.block.index, this.ctx.__("t1"));
        }
    }
    //显示区块详情
    async show(blockinfo) {
        try {
            const model = this.ctx.model;
            const id = blockinfo.id;
            let info = await model.Block.findBlockDetailInfo(id);
            if (info) {
                return reply_1.default.success(info);
            }
            return reply_1.default.err(errorcode_1.default.block.show, this.ctx.__("t2"));
        }
        catch (err) {
            return reply_1.default.err(errorcode_1.default.block.show, this.ctx.__("t1"));
        }
    }
}
exports.BlockService = BlockService;
module.exports = BlockService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7O0FBQ2IsNkJBQThCO0FBQzlCLDBDQUFtQztBQUNuQyxrREFBMkM7QUFFM0Msa0JBQTBCLFNBQVEsYUFBTztJQUVyQyxRQUFRO0lBQ1IsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFTO1FBQ2pCLElBQUksQ0FBQztZQUNELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQzdCLE1BQU0sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDUixNQUFNLENBQUMsZUFBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBQ0QsTUFBTSxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsbUJBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxtQkFBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVE7SUFDUixLQUFLLENBQUMsSUFBSSxDQUFDLFNBQWM7UUFDckIsSUFBSSxDQUFDO1lBQ0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDN0IsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUN4QixJQUFJLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUCxNQUFNLENBQUMsZUFBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixDQUFDO1lBQ0QsTUFBTSxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsbUJBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxtQkFBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM5RCxDQUFDO0lBQ0wsQ0FBQztDQUdKO0FBaENELG9DQWdDQztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDIn0=