import {ValidUtil} from '../valid/ValidUtil';

export class StringUtil {

    /**
     * inputStr 의 내용중    검색대상 StringArray(matchingSrtingArr) 가 매칭되는것이 있으면 매칭된 String의 Array  리턴
     * @param {String} inputStr,  {StringArray} matchingSrtingArr
     * @returns {Array}.
     */

    public static isMatching(input_s, matchingSrting_arr_s): string[] {
        const result  = new Array<string>();
        let arrindex = 0 ;
        if (ValidUtil.isArray(matchingSrting_arr_s)) {
            for (let i = 0; i < matchingSrting_arr_s.length; i++) {
                const index = input_s.indexOf(matchingSrting_arr_s[i]);
                if (index >= 0) {
                    result[arrindex] = matchingSrting_arr_s[i];
                    arrindex++;
                }
            }
        }else if (ValidUtil.isString(matchingSrting_arr_s)) {
            const index = input_s.indexOf(matchingSrting_arr_s);
            if (index >= 0) {
                result[arrindex] = matchingSrting_arr_s;
                arrindex++;
            }
        }
        //result.push();
        //result.pop();

        return result;
    }

    /*
    var input = "'30' -> decimal: %20d / bin = %b / oct = %o / hex = %x / HEX = %X";
    var output = format(input, 30, 30, 30, 30, 30);
    var msg = "NUMBERS TEST (1/2)\n";
       msg += "---------------------------\n"
       msg += "Input...... " + input + "\n";
       msg += "Output.... " + output
    alert(msg);
     */
//finger
//     public static format1= (function() {
//         function get_type(variable) {
//             return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
//         }
//         function str_repeat(input, multiplier) {
//             for (var output = []; multiplier > 0; output[--multiplier] = input) {/* do nothing */}
//             return output.join('');
//         }
//
//         var str_format () {
//             if (!str_format.cache.hasOwnProperty(arguments[0])) {
//                 str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
//             }
//             return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
//         };
//
//         str_format.format (parse_tree, argv) {
//             var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
//             for (i = 0; i < tree_length; i++) {
//                 node_type = get_type(parse_tree[i]);
//                 if (node_type === 'string') {
//                     output.push(parse_tree[i]);
//                 }
//                 else if (node_type === 'array') {
//                     match = parse_tree[i]; // convenience purposes only
//                     if (match[2]) { // keyword argument
//                         arg = argv[cursor];
//                         for (k = 0; k < match[2].length; k++) {
//                             if (!arg.hasOwnProperty(match[2][k])) {
//                                 throw(sprintf('[sprintf] property "%s" does not exist', match[2][k]));
//                             }
//                             arg = arg[match[2][k]];
//                         }
//                     }
//                     else if (match[1]) { // positional argument (explicit)
//                         arg = argv[match[1]];
//                     }
//                     else { // positional argument (implicit)
//                         arg = argv[cursor++];
//                     }
//
//                     if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
//                         throw(sprintf('[sprintf] expecting number but found %s', get_type(arg)));
//                     }
//                     switch (match[8]) {
//                         case 'b': arg = arg.toString(2); break;
//                         case 'c': arg = String.fromCharCode(arg); break;
//                         case 'd': arg = parseInt(arg, 10); break;
//                         case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
//                         case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
//                         case 'o': arg = arg.toString(8); break;
//                         case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
//                         case 'u': arg = Math.abs(arg); break;
//                         case 'x': arg = arg.toString(16); break;
//                         case 'X': arg = arg.toString(16).toUpperCase(); break;
//                     }
//                     arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
//                     pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
//                     pad_length = match[6] - String(arg).length;
//                     pad = match[6] ? str_repeat(pad_character, pad_length) : '';
//                     output.push(match[5] ? arg + pad : pad + arg);
//                 }
//             }
//             return output.join('');
//         };
//
//         str_format.cache = {};
//
//         str_format.parse (fmt) {
//             var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
//             while (_fmt) {
//                 if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
//                     parse_tree.push(match[0]);
//                 }
//                 else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
//                     parse_tree.push('%');
//                 }
//                 else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
//                     if (match[2]) {
//                         arg_names |= 1;
//                         var field_list = [], replacement_field = match[2], field_match = [];
//                         if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
//                             field_list.push(field_match[1]);
//                             while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
//                                 if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
//                                     field_list.push(field_match[1]);
//                                 }
//                                 else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
//                                     field_list.push(field_match[1]);
//                                 }
//                                 else {
//                                     throw('[sprintf] huh?');
//                                 }
//                             }
//                         }
//                         else {
//                             throw('[sprintf] huh?');
//                         }
//                         match[2] = field_list;
//                     }
//                     else {
//                         arg_names |= 2;
//                     }
//                     if (arg_names === 3) {
//                         throw('[sprintf] mixing positional and named placeholders is not (yet) supported');
//                     }
//                     parse_tree.push(match);
//                 }
//                 else {
//                     throw('[sprintf] huh?');
//                 }
//                 _fmt = _fmt.substring(match[0].length);
//             }
//             return parse_tree;
//         };
//
//         return str_format;
//     })();
//
//
//
//     public static format2()
//     {
//         if (!arguments || arguments.length < 1 || !RegExp)
//         {
//             return;
//         }
//         var str = arguments[0];
//         var re = /([^%]*)%('.|0|\x20)?(-)?(\d+)?(\.\d+)?(%|b|c|d|u|f|o|s|x|X)(.*)/;
//         var a = b = [], numSubstitutions = 0, numMatches = 0;
//         while (a = re.exec(str))
//         {
//             var leftpart = a[1], pPad = a[2], pJustify = a[3], pMinLength = a[4];
//             var pPrecision = a[5], pType = a[6], rightPart = a[7];
//
//             //alert(a + '\n' + [a[0], leftpart, pPad, pJustify, pMinLength, pPrecision);
//
//             numMatches++;
//             if (pType == '%')
//             {
//                 subst = '%';
//             }else
//             {
//                 numSubstitutions++;
//                 if (numSubstitutions >= arguments.length)
//                 {
//                     alert('Error! Not enough function arguments (' + (arguments.length - 1) + ', excluding the string)\nfor the number of substitution parameters in string (' + numSubstitutions + ' so far).');
//                 }
//                 var param = arguments[numSubstitutions];
//                 var pad = '';
//                 if (pPad && pPad.substr(0,1) == "'") pad = leftpart.substr(1,1);
//                 else if (pPad) pad = pPad;
//                 var justifyRight = true;
//                 if (pJustify && pJustify === "-") justifyRight = false;
//                 var minLength = -1;
//                 if (pMinLength) minLength = parseInt(pMinLength);
//                 var precision = -1;
//                 if (pPrecision && pType == 'f') precision = parseInt(pPrecision.substring(1));
//                 var subst = param;
//                 if (pType == 'b') subst = parseInt(param).toString(2);
//                 else if (pType == 'c') subst = String.fromCharCode(parseInt(param));
//                 else if (pType == 'd') subst = parseInt(param) ? parseInt(param) : 0;
//                 else if (pType == 'u') subst = Math.abs(param);
//                 else if (pType == 'f') subst = (precision > -1) ? Math.round(parseFloat(param) * Math.pow(10, precision)) / Math.pow(10, precision): parseFloat(param);
//                 else if (pType == 'o') subst = parseInt(param).toString(8);
//                 else if (pType == 's') subst = param;
//                 else if (pType == 'x') subst = ('' + parseInt(param).toString(16)).toLowerCase();
//                 else if (pType == 'X') subst = ('' + parseInt(param).toString(16)).toUpperCase();
//             }
//             str = leftpart + subst + rightPart;
//         }
//         return str;
//     };

