"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basecontroller_1 = require("./basecontroller");
class BlockController extends basecontroller_1.default {
    //查询区块列表信息
    async index() {
        try {
            let data = this.ctx.request.query;
            if (data.page) {
                const Joi = this.app.Joi;
                this.ctx.validate(Joi.object().keys({
                    locale: Joi.string().required(),
                    per_page: Joi.number().required(),
                    page: Joi.number().required()
                }), data);
            }
            await super.index('block');
        }
        catch (err) {
            this.ctx.body = this.ctx.__("t6");
        }
    }
    //查询区块详情
    async show() {
        try {
            const Joi = this.app.Joi;
            this.ctx.validate(Joi.object().keys({
                id: Joi.number().min(2).required()
            }), this.ctx.params);
            await super.show('block');
        }
        catch (err) {
            this.ctx.body = this.ctx.__("t6");
        }
    }
}
exports.default = BlockController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUE4QztBQUU5QyxxQkFBcUMsU0FBUSx3QkFBYztJQUd6RCxVQUFVO0lBQ1YsS0FBSyxDQUFDLEtBQUs7UUFDUCxJQUFJLENBQUM7WUFDSCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0JBQ2xDLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO29CQUMvQixRQUFRLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtvQkFDakMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7aUJBQzlCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNaLENBQUM7WUFDRCxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxDQUFDO0lBQ0wsQ0FBQztJQUlELFFBQVE7SUFDUixLQUFLLENBQUMsSUFBSTtRQUNSLElBQUksQ0FBQztZQUNILE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2xDLEVBQUUsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTthQUNuQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQixNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBbkNELGtDQW1DQyJ9