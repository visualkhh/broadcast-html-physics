export class RegexUtil {
    public static is(regexp: RegExp, msg: string) {
        return regexp.test(msg);
    }
}
