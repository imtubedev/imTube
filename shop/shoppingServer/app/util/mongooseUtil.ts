'use strict';

export default class MongooseUtil{

    public static compareResult(result: any){
        if (result.nModified >= 1){
            return true;
        }
        return false;
    }
}
