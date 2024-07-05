/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const ASSET250_BASE_REST_API_URL = 'http://192.168.137.14:3308/api/asset250'

class Asset250Service {
    
    // Asset
    getAllAsset250() {
        return axios.get('http://192.168.137.14:3308/api/asset250/report')
    }

    createAsset250(asset250) {
        return axios.post(ASSET250_BASE_REST_API_URL, asset250)
    }

    getAsset250ById(asset250Id) {
        return axios.get(ASSET250_BASE_REST_API_URL + '/' + asset250Id)
    }

    getAsset250DetailById(asset250Id) {
        return axios.get('http://192.168.137.14:3308/api/asset250/detail/' + asset250Id)
    }

    updateAsset250(asset250Id, asset250) {
        return axios.put(ASSET250_BASE_REST_API_URL + "/" + asset250Id, asset250)
    }

    deleteAsset250(asset250Id) {
        return axios.delete(ASSET250_BASE_REST_API_URL + "/" + asset250Id)
    }

    getAsset250ByOffice(office) {
        return axios.get(ASSET250_BASE_REST_API_URL + '/office?office=' + office)
    }
}

export default new Asset250Service();