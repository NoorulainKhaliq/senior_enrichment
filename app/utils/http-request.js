import axios from 'axios'

export default Object.freeze({
    get,
    delete: remove,
    put,
    post
})

function get(url) {
    return axios.get(url)
}

function post(url, data, config) {
    return axios.post(url, data, config)
}

function put(url, data, config) {
    return axios.put(url, data, config)
}

function remove (url) {
    return axios.delete(url)
}