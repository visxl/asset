/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const USER_BASE_REST_API_URL = 'http://192.168.1.94:3308/api/users'

const USER_DTO_REST_API_URL = 'http://192.168.1.94:3308/api/user'

const USER_REACTIVE = 'http://localhost:8080/api/user'

class UserService {

    getUser() {
        return axios.get(USER_REACTIVE)
    }

    getUserDto() {
        return axios.get(USER_DTO_REST_API_URL)
    }

    getUserDtoById(userdtoId) {
        return axios.get(USER_DTO_REST_API_URL, "/", userdtoId)
    }

    getAllUser() {
        return axios.get(USER_BASE_REST_API_URL)
    }

    createUser(user) {
        return axios.post(USER_BASE_REST_API_URL, user)
    }

    getUserById(userId) {
        return axios.get(USER_BASE_REST_API_URL + '/' + userId)
    }

    updateUser(userId, user) {
        return axios.put(USER_BASE_REST_API_URL + "/" + userId, user)
    }

    deleteUser(userId) {
        return axios.delete(USER_BASE_REST_API_URL + "/" + userId)
    }
}

export default new UserService();