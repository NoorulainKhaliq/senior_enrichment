import httpRequest from '../utils/http-request'

export default Object.freeze({
    getAllCampuses,
    getCampus,
    createCampus,
    updateCampus,
    deleteCampus
})

function getAllCampuses() {
    return httpRequest.get('/api/campus')
        .then(res => res.data)
        .then(campuses => campuses)
}

function getCampus(id) {
    return httpRequest.get(`/api/campus/${id}`)
        .then(res => res.data)
        .then(campus => campus)
}

function createCampus(campus) {
    return httpRequest.post('/api/campus/', {
        name: campus.name,
        content: campus.imageUrl
    })
    .then(res => res.data)
}

function updateCampus(campus) {
    return httpRequest.put()
}

function put(url, data, config) {
    return axios.put(url, data, config)
}

function deleteCampus(campusId) {
    return httpRequest.delete(`/api/campus/${campusId}`)
        .then(res => res.data)
        .then(deleteCount => {
            if(deleteCount < 1 ) {
                throw Exception('delete failed')
            }
            return deleteCount
        })
}