import axios from "axios";
import md5 from "md5";

let fullDate = new Date()

let year = fullDate.getFullYear()
let month = Math.floor((fullDate.getMonth()+1) / 10) !== 0 ? fullDate.getMonth()+1 : `0${fullDate.getMonth()+1}`
let day = Math.floor((fullDate.getDate()) / 10) !== 0 ? fullDate.getDate() : `0${fullDate.getDate()}`

let date = `${year}${month}${day}`

const instance = axios.create({
    baseURL: 'http://api.valantis.store:40000/',
    headers: {
        "X-Auth": md5(`Valantis_${date}`),
    }
})

export const Api = {
    async getIDs (offset, limit) {
        const response = await instance.post('', {
            "action": "get_ids",
            "params": {"offset": offset, "limit": limit}
        })
        return response.data.result
    },

    async getAllIDs () {
        const response = await instance.post('', {
            "action": "get_ids",
            "params": {}
        })
        return response.data.result
    },

    async getAllProductsIds() {
        const response = await instance.post('', {
            "action": "get_ids",
            "params": {}
        })
        return response.data.result
    },

    async getItems (ids) {
        const response = await instance.post('', {
            "action": "get_items",
            "params": {"ids": ids}
        })
        return response.data.result
    },

    async getFields (field, offset, limit) {
        const response = await instance.post('', {
            "action": "get_fields",
            "params": {"field": field, "offset": offset, "limit": limit}
        })
        return response.data.result
    },

    async filter (field, value) {
        const response = await instance.post('', {
            "action": "filter",
            "params": {[field]: value}
        })
        return response.data.result
    },
}