
'use strict';

// module.exports = () => {
//     return async function permission(code,token) {
//         const model = this.ctx.model;
//         const infos = await model.Worker.findByToken(token);
//         console.log(infos);
//         const auths = await model.Roler.findAuth(infos);
//         console.log(auths)
//         return auths.indexOf(code.substring(0,4))
//     };
// };
// export default class Permission extends Controller{
//      async isAllow(code,token) {
//         const model = this.ctx.model;
//         const infos = await model.Worker.findByToken(token);
//         console.log(infos);
//         const auths = await model.Roler.findAuth(infos);
//         console.log(auths)
//         return auths.indexOf(code.substring(0,4))
//     };
// };

async function permission(model,code,token){
       const infos = await model.Worker.findByToken(token);
       console.log(infos);
       const auths = await model.Roler.findAuth(infos);
       console.log(auths)
       return auths.indexOf(code.substring(0,4))
};

module.exports = permission;

