/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const ASSET_BASE_REST_API_URL = 'http://192.168.137.14:3308/api/asset'

class AssetService {
    
    // Main CRUD
    getAllAsset() {
        return axios.get(ASSET_BASE_REST_API_URL + '/report')
    }

    createAsset(asset) {
        return axios.post(ASSET_BASE_REST_API_URL, asset)
    }

    updateAsset(assetId, asset) {
        return axios.put(ASSET_BASE_REST_API_URL + "/" + assetId, asset)
    }

    deleteAsset(assetId) {
        return axios.delete(ASSET_BASE_REST_API_URL + "/" + assetId)
    }

    getAssetById(assetId) {
        return axios.get(ASSET_BASE_REST_API_URL + '/' + assetId)
    }


    // Optional
    getAssetDetailById(assetId) {
        return axios.get(ASSET_BASE_REST_API_URL + '/detail/' + assetId)
    }

    getAssetsByOffice(office) {
        return axios.get(ASSET_BASE_REST_API_URL + '/office?office=' + office)
    }

    getAssetsByCode(code) {
        return axios.get(ASSET_BASE_REST_API_URL + '/code?code=' + code)
    }

    getActiveAsset(status) {
        return axios.get(ASSET_BASE_REST_API_URL + 'status?status=' + status)
    }
}

export default new AssetService();