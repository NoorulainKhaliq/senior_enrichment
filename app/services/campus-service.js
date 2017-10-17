import httpRequest from '../utils/http-request'

export default Object.freeze({
    getAllCampuses,
    getCampus
})

function getAllCampuses() {
    return httpRequest.get('/api/campus')
    .then(res => res.data)
    .then(campuses => campuses)
 }

 function getCampus(id) {
    return httpRequest.get(`api/campus/${id}`)
    .then(res => res.data)
    .then(campus => campus)
 }

 function createCampus(campus) {}

 function deleteCampus(campusId) {}

 // delete campus
 // update campus 


 /* 


getAllCapuses
getOne

*/
