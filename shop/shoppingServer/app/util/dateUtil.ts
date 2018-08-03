'use strict';

export default class DateUtil{
    private static date: Date = null;

    public static getDateInstance(){
        if (this.date == null){
            this.date = new Date();
        }
        return this.date;
    }

    public static compareDate(userDate: Date){
        const date = this.getDateInstance();
        userDate = new Date(userDate);
        if ( date.getFullYear() !== userDate.getFullYear()){
            return false;
        }
        if (date.getMonth() !== userDate.getMonth()){
            return false;
        }
        if (date.getDate() > userDate.getDate()){
            return false;
        }
        return true;
    }
}