    public static rsubString(data_s, blen_n) {
        return data_s.substring(data_s.length - blen_n, data_s.length);
    }
    public static lsubString(data_s, alen_n) {
        return data_s.substring(0, alen_n);
    }

    public static lpad(fill_s, len_n, full_s) {
        while (len_n > full_s.length) {
            full_s = fill_s + full_s;
        }
        return this.rsubString(full_s, len_n);
    }
    public static rpad(fill_s, len_n, full_s) {
        while (len_n > full_s.length) {
            full_s += fill_s;
        }
        return this.lsubString(full_s, len_n);
    }

    public static lappend(count_n, input_s) {
        let s = '';
        let i = 0;
        while (i++ < count_n) {
            s += input_s;
        }
        return s;
    }
    public static rAppend(count_n, input_s) {
        let s = '';
        let i = 0;
        while (i++ < count_n) {
            s = input_s + s;
        }
        return s;
    }
    public static trim(input_s) {
        //return input_s.replace(/(^\s*)|(\s*$)/g, "");
        return input_s.replace(/(^\s*)|(\s*$)/gi, '');
    }
    public static ltrim(input_s) {
        return input_s.replace(/(^\s*)/, '');
    }
    public static rtrim(input_s) {
        return input_s.replace(/(\s*$)/, '');
    }
    public static nvl(input_s, replace_s) {
        if (input_s == null) {
            return replace_s != null ? replace_s : '';
        }else {
            return input_s;
        }
    }
    public static deleteSpace(input_s) {
        return input_s.replace(/\s/g, '');
    }
    public static deleteChar(input_s, del_s) {
        return StringUtil.replaceAll(input_s, del_s, '');
    }
    public static replaceAll(msg_s, before_s, after_s) {
        const regexp = new RegExp(before_s, 'gi');
        return msg_s.replace(regexp, after_s);
    }

