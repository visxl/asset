/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const TASK_BASE_REST_API_URL = 'http://192.168.137.14:3308/api/task'

class TaskService {
    
    // Task
    getAllTask() {
        return axios.get(TASK_BASE_REST_API_URL)
    }

    createTask(task) {
        return axios.post(TASK_BASE_REST_API_URL, task)
    }

    getTaskById(taskId) {
        return axios.get(TASK_BASE_REST_API_URL + '/' + taskId)
    }

    updateTask(taskId, task) {
        return axios.put(TASK_BASE_REST_API_URL + "/" + taskId, task)
    }

    deleteTask(taskId) {
        return axios.delete(TASK_BASE_REST_API_URL + "/" + taskId)
    }

}

export default new TaskService();