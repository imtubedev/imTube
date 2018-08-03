const ratelimit = require('koa-ratelimit');
const redis = require('redis');
const config = require('../../config/config.params');
// email 限定
exports.emailBasedRatelimit = ratelimit({
    db: redis.createClient(),
    duration: config.baseLimit.email.duration,
    max: config.baseLimit.email.max,
    // tslint:disable-next-line:object-literal-shorthand
    id: function (context) {
        return context.body.email;
    }
});
// ip 限定
exports.ipBasedRatelimit = ratelimit({
    db: redis.createClient(),
    duration: config.baseLimit.ip.duration,
    max: config.baseLimit.ip.max,
    // tslint:disable-next-line:object-literal-shorthand
    id: function (context) {
        return context.ip;
    }
    // tslint:disable-next-line:eofline
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0ZUxpbWl0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmF0ZUxpbWl0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUMzQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFFckQsV0FBVztBQUNYLE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUM7SUFDcEMsRUFBRSxFQUFFLEtBQUssQ0FBQyxZQUFZLEVBQUU7SUFDeEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVE7SUFDekMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUc7SUFDL0Isb0RBQW9EO0lBQ3BELEVBQUUsRUFBRSxVQUFVLE9BQU87UUFDakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzlCLENBQUM7Q0FDSixDQUFDLENBQUM7QUFFSCxRQUFRO0FBQ1IsT0FBTyxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztJQUNqQyxFQUFFLEVBQUUsS0FBSyxDQUFDLFlBQVksRUFBRTtJQUN4QixRQUFRLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUTtJQUN0QyxHQUFHLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRztJQUM1QixvREFBb0Q7SUFDcEQsRUFBRSxFQUFFLFVBQVUsT0FBTztRQUNqQixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0QsbUNBQW1DO0NBQ3RDLENBQUMsQ0FBQyJ9