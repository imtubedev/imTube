'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    code: {
        FAILED: -1,
        SUCCESS: 0,
        FINISH: 1,
        ALARM: 2
    },
    // tslint:disable-next-line:object-literal-shorthand
    success: function (data) {
        //return {code: 0, msg: 'ok', data};
        return { data };
    },
    // tslint:disable-next-line:object-literal-shorthand
    err: function (code, msg) {
        return { errCode: code, errMsg: msg };
    },
    finish: function (data) {
        return { errCode: 0, errMsg: data };
    },
    alarm: function (code, data) {
        return { errCode: code, errMsg: data };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXBseS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7O0FBRWIsa0JBQWU7SUFDWCxJQUFJLEVBQUU7UUFDRixNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ1YsT0FBTyxFQUFFLENBQUM7UUFDVixNQUFNLEVBQUUsQ0FBQztRQUNULEtBQUssRUFBQyxDQUFDO0tBQ1Y7SUFFRCxvREFBb0Q7SUFDcEQsT0FBTyxFQUFFLFVBQVUsSUFBUztRQUN4QixvQ0FBb0M7UUFDcEMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELG9EQUFvRDtJQUNwRCxHQUFHLEVBQUUsVUFBVSxJQUFTLEVBQUUsR0FBVztRQUNqQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQyxHQUFHLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBQ0QsTUFBTSxFQUFFLFVBQVUsSUFBUTtRQUN0QixNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsS0FBSyxFQUFFLFVBQVUsSUFBUSxFQUFDLElBQVE7UUFDOUIsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDM0MsQ0FBQztDQUVKLENBQUMifQ==