'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
//const signUrl = require('sign-url');
//import Reply from '../const/reply';
const jwtUtil_1 = require("../util/jwtUtil");
const urlUtil_1 = require("../util/urlUtil");
module.exports = () => {
    return async function (ctx, next) {
        // http://my.superproject.io?confirm=username@somewhere.com&expiry=1392305771282&signature=SrO0X9p27LHFIe7xITBOpetZSpM%3D
        const request = ctx.request;
        console.log('path=>', request.path);
        console.log('matcvhPath=>', urlUtil_1.default.match(request.path));
        //const url = `${request.protocol}://${request.host}${request.url}`;
        const query = ctx.query;
        console.log('query=>', query);
        ////const timestamp = query.expiry || 0;
        // if(timestamp > (Date.now() + 30000) || timestamp < (Date.now() - 30000)){
        //   ctx.body = Reply.err('请求已过期');
        //   return
        // }
        ////const confirm = query.confirm;
        // if (!signUrl.check(url, confirm)) {
        //   ctx.body = Reply.err('签名验证失败');
        //   return
        // }
        delete query.confirm;
        delete query.expiry;
        delete query.signature;
        const authorization = ctx.get('Authorization');
        console.log('authorization=>', authorization);
        if (authorization) {
            const token = authorization.replace('Bearer ', '');
            const result = await jwtUtil_1.default.verify(token);
            console.log('info=>', result);
            if (result.code == 0) {
                query.uid = result.uid;
                query.shortId = result.shortId;
            }
        }
        console.log(query);
        await next();
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1cmxfaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUE7O0FBQ1osc0NBQXNDO0FBQ3RDLHFDQUFxQztBQUNyQyw2Q0FBc0M7QUFDdEMsNkNBQXFDO0FBRXJDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFO0lBQ3BCLE1BQU0sQ0FBQyxLQUFLLFdBQVcsR0FBRyxFQUFFLElBQUk7UUFDOUIseUhBQXlIO1FBQ3pILE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFFNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFDLGlCQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXhELG9FQUFvRTtRQUNwRSxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdCLHdDQUF3QztRQUN4Qyw0RUFBNEU7UUFDNUUsbUNBQW1DO1FBQ25DLFdBQVc7UUFDWCxJQUFJO1FBQ0osa0NBQWtDO1FBQ2xDLHNDQUFzQztRQUN0QyxvQ0FBb0M7UUFDcEMsV0FBVztRQUNYLElBQUk7UUFDSixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDckIsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3BCLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUV2QixNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0MsRUFBRSxDQUFBLENBQUMsYUFBYSxDQUFDLENBQUEsQ0FBQztZQUNoQixNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBQyxFQUFFLENBQUMsQ0FBQztZQUNsRCxNQUFNLE1BQU0sR0FBTyxNQUFNLGlCQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdCLEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUUsQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDakIsS0FBSyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUN2QixLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDakMsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLE1BQU0sSUFBSSxFQUFFLENBQUE7SUFDZCxDQUFDLENBQUE7QUFHSCxDQUFDLENBQUEifQ==