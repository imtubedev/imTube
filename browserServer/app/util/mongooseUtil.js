'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class MongooseUtil {
    static compareResult(result) {
        if (result.nModified >= 1) {
            return true;
        }
        return false;
    }
}
exports.default = MongooseUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2VVdGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9uZ29vc2VVdGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7QUFFYjtJQUVXLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBVztRQUNuQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0o7QUFSRCwrQkFRQyJ9