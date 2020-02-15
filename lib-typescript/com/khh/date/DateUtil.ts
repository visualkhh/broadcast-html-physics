import {isNumeric} from 'tslint';
import {StringUtil} from '../string/StringUtil';
import {ValidUtil} from '../valid/ValidUtil';

export class DateUtil {
    static getFullMilliSecond() {
        return new Date().getTime();
    }

    static getFullSecond() {
        return new Date().getTime() / 1000;
    }

    static getMilliSecond() {
        return new Date().getMilliseconds();
    }

//finger
//yyyy yy ,    MM ,dd  ,e , HH hh , mm, ss ,a/p
//yyyy.MM.dd HH:mm:ss
    static getDate(format_s, date_o) {
        if (!date_o) {
            date_o = new Date();
        }
        if (!isNaN(date_o)) {
            date_o = new Date(date_o);
        }

        //var weekName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        //var timeType = ['오전', '오후'];
        const weekName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const timeType = ['AM', 'PM'];

        const h = date_o.getHours() % 12;
        return format_s.replace(/(yyyy|SSS|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, ($1) => {
            switch ($1) {
                case 'yyyy':
                    return date_o.getFullYear();
                case 'yy':
                    return StringUtil.lpad('0', 2, (date_o.getFullYear() % 1000).toString());
                case 'MM':
                    return StringUtil.lpad('0', 2, (date_o.getMonth() + 1).toString());
                case 'dd':
                    return StringUtil.lpad('0', 2, date_o.getDate().toString());
                case 'E':
                    return weekName[date_o.getDay()];
                case 'HH':
                    return StringUtil.lpad('0', 2, date_o.getHours().toString());
                case 'hh':
                    return StringUtil.lpad('0', 2, ((h) ? h : 12).toString());
                case 'mm':
                    return StringUtil.lpad('0', 2, date_o.getMinutes().toString());
                case 'ss':
                    return StringUtil.lpad('0', 2, date_o.getSeconds().toString());
                case 'SSS':
                    return StringUtil.lpad('0', 3, date_o.getMilliseconds().toString());
                case 'a/p':
                    return date_o.getHours() < 12 ? timeType[0] : timeType[1];
                default:
                    return $1;
            }
        });
    }

    /**
     * 해당년월의 마지막 일자를 계산
     * @param y
     * @param m
     * @return
     * @author xuny
     */
    static getLastDay(y, m) {
        y = parseInt(y, 10);
        m = parseInt(m, 10);

        const end = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        if (this.isLeapYear(y)) {
            end[1] = 29;
        }
        return end[m - 1];
    }

    /**
     * 윤년인지 아닌년인지
     * @param year
     * @return
     * @author xuny
     */
    static isLeapYear(year) {
        if ((year % 4) === 0) {
            if ((year % 100) !== 0) {
                return true;
            }
            if ((year % 400) === 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * 유효한 날짜인지
     * @param year
     * @param month
     * @param day
     * @return
     * @author xuny
     */
    static isValidDate(year, month, day) {
        year  = parseInt(year  , 10);
        month = parseInt(month , 10);
        day   = parseInt(day   , 10);

        if (year < 0 || year > 9999) {
            return false;
        }
        if (month < 1 || month > 12) {
            return false;
        }

        const endDay = this.getEndDay(year, month);
        if (day < 1 || day > endDay) return false;

        return true;
    }
    /**
     * 유효한 년월인지
     * @param year
     * @param month
     * @return
     * @author xuny
     */
    static isYYYYMM(year, month){

        if (ValidUtil.isNull(year) || ValidUtil.isNull(month)) {
            return false;
        }
        if (year.length !== 4 || month.length !== 2) {
            return false;
        }
        if (!isNumeric(year) || !isNumeric(month)) {
            return false;
        }

        const yy = parseInt(year, 10);
        const mm = parseInt(month, 10);
        if (yy < 1900 ) {
            return false;
        }
        if (mm < 1 || mm > 12) {
            return false;
        }

        return true;
    }

    /**
     * 유효한 시분인지
     * @param hour, minute
     */
    static isHHMI(hour, minute){
        if (ValidUtil.isNull(hour) || ValidUtil.isNull(minute)) {
            return false;
        }
        if (hour.length !== 2 || minute.length !== 2) {
            return false;
        }
        if (!isNumeric(hour) || !isNumeric(minute)) {
            return false;
        }

        const hh   = parseInt(hour, 10);
        const mi = parseInt(minute, 10);
        if (hh < 0  || hh > 24 ) {
            return false;
        }
        if (mi < 0 || mi > 60) {
            return false;
        }

        return true;
    }
    /**
     * 년월일을 입력 받은 년도 ,월, 일자 만큼 증가/감소 시킨다.
     * @param   dateStr     원래날짜 String ("YYYYMMDD")
     * @param   year        원래날짜에 더할 년
     * @param   month       원래날짜에 더할 월
     * @param   day         원래날짜에 더할 일
     * @return              연산결과의 날짜 String ("YYYYMMDD")
     * @author  xuny
     */
    static shiftDate(dateStr, year, month, day) {
        const date = this.toDateObject(dateStr);
        date.setFullYear(date.getFullYear() + year);
        date.setMonth(date.getMonth() + month);
        date.setDate(date.getDate() + day);

        return this.toDateString(date);
    }
    /**
     * 날짜String("YYYYMMDD") ==> Date(object)
     * @param dateStr
     * @return
     */
    static toDateObject(dateStr) {
        return new Date(dateStr.substr(0, 4),
            dateStr.substr(4, 2) - 1,
            dateStr.substr(6, 2));
    }

    /**
     * Date(object) ==> 날짜String("YYYYMMDD")
     * @param date
     * @return
     */
    static toDateString(date) {
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        y = String(y);
        m = (String(m).length === 1 ? '0' : '') + m;
        d = (String(d).length === 1 ? '0' : '') + d;

        return y + m + d;
    }
    /**
     * 두개의 일자를 입력받아 두 날짜의 차이일수를 리턴한다.
     * @param   fromDateStr 시작일자("YYYYMMDD")
     * @param   toDateStr   종료일자("YYYYMMDD")
     * @return
     * @author  xuny
     */
    static getBetweenDay(fromDateStr, toDateStr) {
        const fDate = this.toDateObject(fromDateStr);
        const tDate = this.toDateObject(toDateStr);
        const day = 1000 * 3600 * 24;

        return parseInt((tDate - fDate) / day);
    }
}
