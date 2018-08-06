module.exports = () => {
    return async function saveSession(ctx, next) {
        await next();
        // 如果 Session 是空的，则不保存
        // tslint:disable-next-line:curly
        if (!ctx.session.populated)
            return;
        ctx.session.save();
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZVNlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYXZlU2Vzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRTtJQUNsQixNQUFNLENBQUMsS0FBSyxzQkFBc0IsR0FBRyxFQUFFLElBQUk7UUFDdkMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNiLHNCQUFzQjtRQUN0QixpQ0FBaUM7UUFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUNuQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyJ9