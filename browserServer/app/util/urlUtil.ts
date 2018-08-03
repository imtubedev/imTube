'use strict';
//const  Url = require('url');
const  Query = require('querystring');

export default class UrlUtil{

    public static  _stringifySorted(query) {
        var keys = Object.keys(query).sort();
        var pairs = keys.reduce(function(collect, key) {
            return collect.concat(Query.escape(key) + '=' + Query.escape(query[key]));
        }, []);
        return pairs.join('&');
    }

    public static match(path: string){
        let result: any = null;
        result = path.match('/public/v1');
        result = path.match('/api/v1');
        console.log('result=>', result);
        console.log('index=>', result.index);
        console.log('input=>', result.input);
        return false;
    }
}
