import { type Readable, type Writable, readable, writable } from "svelte/store";
import { getContext, hasContext, setContext } from "svelte";

export function useContext<R, V>(key: string, storeFn: (value: V) => R, value: V): R {
    if (!hasContext(key)) {
        setContext(key, storeFn(value));
    }

    return getContext(key);
}

export function useWritableContext<V>(key: string, value: V): Writable<V> {
    return useContext(key, writable, value);
}

export function useReadableContext<V>(key: string, value: V): Readable<V> {
    return useContext(key, readable, value);
}
