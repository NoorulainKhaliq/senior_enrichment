import axios from 'axios'

export default Object.freeze({
    get
})

function get(url) {
    return axios.get(url)
}
