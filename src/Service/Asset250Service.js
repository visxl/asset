/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const ASSET250_BASE_REST_API_URL = 'http://192.168.137.14:3308/api/asset250'

class Asset250Service {
    
    // Main CRUD
    getAllAsset250() {
        return axios.get(ASSET250_BASE_REST_API_URL + '/report')
    }

    createAsset250(asset250) {
        return axios.post(ASSET250_BASE_REST_API_URL, asset250)
    }

    getAsset250ById(asset250Id) {
        return axios.get(ASSET250_BASE_REST_API_URL + '/' + asset250Id)
    }

    updateAsset250(asset250Id, asset250) {
        return axios.put(ASSET250_BASE_REST_API_URL + "/" + asset250Id, asset250)
    }

    deleteAsset250(asset250Id) {
        return axios.delete(ASSET250_BASE_REST_API_URL + "/" + asset250Id)
    }


    // Optional
    getAsset250DetailById(asset250Id) {
        return axios.get(ASSET250_BASE_REST_API_URL + '/detail/' + asset250Id)
    }

    getAsset250ByOffice(office) {
        return axios.get(ASSET250_BASE_REST_API_URL + '/office?office=' + office)
    }

    getActiveAsset250(status) {
        return axios.get(ASSET250_BASE_REST_API_URL + 'status?status=' + status)
    }
}

export default new Asset250Service();