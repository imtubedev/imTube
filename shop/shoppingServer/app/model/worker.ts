import * as mongoose from 'mongoose';
import * as mongoose_delete from 'mongoose-delete';
import * as findOrCreate from 'mongoose-findorcreate';
import * as QueryPlugin from 'mongoose-query';
//import * as autoIncrement from '../extend/autoIncrement';

const Schema = mongoose.Schema;
//const ObjectId = mongoose.Schema.Types.ObjectId;
///员工表
export const workerSchema = new Schema({
    worker_id: { type: String },//员工id
    worker_name: { type: String },//员工名称
    token: { type: String },//token
    worker_tel: { type: String },//员工手机号
    worker_roler: [{ type: String }],//员工角色
    worker_job: { type: String },//员工职务
    worker_card: { type: String },//员工身份证
    worker_address: { type: String }//员工住址
}, { timestamps: true });

workerSchema.plugin(QueryPlugin);
workerSchema.plugin(mongoose_delete);
workerSchema.plugin(findOrCreate);

//const querystr = 'authority_name authority_id';

/**
 * 查询员工
 */
workerSchema.statics.findWorkerList = function (data: any) {
    if (data) {
        const per_page = parseInt(data.per_page);
        const page = parseInt(data.page);
        const num = (page-1) * per_page;
        return this.find()
            .limit(per_page)
            .skip(num)
            .exec();
    } else {
        return this.find()
            .select()
            .exec();
    }
};

/**
 * 查询员工详细信息
 */
workerSchema.statics.findWorkerInfo = function (uid: any) {
    return this.find({ worker_id: uid })
        .select()
        .exec();
};

/**
 * 编辑员工信息
 */
workerSchema.statics.updateWorker = function (id: any, data: any) {
    return this.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id) },
        { $set: data },
        { new: true }
    )
        .select()
        .exec();
};


/**
 * 删除员工
 */
workerSchema.statics.delWorker = function (id: any) {
    return this.remove({ _id: mongoose.Types.ObjectId(id) }).exec();
};

/**
 * findAndUpdateToken
 */
workerSchema.statics.findAndUpdateToken = function (id: string, token: string) {
    return this.findOneAndUpdate(
        { worker_id: id },
        {
            $set: {
                'token': token,
            }
        },
        { new: true },
    ).select().exec();
}

/**
 * findByToken
 */
workerSchema.statics.findByToken = function (token: string) {
    return this.findOne({ token: token })
    .select('worker_roler')
    .exec();
}




export default (app) => {
    return app.mongoose.model('Worker', workerSchema);
};
