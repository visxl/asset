/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const ASSET250_BASE_REST_API_URL = 'http://localhost:8081/api/asset250'

class Asset250Service {
    
    // Asset
    getAllAsset250() {
        return axios.get('http://localhost:8081/api/asset250/report')
    }

    createAsset250(asset) {
        return axios.post(ASSET250_BASE_REST_API_URL, asset)
    }

    getAsset250ById(assetId) {
        return axios.get(ASSET250_BASE_REST_API_URL + '/' + assetId)
    }

    getAsset250DetailById(assetId) {
        return axios.get('http://localhost:8081/api/asset250/detail/' + assetId)
    }

    updateAsset250(assetId, asset) {
        return axios.put(ASSET250_BASE_REST_API_URL + "/" + assetId, asset)
    }

    deleteAsset250(assetId) {
        return axios.delete(ASSET250_BASE_REST_API_URL + "/" + assetId)
    }

    getAsset250ByOffice(office) {
        return axios.get(ASSET250_BASE_REST_API_URL + '/office?office=' + office)
    }
}

export default new Asset250Service();