import { redis } from "../config/redis"

export const cacheSet = async (key, value, expirationTime) => {
    try {
        const stringValue = JSON.stringify(value);
        if(expirationTime) {
            await redis.set(key, stringValue, { ex : expirationTime })
        }else{
            await redis.set(key, stringValue)
        }
    } catch (error) {
        console.log("Redis cache set Error", error)
    }
}

export const cacheGet = async (key) => {
    try {
        const value = await redis.get(key)
        return value ? JSON.parse(value) : null
    } catch (error) {
        console.log("Redis cache get Error", error)
        return null
    }
}

export const cacheDel = async (key) => {
    try {
        await redis.del(key)
    } catch (error) {
        console.log("Redis cache deletion Error", error)
    }
}

export const cacheExist = async (key) => {
    try {
        const exists = await redis.exists(key)
        return exists === 1
    } catch (error) {
        console.log("Checking cache existing Error", error)
        return false
    }
}