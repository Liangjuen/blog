/**
 * 状态持久化插件
 * 
 */

import type { PiniaPluginContext } from 'pinia'
import 'pinia'

declare module 'pinia' {
    export interface DefineStoreOptionsBase<S, Store> {
        lasting?: LastingOptions
    }
}

type Store = PiniaPluginContext['store']

const defaultStorage: Storage = sessionStorage
const __piniaKey__: string = 'pinia'
const getKey = (str: string) => `${__piniaKey__} - ${str}`

export interface getStorageOptions {
    storage: Storage,
    key: string
}
type StateKey = string
export interface LastingStrategy {
    storage?: Storage,
    key?: string,
    exclude?: StateKey[]
}

export interface LastingOptions {
    enabled: boolean,
    strategies?: LastingStrategy
}

export const updateStore = (strategy: LastingStrategy, store: Store) => {
    const storage = strategy.storage || sessionStorage
    const storeKey = strategy.key || getKey(store.$id)
    if (strategy.exclude) {
        let storageObj: { [propName: string]: any } = {}
        for (let key in store.$state) {
            if (!strategy.exclude.includes(key)) storageObj[key] = store.$state[key]
        }
        storage.setItem(storeKey, JSON.stringify(storageObj))
    }
}

export const getStore = (options: getStorageOptions) => {
    const { storage, key } = options
    return (JSON.parse(storage.getItem(key) as string) || {})
}

export default ({ options, store }: PiniaPluginContext) => {
    if (options.lasting?.enabled) {
        const strategies = options.lasting?.strategies ? options.lasting?.strategies : {}
        const strategy: LastingStrategy = {
            storage: strategies.storage || defaultStorage,
            key: strategies.key || getKey(store.$id),
            exclude: strategies.exclude || []
        }
        const data = getStore({ storage: strategy.storage as Storage, key: strategy.key as string })
        store.$subscribe(() => {
            updateStore(strategy, store)
        })
        console.log({ ...data });

        return { ...data }
    }
}