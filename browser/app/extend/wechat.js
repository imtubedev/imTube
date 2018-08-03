'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const qs = require('querystring');
exports.default = {
    async getToken(code, ctx, config) {
        console.log('config', config);
        let params = {
            appid: config.appId,
            secret: config.appSecret,
            code: code,
            grant_type: 'authorization_code'
        };
        let options = {
            method: 'Get',
            dataType: 'json'
        };
        let url = config.tokenReqUrl + qs.stringify(params);
        const response = await ctx.curl(url, options);
        const res = response.res;
        if (res.statusCode == 200) {
            const data = res.data;
            if (!data.errcode) {
                let body = await this.getUserInfo(data.access_token, data.openid, ctx, config);
                return body;
            }
            else {
                let body = { code: data.errcode, msg: data.errmsg };
                return body;
            }
        }
    },
    async getUserInfo(accessToken, openId, ctx, config) {
        let params = {
            access_token: accessToken,
            openid: openId,
            lang: 'zh_CN'
        };
        let options = { method: 'GET', dataType: 'json' };
        let url = config.userReqUrl + qs.stringify(params);
        const response = await ctx.curl(url, options);
        const res = response.res;
        if (res.statusCode == 200) {
            const data = res.data;
            if (data.error == undefined) {
                let body = { code: 0, msg: 'ok', data: data };
                return body;
            }
            else {
                let body = { code: data.errcode, msg: data.errmsg };
                return body;
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VjaGF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2VjaGF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7QUFFYixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFbEMsa0JBQWM7SUFDVixLQUFLLENBQUMsUUFBUSxDQUFDLElBQVcsRUFBQyxHQUFXLEVBQUMsTUFBVTtRQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixJQUFJLE1BQU0sR0FBRztZQUNULEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztZQUNuQixNQUFNLEVBQUUsTUFBTSxDQUFDLFNBQVM7WUFDeEIsSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsb0JBQW9CO1NBQ25DLENBQUM7UUFFRixJQUFJLE9BQU8sR0FBRztZQUNWLE1BQU0sRUFBRSxLQUFLO1lBQ2IsUUFBUSxFQUFFLE1BQU07U0FDbkIsQ0FBQztRQUNGLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRCxNQUFNLFFBQVEsR0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDekIsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO1lBQ3RCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDdEIsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQztnQkFDZCxJQUFJLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxNQUFNLENBQUMsQ0FBQztnQkFDN0UsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixDQUFDO1lBQUEsSUFBSSxDQUFBLENBQUM7Z0JBQ0YsSUFBSSxJQUFJLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFBO2dCQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBa0IsRUFBQyxNQUFhLEVBQUMsR0FBVyxFQUFDLE1BQVU7UUFDckUsSUFBSSxNQUFNLEdBQUc7WUFDVCxZQUFZLEVBQUUsV0FBVztZQUN6QixNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBRSxPQUFPO1NBQ2hCLENBQUM7UUFDRixJQUFJLE9BQU8sR0FBRyxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxDQUFDO1FBQzlDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRCxNQUFNLFFBQVEsR0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDekIsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO1lBQ3RCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDdEIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsQ0FBQSxDQUFDO2dCQUN4QixJQUFJLElBQUksR0FBRyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLENBQUM7Z0JBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUFBLElBQUksQ0FBQSxDQUFDO2dCQUNGLElBQUksSUFBSSxHQUFHLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQTtnQkFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7Q0FFSixDQUFBIn0=