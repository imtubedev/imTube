'use strict';
import {Service} from 'egg';
import reply from '../const/reply';
import errorcode from '../const/errorcode';

export class GoodGroupService extends Service {

    //查询
    async index(){
        try {
            const model = this.ctx.model;
            const grouptime = await model.Goodgroup.findGoodGroupTime();
            const groupnameNum = await model.Goods.findGroupnameNum();
            for (let i = 0; i < groupnameNum.length; i++) {
                for (let j = 0; j < grouptime.length; j++ ){
                    if (groupnameNum[i]['_id'] === grouptime[j]['groupName']){
                        let temp = groupnameNum[i];
                        temp['createtime'] = grouptime[j]['createtime'] ;
                    }
                }
            }
            if (groupnameNum){
                return reply.success(groupnameNum);
            }
            return reply.err(errorcode.goodGroup.index, this.ctx.__("t2"));
        } catch (error) {
            return reply.err(errorcode.goodGroup.index, this.ctx.__("t1"));
        }
    }

    //新增
    async create(data: any) {
        try {
            const model = this.ctx.model;
            const infoField = {
                groupName: data.groupName,
                first: data.first,
                second: data.second,
                describe: data.describe
            };
            try {
                let info = new model.Goodgroup(infoField);
                info = await info.save();
                console.log(info);
                if (info) {
                    return reply.success(info);
                }
                return reply.err(errorcode.goodGroup.create, this.ctx.__("t3"));
            } catch (err) {
                console.log("service  goodGroup err"  + err);
            }
        } catch (err) {
            return reply.err(errorcode.goodGroup.create, this.ctx.__("t3"));
        }
    }

    //编辑
    async update(goodGroupinfo: any, data: any) {
        try {
            const model = this.ctx.model;
            const id = goodGroupinfo.id;
            let info = await model.Goodgroup.updateGoodGroupInfo(id, data);
            if (info) {
                return reply.success(info);
            }
            return reply.err(errorcode.goodGroup.update, this.ctx.__("t4"));
        } catch (err) {
            return reply.err(errorcode.goodGroup.update, this.ctx.__("t4"));
        }
    }

    //删除
    async destroy(goodGroupinfo: any) {
        try {
            const model = this.ctx.model;
            const id = goodGroupinfo.id;
            let info = await model.Goodgroup.delGoodGroup(id);
            if (info.result.n === 1) {
                return reply.finish("OK");
            }
            return reply.err(errorcode.goodGroup.destory, this.ctx.__("t5"));
        } catch (err) {
            return reply.err(errorcode.goodGroup.destory, this.ctx.__("t5"));
        }
    }


}
module.exports = GoodGroupService;
