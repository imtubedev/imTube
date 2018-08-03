export default{
    common:{
        jwtutil:{
            token_outdate:'000101',///token过期
            token_invalid:'000102'//token无效
        },
        reqinfo:{
           mulreq:'000201'///重复提交
        },
        alarm:{
            info:'10000'///系统异常,异常信息提交后台
        },
        errinfo:{
            info:'000301'///系统异常信息返回
        }
    },
    goods:{
        index:'010001',
        create:'010002',
        update:'010003',
        show:'010004',
        destory:'010005'
    },
    order:{
        index:'020001',
        create:'020002',
        update:'020003',
        show:'020004',
        destory:'020005'
    },
    user:{
        index:'080001',
        create:'080002',
        update:'080003',
        show:'080004',
        destory:'080005'
    },
    goodGroup:{
        index: '030001',
        create: '030002',
        update: '030003',
        show: '030004',
        destory: '030005'
    },
    goodsDetail:{
        index: '040001',
        create: '040002',
        update: '040003',
        show: '040004',
        destory: '040005'
    }

}