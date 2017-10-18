import httpRequest from '../utils/http-request';

export default Object.freeze({
    getAllStudents,
    getByCampusId,
    getSingleStudent,
    removeStudent
})

function getAllStudents() {
    return httpRequest.get('/api/student')
    .then(res => res.data)
    .then(students => students)
}

function getByCampusId(id) {
    return httpRequest.get(`/api/student/campus/${id}`)
    .then(res => res.data)
    .then(studentsOfCampus => studentsOfCampus)
}

function getSingleStudent(id) {
    return httpRequest.get(`/api/student/${id}`)
    .then(res => res.data)
    .then(student => student)
}

function removeStudent(id) {
    return httpRequest.delete(`/api/student/${id}`)
}

// function removeStudent(id) {
//     return httpRequest.delete(`/api/student/${id}`)
//     .then()
// }