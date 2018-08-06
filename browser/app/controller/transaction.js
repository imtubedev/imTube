"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basecontroller_1 = require("./basecontroller");
class TransactionController extends basecontroller_1.default {
    //查询商品分组
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
            await super.index('transaction');
        }
        catch (error) {
            this.ctx.body = this.ctx.__("t6");
        }
    }
    //查询交易详情
    async show() {
        try {
            const Joi = this.app.Joi;
            this.ctx.validate(Joi.object().keys({
                id: Joi.string().required()
            }), this.ctx.params);
            await super.show('transaction');
        }
        catch (err) {
            this.ctx.body = this.ctx.__("t6");
        }
    }
}
exports.default = TransactionController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cmFuc2FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUE4QztBQUU5QywyQkFBMkMsU0FBUSx3QkFBYztJQUc3RCxRQUFRO0lBQ1IsS0FBSyxDQUFDLEtBQUs7UUFDUCxJQUFJLENBQUM7WUFDRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1osTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0JBQ2hDLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO29CQUMvQixRQUFRLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtvQkFDakMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7aUJBQ2hDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNkLENBQUM7WUFDRCxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxDQUFDO0lBQ0wsQ0FBQztJQUdELFFBQVE7SUFDUixLQUFLLENBQUMsSUFBSTtRQUNOLElBQUksQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2hDLEVBQUUsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO2FBQzlCLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUM7SUFDTCxDQUFDO0NBSUo7QUFyQ0Qsd0NBcUNDIn0=