    public static isEmpty(input_s) {

        if ( !input_s || input_s == null || input_s.replace(/ /gi, '') === '') {
            return true;
        }
        return false;
    }

    public static isInSpecialChar(input_s) {
        /*    var deny_pattern = /[^(-Ra-zA-Z0-9-R\s-R\u3131-\u314e\u314f-\u3163\uac00-\ud7a3)]/;
            if(deny_pattern.test(input_s))
            {
                return true;
            }
            return false;
            */

        const re = /[~!@\#$%^&*\()\=+_']/gi;
        if (re.test(input_s)) {
            return true;
        }
        return false;

    }

    public static isOnlySpecialChar(input_s) {
        const deny_pattern = /[^~!@\#$%^&*\()\=+_']+/g;
        if (deny_pattern.test(input_s)) {
            return false;
        }
        return true;
    }
    public static removeComma(input_s) {
        return input_s.replace(/,/gi, '');
    }
//금액 입력시 "," 자동 입력
    public static addComma( number_s  ) {
        return this.raddGroupChar(number_s, 3, ',');
    }
    public static raddGroupChar( number_s , jumpsize_n, addchar_s ) {

        /*
         var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
          n += '';                          // 숫자를 문자열로 변환
          while (reg.test(n))
            n = n.replace(reg, '$1' + ',' + '$2');
          return n;
          */
        /*	if(!jumpsize_n) {
                jumpsize_n=3;
            }
            */

        //number_s = this.delComma( number_s );
        number_s = StringUtil.deleteChar(number_s, addchar_s);
        let src;
        let i;
        let	factor;
        let	su;

        factor = number_s.length % jumpsize_n;
        su     = (number_s.length - factor) / jumpsize_n;
        src    =  number_s.substring(0, factor);

        for (i = 0; i < su ; i++) {
            if ((factor === 0) && (i === 0)) {        // "XXX" 인경우
                src += number_s.substring(factor + (jumpsize_n * i), factor + jumpsize_n + (jumpsize_n * i));
            }else {
                src += addchar_s  ;
                src += number_s.substring(factor + (jumpsize_n * i), factor + 3 + (jumpsize_n * i));
            }
        }
        number_s = src;

        return number_s;
    }

    /*
    function isNumber(input) {
        var chars = "0123456789";
        return isCharsOnly(input,chars);
    }*/
    public static isInNumber(string_s) {
        const deny_pattern = /[0-9]/;
        if (deny_pattern.test(string_s)) {
            return true;
        }
        return false;
    }
    public static isOnlyNumber(string_s) {
        /*  var deny_pattern = /[^(0-9)]/gi;
          if(deny_pattern.test(string_s))
          {
              return false;
          }
          return true;
          */
        const deny_pattern = /[^\d]+/g;
        if (deny_pattern.test(string_s)) {
            return false;
        }
        return true;
    }
    public static getOnlyNumber(msg_s) {
        return msg_s.replace(/[^\d]+/g, '');
    }
    public static getOnlyString(msg_s) {
        return msg_s.replace(/[\d]+/g, '');
    }

    public static isInAlphabet(input_s) {
        const pattern = /[a-zA-Z]/g;
        return (pattern.test(input_s)) ? true : false ;
    }
    public static isOnlyAlphabet(input_s) {
        const pattern = /^[a-zA-Z]+$/;
        return (pattern.test(input_s)) ? true : false;
    }

    public static isInAlphabetUpper(input_s) {
        const pattern = /[A-Z]/g;
        return (pattern.test(input_s)) ? true : false;
    }
    public static isOnlyAlphabetUpper(input_s) {
        const pattern = /^[A-Z]+$/;
        return (pattern.test(input_s)) ? true : false;
    }

    public static isInAlphabetLower(input_s) {
        const pattern = /[a-z]/g;
        return (pattern.test(input_s)) ? true : false;
    }
    public static isOnlyAlphabetLower(input_s) {
        const pattern = /^[a-z]+$/;
        return (pattern.test(input_s)) ? true : false;
    }

//자바스크립트 한글 깨지는 게있어서 한글로 정규식은 못만듬  그래서 유니코드로
    public static isInHangeul(input_s) {
        //var pattern= /[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]/;
        const pattern = /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/g;
        return (pattern.test(input_s)) ? true : false;
        //var pattern= /[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]/;
        //return (pattern.test(input_s)) ? true : false;
        /*
          var tempStr = "";
          var temp = 0;
          var onechar;
          tempStr = new String(input_s);
          temp = tempStr.length;
          for(var k=0; k<temp;k++) {
              onechar = tempStr.charAt(k);
              if(escape(onechar).length > 4) {
                 return true;
              }
          }
          return false;
          */
        //if((event.keyCode < 12592) || (event.keyCode > 12687))
        //event.returnValue = false
    }
    public static isOnlyHangeul(input_s) {
        // var pattern= /[ㄱ-ㅎㅏ-ㅣ가-힝]+/g;
        // return (pattern.test(input_s)) ? true : false;
        const pattern = /^[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]*$/g;
        return (pattern.test(input_s)) ? true : false;
    }
//var chars = "abcdefghijklmnopqrstuvwxyz";
//return isCharsOnly(input_s,chars);
    public static isOnlyChars(input_s, chars) {
        for (let inx = 0; inx < input_s.length; inx++) {
            if (chars.indexOf(input_s.charAt(inx)) === -1) {
                return false;
            }
        }
        return true;
    }

    // public static encodeURI(url_s) {
    //     return encodeURI(url_s);
    // }
    // public static decodeURI(url_s) {
    //     return decodeURI(url_s);
    // }
    // public static getUnicode(input_s) {
    //     return escape(input_s);
    // }

    public static upper(inputStr_s) {
        return String(inputStr_s).toUpperCase();
    }
    public static lower(inputStr_s) {
        return  String(inputStr_s).toLowerCase();
    }
    // public static getByteLength(inputStr_s) {
    //     let byteLength = 0;
    //     let c;
    //     for (let i = 0; i < inputStr_s.length; i++) {
    //         c = escape(inputStr_s.charAt(i));
    //
    //         if (c.length === 1) {
    //             byteLength ++;
    //         } else if (c.indexOf('%u') !== -1)  {
    //             byteLength += 2;
    //         } else if (c.indexOf('%') !== -1)  {
    //             byteLength += c.length / 3;
    //         }
    //     }
    //     return byteLength;
    // }

}
