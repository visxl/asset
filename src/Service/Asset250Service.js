/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const ASSET_250_BASE_REST_API_URL = 'http://192.168.1.94:3308/api/asset250'

class Asset250Service {
    
    // AssetUnder250
    getAllAsset250() {
        return axios.get(ASSET_250_BASE_REST_API_URL)
    }

    createAsset250(asset250) {
        return axios.post(ASSET_250_BASE_REST_API_URL, asset250)
    }

    getAsset250ById(asset250Id) {
        return axios.get(ASSET_250_BASE_REST_API_URL + '/' + asset250Id)
    }

    updateAsset250(asset250Id, asset250) {
        return axios.put(ASSET_250_BASE_REST_API_URL + '/' + asset250Id,asset250)
    }

    deleteAsset250(asset250Id) {
        return axios.delete(ASSET_250_BASE_REST_API_URL + "/" + asset250Id)
    }

}

export default new Asset250Service();