'use strict'
//const signUrl = require('sign-url');
//import Reply from '../const/reply';
import JWTUtil from '../util/jwtUtil';
import UrlUtil from '../util/urlUtil'

module.exports = () => {
  return async function (ctx, next) {
    // http://my.superproject.io?confirm=username@somewhere.com&expiry=1392305771282&signature=SrO0X9p27LHFIe7xITBOpetZSpM%3D
    const request = ctx.request;

    console.log('path=>',request.path);
    console.log('matcvhPath=>',UrlUtil.match(request.path));

    //const url = `${request.protocol}://${request.host}${request.url}`;
    const query = ctx.query;
    console.log('query=>',query);

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
    console.log('authorization=>',authorization);
    if(authorization){
      const token = authorization.replace('Bearer ','');
      const result:any = await JWTUtil.verify(token);
      console.log('info=>',result);
      if(result.code==0){
        query.uid = result.uid;
        query.shortId = result.shortId;
      }
    }
    console.log(query);
    await next()
  }


}