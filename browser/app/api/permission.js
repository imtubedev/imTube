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
async function permission(model, code, token) {
    const infos = await model.Worker.findByToken(token);
    console.log(infos);
    const auths = await model.Roler.findAuth(infos);
    console.log(auths);
    return auths.indexOf(code.substring(0, 4));
}
;
module.exports = permission;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBlcm1pc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWSxDQUFDO0FBRWIsMkJBQTJCO0FBQzNCLHFEQUFxRDtBQUNyRCx3Q0FBd0M7QUFDeEMsK0RBQStEO0FBQy9ELDhCQUE4QjtBQUM5QiwyREFBMkQ7QUFDM0QsNkJBQTZCO0FBQzdCLG9EQUFvRDtBQUNwRCxTQUFTO0FBQ1QsS0FBSztBQUNMLHNEQUFzRDtBQUN0RCxtQ0FBbUM7QUFDbkMsd0NBQXdDO0FBQ3hDLCtEQUErRDtBQUMvRCw4QkFBOEI7QUFDOUIsMkRBQTJEO0FBQzNELDZCQUE2QjtBQUM3QixvREFBb0Q7QUFDcEQsU0FBUztBQUNULEtBQUs7QUFFTCxLQUFLLHFCQUFxQixLQUFLLEVBQUMsSUFBSSxFQUFDLEtBQUs7SUFDbkMsTUFBTSxLQUFLLEdBQUcsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLE1BQU0sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2hELENBQUM7QUFBQSxDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMifQ==