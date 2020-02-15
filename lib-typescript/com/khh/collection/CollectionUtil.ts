export class CollectionUtil {

    public static removeArrayItem<T>(list: T[], item: T, del?: (v: T) => void) {
        list.forEach((it, idx) => {
            if (it === item) {
                list.splice(idx, 1);
                if (del) {del(it); }
            }
        });
    }
    public static sumArray(list: number[]): number {
        return list.reduce((a, b) => a + b, 0);
    }
    public static ignoreMapItem<K, V>(cointain: Map<K, V>, keys: Set<K> | K[], del?: (v: V) => void): Map<K, V> {
        const atKeys = new Set(keys);
        const r = new Map<any, any>();
        cointain.forEach((v, k, m) => {
            if (!atKeys.has(k)) {
                r.set(k, v);
                if (del) {del(v); }
            }
        });
        return r;
    }
    public static ignoreItem<V>(cointain: Set<V> | V[], ignore: Set<V> | V[], add?: (v: V) => void): Set<V> {
        const rvalue = new Set();
        const uIgnore = new Set(ignore);
        new Set(cointain).forEach((v) => {
            if (!uIgnore.has(v)) {
                rvalue.add(v);
                if (add) {add(v); }
            }
        });
        return rvalue;
    }
    public static hasMapItem<K, V>(cointain: Map<K, V>, keys: Set<K> | K[], del?: (v: V) => void): Map<K, V> {
        const atKeys = new Set(keys);
        const r = new Map<any, any>();
        cointain.forEach((v, k, m) => {
            if (atKeys.has(k)) {
                r.set(k, v);
                if (del) {del(v); }
            }
        });
        return r;
    }
}
