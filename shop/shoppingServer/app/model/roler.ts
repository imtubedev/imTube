import * as mongoose from 'mongoose';
import * as mongoose_delete from 'mongoose-delete';
import * as findOrCreate from 'mongoose-findorcreate';
import * as QueryPlugin from 'mongoose-query';
//import * as autoIncrement from '../extend/autoIncrement';

const Schema = mongoose.Schema;
//const ObjectId = mongoose.Schema.Types.ObjectId;
///角色表
export const roleSchema = new Schema({
    roler_name:{type: String},//角色名称
    roler_id:{type: String},//角色id
    roler_auth:[{type: String}]//角色权限
}, { timestamps: true });

roleSchema.plugin(QueryPlugin);
roleSchema.plugin(mongoose_delete);
roleSchema.plugin(findOrCreate);

//const querystr = 'authority_name authority_id';

/**
 * 查询角色
 */
roleSchema.statics.findRolerList = function (data:any) {
    if(data){
        const per_page = parseInt(data.per_page);
        const page = parseInt(data.page);
        const num = (page-1)*per_page;
        return this.find()
        .limit(per_page)
        .skip(num)
        .exec();
    }else{
        return this.find()
        .select()
        .exec();
    }
};

/**
 * 编辑角色
 */
roleSchema.statics.updateRoler = function (id:any,data:any) {
        return this.findOneAndUpdate(
            {_id:mongoose.Types.ObjectId(id)},
            {$set:data},
            {new:true}
        )
        .select()
        .exec();
};

/**
 * 删除角色
 */
roleSchema.statics.delRoler = function (id:any) {
    return this.remove({ _id: mongoose.Types.ObjectId(id) }).exec();
};


/**
 * 查询权限
 */
roleSchema.statics.findAuth = function (ids:any) {
    return this.findOne({ roler_id:{$in:ids} })
    .select('roler_auth')
    .exec();
};




export default (app) => {
    return app.mongoose.model('Roler', roleSchema);
};
