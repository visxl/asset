/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const ASSET_BASE_REST_API_URL = 'http://localhost:8081/api/asset'

class AssetService {
    
    // Asset
    getAllAsset() {
        return axios.get('http://localhost:8081/api/asset/report')
    }

    createAsset(asset) {
        return axios.post(ASSET_BASE_REST_API_URL, asset)
    }

    getAssetById(assetId) {
        return axios.get(ASSET_BASE_REST_API_URL + '/' + assetId)
    }

    getAssetDetailById(assetId) {
        return axios.get('http://localhost:8081/api/asset/supplier')
    }

    updateAsset(assetId, asset) {
        return axios.put(ASSET_BASE_REST_API_URL + "/" + assetId, asset)
    }

    deleteAsset(assetId) {
        return axios.delete(ASSET_BASE_REST_API_URL + "/" + assetId)
    }

    getAssetsByOffice(office) {
        return axios.get(ASSET_BASE_REST_API_URL + '/office?office=' + office)
    }
}

export default new AssetService();