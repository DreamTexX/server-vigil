import { writable, type Writable } from "svelte/store";

export const DICTIONARY_STORE_CONTEXT_KEY = "DICTIONARY";

type Nested =
    | {
          [key: string]: Nested | string;
      }
    | string;
export type DictionaryStoreValue = Nested;
export type DictionaryStore = Writable<DictionaryStoreValue>;

export const dictionaryStore: DictionaryStore = writable<DictionaryStoreValue>({});
