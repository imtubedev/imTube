'use strict';
module.exports = (app) => {
    return async function (ctx, next) {
        try {
            await next();
        }
        catch (err) {
            // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
            app.emit('error', err, this);
            const status = err.status || 500;
            // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
            const error = status === 500 && app.config.env === 'prod' ?
                'Internal Server Error' :
                err.message;
            // 从 error 对象上读出各个属性，设置到响应中
            console.log('########################err', err);
            ctx.body = {
                code: 100,
                error: error
            };
            if (status === 422) {
                ctx.body.detail = err.errors;
            }
            ctx.status = 200;
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVycm9yX2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFBO0FBRVosTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ3ZCLE1BQU0sQ0FBQyxLQUFLLFdBQVcsR0FBRyxFQUFFLElBQUk7UUFDOUIsSUFBSSxDQUFDO1lBQ0gsTUFBTSxJQUFJLEVBQUUsQ0FBQTtRQUNkLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2IseUNBQXlDO1lBQ3pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUM1QixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQTtZQUNoQyx3Q0FBd0M7WUFDeEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxNQUFNLENBQUMsQ0FBQztnQkFDekQsdUJBQXVCLENBQUMsQ0FBQztnQkFDekIsR0FBRyxDQUFDLE9BQU8sQ0FBQTtZQUNiLDJCQUEyQjtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9DLEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsS0FBSyxFQUFFLEtBQUs7YUFDYixDQUFBO1lBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7WUFDOUIsQ0FBQztZQUNELEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFBO1FBQ2xCLENBQUM7SUFDSCxDQUFDLENBQUE7QUFDSCxDQUFDLENBQUEifQ==